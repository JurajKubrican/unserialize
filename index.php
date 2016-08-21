<?php
$obj = new stdClass();
$obj->data = array('janko', 'marienka');
$obj->meta = 'meta_stufff';
$obj->number = 4;
$obj->float = 4.9;


$data = $obj;
?>
<html>
    <head>
        <script src="jquery-2.2.4.min.js"/></script>      
    <script src="phpUnserialize.js"></script>
    <link href='bootstrap.min.css' rel='stylesheet' />
    <script type="text/javascript" src='bootstrap.min.js'></script>
</head>
<body>
    <div class="container">
        <div class="jumbotron">
            <div class="row">
                <div class="col-sm-12">
                    <h2>Paste serialized text below</h2>
                </div>
            </div>
            <div class="row">
                <div class="col-sm-12">
                    <textarea id="source" class="form-control" rows="10"><?= serialize($data) ?></textarea>
                </div>

            </div>
            <div class="row">
                <div class="col-sm-10">
                    <div id="result">
                        <table>
                            <td><tr id="result-data"></tr></td>  
                        </table>  
                    </div>
                </div>   
                <div class="col-sm-2">
                    <div  class="row" id="status"></div>  
                </div>
            </div>


        </div>
    </div>
</div>
</body>

<script>
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
</script>
<style>
    #result table{
        border:1px solid black;
        margin:1px;
    }
    #result table thead{
        background-color: #090;
    }
    #result td{
        border:1px dotted appworkspace;
        border-color: appworkspace;
    }


</style>
</html>

