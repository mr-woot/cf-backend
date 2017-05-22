"use strict";

module.exports = app => {
    let trackService = app.server.services.service;

    function getTracks (req, res, next) {
        trackService.getTracks()
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(400).send(error));
    }

    function searchTracks (req, res, next) {
        trackService.searchTracks(req.query)
        .then((data) => res.status(200).send(data))
        .catch((error) => res.status(400).send(data));
    }

    return {
        getTracks,
        searchTracks
    };
};