/*
 * lastfm-to-spotify
 * https://github.com/rohn/lastfm-to-spotify
 *
 * Copyright (c) 2014 Rohn Blake
 * Licensed under the MIT license.
 */


var LastfmAPI = require('lastfmapi');
var echojs = require('echojs');
var spotify = require('spotify-node-applescript');

var _LASTFM_KEY = process.env.LASTFM_KEY
var _LASTFM_SECRET = process.env.LASTFM_SECRET
var _ECHONEST_KEY = process.env.ECHONEST_KEY
var _USER_WATCH = process.env.LASTFM_USER_WATCH

var echo = echojs({
  key: _ECHONEST_KEY
});

checkForNewSong();
setInterval(checkForNewSong, 5000);
return;


function checkForNewSong() {
  // get local spotify status... only continue if running
  spotify.isRunning(function(err, isRunning) {
    console.log('isRunning: ' + isRunning);
    if (!isRunning) {
      // LEAVE APP
      console.log('will leave app - Spotify not running');
      return;
    }
  });

  // get state of Spotify app... playing, paused, or waiting
  spotify.getState(function(err, state) {
    console.log('state: ' + state.state);
    console.log('position: ' + state.position);

    if (state.state == 'playing') {
      // LEAVE APP
      console.log('will leave app - already playing something');
      return;
    } else {
      if (state.position != 0) {
        // LEAVE APP
        console.log('will leave app - paused in the middle of a song');
        return;
      } else {
        // if we've fallen to here then we're waiting for a new song
        console.log('nothing playing?');
        getNewSong();
      }
    }
  });
}


function getNewSong() {
  console.log('  ---');
  console.log('  getting new song');
  // get last.fm data
  var lfm = new LastfmAPI({
    'api_key': _LASTFM_KEY,
    'secret' : _LASTFM_SECRET
  });

  lfm.user.getRecentTracks({
    'user' : 'rohnb',
    'limit': 2
  }, function(err, recentTracks) {
    if (err) {throw err;}
    // console.log('=================');
    track = recentTracks.track[0];
    if (track.hasOwnProperty('@attr') && track['@attr'].hasOwnProperty('nowplaying') && track['@attr'].nowplaying == 'true') {
      theArtist = track.artist;
      console.log(theArtist['#text']);
      console.log(track.name);

      // something is playing, let's go to echonest and get the spotify data
      echo('song/search').get({
        artist: theArtist['#text'],
        title: track.name,
        bucket: 'id:spotify'
      }, function(err, json) {
        spotifyTrack = json.response.songs[0].artist_foreign_ids[0].foreign_id;
        console.log(spotifyTrack);

        // this is should play the track
        spotify.playTrack(spotifyTrack, function() {
          // track is playing
          console.log('should be playing');
        });

      });

    } else {
      console.log('nothing playing');
    }

  });
}
