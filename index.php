<?php
session_start();
require_once('./config.php');
$msg="";
$email="";
if(isset($_POST['hfsub']) && $_POST['hfsub']=="login") {
	$email = $_POST['email'];
	$password = $_POST['password'];

	$sql = "select * from clients where email='".$email."'";
	$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	$count = mysqli_num_rows($result);
	$row = mysqli_fetch_array($result);

	$pwd = $row["auth"];
	$user = $row["email"];
	$userid = $row["id"];
	$keyword = $row["keyword"];
	$company = $row["company"];
	$website = $row["website"];
	$logo = $row["logo"];

	if($count==0 || !password_verify($password, $pwd)) {
		$msg = '<div class="error">Incorrect Login!</div>';
	} else {
		$_SESSION["user"]=$user;
		$_SESSION["userid"]=$userid;
		$_SESSION["usertype"]=1;
		$_SESSION["keyword"]=$keyword;
		$_SESSION["company"]=$company;
		$_SESSION["website"]=$website;
		$_SESSION["logo"]=$logo;

		$_SESSION["fromname"]=$row["fromname"];
		$_SESSION["fromemail"]=$row["fromemail"];
		$_SESSION["toemail"]=$row["toemail"];
		echo "<script>location.href='dashboard.php'</script>";
	}
}

require_once("./header.php"); ?>

<form name="form1" class="form1 login" method="post" style="width: 40%; margin: auto;">
<input type="hidden" name="hfsub" value="login">
<p>Enter Email:</p>
<p><input type="text" name="email" id="email" value="<?=$email;?>"></p>
<p>Enter Password:</p>
<p><input type="password" name="password" id="password"></p>
<p><button id="login">Login</button></p>
<div id="res"><?=$msg;?></div>
</form>

<script>
jQuery(document).ready(function($) {
	$("#password, #email").keyup(function() { 
		$(this).css('border-color',''); 
		$("#result").slideUp();
	});

	$("#login").click(function(e) {
		e.preventDefault();
		var flag = true;

		var email = $('#email').val();
		if($.trim(email)=="") {
			$('#email').css('border-color','#f00');
			flag = false;
		} else {
			$('#email').css('border-color','');
		}

		var password = $('#password').val();
		if($.trim(password)=="") {
			$('#password').css('border-color','#f00');
			flag = false;
		} else {
			$('#password').css('border-color','');
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