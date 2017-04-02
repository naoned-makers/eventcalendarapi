import { Service } from "threerest";
import { Methods } from "threerest";
import { Hal } from "threerest";

import Speaker  from "../models/speaker";
import EventHelper from "../helpers/eventHelper";

var db = require('../database/database');


@Service.path("/speakers")
export default class ServiceSpeakers {

  @Methods.get("/")
  @Hal.halServiceMethod(true)
  getAll() {
    return EventHelper.getSpeakers(db);
  }

  @Methods.get("/:id")
  @Hal.halServiceMethod(false)
  getswitchId(value) {
    var id = value.id;
   	var result = EventHelper.searchParams(db, 'speakers', 'id', id);
   	if (result) {
       return EventHelper.getSpeaker(result, id);
   	}
     throw new NotFoundError();
  }
}
