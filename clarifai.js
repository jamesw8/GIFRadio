const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.clarifai_api_key
});

const extract_tags = (frames) => {
  let tags = new Set();
  frames.forEach((frame) => {
    let concepts = frame.data.concepts;
    concepts.forEach((concept) => {
      tags.add(concept.name);
    });
  });
  return tags;
}

get_tags = (gif_url, resolve, reject) => {
  app.models.predict(Clarifai.GENERAL_MODEL, gif_url, {video: true}).then((response) => {
    let tags = extract_tags(response.outputs[0].data.frames);
    resolve(tags);
   });
 }

exports.get_all_tags = (gif_url_list, resolve, reject) => {

  let Promises = []

  JSON.parse(gif_url_list).forEach((gif_url) => {
    Promises.push(new Promise((resolve, reject) => {
      get_tags(gif_url, resolve, reject)
    }))
  });

  Promise.all(Promises).then((results) => {
    let all_tags = new Set();
    results.forEach((result) => {
      result.forEach((tag) => {
        all_tags.add(tag);
      })
    })
    resolve(all_tags);
  });

}
