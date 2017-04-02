var assert = require("assert");

import Conf from "../models/conf";
import Speaker from "../models/speaker";
import Track from "../models/track";
import Room from "../models/room";

var db = require('../database/database');

export default class EventHelper {

  /*
   * Traitement de l'ensemble des données pour transformer les entrées
   * auteur de la base de donnée en suite d'objet Author
   */
  static getConfs(json) {
    var arr = [];
    var len = json["confs"].length;
    console.log('csdfze' + json['speakers']);
    for (var i = 0; i < len; i++) {
        arr.push(EventHelper.getConf(json["confs"][i], json['speakers']));
    }
    return arr;
  }

  /*
   * A partir des données d'une conférence, on crée un objet Conf.
   * Chaque objet Serie est crée et ajouté à l'Author.
   */
  static getConf(json, speakers) {
    var speakersConf = [];
    for (var i=0 ; i < speakers.length ; i++)
    {
      if( json['speaker'] instanceof Array ) {
        for (var j=0 ; j < json['speaker'].length ; j++) {
          if(speakers[i].id === json['speaker'][j]) {
            speakersConf.push(EventHelper.getShortSpeaker(speakers[i]));
          }
        }
      } else {
        if(speakers[i].id === json['speaker']) {
          speakersConf.push(EventHelper.getShortSpeaker(speakers[i]));
        }
      }
    }
    return new Conf(json["id"], json["title"], speakersConf, json["date"], json["room"], json["length"], json["abstract"], json["track"]);
  }

  /*
   * Traitement de l'ensemble des données pour transformer les entrées
   * speakers de la base de donnée en suite d'objet Speaker
   */
  static getSpeakers(json) {
    var arr = [];
    var len = json["speakers"].length;
    for (var i = 0; i < len; i++) {
        arr.push(EventHelper.getSpeaker(json["speakers"][i]));
    }
    return arr;
  }

  /*
   * A partir des données d'un speaker, on crée un objet Speaker.
   */
  static getSpeaker(json) {
    let speaker = new Speaker(json["id"], json["name"]);
    speaker.society = json["society"];
    speaker.biography = json["biography"];
    return speaker;
  }

  static getShortSpeaker(json) {
    return new Speaker(json["id"], json["name"]);
  }

  /*
   * Traitement de l'ensemble des données pour transformer les entrées
   * tracks de la base de donnée en suite d'objet Track
   */
  static getTracks(json) {
    var arr = [];
    var len = json["tracks"].length;
    for (var i = 0; i < len; i++) {
        arr.push(EventHelper.getTrack(json["tracks"][i]));
    }
    return arr;
  }

  /*
   * A partir des données d'un track, on crée un objet Track.
   */
  static getTrack(json) {
    return new Track(json["id"], json["name"]);
  }


  /*
   * Traitement de l'ensemble des données pour transformer les entrées
   * rooms de la base de donnée en suite d'objet Room
   */
  static getRooms(json) {
    var arr = [];
    var len = json["rooms"].length;
    for (var i = 0; i < len; i++) {
        arr.push(EventHelper.getRoom(json["rooms"][i]));
    }
    return arr;
  }

  /*
   * A partir des données d'une room, on crée un objet Room.
   */
  static getRoom(json) {
    return new Room(json["id"], json["name"]);
  }

  /*
   * Renvoie l'objet json correspondant à la catégorie, au critère voulue
   */
  static searchParams(json, categoryField, searchField, searchVal) {
    for (var i=0 ; i < json[categoryField].length ; i++)
    {
      if (json[categoryField][i][searchField] == searchVal) {
        return json[categoryField][i]
      }
    }
  }
}
