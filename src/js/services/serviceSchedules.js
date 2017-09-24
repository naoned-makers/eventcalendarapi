import { Service } from "threerest";
import { Methods } from "threerest";
import { Hal } from "threerest";

import Schedule  from "../models/schedule";
import EventHelper from "../helpers/eventHelper";

var db = Object.values(require('../../../database/schedule'));


@Service.path("/schedule")
export default class ServiceSchedules {

  @Methods.get("/")
  @Hal.halServiceMethod(true)
  getAll(value, request) {
    if (request.query.session) {
      return EventHelper.getSchedules(db, request.query.session);  
    } else {
      return EventHelper.getSchedules(db);
    }
  }

  @Methods.get("/:id")
  @Hal.halServiceMethod(false)
  getswitchId(value) {
    var date = value.date;
   	var result = EventHelper.searchParams(db, 'date', date);
   	if (result) {
       return EventHelper.getSchedule(result, date);
   	}
     throw new NotFoundError();
  }
}
