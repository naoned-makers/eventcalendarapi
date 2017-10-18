import { Hal } from "threerest";

@Hal.halEntity("/sessions/:id")
export default class Session {

  //@Hal.resourceId()
  //id = 1;

  constructor(id, title) {
    this.id = id;
    this.title = title;
    /*this.speaker = speaker;
    this.date = date;
    this.room = room;
    this.length = length;
    this.abstract = abstract;
    this.track = track;*/
  }
}