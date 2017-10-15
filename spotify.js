var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.spotify_client_id,
  clientSecret: process.env.spotify_client_secret,
});

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
  });

exports.search = (queries, resolve, reject) => {
  let Promises = []
  queries.forEach((query) => {
    Promises.push(new Promise((query_resolve, query_reject) => {
      spotifyApi.searchTracks(query)
      .then(function(data) {
        let tracks = []
        data.body.tracks.items.forEach((entry) => {
          tracks.push(entry.id)
        });
        query_resolve(tracks);
      }, function(err) {
        console.error(err);
      });
    }))
  })

  Promise.all(Promises).then(function(results){
    let all_tracks = new Set();
    results.forEach((result) => {
      result.forEach((track) => {
        all_tracks.add(track);
      })
    })
    resolve(all_tracks);
  });
}

exports.createPlaylist = (songIds) => {
  trackId = []
  songIds.forEach((Id) => {
    trackId.push("spotify:track:"+Id)
  })
  spotifyApi.createPlaylist('12151562864', 'My Generated Playlist', { 'public' : false })
  .then(function(data) {
    console.log(data);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}

exports
