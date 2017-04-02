import { Service } from "threerest";
import { Methods } from "threerest";
import { Hal } from "threerest";

import Confs from "../models/conf";
import EventHelper from "../helpers/eventHelper";

var db = require('../database/database');


@Service.path("/confs")
export default class ServiceConfs {

  @Methods.get("/")
  @Hal.halServiceMethod(true)
  getAll() {
    return EventHelper.getConfs(db);
  }

  @Methods.get("/:id")
  @Hal.halServiceMethod()
  getswitchId(value) {
    var id = value.id;
  	var result = EventHelper.searchParams(db, 'confs', 'id', id);
  	if (result) {
      return EventHelper.getConf(result, db['speakers']);
  	}
    throw new NotFoundError();
  }
}
