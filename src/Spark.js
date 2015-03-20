var ajax = require('ajax');

var Spark = function(core_id, auth_token) {
  this.core_id = core_id;
  this.auth_token = auth_token;
};

Spark.prototype.createFunctionRequest = function(method, args) {
  var opt = this.createVariableRequest(method);
  opt.data = { args: args };
  opt.method = "POST";
  return opt;
};

Spark.prototype.createVariableRequest = function(variable) {
  var URL = "https://api.spark.io/v1/devices/" + this.core_id + "/" + variable;
  return {
    url: URL,
    type: 'json',
    headers: { 
      'Authorization': 'Bearer ' + this.auth_token
    }
  };
};

Spark.prototype.call = function(method, args, callback) {
  var opt = this.createFunctionRequest(method, args);
  console.log("call: ", JSON.stringify(opt));
  this.internal_call(opt, callback);
};

Spark.prototype.getValue = function(variable, callback) {
  var opt = this.createVariableRequest(variable);
  this.internal_call(opt, callback);
};

Spark.prototype.internal_call = function(request, callback) {
  ajax(request,
       //success
    function(data) {
      console.log('ajax success');
      callback(null, data);
    },   
       //fail  
    function(data) {
      console.log('ajax failure:', JSON.stringify(data));
      callback(data, null);
    });
};

this.exports = Spark;
