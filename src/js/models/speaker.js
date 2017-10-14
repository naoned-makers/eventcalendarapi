import { Hal } from "threerest";

@Hal.halEntity("/speakers/:id")
export default class Speaker {

  //@Hal.resourceId()
  //id = 1;

  constructor(id, name) {
    this.id = id;
    this.name = name;
  }
}

