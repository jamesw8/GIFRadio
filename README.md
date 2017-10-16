# GIFRadio

## Setup
This program requires API access to Clarifai, GIPHY, Spotify, and IBM Watson.
Environment variables should be set for the following:
* `clarifai_api_key`
* `spotify_client_id`
* `spotify_client_secret`
* `giphy_api_key`
* `watson_username`
* `watson_password`

1. Run `npm install` to download the requirements
2. Run `npm start` to start the Express server
3. Access the locally hosted web app through localhost on port 8000

## To Do
* Plug in translated results from Watson NLP to Spotify