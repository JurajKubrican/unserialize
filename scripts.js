var resultData = '';
function traverse(data, arrKey) {

  var type;
  if (data.constructor === Array) {
    type = 'Array';
  } else if (data.constructor === Object) {
    type = 'Object';
  }
  if (typeof (arrKey) === 'undefined') {
    arrKey = '';
  }

  if (type == 'Array' || type == 'Object') {
    resultData += '<tr><td>' + arrKey + '</td><td><table>\n<thead>\n<tr><td></td><td>' + type + '</td></tr>\n</thead>\n\ ';
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


function traversePHP(data, tabs) {
  var result = "";
  if (typeof (tabs) !== 'string') {
    tabs = '';
  }
  if (data.constructor === Array || data.constructor === Object) {
    result = tabs + ((data.constructor === Object) ? '(object) ' : '') + 'array(\n';

    tabs += '  ';
    var i = 0;
    for (var key in data) {
      i++;
      //console.log(tabs.length, i);
      if (!data.hasOwnProperty(key) || typeof (data[key]) === 'undefined')
        continue;
      var next = traversePHP(data[key], tabs);
      if (next) {
        result += tabs + '\'' + key + '\' => ' + traversePHP(data[key], tabs) + ',\n';
      }

    }
    tabs = tabs.substr(2);

    result += tabs + ')';
    return result;

  } else if (typeof (data) == 'string') {
    return '\'' + data.replace(/'/g, "\\'") + '\'';
  } else if (typeof (data) == 'number') {
    return  data;
  }
}

/*
 function parseVarDump( inputData ){
 var lines = inputData.split('\n');
 for(i in lines){
 if(lines[i].trim().match(/^string/)){
 
 }
 
 }
 
 resultData = lines
 return resultData;
 }*/


function doTheThing() {
  resultData = "";
  inputData = $('#source').val();
  var rawData = null;
  var dataType = 'ERROR';
  try {
    rawData = phpUnserialize(inputData)
    traverse(rawData);
    dataType = 'PHP Serialized';
  } catch (e) {

  }
  try {
    rawData = JSON.parse(inputData);
    traverse(rawData);
    dataType = 'JSON';
  } catch (e) {

  }


  if (dataType == 'ERROR') {
    rawData = inputData.split("\n");
    traverse(rawData);
  }

  $('#status').html(dataType);

  $('#result-data').html(resultData);

  $('#result-json').val(JSON.stringify(rawData));

  $('#result-php').val('$var = ' + traversePHP(rawData) + '; ');

}



$(document).ready(function () {
  doTheThing();
  $('#source').keyup(function () {
    doTheThing();
  })
})
