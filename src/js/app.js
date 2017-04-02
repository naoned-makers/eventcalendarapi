"use strict";

var threerest = require('threerest');

import * as ServiceConfs from "./services/serviceConfs";
import * as ServiceSpeakers from "./services/serviceSpeakers";
import * as ServiceTracks from "./services/serviceTracks";
import * as ServiceRooms from "./services/serviceRooms";
import * as ServiceTest from "./services/serviceTest";

import express from "express";

var app = express();

app.get("/", function(req, res){
  res.send("Les ressources disponibles sont /confs /speakers et /rooms");
});

// load the service Test
threerest.ServiceLoader.loadService(app, new ServiceConfs.default());
threerest.ServiceLoader.loadService(app, new ServiceSpeakers.default());
threerest.ServiceLoader.loadService(app, new ServiceTracks.default());
threerest.ServiceLoader.loadService(app, new ServiceRooms.default());
threerest.ServiceLoader.loadService(app, new ServiceTest.default());

app.listen(8080, () => {console.log("Express start...");});
