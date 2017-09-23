import { Service } from "threerest";
import { Methods } from "threerest";
import { Hal } from "threerest";

import Speaker  from "../models/speaker";
import EventHelper from "../helpers/eventHelper";

var db = Object.values(require('../../../database/speakers'));


@Service.path("/speakers")
export default class ServiceSpeakers {

  @Methods.get("/")
  @Hal.halServiceMethod(true)
  getAll(value, request) {
    if (request.query.society) {
      return EventHelper.getSpeakers(db, request.query.society);  
    } else {
      return EventHelper.getSpeakers(db);
    }
  }

  @Methods.get("/:id")
  @Hal.halServiceMethod(false)
  getswitchId(value, request) {
    var id = value.id;
   	var result = EventHelper.searchParams(db, 'id', id);
   	if (result) {
       return EventHelper.getSpeaker(result, id);
   	}
     throw new NotFoundError();
  }
}
