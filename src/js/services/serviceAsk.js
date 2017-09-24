import { Service } from "threerest";
import { Methods } from "threerest";
import { Hal } from "threerest";

import Room  from "../models/room";
import EventHelper from "../helpers/eventHelper";

var request = require('request')

@Service.path("/ask")
export default class ServiceAsk {

  @Methods.get("/")
  @Hal.halServiceMethod(true)
  getAll() {
    return request('http://localhost:8080/speakers?society=Zenika');
  }


}
