import { Service } from "threerest";
import { Methods } from "threerest";
import { Hal } from "threerest";

import Sessions from "../models/session";
import EventHelper from "../helpers/eventHelper";

let db = Object.values(require('../../../database/sessions'));


@Service.path("/sessions")
export default class ServiceSessions {

  @Methods.get("/")
  @Hal.halServiceMethod()
  getAll(value, request) {
    if (request.query.speaker) {
      return EventHelper.getSessions(db, request.query.speaker);  
    } else {
      return EventHelper.getSessions(db);
    }
    //return EventHelper.getSessions(db);
  }

  @Methods.get("/:id")
  @Hal.halServiceMethod()
  getswitchId(value, req) {
    var id = value.id;
  	var result = EventHelper.searchParams(db, 'id', id);
  	if (result) {
      return EventHelper.getSession(result, db['speakers'], db['rooms'], db['tracks']);
  	}
    throw new NotFoundError();
  }
}
