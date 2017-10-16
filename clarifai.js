const Clarifai = require('clarifai');
const watson = require('./watson');

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

get_top_list = (list, num) => {
 let freq_list = {}
 list.forEach((item) => {
   if (freq_list.hasOwnProperty(item)) {
     freq_list[item] = freq_list[item] + 1;
   } else {
     freq_list[item] = 1;
   }
 });

 let sorted = [];
 for (let item in freq_list) {
   sorted.push([item, freq_list[item]]);
 };
 sorted.sort( (a, b) => {
   return b[1] - a[1];
 });

 let top_tags = "";
 let retval = [];
 for (let i=0; i < num-2; i++){
   retval.push(sorted[i]);
   top_tags = top_tags + sorted[i][0] + " ";
 }


 let emotions = {
   sadness: 0,
   joy: 0,
   fear: 0,
   disgust: 0,
   anger: 0
 }

 new Promise((resolve, reject) => {
 	 watson.retrieveEmotions(top_tags, resolve, reject);
 }).then((json) => {
 	 return (json);
 }).then((jsonWords) => {
   //console.log("\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nasdfdghggfdsfgh");
 	 //console.log(jsonWords['emotion']['targets']);
 });


 return retval;
}

exports.get_all_tags = (gif_url_list, resolve, reject) => {

  let Promises = []
  gif_url_list.forEach((gif_url) => {
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
