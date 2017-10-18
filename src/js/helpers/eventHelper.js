var assert = require("assert");

import Session from "../models/session";
import Schedule from "../models/schedule";
import Speaker from "../models/speaker";
import Track from "../models/track";
import Room from "../models/room";

export default class EventHelper {

   /*
   * Traitement de l'ensemble des données pour transformer les entrées
   * auteur de la base de donnée en suite d'objet Author
   */
  static getSchedules(json, session) {
    var arr = [];
    var len = json.length;
    for (var i = 0; i < len; i++) {
      if (session) {
        for (var index = 0; index < json[i]['timeslots'].length; index++) {
          var element = json[i]['timeslots'][index];

          var toto = element['sessions'].map(function (img) { return img; }).indexOf(parseInt(session));
          var tutu = element['sessions'].findIndex(img => img === parseInt(session));
          var found = element['sessions'].find(product => product.find(item => item === parseInt(session)));

          if (found) {
            arr.push(EventHelper.getSchedule(json[i], index));
          }          
        }

      } else {
        arr.push(EventHelper.getSchedule(json[i]));
      }    
    }
    return arr;
  }
  static getSchedule(json, index) {
    let schedule = new Schedule(json['date'], json['tracks'], json['timeslots'][index]);
    return schedule;
  }
  /*
   * Traitement de l'ensemble des données pour transformer les entrées
   * auteur de la base de donnée en suite d'objet Author
   */
  static getSessions(json, speaker) {
    var arr = [];
    var len = json.length;
    for (var i = 0; i < len; i++) {
      if (speaker) {
        if (json[i]['speakers'] && json[i]['speakers'].indexOf(parseInt(speaker)) > -1) {
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
    let session = new Session(json['id'], json['title']);
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
  static getSpeakers(json, company) {
    var arr = [];
    var speakers = json; 
    for (var i = 0; i < speakers.length; i++) {
      if (company) {
        if (speakers[i]["company"] == company) {
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

  
  static searchCompany(json, company) {
    let result = [];
    for (var i=0 ; i < json.speakers.length ; i++)
    {
      if (json.speakers[i].company.toLowerCase() == company.toLowerCase()) {
        result.push(json.speakers[i].id);
      }
    }
    return result;
  }

}
