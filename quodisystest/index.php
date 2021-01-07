<?php
session_start();
//require 'rwToken.php';
require_once("../config.php");
$token = $_GET['token'];

if(!isset($_GET['ca']) || !isset($_GET['cl'])) {
	echo "<h1>Unauthorised Access</h1>";
    die('end');
}
$ca = $_GET['ca'];
$_SESSION['ca'] = $ca;

$cl = $_GET['cl'];
$_SESSION['cl'] = $cl;

$p = $_GET['p'];
$_SESSION['po'] = $p;

function IsNullOrEmptyString($token) {
    return (!isset($token) || trim($token) === '');
}

/*if (trim(Token::readToken()) !== trim($token)) {
    //header('Location: http://qdsasia.com');
	echo "<h1>Unauthorised Access</h1>";
    die();
}*/

?>
<!DOCTYPE html>
<html lang="en" ng-app="QuodisysApp">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="google" value="">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Quodisys</title>
    <!-- Bootstrap -->
    <link href="asset/css/bootstrap.min.css" rel="stylesheet">
    <link href="asset/css/IQstyle.css" rel="stylesheet">
    <link href="asset/css/Attitudestyle.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">


    <style>
        .answer-format {
            font-weight: bold;
            text-align: left;
        }
    </style>

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
      <![endif]-->
</head>

<body>
    <header>
        <div class="contain-box">
            <div class="logo width-50">
                <a href="https://qdsasia.com"><img class="img-responsive" src="../images/qds-logo-header.png" style="width:200px; margin:auto;" alt=""></a>
            </div>
            <div id="previewImage" style="display: none;">
                <div class=" graph">
                    <img width="500px" id="MyImg"/>
                </div>
            </div>
        </div>
    </header>
	<?php
	if (IsNullOrEmptyString($token)) {
		//header('Location: http://qdsasia.com');
		echo "<h2>Unauthorised Access</h2>";
		die();
	}

	if($ca!="" && $cl!="") {
		$sql = "select keyword from clients where id = ".$cl;
		$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
		$row = mysqli_fetch_assoc($rs);
		if($row['keyword']!="") {
			$sql1 = "select token from ".$row['keyword']."_candidates where id = ".$ca;
			$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
			$row1 = mysqli_fetch_assoc($rs1);

			if ($row1['token'] != trim($token)) {
				echo "<h2>Unauthorised Access</h2>";
				die();
			}
		} else {
			echo "<h2>Unauthorised Access</h2>";
			die();
		}
	} else {
		echo "<h2>Unauthorised Access</h2>";
		die();
	}
	?>
    <div id="full" ng-view class="notranslate"></div>

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <script src="asset/js/bootstrap.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min.js" type="text/javascript"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/angular-ui-router/0.2.8/angular-ui-router.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-route.min.js"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-animate.js"></script>
    <script src="asset/js/html2canvas.js"></script>
    <script src="asset/js/app.js"></script>
    <script src="asset/js/factory.js"></script>
    <script src="asset/js/controller.js"></script>
    <!--<script src="/asset/js/DJS.js"></script>-->
    <script>
        var $token = '<?php echo $token ?>';
        history.pushState(null, null, location.href);
        window.onpopstate = function(event) {
            history.go(1);
        };

    </script>
</body>

</html>
