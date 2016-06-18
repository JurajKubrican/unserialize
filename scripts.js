window.jQuery = window.$ =  require('jquery/dist/jquery-2.2.4.min.js');

require ('bootstrap/dist/js/bootstrap.min.js' );
require ('bootstrap/dist/css/bootstrap.css' );
require ('./include/phpUnserialize.js');

var resultData = '';
function traverse(data, arrKey) {

  var type;
  if (data.constructor === Array) {
    type = 'Array';
  } else if (data.constructor === Object) {
    type = 'Object';
  }
  if(typeof(arrKey)==='undefined'){
    arrKey = '';
  }

  if (type == 'Array' || type == 'Object') {
    resultData += '<tr><td>'+arrKey+'</td><td><table>\n<thead>\n<tr><td></td><td>' + type + '</td></tr>\n</thead>\n\ ';
    for (var key in data) {
      if (!data.hasOwnProperty(key))
        continue;
      traverse(data[key], key);
    }
    resultData += '</table></td></tr>';
  }
  if (typeof (data) == 'string' || typeof (data) == 'number') {
    var key = '';
    if (typeof (arrKey) !== 'undefined') {
      key = arrKey;
    }
    resultData += '<tr><td>' + key + '</td><td>' + data + '</td></tr>';
  }

}
function doTheThing() {
  resultData = "";
  inputData = source.val();
  var dataType = 'ERROR';
  try {
    traverse(phpUnserialize(inputData));
    dataType = 'PHP Serialized';
  } catch (e) {

  }
  try {
    traverse(JSON.parse(inputData));
    dataType = 'JSON';
  } catch (e) {

  }
  $('#status').html(dataType);

  $('#result-data').html(resultData);
}
var source = $('#source');
source.keyup(function () {
doTheThing();
})

$(document).ready(function () {
  doTheThing();
})
