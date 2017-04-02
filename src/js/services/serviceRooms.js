import { Service } from "threerest";
import { Methods } from "threerest";
import { Hal } from "threerest";

import Room  from "../models/room";
import EventHelper from "../helpers/eventHelper";

var db = require('../database/database');


@Service.path("/rooms")
export default class ServiceRooms {

  @Methods.get("/")
  @Hal.halServiceMethod(true)
  getAll() {
    return EventHelper.getRooms(db);
  }

  @Methods.get("/:id")
  @Hal.halServiceMethod(false)
  getswitchId(value) {
    var id = value.id;
   	var result = EventHelper.searchParams(db, 'rooms', 'id', id);
   	if (result) {
       return EventHelper.getRoom(result, id);
   	}
     throw new NotFoundError();
  }
}
