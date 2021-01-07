<?php
require_once("../login.php");
require_once("../config.php");
require 'sendmail.php';
//require 'csvmanager.php';
//require 'rwToken.php';

//$token = Token::readToken();

$post = $_POST['user'];
$new_password = $_POST['new_password'];

$id = $post;
$sql = "select * from ".$_SESSION["keyword"]."_candidates where id = ".$id;
$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
$row = mysqli_fetch_assoc($rs);

$user_email = $row['email'];
$token = $row['token'];

$actual_link = 'https://'. $_SERVER['HTTP_HOST'] .'/'. 'quodisystest/?token='.$token.'&ca='.$id.'&cl='.$_SESSION["userid"];

$company = $_SESSION["company"];
$img_url = $_SESSION["logo"];
$img_logo = $_SESSION["logo"];
$display = 'opacity:1;';
$link = $_SESSION["website"];

$content = '
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0;">
	<meta name="format-detection" content="telephone=no"/>
	<style>
	/* Reset styles */
	body { margin: 0; padding: 0; min-width: 100%; width: 100% !important; height: 100% !important;}
	body, table, td, div, p, a { -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; }
	table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; border-collapse: collapse !important; border-spacing: 0; }
	img { border: 0; line-height: 100%; outline: none; text-decoration: none; -ms-interpolation-mode: bicubic; }
	#outlook a { padding: 0; }
	.ReadMsgBody { width: 100%; } .ExternalClass { width: 100%; }
	.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div { line-height: 100%; }
	p {margin-top: 0;margin-bottom: 10px;line-height: 30px;}
	ul {margin: 0;}
	/* Rounded corners for advanced mail clients only */
	@media all and (min-width: 560px) {
		.container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px;}
	}
	/* Set color for auto links (addresses, dates, etc.) */
	a, a:hover {color: #127DB3;}
	.footer a, .footer a:hover {color: #999999;}
	</style>
	<!-- MESSAGE SUBJECT -->
	<title>Get this responsive email template</title>
</head>
<!-- BODY -->
<!-- Set message background color (twice) and text color (twice) -->
<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%;background-color: #F0F0F0;color: #000000;"bgcolor="#F0F0F0"text="#000000">

<!-- SECTION / BACKGROUND -->
<!-- Set message background color one again -->
<table width="100%" align="center" border="0" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%;" class="background"><tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0;" bgcolor="#F0F0F0">
<!-- WRAPPER / CONTEINER -->
<!-- Set conteiner background color -->
<table border="0" cellpadding="0" cellspacing="0" align="center" bgcolor="#FFFFFF" width="560" style="border-collapse: collapse; border-spacing: 0; padding: 0; width: inherit; max-width: 855px; margin-bottom: 100px;" class="container">
	<!-- HEADER -->
	<!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
	<tr><td align="center" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; text-align: left; padding-left: 35px;" class="header"><img src="'.$img_logo.'" alt="company logo" style="width: 79px;"></td></tr>
	<!-- SUBHEADER -->
	<!-- Set text color and font family ("sans-serif" or "Georgia, serif") -->
	<tr><td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 10%; padding-right: 6.25%; width: 87.5%; font-size: 20px; font-weight: 600; line-height: 150%; padding-top: 18px; color: #4a4a4a; font-family: sans-serif; font-weight: bold;" class="subheader">'.$company.' - Preliminary Tests</td></tr>
	<tr><td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 10%; padding-right: 3.25%; width: 87.5%; font-size: 16px; font-weight: 400; line-height: 160%; padding-top: 10px; color: #4a4a4a; font-family: sans-serif;" class="paragraph">
		<p>Dear '.$row["firstname"].' '.$row["lastname"].',</p>
		<p style="padding-right:30px;">On behalf of '.$company.', we would like to thank you for your recent application for employment to our firm.</p>
		<p>Our interview process starts with Preliminary Tests which include an IQ and 3 personality tests. Please complete the tests in one session since the link below can only be used once.</p>
		<p>- Link: <a href="'.$actual_link.'" target="_blank">'.$actual_link.'</a></p>
		<p>- User: '.$user_email.'</p>
		<p>- Password: '.$new_password.'</p>
		<p style="text-decoration: underline;">Essential Notes:</p>
		<ol style="padding-left: 22px;">
			<li>The IQ test has a time limit of 45 mins for 30 questions. We have a minimum score requirement for the IQ test so make sure you&#39;ve checked your answers carefully before you submit.</li>
			<li>You are required to complete all the tests to qualify for evaluation. If one of the tests is incomplete or missing, your application will be rejected.</li>
			<li>The link will be expired in 48 hours.</li>
			<li>Username/Password is valid for only one sign on.</li>
		</ol>
		<p>Don&#39;t hesitate to contact us for more information.</p>
		<p>Best regards,</p>
		<p style="font-weight: 600;">HR Department</p>
		<img style="width: 210px" src="'.$img_url.'" alt="">
	</td></tr>
	<tr><td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 35px; padding-right: 6.25%; padding-bottom: 25px;" class="list-item">
		<table align="center" border="0" cellspacing="0" cellpadding="0" style="margin: 0; border-top: 1px solid #979797; margin-top: 20px;">
		<tr><td>
			<ul style="display: flex; padding-left: 0; list-style: none; "><li style="margin-top:16px;"><a style="color: #4a4a4a; font-size: 20px;" href="'.$link.'">'.$link.'</a></li></ul>
		</td></tr>
		</table>
	</td></tr>
	<tr style="'.$display.'">
		<td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 35px; padding-right: 3.25%; width: 87.5%; font-size: 16px; font-weight: 400; line-height: 160%; color: #4a4a4a; font-family: sans-serif;" class="paragraph">
			<p>3rd FL, 81 Cach Mang Thang 8, Ben Thanh , D1, HCMC, VN</p>
			<p>Tel: +84 28 39251030</p>
		</td>
	</tr>
<!-- End of WRAPPER -->
</table>

<!-- End of SECTION / BACKGROUND -->
</td></tr></table>
</body>
</html>';

Sendmail::send($user_email, $company." - IQ test", $content, false);
//Csvmanager::resetiqtest($id, $user_email, $new_password);
$sql = "update ".$_SESSION["keyword"]."_candidates set password='$new_password', testsent='iqqds' where id = ".$id;
$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));

$sql = "insert into ".$_SESSION["keyword"]."_candidates_history (candidate, client, status, createddate) values(".$id.", ".$_SESSION['userid'].", 'IQ Test Sent', '".date('Y-m-d H:i:s')."')";
$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));

echo 'end_resetiqtest';
?>
