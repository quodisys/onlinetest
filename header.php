<html>
<head>
<title>QDS - Online Test Portal</title>
<link href="font-awesome/css/font-awesome.min.css" rel="stylesheet">
<link href="css/styles.css?r=<?=rand();?>" rel="stylesheet">

<script src="https://code.jquery.com/jquery-1.12.4.js"></script>
<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
</head>
<body>
<div style="text-align:center;">
	<?php if(isset($_SESSION["logo"]) && $_SESSION["logo"]!="") { ?>
	<img src="<?=$_SESSION["logo"];?>" width="200">
	<?php } else { ?>
	<img src="images/qds-logo-header.png" width="200">
	<?php } ?>
</div>