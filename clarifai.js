const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: "b4a79c19a8ec4369a485cb12bbecf4f3"
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

 let retval = []
 for (let i=0; i<num; i++){
   retval.push(sorted[i])
 }
 return retval;
}

exports.get_all_tags = (gif_url_list, resolve, reject) => {

  let Promises = []
  JSON.parse(gif_url_list).forEach((gif_url) => {
    Promises.push(new Promise((resolve, reject) => {
      get_tags(gif_url, resolve, reject)
    }))
  });

  Promise.all(Promises).then((results) => {
    let all_tags = [];
    results.forEach((result) => {
      result.forEach((tag) => {
        all_tags.push(tag);
      })
    })

    resolve(get_top_list(all_tags, 20));
  });

}
