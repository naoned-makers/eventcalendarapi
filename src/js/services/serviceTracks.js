import { Service } from "threerest";
import { Methods } from "threerest";
import { Hal } from "threerest";

import Track  from "../models/track";
import EventHelper from "../helpers/eventHelper";

var db = require('../database/database');


@Service.path("/tracks")
export default class ServiceTracks {

  @Methods.get("/")
  @Hal.halServiceMethod(true)
  getAll() {
    return EventHelper.getTracks(db);
  }

  @Methods.get("/:id")
  @Hal.halServiceMethod(false)
  getswitchId(value) {
    var id = value.id;
   	var result = EventHelper.searchParams(db, 'tracks', 'id', id);
   	if (result) {
       return EventHelper.getTrack(result, id);
   	}
     throw new NotFoundError();
  }
}
