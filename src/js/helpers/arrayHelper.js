var assert = require("assert");

import Session from "../models/session";
import Schedule from "../models/schedule";
import Speaker from "../models/speaker";

var dbSpeakers = Object.values(require('../../../database/speakers'));

export default class ArrayHelper {

   /*
   * Traitement de l'ensemble des données pour transformer les entrées
   * auteur de la base de donnée en suite d'objet Author
   */
  static getSpeakers(speakers) {
    let plouf = dbSpeakers.map(function (img) {
      return img;
    }).indexOf(5005);
    console.log(plouf);
    
    for (var index = 0; index < dbSpeakers.length; index++) {
      var speaker = dbSpeakers[index];
      /*var toto = element['sessions'].map(function (img) {
        return img;
      }).indexOf(parseInt(session));
*/
      if (speakers.indexOf(speaker.id)) {

      } 
    }
    return "";
  }
}
