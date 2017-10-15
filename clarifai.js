const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: process.env.clarifai_api_key
});

exports.get_tags = (video_url) => {
  app.models.predict(Clarifai.GENERAL_MODEL, video_url, {video: true}).then(
    (response) => {
      callback(response)
    }
  );
}
