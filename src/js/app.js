"use strict";

var threerest = require('threerest');

import * as ServiceSessions from "./services/serviceSessions";
import * as ServiceSchedules from "./services/serviceSchedules";
import * as ServiceSearchConf from "./services/serviceSearchConf";
import * as ServiceSpeakers from "./services/serviceSpeakers";
import * as ServiceTracks from "./services/serviceTracks";
import * as ServiceRooms from "./services/serviceRooms";
import * as ServiceTest from "./services/serviceTest";

import express from "express";

var app = express();

app.get("/", function(req, res){
  res.send("Les ressources disponibles sont /sessions /speakers et /rooms");
});

// load the service Test
threerest.ServiceLoader.loadService(app, new ServiceSessions.default());
threerest.ServiceLoader.loadService(app, new ServiceSchedules.default());
threerest.ServiceLoader.loadService(app, new ServiceSearchConf.default());
threerest.ServiceLoader.loadService(app, new ServiceSpeakers.default());
threerest.ServiceLoader.loadService(app, new ServiceTracks.default());
threerest.ServiceLoader.loadService(app, new ServiceRooms.default());
threerest.ServiceLoader.loadService(app, new ServiceTest.default());

app.listen(8080, () => {console.log("Express start...");});
