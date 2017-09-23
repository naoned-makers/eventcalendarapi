var assert = require("assert");

import Session from "../models/session";
import Schedule from "../models/schedule";
import Speaker from "../models/speaker";
import Track from "../models/track";
import Room from "../models/room";

var db = require('../../../database/database');

export default class EventHelper {

   /*
   * Traitement de l'ensemble des données pour transformer les entrées
   * auteur de la base de donnée en suite d'objet Author
   */
  static getSchedules(json) {
    var arr = [];
    var len = json.length;
    for (var i = 0; i < len; i++) {
        arr.push(EventHelper.getSchedule(json[i]));
    }
    return arr;
  }
  static getSchedule(json) {
    let schedule = new Schedule(json['date'], json['tracks']);
    return schedule;
  }
  /*
   * Traitement de l'ensemble des données pour transformer les entrées
   * auteur de la base de donnée en suite d'objet Author
   */
  static getSessions(json, speaker) {

    let toto = 12;
    let tutu = ['12'];
    if (tutu.indexOf(toto+'') > -1) {
      console.log('je suis dans le tableau');
    } else {
      console.log('je ne suis pas dans le tableau');
    }




    var arr = [];
    var len = json.length;
    for (var i = 0; i < len; i++) {
      console.log('json[i]speaker : ' + json[i]['speakers'])
      if (speaker) {
        //console.log('speaker : ' + speaker)
        //console.log('json[i] : ' + json[i])
        
        if (json[i]['speakers'] && json[i]['speakers'].indexOf(speaker+"") > -1) {
          console.log('je suis in')
          arr.push(EventHelper.getSession(json[i]));
        }
      } else {
        arr.push(EventHelper.getSession(json[i]));
      }
    }
    return arr;
  }

  /*
   * A partir des données d'une conférence, on crée un objet Conf.
   * Chaque objet Serie est crée et ajouté à l'Author.
   */
  static getSession(json) {
    console.log(json['id'])
    console.log(json['title'])
    let session = new Session(json['id'], json['title']);
    console.log(session)
    session.titleMobile = json['titleMobile'];
    session.image = json['image'];
    session.description = json['description'];
    session.type = json['type'];
    session.track = json['track'];
    session.category = json['category'];
    session.language = json['language'];
    session.tags = json['tags'];
    session.complexity = json['complexity'];
    session.speakers = json['speakers'];
    return session;
  }

  /*
   * Traitement de l'ensemble des données pour transformer les entrées
   * speakers de la base de donnée en suite d'objet Speaker
   */
  static getSpeakers(json, society) {
    var arr = [];
    var speakers = json; 
    for (var i = 0; i < speakers.length; i++) {
      if (society) {
        if (speakers[i]["company"] == society) {
          arr.push(EventHelper.getSpeaker(speakers[i]));
        }
      } else {
        arr.push(EventHelper.getSpeaker(speakers[i]));
      }
    }
    return arr;
  }

  /*
   * A partir des données d'un speaker, on crée un objet Speaker.
   */
  static getSpeaker(json) {
    let speaker = new Speaker(json["id"], json["name"]);
    speaker.society = json["company"];
    speaker.company = json["company"];
    speaker.companyLogo = json["companyLogo"];
    speaker.country = json["country"];
    speaker.photoUrl = json["photoUrl"];
    speaker.shortBio = json["shortBio"];
    speaker.bio = json["bio"];
    speaker.tags = json["tags"];
    speaker.badges = json["badges"];
    speaker.socials = json["socials"];
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
  static searchParams(json, searchField, searchVal) {
    for (var i=0 ; i < json.length ; i++)
    {
      if (json[i][searchField] == searchVal) {
        return json[i]
      }
    }
  }
  static searchConf(json, categoryField, searchField, searchVal) {
    let result = [];
    for (var i=0 ; i < json[categoryField].length ; i++)
    {
      if (json[categoryField][i][searchField] == searchVal) {
        result.push(json[categoryField][i]);
      }
    }
    return result;
  }

  
  static searchSociety(json, society) {
    let result = [];
    for (var i=0 ; i < json.speakers.length ; i++)
    {
      if (json.speakers[i].society.toLowerCase() == society.toLowerCase()) {
        result.push(json.speakers[i].id);
      }
    }
    return result;
  }

}
