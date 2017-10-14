import { Hal } from "threerest";

@Hal.halEntity("/schedules/:id")
export default class Schedule {


  constructor(date, tracks, timeslot) {
    this.date = date;
    this.tracks = tracks;
    this.timeslot = timeslot
  }
}