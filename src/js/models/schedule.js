import { Hal } from "threerest";

@Hal.halEntity("/schedules/:id")
export default class Schedule {

  @Hal.resourceId()
  id = 1;

  constructor(date, tracks) {
    this.date = date;
    this.tracks = tracks;
  }
}