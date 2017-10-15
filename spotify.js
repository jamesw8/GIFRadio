var SpotifyWebApi = require('spotify-web-api-node');

var spotifyApi = new SpotifyWebApi({
  clientId: process.env.spotify_client_id,
  clientSecret: process.env.spotify_client_secret,
});

spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
        console.log('Something went wrong when retrieving an access token', err);
  });

get_top_list = (list, num) => {
  let freq_list = {}
  list.forEach((item) => {
    if (freq_list.hasOwnProperty(item)) {
      freq_list[item] = freq_list[item] + 1;
    } else {
      freq_list[item] = 1;
    }
  })

  let sorted = [];
  for (let item in freq_list) {
    sorted.push([item, freq_list[item]]);
  }
  sorted.sort( (a, b) => {
    return b[1] - a[1];
  });

  //console.log(sorted)

  let retval = []
  for (let i=0; i<num; i++){
    retval.push(sorted[i][0])
  }
  return retval;
}

exports.search = (queries, frequencies, resolve, reject) => {
  let Promises = []
  queries.forEach( (query, index) => {
    Promises.push(new Promise((query_resolve, query_reject) => {
      spotifyApi.searchTracks(query)
      .then(function(data) {
        let tracks = []
        data.body.tracks.items.forEach((entry) => {
          tracks.push(entry.name + ", by " + entry.artists[0].name)
        });
        query_resolve(tracks);
      }, function(err) {
        console.error(err);
      });
    }));
  })

  Promise.all(Promises).then(function(results){
    let all_tracks = [];
    results.forEach((result) => {
      result.forEach((track) => {
        all_tracks.push(track);
      })
    })
    resolve(get_top_list(all_tracks, 20));
  });
  /*
  // Single, combined query version
  console.log(queries)

  let query = queries[0][0]
  for(let i=1; i<queries.length; i++){
    query = query + "%20" + queries[i][0];
  }
  console.log(query)

  spotifyApi.searchTracks(query)
  .then(function(data) {
    let tracks = []
    data.body.tracks.items.forEach((entry) => {
      tracks.push(entry.id)
    });
    resolve(tracks);
  }, function(err) {
    console.error(err);
  });
  */
}

exports.createPlaylist = (songIds) => {
  trackId = []
  songIds.forEach((Id) => {
    trackId.push("spotify:track:"+Id)
  })
  spotifyApi.createPlaylist('12151562864', 'My Generated Playlist', { 'public' : false })
  .then(function(data) {
    //console.log(data);
  }, function(err) {
    console.log('Something went wrong!', err);
  });
}
