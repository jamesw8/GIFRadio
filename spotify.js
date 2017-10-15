var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: process.env.spotify_client_id,
  secret: process.env.spotify_client_secret,
});

exports.search = (query, resolve, reject) => {
  spotifyApi.searchTracks(query)
  .then( (data) => {
    resolve(data.body);
  }, (err) => {
    reject( err);
  });
}
