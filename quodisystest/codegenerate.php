<?php
	require_once("../login.php");
	require_once("../config.php");
	//require 'rwToken.php';
	require 'sendmail.php';
	//require 'csvmanager.php';

	if ($_SERVER['REQUEST_METHOD'] === 'POST') {

		// POST data
		$token = trim($_POST['token']);
		$pPassword = trim($_POST['password']);
		$pFName = trim($_POST['fname']);
		$pLName = trim($_POST['lname']);
		$pEmail = trim($_POST['email']);
		$pPositionalt = trim($_POST['positionalt']);

		/*if($token) {
			Token::writeToken($token);
		} else {
			$token = Token::readToken();
		}*/

		$actual_link = 'https://'. $_SERVER['HTTP_HOST'] .'/'. 'quodisystest/?token=' . $token;

		if ( !$pEmail && !$pPassword && !$pFName && !$pLName ) {
			Sendmail::send(HR_EMAIL, "Link test",'<a href="'.$actual_link.'" target="_blank">'.$actual_link.'</a>',false);
		}
		else if ($pEmail && $pPassword && $pFName && $pLName) {

			//Csvmanager::create($pEmail, $pPassword, $pName, $_POST['checkbox-company']);
			$sql = "select * from ".$_SESSION["keyword"]."_candidates where email='$pEmail'";
			$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn)." - 1");
			$count = mysqli_num_rows($rs);
			if($count!=0) {
				echo "<script>alert('Candidate Email already exists!');history.go(-1);</script>";
				exit();
			}

			$company = $_SESSION["company"];
			$img_url = $_SESSION["logo"];
			$img_logo = $_SESSION["logo"];
			$display = 'opacity:1;';
			$link = $_SESSION["website"];

			$sql = "insert into ".$_SESSION["keyword"]."_candidates (email, password, firstname, lastname, company, testsent, positionalt, createddate, token) values('$pEmail', '$pPassword', '$pFName', '$pLName', '$company', 'iqqds', '$pPositionalt', '".date('Y-m-d H:i:s')."', '$token')";
			$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn)." - 2<br>".$sql);
			$candidate_id = mysqli_insert_id($conn);

			if($candidate_id!=0) {
				$sql = "insert into ".$_SESSION["keyword"]."_candidates_history (candidate, client, status, createddate) values(".$candidate_id.", ".$_SESSION['userid'].", 'New Candidate Created', '".date('Y-m-d H:i:s')."')";
				$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn)." - 3");

				$sql = "insert into ".$_SESSION["keyword"]."_candidates_history (candidate, client, status, createddate) values(".$candidate_id.", ".$_SESSION['userid'].", 'IQ Test Sent', '".date('Y-m-d H:i:s')."')";
				$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn)." - 3");
			}

			$actual_link .= '&ca='.$candidate_id.'&cl='.$_SESSION["userid"];

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
				p {margin-top: 0; margin-bottom: 10px; line-height: 30px;}
				ul {margin: 0;}
				/* Rounded corners for advanced mail clients only */
				@media all and (min-width: 560px) {
					.container { border-radius: 8px; -webkit-border-radius: 8px; -moz-border-radius: 8px; -khtml-border-radius: 8px;}
				}

				/* Set color for auto links (addresses, dates, etc.) */
				a, a:hover {color: #127DB3;}
				.footer a, .footer a:hover {color: #999999;}
			 	</style>
				<title>Get this responsive email template</title>

			</head>
			<!-- BODY -->
			<!-- Set message background color (twice) and text color (twice) -->
			<body topmargin="0" rightmargin="0" bottommargin="0" leftmargin="0" marginwidth="0" marginheight="0" width="100%" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; width: 100%; height: 100%; -webkit-font-smoothing: antialiased; text-size-adjust: 100%; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 100%; background-color: #F0F0F0; color: #000000;" bgcolor="#F0F0F0" text="#000000">

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
				<tr><td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-bottom: 3px; padding-left: 10%; padding-right: 6.25%; width: 87.5%; font-size: 20px; font-weight: 600; line-height: 150%; padding-top: 18px; color: #4a4a4a; font-weight: bold;" class="subheader">'.$company.' - Preliminary Tests</td></tr>
				<tr><td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 10%; padding-right: 3.25%; width: 87.5%; font-size: 16px; font-weight: 400; line-height: 160%; padding-top: 10px; color: #4a4a4a;" class="paragraph">
					<p>Dear '.$pFName.' '.$pLName.',</p>
					<p style="padding-right:30px;">On behalf of '.$company.', we would like to thank you for your recent application for employment to our firm.</p>
					<p>Our interview process starts with Preliminary Tests which include an IQ and 3 personality tests. Please complete the tests in one session since the link below can only be used once.</p>
					<p>- Link: <a href="'.$actual_link.'" target="_blank">'.$actual_link.'</a></p>
					<p>- User: '.$pEmail.'</p>
					<p>- Password: '.$pPassword.'</p>
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
						<ul style="display: flex; padding-left: 0; list-style: none; ">
							<li style="margin-top:16px;"><a style="color: #4a4a4a; font-size: 20px;" href="'.$link.'">'.$link.'</a></li>
						</ul>
					</td></tr>
					</table>
				</td></tr>
				<tr style="'.$display.'">
					<td align="left" valign="top" style="border-collapse: collapse; border-spacing: 0; margin: 0; padding: 0; padding-left: 35px; padding-right: 3.25%; width: 87.5%; font-size: 16px; font-weight: 400; line-height: 160%;color: #4a4a4a;" class="paragraph">
						<p>3rd FL, 81 Cach Mang Thang 8, Ben Thanh , D1, HCMC, VN</p>
						<p>Tel: +84 28 39251030</p>
					</td>
				</tr>
			<!-- End of WRAPPER -->
			</table>

			<!-- End of SECTION / BACKGROUND -->
			</td></tr></table>
			</body>
			</html>
			';
			Sendmail::send($pEmail, "$company - Preliminary Tests", $content, false);
		}
		//header('Location: candidates.php');
		echo '<script>alert("Email Sent!");</script>';
	}
?>
<!DOCTYPE html>
<html lang="en" ng-app="QuodisysApp">
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
		<title>QDS Asia</title>
		<!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
		<!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
		<!--[if lt IE 9]>
		<script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
		<script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
		<![endif]-->
		<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
		<style>
			@charset "utf-8";
			* {padding: 0;margin: 0;font-family: Roboto, sans-serif;}
			.logo{margin: 25px 0;text-align: center;}
			.logo img {}
			#full{width:100%;margin:auto;}
			#gennerate {/* width: 50%; */ text-align: left; /*margin: 0 65px;*/ margin-bottom: 20px;}
			h3 {/*color: #47B383;*/ font-size: 24px;font-weight: bold;margin-bottom: 20px;}
			table.userlist {border-collapse: collapse;width: 100%;margin-top: 30px;table-layout: fixed;position: relative;}
			table.userlist tbody {max-height: 400px;min-height: 400px;display: block;overflow-y: auto;width: 100%;position: absolute;}
			table.userlist tbody tr {width: 100%;display: block;}
			table.userlist th {text-align: left;/*color: #2CB383;*/font-size: 14px;padding: 7px 0;border-bottom: 1px solid #979797;font-weight: bold;}
			table.userlist td {padding: 7px 0;text-align: left;font-size: 14px;cursor: pointer;display: inline-block;}
			.form-control {height: 25px;border:1px solid rgba(0,0,0,0.2);padding: 0 6px;font-size: 14px;border-radius: 4px;}
			.form-control + .form-control {margin-left: 10px;}
			input + button {margin-left: 10px;}
			#code{width: 370px;}
			.button {display: inline-block;text-decoration: none;height: 25px;background-color:#D6BA69;color:white;border:1px solid #D6BA69;font-size: 14px;border-radius: 4px;padding-left: 20px;padding-right: 20px;cursor: pointer;}
			.button + .button {margin-left: 10px;}
			.btn-second {background-color: #ABABAB;border:1px solid #ABABAB;cursor: pointer;}
			*{box-sizing: border-box;}
			#status{margin:15px;}
			#passwordsetting {/* width: 80%; */text-align: left;/*margin: auto 65px;*/}
			.checkbox-mask {position: relative;margin-bottom: 20px;padding-left: 30px;height: 22px;line-height: 22px;display: inline-block;margin-right: 25px;cursor: pointer;}
			.checkbox-mask::before {content: "";width: 20px;height: 20px;font-size: 20px;position: absolute;border-width: 1px;border-style: solid;border: 1px solid #6D6E70;border-image: initial;border-radius: 50%;left: 0;top: -1px;}
			.checkbox-mask:after {content: '';border-radius: 50%;opacity: 0;position: absolute;left: 1px;top: 0px;font-size: 14px;font-weight: 300;color: #F16527;line-height: 20px;background-repeat: no-repeat;overflow: hidden;width: 20px;height: 20px;background: #D6BA69;}
			.button.submit {height: 26px;margin-top: 20px;font-size: 14px;margin-bottom: 20px;cursor: pointer;}
			input:checked + .checkbox-mask::after {opacity: 1;}
			input[type=radio] {position: absolute;top: -9999px;left: -9999px;}
			.alert {text-align: left;margin-bottom: 20px;color: #f00;}
			.alert-danger {color: #f00;}
			.alert-success {color: #f00;}
			#search-mct {position: relative;width: 27%;padding: 8.5px 6px;height: 25px;border: 1px solid #CCCCCC;border-radius: 4px;background-color: #FFFFFF;background-image: url('/images/search.svg');background-repeat: no-repeat;background-position: center right;background-origin: content-box;}
			#search-mct::placeholder {font-size: 14px;letter-spacing: -0.03px;line-height: 17px;color: #B0B0B0;}
			#passwordsetting .form-control {width: 240px;}
			hr {margin-bottom: 20px;}
			/* Xuong Expand Table */
			.expand table {background-color: #F1F1F1;width: 100%;}
			.expand table tbody {position: relative;min-height: auto;}
			.expand table tr td {padding: 7px;}
			.expand table tr td:first-child,
			.expand table tr td:nth-child(3),
			.expand table tr td:nth-child(5){width: 135px;font-weight: bold;}
			.expand table tr td:first-child.title {color: #D6BA69;}
			.expand table tr td:nth-child(2),
			.expand table tr td:nth-child(4) {min-width: 200px;}
			.submit-contain {display: flex;align-items: center;}
			.submit-contain input {margin-right: 15px;}
			.submit-contain p {font-size: 14px;color: #417505;}
			.submit-contain p.alert {margin-bottom: 0; margin-left: 10px; color: #f00;}
		</style>

		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
		<script>
			testAPI();

			// Here we run a very simple test of the Graph API after login is
			// successful.  See statusChangeCallback() for when this call is made.
			function testAPI() {
				console.log('Welcome!  Fetching your information.... ');
				jQuery.ajax({
					url:'generatehtml.php',
					complete: function (response) {
						document.getElementById('includehtml').innerHTML =response.responseText;
						// Xuong: Collapse table
						$("table tr.expand td").find("div").hide();
						$("table .click-expand").click(function(event) {
							event.stopPropagation();
							var $target = $(event.target);
							$target.closest("tr").next().find("div").slideToggle();
						});
					}
				});
			}
		</script>
	</head>
	<body>
		<div id="full">
			<div id="includehtml">
			</div>
		</div>
	<!--<script src="/asset/js/DJS.js"></script>-->
	</body>
	<script>
		var search = '';
		var typingTimer;
		var doneTypingInterval = 300;

		$("body").on('keyup','#search-mct',function () {
		  clearTimeout(typingTimer);
		  typingTimer = setTimeout(doneTyping, doneTypingInterval);
		});

		$("body").on('keydown','#search-mct',function () {
		  clearTimeout(typingTimer);
		});

		function doneTyping () {
			search = $('#search-mct').val();
			$(".userlist thead").find('a').hide();
			$(".userlist thead").find('.begin_sort').show();
			$.ajax({
				url:'generatehtml.php',
				data: {search: search},
				complete: function (response) {
					document.getElementById('includehtml').innerHTML =response.responseText;
					// Xuong: Collapse table
					$("table tr.expand td").find("div").hide();
					$("table .click-expand").click(function(event) {
						event.stopPropagation();
						var $target = $(event.target);
						$target.closest("tr").next().find("div").slideToggle();
					});
					$( "#search-mct" ).focus();
					$( "#search-mct" ).val( search );
				}
			});
		}

		$("body").on('click','.userlist th a',function () {
			var parent = $(this).closest('th');
			var grandparent = $(this).closest('tr');
			grandparent.find('a').hide();
			grandparent.find('.begin_sort').show();
			if($(this).hasClass('sort_asc')){
				parent.find('.sort_desc').show();
			} else {
				parent.find('.sort_asc').show();
			}
			parent.find('.begin_sort').hide();
			$.ajax({
				url:'generatehtml.php',
				data: {search: search, order: $(this).attr('class').split(' ')[0], type: $(this).attr('class').split(' ')[1]},
				complete: function (response) {
					document.getElementById('includehtml').innerHTML =response.responseText;
					// Xuong: Collapse table
					$("table tr.expand td").find("div").hide();
					$("table .click-expand").click(function(event) {
						event.stopPropagation();
						var $target = $(event.target);
						$target.closest("tr").next().find("div").slideToggle();
					});
					$( "#search-mct" ).focus();
					$( "#search-mct" ).val( search );
				}
			});
		});
		var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		function generateCode(){
			var text = '';
			for( var i=0; i < 25; i++ )
        		text += possible.charAt(Math.floor(Math.random() * possible.length));

        	document.getElementById("code").value = text;
        	return text;
		}

		function generateAccount() {
			var text = '';
			for( var i=0; i < 8; i++ )
        		text += possible.charAt(Math.floor(Math.random() * possible.length));

        	document.getElementById("password").value = text;
        	return text;
		}

		function cleanUserFields() {
			document.getElementById("name").value = '';
			document.getElementById("email").value = '';
			document.getElementById("password").value = '';
		}

		function submitForm(e){
			buttonStage(e, true);
			$('.alert').html('');
			//var token    = $('input[name="token"]');
			var token    = generateCode();
			var fname     = $('input[name="fname"]');
			var lname     = $('input[name="lname"]');
			var email    = $('input[name="email"]');
			var pass     = $('input[name="password"]');
			var is_submit = true;

			if(token == '' && fname.val() == '' && lname.val() == '' && email.val() == '' && pass.val() == '') {
				is_submit = false;
				$('.alert').append(' Token is required. ')
			} else if((token != '' || fname.val() != '' || lname.val() != '' || email.val() != '' || pass.val() != '')) {

				if(token == ''){
					is_submit = false;
					$('.alert').append(' Token is required. ')
				}
				if(fname.val() == ''){
					is_submit = false;
					$('.alert').append(' First Name is required. ')
				}
				if(lname.val() == ''){
					is_submit = false;
					$('.alert').append(' Last Name is required. ')
				}
				if(pass.val() == ''){
					is_submit = false;
					$('.alert').append(' Password is required. ')
				}
				if(email.val() == ''){
					is_submit = false;
					$('.alert').append(' Email is required. ')
				}
			}

			if(email.val() != '' && !validateEmail(email.val())){
				is_submit = false;
				$('.alert').append(' Invalid email format. ')
			}
			if(is_submit){
				$("form").submit();
			} else {
				buttonStage(e, false);
			}

		}
		// Validate email format return true if it's right
		function validateEmail(email) {
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return re.test(email);
		}

		function sendtechtest(e,user){
			buttonStage(e, true);
			var new_password = generateAccount();
			var position = $(e).closest('.awesome-modal').find($("input[type='radio']:checked").val()).selector;
			if(!position){
				buttonStage(e, false);
				alert('Select Apply please!');
				$(e).prop('disabled', false);
				return;
			}
			$.ajax({
                type: "POST",
                url: 'sendtechtest.php',
                data: {user: user, position: position, new_password: new_password},
                dataType: "text",
                success: function (data) {
					if(data == 1){
						location.reload();
					}else{
						alert('Error, please check server sendmail or setfortechtest on server!');
						buttonStage(e, false);
					}
                },
                error: function (data) {
					buttonStage(e, false);
					console.log(data);
                },
            });
		}
		function resetiqtest(e, user){
			buttonStage(e, true);
			var new_password = generateAccount();
			$.ajax({
                type: "POST",
                url: 'resetiqtest.php',
                data: {user: user, new_password: new_password},
                dataType: "text",
                success: function (data) {
					location.reload();
                },
                error: function (data) {
					console.log(data);
					buttonStage(e, false);
                },
            });
		}
		function blockSpecialChar(e) {
			var k;
			document.all ? k = e.keyCode : k = e.which;
			return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
		}
		//
		function buttonStage(e, is_processing){
			if(is_processing){
				$(e).prop('disabled', true);
				$(e).parent().find('.btt-stage span').show();
			} else {
				$(e).prop('disabled', false);
				$(e).parent().find('.btt-stage span').hide();
			}
		}
	</script>
</html>
