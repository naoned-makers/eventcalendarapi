import { Service } from "threerest";
import { Methods } from "threerest";
import { Hal } from "threerest";
import { Pagination } from "threerest";

import ArrayHelper from "../helpers/arrayHelper";
import moment from 'moment';

var dbSessions = Object.values(require('../../../database/sessions'));
var dbSpeakers = Object.values(require('../../../database/speakers'));
var dbSchedules = Object.values(require('../../../database/schedule'));


let result = [];

@Service.path("/talks")
export default class ServiceTalks {

  @Methods.get("/")
  @Hal.halServiceMethod(true)
  getAll(value, request) {
    if (result.length === 0) {
      this.createData();
    }

    if (request.query.company) {
      return this.searchWithCriteria('company', request.query.company.toLowerCase());
    } else if (request.query.tag) {
      return this.searchWithCriteria('tag', request.query.tag.toLowerCase());
    }

    return result;
  }

  @Methods.get('/next')
  @Hal.halServiceMethod(true)
  getAllNext(value, request) {
    if (result.length === 0) {
      this.createData();
    }
    const now = moment();

    return result
      .filter(talk => {
        // Keep talks scheduled today and not already played
        const slotDate = moment(talk.slot.date + ' ' + talk.slot.startTime);
        return slotDate.date() === now.date() && slotDate.month() === now.month() && slotDate.year() === now.year() && slotDate.isAfter(now);
      })
      .reduce((res, current) => {
        // Search next talk for every room
        const talkInSameRoom = res.find(talk => current.track.title === talk.track.title);
        if (!talkInSameRoom) {
          return res.concat(current);
        } else {
          if (moment(current.slot.date + ' ' + current.slot.startTime).isBefore(moment(talkInSameRoom.slot.date + ' ' + talkInSameRoom.slot.startTime))) {
            return res.filter(talk => talk.id !== talkInSameRoom.id).concat(current);
          }
        }
        return res;
      }, []);
  }

  @Methods.get("/:id")
  @Hal.halServiceMethod()
  getswitchId(value) {
    let idSession = value.id;
    if (result.length === 0) {
      this.createData();
    }
    if (value.id) {
      return result.find(function (element) {
        return element.id == parseInt(value.id);
      });
    }
    return result;
  }

  createData() {
    for (var i = 0; i < dbSessions.length; i++) {
      let session = dbSessions[i];
      if (session['speakers']) {
        session['speakers'] = ArrayHelper.getSpeakers(session['speakers']);
        result.push(session);
      }
      session['slot'] = ArrayHelper.getSlot(session.id);
    }
  }

  searchWithCriteria(criteria, valueCriteria) {
    const now = moment();
    //const now = moment('2017-10-19 8:30');
    let resultWithCriteria =[];
    result.map(function(session) {
      let found = false;
      if (criteria === 'company') {
        found = session.speakers.some(function (speaker) {
          if (!speaker.company) {
            return;
          }
          return speaker.company.toLowerCase() === valueCriteria.toLowerCase();
        });
      } else if (criteria === 'tag') {
        found = session.tags.some(function (tag) {
          return tag.toLowerCase() === valueCriteria.toLowerCase();
        });
      }

      if (found) {
        resultWithCriteria.push(session);
      }
    });

    return resultWithCriteria
    .filter(talk => {
      // Keep talks scheduled today and not already played
      const slotDate = moment(talk.slot.date + ' ' + talk.slot.startTime);
      return slotDate.date() === now.date() && slotDate.month() === now.month() && slotDate.year() === now.year() && slotDate.isAfter(now);
    });

    //return resultWithCriteria;
  }
}
