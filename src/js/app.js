"use strict";

var threerest = require('threerest');
let path = require('path');

import * as ServiceConfs from "./services/serviceConfs";
import * as ServiceSearchConf from "./services/serviceSearchConf";
import * as ServiceSpeakers from "./services/serviceSpeakers";
import * as ServiceTracks from "./services/serviceTracks";
import * as ServiceRooms from "./services/serviceRooms";
import * as ServiceTest from "./services/serviceTest";

import express from "express";

var app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.static(path.join(__dirname + './')));
app.get("/", function(req, res){
  res.send("Les ressources disponibles sont /confs /speakers et /rooms");
});
app.get("/jarvis", function(req, res){
  //res.sendFile(path.join(__dirname, '../public', 'index1.html'));
 //res.sendFile(path.join(__dirname, '/speaktojarvis.html'));
  res.sendFile('/naoned-makers/ironman/im-eventapi/speaktojarvis.html', { root: __dirname });
});

// load the service Test
threerest.ServiceLoader.loadService(app, new ServiceConfs.default());
threerest.ServiceLoader.loadService(app, new ServiceSearchConf.default());
threerest.ServiceLoader.loadService(app, new ServiceSpeakers.default());
threerest.ServiceLoader.loadService(app, new ServiceTracks.default());
threerest.ServiceLoader.loadService(app, new ServiceRooms.default());
threerest.ServiceLoader.loadService(app, new ServiceTest.default());

app.listen(8080, () => {console.log("Express start...");});
