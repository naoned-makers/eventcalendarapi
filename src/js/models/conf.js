import { Hal } from "threerest";

@Hal.halEntity("/confs/:id")
export default class Conf {

  //@Hal.resourceId()
  //id = 1;

  constructor(id, title, speaker, date, room, length, abstract, track) {
    this.id = id;
    this.title = title;
    this.speaker = speaker;
    this.date = date;
    this.room = room;
    this.length = length;
    this.abstract = abstract;
    this.track = track;
  }
}