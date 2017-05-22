"use strict";

module.exports = app => {
  const rp = app.server.helpers.requestWrapper;
  const errorFormatter = app.server.helpers.errorFormatter;

  function getTracks() {
    return new Promise((resolve, reject) => {
      const uri = `http://ws.audioscrobbler.com/2.0/?method=chart.gettoptracks&api_key=898e37b69e34d98919cd910c8e67e741&format=json`;
      console.log(`[getTracks] Making request to ${uri}`);
      rp.makeRequest({}, uri, {}, "GET")
        .then((data) => resolve(data.body))
        .catch((err) => reject(errorFormatter.createErrorObjectFromRequestError(err)));
    });
  }

  function searchTracks(queryParam) {
    return new Promise((resolve, reject) => {
      const uri = `http://ws.audioscrobbler.com/2.0/?method=track.search&api_key=898e37b69e34d98919cd910c8e67e741&format=json`
      console.log(`[searchTracks] Making request to ${uri}`);
      rp.makeRequest({}, uri, queryParam, "GET")
        .then((data) => resolve(data.body))
        .catch((err) => reject(errorFormatter.createErrorObjectFromRequestError(err)));
    });
  }

  return {
    getTracks,
    searchTracks
  };
};
