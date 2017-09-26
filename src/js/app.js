"use strict";

require('babel-register');
var threerest = require('threerest');
var request = require('request');
var fs = require('fs');
var cors = require('cors');

import * as ServiceSessions from "./services/serviceSessions";
import * as ServiceSchedules from "./services/serviceSchedules";
import * as ServiceSpeakers from "./services/serviceSpeakers";
import * as ServiceTalks from "./services/serviceTalks";
import * as ServiceAsk from "./services/serviceAsk";

import express from "express";

var app = express();

app.use(cors());

app.get("/", function(req, res){
  res.send("Les ressources disponibles sont /sessions /speakers et /rooms");
});

// Update Devfest data
request('https://devfest.gdgnantes.com/data/schedule.json').pipe(fs.createWriteStream('database/schedule.json'));
request('https://devfest.gdgnantes.com/data/sessions.json').pipe(fs.createWriteStream('database/sessions.json'));
request('https://devfest.gdgnantes.com/data/speakers.json').pipe(fs.createWriteStream('database/speakers.json'));

// load the service Test
threerest.ServiceLoader.loadService(app, new ServiceSessions.default());
threerest.ServiceLoader.loadService(app, new ServiceSchedules.default());
threerest.ServiceLoader.loadService(app, new ServiceSpeakers.default());
threerest.ServiceLoader.loadService(app, new ServiceTalks.default());
threerest.ServiceLoader.loadService(app, new ServiceAsk.default());

app.listen(8080, () => {
  console.log("Express start...");
  console.log("Les APIs sont consultables aux adresses :"); 
  console.log("http://localhost:8080/sessions");
  console.log("http://localhost:8080/speakers");
  console.log("http://localhost:8080/schedule");
});
