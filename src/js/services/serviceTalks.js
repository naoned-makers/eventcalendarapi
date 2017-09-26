import { Service } from "threerest";
import { Methods } from "threerest";
import { Hal } from "threerest";
import { Pagination } from "threerest";

import ArrayHelper from "../helpers/arrayHelper";

var dbSessions = Object.values(require('../../../database/sessions'));
var dbSpeakers = Object.values(require('../../../database/speakers'));
var dbSchedules = Object.values(require('../../../database/schedule'));


let result = [];

@Service.path("/talks")
export default class ServiceTalks {

  @Methods.get("/")
  @Hal.halServiceMethod(true)
  getAll(value, request) {
    console.log(request.query.society)
    if (result.length === 0) {
      this.createData();
    }
    let yyyy = [];
    if (request.query.society) {
      for (var i = 0; i < result.length; i++) {
        var session = result[i];

        for (var index = 0; index < session.speakers.length; index++) {
          var speaker = session.speakers[index];
          if (speaker.company == request.query.society) {
            console.log('on a trouvé un speaker ' + speaker.company);
            
            yyyy.push(session);
            console.log(yyyy);
            
          }
        }
      }
      return yyyy;
    } 
    return result;
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
}
