const express = require('express');
const _ = require('lodash');
const bodyParser = require('body-parser');
let consign = require('consign');

let app = express();

consign()
  .include('./server/config')
  .then('./server/helpers')
  .then('./server/services')
  .then('./server/controllers')
  .into(app);

const {
  ObjectID
} = require('mongodb');

let bunyan = require("bunyan");
let logger = bunyan.createLogger({
  name: "cf-backend"
});

const mongoose = require('./db/db');
const {
  Track
} = require('./models/Track');

// autoIncrement.initialize(mongoose.connection);

// let idOfSearchQueries = 0;

const port = process.env.PORT;

app.use(bodyParser.json());

// POST /searchHistory
app.post('/searchHistory', (req, res) => {
  let trackInfo = new Track({
    query: req.body.query
  });
  trackInfo.save().then((doc) => {
    logger.info(`[SearchHistory] POST /searchHistory\ndata: ${JSON.stringify(doc, undefined, 2)}`);
    res.send({
      track: doc,
      status: 201,
      message: 'Successfully created'
    });
  }).catch((error) => {
    res.status(400).send({
      error,
      status: 400,
      message: 'Unable to post search query'
    });
  });
});


// GET /searchHistory
app.get('/searchHistory', (req, res) => {
  Track.find({}, '_id query savedAt').then((result) => {
    res.send({
      history: result,
      count: result.length,
      status: 200,
      message: (result.length === 0) ? 'No results in the database' : 'Successfully fetched search history'
    });
  }).catch((error) => {
    res.status(400).send({
      error,
      status: 400,
      message: 'Unable to fetch search history'
    });
  });
});

let trackController = app.server.controllers.controller;

// GET /tracks
app.get('/tracks', (req, res, next) => {
  trackController.getTracks(req, res, next);
});

// GET /searchTrack 
app.get('/searchTrack', (req, res, next) => {
  trackController.searchTracks(req, res, next);
});


// DELETE /searchHistory/:id
app.delete('/searchHistory/:id', (req, res) => {
  const id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send({
      status: 400,
      message: 'Invalid ID'
    });
  }

  Track.findByIdAndRemove(id).then((result) => {
    if (!result) {
      res.status(400).send({
        status: 400,
        message: 'Not Found'
      });
    } else {
      res.status(200).send({
        status: 200,
        message: 'Successfully deleted'
      });
    }
  }).catch((e) => {
    res.status(400).send({
      status: 400,
      message: e
    });
  });
});

app.listen(port, () => {
  console.log(`Started on port 3000`);
});

module.exports = {
  app
};
