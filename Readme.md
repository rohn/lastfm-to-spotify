# lastfm-to-spotify
Listen to what a last.fm user is listening to.

## Getting Started
_(I'm wondering this myself)_

Install the module with:
```
$ npm install lastfm-to-spotify
$ export LASTFM_KEY=<your LAST.FM API key>
$ export LASTFM_SECRET=<your LAST.FM SECRET>
$ export ECHONEST_KEY=<your ECHONEST API key>
$ export LASTFM_USER_WATCH=<Last.fm username to listen>
```

## Dependencies
Spotify for Mac must be installed.
You'll need to have an Echonest API Key and a Last.fm API and secret.

The following npm packages should auto-install along with this module, but if not:

```
npm install lastfmapi
npm install echojs
npm install spotify-node-applescript
```

## Documentation
If you have Spotify running, and no track is currently playing, then this app will attempt to discover what a
Last.fm user is currently listening to and play that in your Spotify player. This app will not try to start
playing a song if you are currently paused in the middle of a song... you must be at the very beginning of
any song and _paused_.

## Contributing
_(coming soon)_

## Release History
_(nothing yet)_

## License
Copyright (c) 2014 Rohn Blake
Licensed under the MIT license.
