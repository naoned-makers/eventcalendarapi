import { Service } from "threerest";
import { Methods } from "threerest";
import { Hal } from "threerest";
import { Pagination } from "threerest";

import ArrayHelper from "../helpers/arrayHelper";

var dbSessions = Object.values(require('../../../database/sessions'));
var dbSpeakers = Object.values(require('../../../database/speakers'));
var dbSchedules = Object.values(require('../../../database/schedule'));


let result = [];

@Service.path("/test")
export default class ServiceTest {

  @Methods.get("/")
  @Hal.halServiceMethod()
  test() {
    console.log(dbSessions);
    console.log(dbSpeakers);
    console.log(dbSchedules);
    if (!result) {
      for (var i = 0; i < dbSessions.length; i++) {
        let session = dbSessions[i];
        if (session['speakers']) {
          let speakers = ArrayHelper.getSpeakers(session['speakers']);
          result.push(sessions);
        }
      }
    }    
    return "it's work !!!"; 
  }

}
