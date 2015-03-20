/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Spark = require('Spark.js');

var core_id = "55ff71065075555338581687";
var auth_token = "be564f2a4fd695c2c5c927e3a4c9e2777449547f";

var core = new Spark(core_id, auth_token);

var card = new UI.Card({
  title: 'Spark'
});

card.show();

card.on('click', 'select', function() {
  core.call('timedPin', 'D7@0', function(err, res) {
    console.log('err', JSON.stringify(err));
    console.log('res', JSON.stringify(res));
  });
});

card.on('click', 'up', function() {
  core.getValue("pinState", function(err, res) {
    console.log('err', JSON.stringify(err));
    console.log('res', JSON.stringify(res));    
  });
});