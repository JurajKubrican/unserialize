<?php /*
if (empty($_SERVER['HTTPS'])) {
    header("HTTP/1.1 301 Moved Permanently");
    header("Location: https://tools.knet.sk");
    exit;
}


$obj = new stdClass();
$obj->data = array('janko', 'marienka');
$obj->meta = 'meta_stufff';
$obj->number = 4;
$obj->float = 4.9;

$data = $obj;
*/
?>
<html>
    <head>
    <script src="jquery-2.2.4.min.js"/></script>
    <script src="scripts.js"/></script>
    <link href='style.css' rel='stylesheet' />
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
                    <textarea id="source" class="form-control" rows="10">{"data":["janko","marienka"],"meta":"meta_stufff","number":4,"float":4.9}</textarea>
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
            <div class="row">
                <div class="col-sm-3">
                    <textarea id="result-php" class="form-control" rows="10"></textarea>
                </div>
                <div class="col-sm-3">
                    <textarea id="result-js" class="form-control" rows="10"></textarea>
                </div>
                <div class="col-sm-3">
                    <textarea id="result-json" class="form-control" rows="10"></textarea>
                </div>
            </div>

        </div>
    </div>
</div>
</body>
</html>
