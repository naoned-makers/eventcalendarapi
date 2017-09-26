var assert = require("assert");

import Session from "../models/session";
import Schedule from "../models/schedule";
import Speaker from "../models/speaker";

var dbSpeakers = Object.values(require('../../../database/speakers'));
var dbSchedule = Object.values(require('../../../database/schedule'));

export default class ArrayHelper {

   /*
   * Traitement de l'ensemble des données pour transformer les entrées
   * auteur de la base de donnée en suite d'objet Author
   */
  static getSpeakers(speakers) {
    let result = [];
    for (var index = 0; index < speakers.length; index++) {
      let idSpeaker = dbSpeakers.map(function (img) {
        return img.id;
      }).indexOf(speakers[index]);
      if (idSpeaker > -1) {
        result.push(dbSpeakers[idSpeaker]);
      }
    }    
    return result;
  }

  static getSlot(idSession) {
    let result;
    dbSchedule.find(function (element) {
      let timeslot = element['timeslots'].find(function (slot) {
        return slot['sessions'].find(function (session) {
          if (parseInt(session) === parseInt(idSession)) {
            return true;
          }
        })
      });
      if (timeslot) {
        result = { 'date': element.date, 'startTime': timeslot['startTime'], 'endTime': timeslot['endTime']};
      }
    })
    return result;
  }
}
