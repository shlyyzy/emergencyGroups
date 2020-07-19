# emergenseaTeams ⛵️

A simple webapp for ensuring the collective safety of your group, whether you're at a large event or you're walking alone late at night.


## How to use it
Give your group a name, a main meetup location, and invite your friends!
<br>
<img src="https://github.com/shlyyzy/emergencyGroups/blob/master/screenshots/welcome.png" width="250">
<img src="https://github.com/shlyyzy/emergencyGroups/blob/master/screenshots/share.png" width="250">
<img src="https://github.com/shlyyzy/emergencyGroups/blob/master/screenshots/give-name.png" width="250">


Chat with your group!
<br>
<img src="https://github.com/shlyyzy/emergencyGroups/blob/master/screenshots/alone.png" width="250">
<img src="https://github.com/shlyyzy/emergencyGroups/blob/master/screenshots/one-user.png" width="250">
<img src="https://github.com/shlyyzy/emergencyGroups/blob/master/screenshots/other-user.png" width="250">


Use the map to find suggested safe spots, marked in green. You can also mark your own favorite locations with the pin button, or find your bearings with the crosshair button!
<br>
<img src="https://github.com/shlyyzy/emergencyGroups/blob/master/screenshots/search.png" width="250">
<img src="https://github.com/shlyyzy/emergencyGroups/blob/master/screenshots/add-pin.png" width="250">
<img src="https://github.com/shlyyzy/emergencyGroups/blob/master/screenshots/current-loc.png" width="250">


Features under construction:
- send your current location in an emergency situation (the HALP button)
- send a meetup location
- securing the chat


## Try it on your device
  1. Clone this repo.
  2. Get API keys for Mapbox and Radar.io (needed in react-ui/src/components/Map/Map.js).
  3. Run `npm install` in the emergencyGroups and react-ui folders.
  4. Start the server with `npm start` in emergencyGroups.
  5. In another termnial, `cd react-ui` and `npm start`.
  6. Use to your heart's content!
  

## Made with...
- heroku-cra-node
- React
- Node.js
- Socket.io
- Mapbox
- Radar.io
- and lots of pixel pushing
