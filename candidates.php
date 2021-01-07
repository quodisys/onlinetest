<?php
require_once("./login.php");
require_once('./config.php');
$msg="";
$keyword="";
if(isset($_SESSION["keyword"])) $keyword = $_SESSION["keyword"];

if(isset($_GET['t']) && $_GET['t']=="d") { 
	$id=$_GET['id'];

	if($id!="") {
		$sql = "delete from ".$keyword."_candidates_history where candidate = ".$id;
		mysqli_query($conn, $sql) or die(mysqli_error($conn));

		$sql = "delete from ".$keyword."_candidates_results where candidate = ".$id;
		mysqli_query($conn, $sql) or die(mysqli_error($conn));

		$sql = "delete from ".$keyword."_candidates where id = ".$id;
		mysqli_query($conn, $sql) or die(mysqli_error($conn));
		echo '<script>location.href = "candidates.php?m=d";</script>';
	}
}

require_once("header.php");
?>
<script>
function delcandidate(id) {
	if(confirm("Are you sure to delete this Candidate and all their database records?\nTHIS ACTION CANNOT BE REVERSED")) {
		document.location.href = "candidates.php?t=d&id=" + id;
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
					output = '<div class="success">Candidate Added!</div>';
					$("#res").hide().html(output).slideDown();
					<?php } ?>
					<?php if(isset($_GET['m']) && $_GET['m']=='d') { ?>
					output = '<div class="success">Candidate Deleted!</div>';
					$("#res").hide().html(output).slideDown();
					<?php } ?>
				});
				</script>
				<?php if(isset($_GET['t']) && $_GET['t']!="d") {?>
					<?php if($_GET['t']=="a") { ?>
						<h2>Candidate - Add</h2>
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

								if(flag) {
									var form = $('#form1')[0];
									var data = new FormData(form);

									$.ajax({
										type: "POST",
										url: "candidates-process.php",
										//data: $('#form1').serialize(),
										data: data,
										processData: false,
										contentType: false,
										cache: false,
										success : function(data) {
											if(data == "Success!") {
												location.href = "candidates.php?m=t";
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
						<form action="candidates.php?t=a" method="post" name="form1" id="form1">
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
						<tr><td>Active</td>
							<td><select name="active" id="active">
								<option value="Y">Yes
								<option value="N">No
							</select></td>
						</tr>
						<tr><td height="10"></td></tr>
						<tr><td colspan="2"><input type="submit" id="submitbtn" value=" Add ">&nbsp;&nbsp;<input type="button" value="Cancel" onclick="javascript:document.location.href='candidates.php';"></td></tr>
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
								$active = $row['active'];
							}
						}
					?>
						<h2>Candidate - Edit</h2>
						<script>
						jQuery(document).ready(function($) {
							$("#oldpassword, #password").keyup(function() { 
								$(this).css('border-color',''); 
								$("#res").slideUp();
							});
							$('#submitbtn').click(function(e) {
								e.preventDefault();

								var flag = true;

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

								if(flag) {
									var form = $('#form1')[0];
									var data = new FormData(form);

									$.ajax({
										type: "POST",
										url: "candidates-process.php",
										data: data,
										processData: false,
										contentType: false,
										cache: false,
										success : function(data) {
											if(data == "Success!") {
												location.href = "candidates.php";
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
						});
						</script>
						<div id="res"></div>
						<form action="candidates.php?t=e&id=<?=$_GET['id'];?>" method="post" name="form1" id="form1">
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
							<td><input type="text" name="company" id="company" value="<?=$company;?>" readonly></td>
						</tr>
						<tr><td>Active</td>
							<td><select name="active" id="active">
								<option value="Y">Yes
								<option value="N">No
							</select><script>document.getElementById("active").value="<?=$active;?>";</script></td>
						</tr>
						<tr><td height="10"></td></tr>
						<tr><td colspan="2"><input type="submit" id="submitbtn" value=" Update ">&nbsp;&nbsp;<input type="button" value="Cancel" onclick="javascript:document.location.href='candidates.php';"></td></tr>
						</table><br><br>
						</form>
					<?php } ?>
				<?php } else { ?>
					<h2>Candidates</h2>

					<?php if(isset($msg) && $msg!="") { ?>
					<p class="error"><?=$msg;?></p>
					<?php } ?>
					<div id="res"></div>
					<?php
					$sql = "select * from ".$keyword."_candidates order by id desc";
					$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
					$totalrecords = mysqli_num_rows($rs);
					?>
					<!--<p><a href="candidates.php?t=a" class="black-link"><i class="fa fa-plus green" title="Add"></i> Add Candidate</a></p>-->
					<?php if($totalrecords>0) { ?>
					<form name="form1" id="form1" action="candidates.php" method="post">
					<table width="98%" cellpadding="10" cellspacing="0" border="0" bordercolor="#CCCCCC">
					<tr><td class="tableheadbg">Name</td>
						<td class="tableheadbg">Email</td>
						<td class="tableheadbg">Category</td>
						<td class="tableheadbg">Status</td>
						<td class="tableheadbg" width="17%">Actions</td>
					</tr>
					<?php while($row = mysqli_fetch_assoc($rs)) { ?>
					<tr><td valign="top" class="click-expand"><?=$row['firstname']." ".$row['middlename']." ".$row['lastname'];?></td>
						<td valign="top" class="click-expand"><?=$row['email'];?></td>
						<td valign="top" class="click-expand"><?=$row['positionalt'];?></td>
						<td valign="top" class="click-expand">
						<?php
						if($row['testsent']=='iqqds' || $row['testsent']=='techqds')
							echo "IQ Test Sent"."<br>";
						echo $row['iqteststatus']."<br>";
						if($row['testsent']=='techqds')
							echo "Tech Test Sent"."<br>";
						echo str_replace(",","<br>",$row['techteststatus']);
						?>
						</td>
						<td valign="top" class="click-expand">
						<table cellpadding="0" cellspacing="0" align="center">
						<tr><!--<td align="right"><a href="candidates.php?t=e&id=<?=$row['id'];?>"><i class="fa fa-pencil-square-o" title="Edit"></i></a></td>
							<td width="5"></td>-->
							<td align="center"><a href="javascript:delcandidate('<?=$row['id'];?>');"><i class="fa fa-trash-o" title="Delete"></i></a></td>
						</tr>
						</table><br>
						<table cellpadding="0" cellspacing="0" align="center">
						<tr><td>
							<p><a style="width:100%; text-align:center;" type='button' class='button btn-modal' href='#sendIQ-<?=$row['id'];?>' onclick=''>Send IQ Test <?php if($row['testsent']=='iqqds' || $row['testsent']=='techqds') { ?><i class="fa fa-check" title="sent email to this candidate"></i><?php } ?></a></p>
							
							<div class='awesome-modal' id='sendIQ-<?=$row['id'];?>'><a class='close-icon' href='#close'></a><h3 class='modal-title'>Send IQ Test</h3><p style='font-weight: bold;'>Send test to:</p><p><?=$row['firstname']." ".$row['middlename']." ".$row['lastname'];?></p><p><?=$row['email'];?></p><button class='button submit btn-send btt-stage' onclick='resetiqtest(this, <?=$row['id'];?>)'><span style='display: none;'><i class='fa fa-spinner fa-spin'></i> </span>Send</button></div><a class='awesome-overlay' href='#close'></a>

							<?php
							$topic = "";
							$sqlt = "select topics from clients where id = ".$_SESSION["userid"];
							$rst = mysqli_query($conn, $sqlt) or die(mysqli_error($conn));
							$rowt = mysqli_fetch_assoc($rst);
							if($rowt['topics']!="")
								$topiclist = $rowt['topics'];
							else
								$topiclist = "";

							if($topiclist!="")
								$sqlt = "select * from topics where id in (".$topiclist.") order by topic";
							else 
								$sqlt = "select * from topics order by topic";

							$rst = mysqli_query($conn, $sqlt) or die(mysqli_error($conn));
							while($rowt = mysqli_fetch_assoc($rst)) {
								$topic .= "<li><input type='checkbox' id='".str_replace(".","",strtolower($rowt['topic']))."-$user[0]' name='checkbox-level[]' value='".$rowt['id']."' class='levels'><label class='checkbox-mask' for='".str_replace(".","",strtolower($rowt['topic']))."-$user[0]'>".$rowt['topic']."</label></li>";
							}
							?>

							<?php if($row['iqteststatus']!="") { ?>
							<p><a style="width:100%; text-align:center;" type='button' class='button btn-modal btn-second' href='#sendTech-<?=$row['id'];?>' onclick=''>Send Tech Test <?php if($row['testsent']=='techqds') { ?><i class="fa fa-check" title="sent email to this candidate"></i><?php } ?></a></p>

							<div class='awesome-modal' id='sendTech-<?=$row['id'];?>'><a class='close-icon' href='#close'></a> <h3 class='modal-title'>Send Technical Test</h3> <p style='font-weight: bold;'>Send test to:</p><p><?=$row['firstname']." ".$row['middlename']." ".$row['lastname'];?></p><p><?=$row['email'];?></p><p style='font-weight: bold;'>Apply to:</p><div class='level'> <ul class='level-choice'><?=$topic;?></ul> </div><button type='button' class='button submit btn-send btt-stage' onclick='sendtechtest(this, <?=$row['id'];?>)'><span style='display: none;'><i class='fa fa-spinner fa-spin'></i> </span>Send</button></div><a class='awesome-overlay' href='#close'></a>
							<?php } ?>
						</td></tr>
						</table>
						</td>
					</tr>
					<tr class="expand">
						<td style="width: 100%;" colspan="5">
							<div class="expand">
								<table cellpadding="10" width="100%">
									<tbody>
										<tr>
											<td width="16.6666667%" class="tableheadbg">Apply for Company:</td>
											<td width="16.6666667%"><?=$row['company'];?></td>
											<td width="16.6666667%" class="tableheadbg">Position:</td>
											<td width="16.6666667%"><?=$row['position'];?></td>
											<td width="16.6666667%" class="tableheadbg">DOB:</td>
											<td width="16.6666667%"><?=$row['dob'];?></td>
										</tr>
										<tr>
											<td class="tableheadbg">CV:</td>
											<td><?=$row['flcv'];?></td>
											<td class="tableheadbg">Level:</td>
											<td><?=$row['level'];?></td>
											<td class="tableheadbg">Experience:</td>
											<td><?=$row['yearsexperience'];?></td>
										</tr>
										<tr>
											<td class="tableheadbg">Email:</td>
											<td><?=$row['email'];?></td>
											<td class="tableheadbg">Language:</td>
											<td><?=$row['language'];?></td>
											<td class="tableheadbg">Password:</td>
											<td><?=$row['password'];?></td>
										</tr>
										<!--<tr>
											<td class="tableheadbg">Airtable Main Id:</td>
											<td><?=$row['airtable'];?></td>
											<td class="tableheadbg">Airtable IQMI:</td>
											<td><?=$row['airtable_iqmi'];?></td>
											<td class="tableheadbg">Airtable Tech:</td>
											<td><?=$row['airtable_tech'];?></td>
										</tr>-->
										<tr><td class="tableheadbg">Skills</td>
											<td colspan="5" style="word-break:break-word;"><?=$row['skills'];?></td>
										</tr>
										<tr>
											<td class="tableheadbg">Created date:</td>
											<td><?=$row['createddate'];?></td>
											<td class="tableheadbg">Modified date:</td>
											<td><?=$row['modifieddate'];?></td>
											<td class="tableheadbg">Selection Status:</td>
											<td class="tableheadbg"><?=$row['status'];?></td>
										</tr>
										<tr><td colspan="6" class="tableheadbg">Candidate History:</td></tr>
										<tr><td colspan="6" valign="top">
											<?php
											$sql1 = "select * from ".$keyword."_candidates_history where candidate=".$row['id']." order by id desc";
											$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
											while($row1 = mysqli_fetch_assoc($rs1)) {
												$company2 = "";
												if($row1['client']!="") {
													$sql2 = "select company from clients where id=".$row1['client'];
													$rs2 = mysqli_query($conn, $sql2) or die(mysqli_error($conn));
													$row2 = mysqli_fetch_assoc($rs2);
													$company2 = " <b>by ".$row2['company']."</b>";
												}
											?>
												<div><i class="fa fa-caret-right"></i> <?=$row1['status'].$company2." on ".$row1['createddate'];?></div>
											<?php
											}

											$IQRes = "";
											$TechRes = "";
											$EngRes = "";
											$sql1 = "select * from ".$keyword."_candidates_results where candidate=".$row['id']." order by id desc";
											$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
											while($row1 = mysqli_fetch_assoc($rs1)) {
												if($row1['iqresult']!="") {
													$IQRes.= '<a target="blank" href="quodisystest/testresults/'.$row1['iqresult'].'">'.$row1['iqresult'].'</a> - <b>Submitted:</b> '.$row1['createddate'].'<br>';
												}
												if($row1['techresult']!="") {
													$TechRes.= $row1['techtype'].' - <a target="blank" href="quodisystest/testresults/'.$row1['techresult'].'">'.$row1['techresult'].'</a> - <b>Submitted:</b> '.$row1['createddate'].'<br>';
												}
												if($row1['englishresult']!="") {
													$TechRes.= $row1['englishtype'].'- <a target="blank" href="quodisystest/testresults/'.$row1['englishresult'].'">'.$row1['englishresult'].'</a> - <b>Submitted:</b> '.$row1['createddate'].'<br>';
												}
											}
											?>
											</td>
										</tr>
										<tr>
											<td colspan="6" class="tableheadbg">Test Result</td>
										</tr>
										<!--<tr>
											<td class="tableheadbg">Submitted date: </td>
											<td><?=$row['submitteddate']; ?></td>
										</tr>-->
										<tr>
											<td class="tableheadbg">IQ Test:</td>
											<td colspan="5"><?=$IQRes;?></td>
										</tr>
										<tr>
											<td class="tableheadbg" valign="top">Technical Test:</td>
											<td colspan="5"><?=$TechRes;?></td>
										</tr>
										<tr>
											<td class="tableheadbg">English Test:</td>
											<td colspan="5"><?=$EngRes;?></td>
										</tr>
									</tbody>
								</table>
							</div>
						</td>
					</tr>
					<?php } ?>
					</table>
					</form>
					<script>
						var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

						$("table tr.expand td").find("div").hide();
						$("table .click-expand").click(function(event) {
							event.stopPropagation();
							var $target = $(event.target);
							$target.closest("tr").next().find("div").slideToggle();
						});

						function buttonStage(e, is_processing){
							if(is_processing){
								$(e).prop('disabled', true);
								$(e).parent().find('.btt-stage span').show();
							} else {
								$(e).prop('disabled', false);
								$(e).parent().find('.btt-stage span').hide();
							}
						}
						function resetiqtest(e, user){
							buttonStage(e, true);
							var new_password = generateAccount();
							$.ajax({
								type: "POST",
								url: 'quodisystest/resetiqtest.php',
								data: {user: user, new_password: new_password},
								dataType: "text",
								success: function (data) {
									console.log(data);
									location.href = "candidates.php";
								},
								error: function (data) {
									console.log(data);
									buttonStage(e, false);
								},
							});
						}
						function sendtechtest(e,user){
							buttonStage(e, true);
							var new_password = generateAccount();
							var position = "";
							var pos = [];
							$.each($(".levels:checked"), function(){
								pos.push($(this).val());
							});
							position = pos.join(",");
							if(!position){
								buttonStage(e, false);
								alert('Select Apply please!');
								$(e).prop('disabled', false);
								return;
							}
							$.ajax({
								type: "POST",
								url: 'quodisystest/sendtechtest.php',
								data: {user: user, position: position, new_password: new_password},
								dataType: "text",
								success: function (data) {
									console.log(data);
									if(data == 'end_techtest'){
										location.href = "candidates.php";
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
						function generateAccount() {
							var text = '';
							for( var i=0; i < 8; i++ )
								text += possible.charAt(Math.floor(Math.random() * possible.length));

							return text;
						}
					</script>
					<?php } else { ?>
					<p class="error">No Candidates Found</p>
					<?php } ?>
				<?php } ?>
			</div><br>
		</div>
	</div>
</section>

<?php require_once("footer.php"); ?>