/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Spark = require('Spark.js');

// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
var getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};


var core_id = "55ff71065075555338581687";
var auth_token = "be564f2a4fd695c2c5c927e3a4c9e2777449547f";

var core = new Spark(core_id, auth_token);

var cb = function(err, res) {
  console.log('err', JSON.stringify(err));
  console.log('res', JSON.stringify(res));    
};

var card = new UI.Card({
  title: 'Spark'
});

card.show();

card.on('longClick', 'select', function() {
  core.call('timedPin', 'D7@0', cb);
});

card.on('click', 'select', function() {
  core.getValue("pinState", function(err, res) {
    card.body(res.result);
  });
});

card.on('click', 'down', function() {
  var p = getRandomInt(0, 8);
  card.body('toggling p#' + p);
  core.call('togglePin', "D" + p + "@0", cb);
});