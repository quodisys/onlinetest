<?php
require_once("./login.php");
require_once('./config.php');

$msg="";

if(isset($_GET['t']) && $_GET['t']=="d") { 
	$id=$_GET['id'];

	if($id!="") {
		$sql = "select keyword from clients where id=".$id;
		$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
		$count = mysqli_num_rows($rs);
		$row = mysqli_fetch_assoc($rs);
		$keyword = $row['keyword'];

		if($keyword!="") {
			/*$sql = "drop table ".$keyword."_candidates";
			mysqli_query($conn, $sql) or die(mysqli_error($conn));

			$sql = "drop table ".$keyword."_candidates_history";
			mysqli_query($conn, $sql) or die(mysqli_error($conn));

			$sql = "drop table ".$keyword."_candidates_results";
			mysqli_query($conn, $sql) or die(mysqli_error($conn));
			
			$sql = "delete from clients where id = ".$id;
			mysqli_query($conn, $sql) or die(mysqli_error($conn));*/

			$sql = "update clients set active='N' where id = ".$id;
			mysqli_query($conn, $sql) or die(mysqli_error($conn));

			echo '<script>location.href = "company.php?m=d";</script>';
		}
	}
}

require_once("header.php");
?>
<script>
function delcompany(id) {
	if(confirm("Are you sure to deactivate this Company?")) {
		document.location.href = "company.php?t=d&id=" + id;
	}
}
</script>
<h2>Dashboard</h2>

<?php require_once("menu.php"); ?>

<section class="section-padding">
	<div class="container">
		<div class="row">
			<div class="div2 gradient">
				<script>
				jQuery(document).ready(function($) {
					<?php if(isset($_GET['m']) && $_GET['m']=='t') { ?>
					output = '<div class="success">Company Added!</div>';
					$("#res").hide().html(output).slideDown();
					<?php } ?>
					<?php if(isset($_GET['m']) && $_GET['m']=='d') { ?>
					output = '<div class="success">Company Deactivated!</div>';
					$("#res").hide().html(output).slideDown();
					<?php } ?>
				});
				</script>
				<?php if(isset($_GET['t']) && $_GET['t']!="d") {?>
					<?php if($_GET['t']=="a") { ?>
						<h2>Company - Add</h2>
						<script>
						jQuery(document).ready(function($) {
							$("#email, #password, #company").keyup(function() { 
								$(this).css('border-color',''); 
								$("#res").slideUp();
							});
							$('#submitbtn').click(function(e) {
								e.preventDefault();

								var flag = true;

								var email = $('#email').val();
								if($.trim(email)=="") {
									$('#email').css('border-color','red');
									flag = false;
								} else if($.trim(email)!="" && !isEmail(email)) {
									$('#email').css('border-color','red');
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
								var company = $('#company').val();
								if($.trim(company)=="") {
									$('#company').css('border-color','#f00');
									flag = false;
								} else {
									$('#company').css('border-color','');
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
										url: "company-process.php",
										//data: $('#form1').serialize(),
										data: data,
										processData: false,
										contentType: false,
										cache: false,
										success : function(data) {
											if(data == "Success!") {
												location.href = "company.php?m=t";
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
						<form action="company.php?t=a" method="post" name="form1" id="form1">
						<input type="hidden" name="hfsub" value="add">
						<table cellpadding="4" cellspacing="0">
						<tr><td>Email</td>
							<td><input type="text" name="email" id="email"> *</td>
						</tr>
						<tr><td>Password</td>
							<td><input type="password" name="password" id="password"> *</td>
						</tr>
						<tr><td>Company</td>
							<td><input type="text" name="company" id="company"> *</td>
						</tr>
						<tr><td>Website Link</td>
							<td><input type="text" name="website" id="website"> *</td>
						</tr>
						<tr><td>Logo Link</td>
							<td><input type="text" name="logo" id="logo"> *</td>
						</tr>
						<tr><td colspan="2"><b>Notification</b></td></tr>
						<tr><td>From Name</td>
							<td><input type="text" name="fromname" id="fromname"> *</td>
						</tr>
						<tr><td>From Email</td>
							<td><input type="text" name="fromemail" id="fromemail"> *</td>
						</tr>
						<tr><td>To Email</td>
							<td><input type="text" name="toemail" id="toemail"> *</td>
						</tr>
						<tr><td>Active</td>
							<td><select name="active" id="active">
								<option value="Y">Yes
								<option value="N">No
							</select></td>
						</tr>
						<tr><td valign="top">Topics</td>
							<td><select name="topics[]" id="topics" multiple>
							<?php
							$sql = "select * from topics order by topic";
							$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
							while($row = mysqli_fetch_assoc($rs)) {
							?>
								<option value="<?=$row['id'];?>"><?=$row['topic'];?>
							<?php } ?>
							</select></td>
						</tr>
						<tr><td height="10"></td></tr>
						<tr><td colspan="2"><input type="submit" id="submitbtn" value=" Add ">&nbsp;&nbsp;<input type="button" value="Cancel" onclick="javascript:document.location.href='company.php';"></td></tr>
						</table><br><br>
						</form>
					<?php } elseif($_GET['t']=="e") {
						$user = "";
						$active = "";
						if(isset($_GET['id'])) {
							$sql = "select * from clients where id = ".$_GET['id'];
							$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
							while($row = mysqli_fetch_assoc($rs)) {
								$email = $row['email'];
								$company = $row['company'];
								$website = $row['website'];
								$logo = $row['logo'];
								$fromname = $row['fromname'];
								$fromemail = $row['fromemail'];
								$toemail = $row['toemail'];
								$active = $row['active'];
								$topics = $row['topics'];
							}
						}
					?>
						<h2>Company - Edit</h2>
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
										url: "company-process.php",
										data: data,
										processData: false,
										contentType: false,
										cache: false,
										success : function(data) {
											if(data == "Success!") {
												location.href = "company.php";
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
						<form action="company.php?t=e&id=<?=$_GET['id'];?>" method="post" name="form1" id="form1">
						<input type="hidden" name="hfsub" value="edit">
						<input type="hidden" name="hfid" value="<?=$_GET['id'];?>">
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
						<tr><td>Active</td>
							<td><select name="active" id="active">
								<option value="Y">Yes
								<option value="N">No
							</select><script>document.getElementById("active").value="<?=$active;?>";</script></td>
						</tr>
						<tr><td valign="top">Topics</td>
							<td><select name="topics[]" id="topics" multiple>
							<?php
							$topicssel = explode(",", $topics);
							$sql = "select * from topics order by topic";
							$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
							while($row = mysqli_fetch_assoc($rs)) {
								if(in_array($row['id'], $topicssel))
									$sel = "selected";
								else
									$sel = "";
							?>
								<option value="<?=$row['id'];?>" <?=$sel;?>><?=$row['topic'];?>
							<?php } ?>
							</select></td>
						</tr>
						<tr><td height="10"></td></tr>
						<tr><td colspan="2"><input type="submit" id="submitbtn" value=" Update ">&nbsp;&nbsp;<input type="button" value="Cancel" onclick="javascript:document.location.href='company.php';"></td></tr>
						</table><br><br>
						</form>
					<?php } ?>
				<?php } else { ?>
					<h2>Company</h2>

					<?php if(isset($msg) && $msg!="") { ?>
					<p class="error"><?=$msg;?></p>
					<?php } ?>
					<div id="res"></div>
					<?php
					$sql = "select * from clients order by id desc";
					$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
					$totalrecords = mysqli_num_rows($rs);
					?>
					<p><a href="company.php?t=a" class="black-link"><i class="fa fa-plus green" title="Add"></i> Add Company</a></p>
					<?php if($totalrecords>0) { ?>
					<form name="form1" id="form1" action="company.php" method="post">
					<table cellpadding="10" cellspacing="0" border="1" bordercolor="#CCCCCC">
					<tr><td class="tableheadbg">Email</td>
						<td class="tableheadbg">Company</td>
						<td class="tableheadbg">Website</td>
						<td class="tableheadbg">Date</td>
						<td class="tableheadbg">Notification</td>
						<td class="tableheadbg">Topics</td>
						<td class="tableheadbg">Actions</td>
						<td class="tableheadbg">Tests</td>
						<td class="tableheadbg">Candidates</td>
					</tr>
					<?php while($row = mysqli_fetch_assoc($rs)) { ?>
					<tr><td valign="top"><?=$row['email'];?></td>
						<td valign="top"><?=$row['company'];?></td>
						<td valign="top"><?=$row['website'];?><br><br><img src="<?=$row['logo'];?>" width="100"></td>
						<td valign="top"><?="<b>Created:</b><br>".$row['createddate']."<br><br><b>Modified:</b><br>".$row['modifieddate'];?></td>
						<td valign="top">
						<b>From Name:</b><br><?=$row['fromname'];?><br><br>
						<b>From Email:</b><br><?=$row['fromemail'];?><br><br>
						<b>To Email:</b><br><?=$row['toemail'];?><br>
						</td>
						<td valign="top">
						<?php
						if($row['topics']!="") {
							$sql1 = "select topic from topics where id in (".$row['topics'].") order by topic";
							$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
							while($row1 = mysqli_fetch_assoc($rs1)) {
								echo $row1['topic']."<br>";
							}
						} else echo "All";
						?>
						</td>
						<td valign="top">
						<table cellpadding="0" cellspacing="0" align="center">
						<tr><td><a href="company.php?t=e&id=<?=$row['id']; ?>"><i class="fa fa-pencil-square-o" title="Edit"></i></a></td>
							<td width="5"></td>
							<td><a href="javascript:delcompany('<?=$row['id']; ?>');"><i class="fa fa-trash-o" title="Delete"></i></a></td>
							<td width="5"></td>
							<td><?php if ($row['active']=='Y') echo '<i class="fa fa-check green" title="Active"></i>'; else echo '<i class="fa fa-times red" title="Inactive"></i>'; ?></td>
						</tr>
						</table>
						</td>
						<td valign="top" align="center">
						<?php
						$sql1 = "select c.id, ch.* from ".$row['keyword']."_candidates c, ".$row['keyword']."_candidates_history ch where c.id=ch.candidate and lower(ch.status) like '%sent%'";
						$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
						echo "<p class='tableheadbg pad5 mb5'>Sent</p><b>".mysqli_num_rows($rs1)."</b>";

						$sql1 = "select c.id, ch.* from ".$row['keyword']."_candidates c, ".$row['keyword']."_candidates_history ch where c.id=ch.candidate and lower(ch.status) like '%complete%'";
						$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
						echo "<p class='tableheadbg pad5 mb5'>Complete</p><b>".mysqli_num_rows($rs1)."</b>";
						?>
						</td>
						<td valign="top" align="center"><a href="company-candidates.php?id=<?=$row['id']; ?>"><i class="fa fa-binoculars" title="View Candidates"></i></a></td>
					</tr>
					<?php } ?>
					</table>
					</form>
					<?php } else { ?>
					<p class="error">No Company Found</p>
					<?php } ?>
				<?php } ?>
			</div><br>
		</div>
	</div>
</section>

<?php require_once("footer.php"); ?>