var Spotify = require('node-spotify-api');

var spotify = new Spotify({
  id: "7af40ed9e4b64b88a9455c936ca70009",
  secret: "06552a11a90c4b96b927bd694d0bbd8d",
});

exports.search = (query, resolve, reject) => {
  spotifyApi.searchTracks(query)
  .then( (data) => {
    resolve(data.body);
  }, (err) => {
    reject( err);
  });
}
