<?php
require_once("./login.php");
require_once('./config.php');

$msg="";
require_once("header.php");
?>
<h2>Dashboard</h2>

<?php require_once("menu.php"); ?>

<section class="section-padding">
	<div class="container">
		<div class="row">
			<div class="div2 gradient">
				<script>
				jQuery(document).ready(function($) {
					<?php if(isset($_GET['m']) && $_GET['m']=='e') { ?>
					output = '<div class="success">Profile Updated!</div>';
					$("#res").hide().html(output).slideDown();
					<?php } ?>
				});
				</script>
				<?php
					$sql = "select * from clients where id = ".$_SESSION["userid"];
					$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
					while($row = mysqli_fetch_assoc($rs)) {
						$email = $row['email'];
						$company = $row['company'];
						$website = $row['website'];
						$logo = $row['logo'];
						$fromname = $row['fromname'];
						$fromemail = $row['fromemail'];
						$toemail = $row['toemail'];
						$topics = $row['topics'];
						$active = $row['active'];
					}
				?>
				<h2>Profile</h2>
				<script>
				jQuery(document).ready(function($) {
					$("#oldpassword, #password, #website, #logo").keyup(function() { 
						$(this).css('border-color',''); 
						$("#res").slideUp();
					});
					$('#submitbtn').click(function(e) {
						e.preventDefault();

						var flag = true;

						var company = $('#company').val();
						if($.trim(company)=="") {
							$('#company').css('border-color','#f00');
							flag = false;
						} else {
							$('#company').css('border-color','');
						}
						var oldpassword = $('#oldpassword').val();
						var password = $('#password').val();
						if($.trim(oldpassword)!="" && $.trim(password)=="") {
							$('#password').css('border-color','#f00');
							flag = false
						} else {
							$('#password').css('border-color','');
						}

						if($.trim(oldpassword)=="" && $.trim(password)!="") {
							$('#oldpassword').css('border-color','#f00');
							flag = false
						} else {
							$('#oldpassword').css('border-color','');
						}
						var website = $('#website').val();
						if($.trim(website)=="") {
							$('#website').css('border-color','#f00');
							flag = false;
						} else {
							$('#website').css('border-color','');
						}
						var logo = $('#logo').val();
						if($.trim(logo)=="") {
							$('#logo').css('border-color','#f00');
							flag = false;
						} else {
							$('#logo').css('border-color','');
						}
						var fromname = $('#fromname').val();
						if($.trim(fromname)=="") {
							$('#fromname').css('border-color','#f00');
							flag = false;
						} else {
							$('#fromname').css('border-color','');
						}
						var fromemail = $('#fromemail').val();
						if($.trim(fromemail)=="") {
							$('#fromemail').css('border-color','red');
							flag = false;
						} else if($.trim(fromemail)!="" && !isEmail(fromemail)) {
							$('#fromemail').css('border-color','red');
							flag = false;
						} else {
							$('#fromemail').css('border-color','');
						}
						var toemail = $('#toemail').val();
						if($.trim(toemail)=="") {
							$('#toemail').css('border-color','red');
							flag = false;
						} else if($.trim(toemail)!="" && !isEmail(toemail)) {
							$('#toemail').css('border-color','red');
							flag = false;
						} else {
							$('#toemail').css('border-color','');
						}

						if(flag) {
							var form = $('#form1')[0];
							var data = new FormData(form);

							$.ajax({
								type: "POST",
								url: "profile-process.php",
								data: data,
								processData: false,
								contentType: false,
								cache: false,
								success : function(data) {
									if(data == "Success!") {
										location.href = "profile.php?m=e";
									} else {
										output = '<div class="error">'+data+'</div>';
										$("#res").hide().html(output).slideDown();
										return false;
									}
								},
								error: function (e) {
									alert(e.responseText);
								}
							});
						} else {
							output = '<div class="error">Please complete Missing Fields!</div>';
							$("#res").hide().html(output).slideDown();
							return false;
						}
					});
					function isEmail(email) {
						var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
						return regex.test(email);
					}
				});
				</script>
				<div id="res"></div>
				<form action="profile.php?t=e" method="post" name="form1" id="form1">
				<input type="hidden" name="hfsub" value="edit">
				<table cellpadding="4" cellspacing="0">
				<tr><td>Email</td>
					<td><input type="text" name="email" id="email" value="<?=$email;?>" readonly></td>
				</tr>
				<tr><td>Old Password</td>
					<td><input type="password" name="oldpassword" id="oldpassword"></td>
				</tr>
				<tr><td>New Password</td>
					<td><input type="password" name="password" id="password"></td>
				</tr>
				<tr><td>Company</td>
					<td><input type="text" name="company" id="company" value="<?=$company;?>"></td>
				</tr>
				<tr><td>Website Link</td>
					<td><input type="text" name="website" id="website" value="<?=$website;?>"> *</td>
				</tr>
				<tr><td valign="top">Logo Link</td>
					<td valign="top"><input type="text" name="logo" id="logo" value="<?=$logo;?>"> *<br><img src="<?=$logo;?>" width="100">
					</td>
				</tr>
				<tr><td colspan="2"><b>Notification</b></td></tr>
				<tr><td>From Name</td>
					<td><input type="text" name="fromname" id="fromname" value="<?=$fromname;?>"> *</td>
				</tr>
				<tr><td>From Email</td>
					<td><input type="text" name="fromemail" id="fromemail" value="<?=$fromemail;?>"> *</td>
				</tr>
				<tr><td>To Email</td>
					<td><input type="text" name="toemail" id="toemail" value="<?=$toemail;?>"> *</td>
				</tr>
				<tr><td height="10"></td></tr>
				<tr><td valign="top">Topics Allowed</td>
					<td valign="top">
					<?php
					if($topics!="") {
						$sql1 = "select topic from topics where id in (".$topics.") order by topic";
						$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
						while($row1 = mysqli_fetch_assoc($rs1)) {
							echo $row1['topic']."<br>";
						}
					} else {
						echo "All";
					}
					?>
					</td>
				</tr>
				<tr><td height="10"></td></tr>
				<tr><td colspan="2"><input type="submit" id="submitbtn" value=" Update "></td></tr>
				</table><br><br>
				</form>
			</div><br>
		</div>
	</div>
</section>

<?php require_once("footer.php"); ?>