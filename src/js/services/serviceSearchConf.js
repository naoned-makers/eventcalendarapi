import { Service } from "threerest";
import { Methods } from "threerest";
import { Hal } from "threerest";

import Confs from "../models/session";
import EventHelper from "../helpers/eventHelper";
import ErrorHelper from "../helpers/errorHelper";

var db = require('../database/database');




@Service.path("/next_conf")
export default class ServiceSearchConf {

  @Methods.get("/")
  @Hal.halServiceMethod()
  getAll(value, req) {
    let track = req.query.track;
    let society = req.query.society;
    if (track) {
      let result = EventHelper.searchConf(db, 'confs', 'track', track);
      if (result) {
        return result;
      } else {
        ErrorHelper.throwNotFoundError("Aucun track n'a été trouvé pour cet id");
      }
    } else if (society) {
      console.log('society ' + society);
      let result = EventHelper.searchSociety(db, society);
      console.log(result);
      if (result) {
        return result;
      } else {
        ErrorHelper.throwNotFoundError("Aucune société n'a été trouvée pour cet id");
      }
    } else {
      ErrorHelper.throwQueryError('Vous devez préciser un paramètre track ou society');
    }
    return EventHelper.getConfs(db);
  }

  /**
   * Renvoie la prochaine conférence pour la track voulue
   * 
   * @param {*} value l'id de la track 
   */
  @Methods.get("/:id")
  @Hal.halServiceMethod()
  getswitchId(value, req) {
        console.log(value);
    console.log(req.query.color);
    console.log(req.query.toto);
    let id = value.id;
  	let result = EventHelper.searchParams(db, 'confs', 'id', id);
  	if (result) {
      return EventHelper.getConf(result, db['speakers'], db['rooms'], db['tracks']);
  	}
    throw new NotFoundError();
  }
}
