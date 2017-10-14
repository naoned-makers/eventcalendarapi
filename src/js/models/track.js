import { Hal } from "threerest";

@Hal.halEntity("/tracks/:id")
export default class Track {

  //@Hal.resourceId()
  //id = 1;

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}
