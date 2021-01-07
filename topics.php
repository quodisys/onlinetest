<?php
require_once("./login.php");
require_once('./config.php');

$msg="";

if(isset($_GET['t']) && $_GET['t']=="d") { 
	$id=$_GET['id'];

	if($id!="") {
		$sql = "select count(*) as cnt from questions where topic=".$id;
		$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
		$row = mysqli_fetch_array($result);
		if($row["cnt"]>0) {
			$msg = 'Cannot delete Topic, as it is associated with QA Records';
		} else {
			$sql = "delete from topics where id = ".$id;
			mysqli_query($conn, $sql) or die(mysqli_error($conn));
			echo '<script>location.href = "topics.php?m=d";</script>';
		}
	}
}

require_once("header.php");
?>
<script>
function deltopic(id) {
	if(confirm("Are you sure to delete this Topic?")) {
		document.location.href = "topics.php?t=d&id=" + id;
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
					output = '<div class="success">Topic Added!</div>';
					$("#res").hide().html(output).slideDown();
					<?php } ?>
					<?php if(isset($_GET['m']) && $_GET['m']=='d') { ?>
					output = '<div class="success">Topic Deleted!</div>';
					$("#res").hide().html(output).slideDown();
					<?php } ?>
				});
				</script>
				<?php if(isset($_GET['t']) && $_GET['t']!="d") {?>
					<?php if($_GET['t']=="a") { ?>
						<h2>Topics - Add</h2>
						<script>
						jQuery(document).ready(function($) {
							$("#topic").keyup(function() { 
								$(this).css('border-color',''); 
								$("#res").slideUp();
							});
							$('#submitbtn').click(function(e) {
								e.preventDefault();

								var flag = true;

								var topic = $('#topic').val();
								if($.trim(topic)=="") {
									$('#topic').css('border-color','#f00');
									flag = false;
								} else {
									$('#topic').css('border-color','');
								}

								if(flag) {
									var form = $('#form1')[0];
									var data = new FormData(form);

									$.ajax({
										type: "POST",
										url: "topics-process.php",
										//data: $('#form1').serialize(),
										data: data,
										processData: false,
										contentType: false,
										cache: false,
										success : function(data) {
											if(data == "Success!") {
												location.href = "topics.php?m=t";
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
						<form action="topics.php?t=a" method="post" name="form1" id="form1">
						<input type="hidden" name="hfsub" value="add">
						<table cellpadding="4" cellspacing="0">
						<tr><td>Topic</td>
							<td><input type="text" name="topic" id="topic"> *</td>
						</tr>
						<tr><td>Active</td>
							<td><select name="active" id="active">
								<option value="Y">Yes
								<option value="N">No
							</select></td>
						</tr>
						<tr><td height="10"></td></tr>
						<tr><td colspan="2"><input type="submit" id="submitbtn" value=" Add ">&nbsp;&nbsp;<input type="button" value="Cancel" onclick="javascript:document.location.href='topics.php';"></td></tr>
						</table><br><br>
						</form>
					<?php } elseif($_GET['t']=="e") {
						$user = "";
						$active = "";
						if(isset($_GET['id'])) {
							$sql = "select * from topics where id = ".$_GET['id'];
							$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
							while($row = mysqli_fetch_assoc($rs)) {
								$topic = $row['topic'];
								$active = $row['active'];
							}
						}
					?>
						<h2>Topics - Edit</h2>
						<script>
						jQuery(document).ready(function($) {
							$("#topic").keyup(function() { 
								$(this).css('border-color',''); 
								$("#res").slideUp();
							});
							$('#submitbtn').click(function(e) {
								e.preventDefault();

								var flag = true;

								var topic = $('#topic').val();
								if($.trim(topic)=="") {
									$('#topic').css('border-color','#f00');
									flag = false;
								} else {
									$('#topic').css('border-color','');
								}

								if(flag) {
									var form = $('#form1')[0];
									var data = new FormData(form);

									$.ajax({
										type: "POST",
										url: "topics-process.php",
										data: data,
										processData: false,
										contentType: false,
										cache: false,
										success : function(data) {
											if(data == "Success!") {
												location.href = "topics.php";
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
						<form action="topics.php?t=e&id=<?=$_GET['id'];?>" method="post" name="form1" id="form1">
						<input type="hidden" name="hfsub" value="edit">
						<input type="hidden" name="hfid" value="<?=$_GET['id'];?>">
						<table cellpadding="4" cellspacing="0">
						<tr><td>Topic</td>
							<td><input type="text" name="topic" id="topic" value="<?=$topic;?>"> *</td>
						</tr>
						<tr><td>Active</td>
							<td><select name="active" id="active">
								<option value="Y">Yes
								<option value="N">No
							</select><script>document.getElementById("active").value="<?=$active;?>";</script></td>
						</tr>
						<tr><td height="10"></td></tr>
						<tr><td colspan="2"><input type="submit" id="submitbtn" value=" Update ">&nbsp;&nbsp;<input type="button" value="Cancel" onclick="javascript:document.location.href='topics.php';"></td></tr>
						</table><br><br>
						</form>
					<?php } ?>
				<?php } else { ?>
					<h2>Topics</h2>

					<?php if(isset($msg) && $msg!="") { ?>
					<p class="error"><?=$msg;?></p>
					<?php } ?>
					<div id="res"></div>
					<?php
					$sql = "select * from topics order by topic";
					$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
					$totalrecords = mysqli_num_rows($rs);
					?>
					<p><a href="topics.php?t=a" class="black-link"><i class="fa fa-plus green" title="Add"></i> Add Topic</a></p>
					<?php if($totalrecords>0) { ?>
					<form name="form1" id="form1" action="topics.php" method="post">
					<table cellpadding="10" cellspacing="0" border="1" bordercolor="#CCCCCC">
					<tr><td class="tableheadbg">Topic</td>
						<td class="tableheadbg">Active</td>
						<td class="tableheadbg">Total Questions</td>
						<td class="tableheadbg">QA</td>
						<td class="tableheadbg">Actions</td>
					</tr>
					<?php while($row = mysqli_fetch_assoc($rs)) { ?>
					<tr><td valign="top"><?=$row['topic']; ?></td>
						<td valign="top" align="center"><?php if ($row['active']=='Y') echo '<i class="fa fa-check green" title="Active"></i>'; else echo '<i class="fa fa-times red" title="Inactive"></i>'; ?></td>
						<td valign="top">
						<?php
						$sql1 = "select count(*) as cnt from questions where topic = ".$row['id'];
						$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
						$row1 = mysqli_fetch_array($rs1);
						echo $row1["cnt"];
						?>
						</td>
						<td valign="top"><a href="qa.php?topic=<?=$row['id']; ?>">View QA</a></td>
						<td valign="top">
						<table cellpadding="0" cellspacing="0" align="center">
						<tr><td><a href="topics.php?t=e&id=<?=$row['id']; ?>"><i class="fa fa-pencil-square-o" title="Edit"></i></a></td>
							<td width="5"></td>
							<td><a href="javascript:deltopic('<?=$row['id']; ?>');"><i class="fa fa-trash-o" title="Delete"></i></a></td>
						</tr>
						</table>
						</td>
					</tr>
					<?php } ?>
					</table>
					</form>
					<?php } else { ?>
					<p class="error">No Topics Found</p>
					<?php } ?>
				<?php } ?>
			</div><br>
		</div>
	</div>
</section>

<?php require_once("footer.php"); ?>