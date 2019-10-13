const Client = require("castv2-client").Client
const DefaultMediaReceiver = require("castv2-client").DefaultMediaReceiver

var content = 'http://commondatastorage.googleapis.com/gtv-videos-bucket/big_buck_bunny_1080p.mp4';
var host='192.168.1.4'

var client = new Client();
// connect to Chromecast
client.connect(host, function() {
  console.log('connected! Launching DefaultMediaReceiver ...');
  // launch Default Media Receiver app
  client.launch(DefaultMediaReceiver, function(err, player) {
    if(err) {console.log(err);return;}
    console.log('app "%s" launched, loading media %s ...', player.session.displayName, content);

    player.on('status', function(status) {
      console.log('status broadcast playerState=%s', status.playerState);
    });

    // play a video
    player.load({contentId: content}, { autoplay: true }, function(err, status) {
      console.log('media loaded playerState=%s', status.playerState);

    });
  });
});
client.on('error', function(err) {
  console.log('Error: %s', err.message);
  client.close();
});
