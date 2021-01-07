<?php
session_start();
require_once('./config.php');
$msg="";
$username="";
if(isset($_POST['hfsub']) && $_POST['hfsub']=="login") {
	$username = $_POST['username'];
	$password = $_POST['pwd'];

	$sql = "select * from authentication where name='".$username."'";
	$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	$count = mysqli_num_rows($result);
	$row = mysqli_fetch_array($result);

	$pwd = $row["auth"];
	$user = $row["name"];

	if($count==0 || !password_verify($password, $pwd)) {
		$msg = '<div class="error">Incorrect Login!</div>';
	} else {
		$_SESSION["user"]=$user;
		$_SESSION["usertype"]=0;
		echo "<script>location.href='dashboard.php'</script>";
	}
}

require_once("./header.php"); ?>

<form name="form1" class="form1 login" method="post" style="width: 40%; margin: auto;">
<input type="hidden" name="hfsub" value="login">
<p>Enter Username:</p>
<p><input type="text" name="username" id="username" value="<?=$username;?>"></p>
<p>Enter Password:</p>
<p><input type="password" name="pwd" id="pwd"></p>
<p><button id="login">Login</button></p>
<div id="res"><?=$msg;?></div>
</form>

<script>
jQuery(document).ready(function($) {
	$("#pwd, #username").keyup(function() { 
		$(this).css('border-color',''); 
		$("#result").slideUp();
	});

	$("#login").click(function(e) {
		e.preventDefault();
		var flag = true;

		var username = $('#username').val();
		if($.trim(username)=="") {
			$('#username').css('border-color','#f00');
			flag = false;
		} else {
			$('#username').css('border-color','');
		}

		var pwd = $('#pwd').val();
		if($.trim(pwd)=="") {
			$('#pwd').css('border-color','#f00');
			flag = false;
		} else {
			$('#pwd').css('border-color','');
		}

		if(flag) {
			$(".form1").submit();
		} else {
			output = '<div class="error">Please complete Missing Fields!</div>';
			$("#res").hide().html(output).slideDown();
			return false;
		}
	});
});
</script>

<?php require_once("./footer.php"); ?>