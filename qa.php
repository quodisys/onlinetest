<?php
require_once("./login.php");
require_once('./config.php');

$msg="";

$totalrecords = "";
$qa = "";
$qatopic = "";

if(isset($_GET['topic']) && $_GET['topic']!="") {
	$qa = " where topic=".$_GET['topic'];
	$sqlqa = "select * from topics where id = ".$_GET['topic'];
	$rsqa = mysqli_query($conn, $sqlqa) or die(mysqli_error($conn));
	$rowqa = mysqli_fetch_array($rsqa);
	$qatopic = $rowqa['topic'];
}

if(isset($_GET['t']) && $_GET['t']=="d") {
	$id=$_GET['id'];

	if($id!="") {
		$sql = "delete from answers where question = ".$id;
		mysqli_query($conn, $sql) or die(mysqli_error($conn));

		$sql = "delete from questions where id = ".$id;
		mysqli_query($conn, $sql) or die(mysqli_error($conn));
		echo '<script>location.href = "qa.php?m=d&topic='.$_GET['topic'].'";</script>';
	}
}

require_once("header.php");
?>
<script>
function delquestion(id) {
	if(confirm("Are you sure to delete this Question and its Answers?")) {
		document.location.href = "qa.php?t=d&id="+id+"&topic=<?=$_GET['topic'];?>";
	}
}
</script>
<h2>Dashboard</h2>

<?php require_once("menu.php"); ?>

<section class="section-padding">
	<div class="container">
		<div class="row">
			<div class="div2 gradient">
				<h2>QA - <?=$qatopic;?></h2>
				<p><a href="qa.php?topic=<?=$_GET['topic'];?>#edit" class="black-link"><i class="fa fa-plus green" title="Add"></i> Add Question</a></p>
				<script>
				jQuery(document).ready(function($) {
					<?php if(isset($_GET['m']) && $_GET['m']=='t') { ?>
					output = '<div class="success">Question and its Answers Added!</div>';
					$("#res").hide().html(output).slideDown();
					<?php } ?>
					<?php if(isset($_GET['m']) && $_GET['m']=='d') { ?>
					output = '<div class="success">Question and its Answers Deleted!</div>';
					$("#res").hide().html(output).slideDown();
					<?php } ?>
				});
				</script>
				<?php if(isset($msg) && $msg!="") { ?>
				<p class="error"><?=$msg;?></p>
				<?php } ?>
				<div id="res"></div>

				<?php if($qatopic!="") {
					$i=1;
					$sql = "select * from questions ".$qa." order by id";
					$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
					$totalrecords = mysqli_num_rows($rs);
				
					if($totalrecords>0) {
				?>
					<p><b>Total Questions:</b> <?=$totalrecords;?></p>
					<form name="form1" id="form1" action="topics.php" method="post">
					<table cellpadding="10" cellspacing="0" border="1" bordercolor="#CCCCCC">
					<tr><td width="5%" class="tableheadbg">Q.No.</td>
						<td width="30%" class="tableheadbg">Question</td>
						<td width="45%" class="tableheadbg">Answers</td>
						<td width="15%" class="tableheadbg">Correct Answer</td>
						<td width="10%" class="tableheadbg">Level</td>
						<td width="5%" class="tableheadbg">Actions</td>
					</tr>
					<?php while($row = mysqli_fetch_assoc($rs)) { ?>
					<tr><td valign="top"><?=$i++;?></td>
						<td valign="top">
							<?=nl2br(htmlentities($row['question'])); ?>
							<?php if($row['file']!="") { ?>
							<p><a href="questions/<?=$row['file'];?>" target="_blank">
								<?php if($row['type']=="Image") { ?>
								<i class="fa fa-picture-o fa-2x" title="View Image"></i>
								<?php } ?>
								<?php if($row['type']=="Audio") { ?>
								<i class="fa fa-file-audio-o fa-2x" title="View Audio"></i>
								<?php } ?>
							</a></p>
							<?php } ?>
						</td>
						<td valign="top">
						<?php
						$sqlans = "select * from answers where question=".$row['id']." order by id";
						$rsans = mysqli_query($conn, $sqlans) or die(mysqli_error($conn));
						while($rowans = mysqli_fetch_assoc($rsans)) {
							echo "<div class='grid cols-1'><div>".$rowans['label']." - </div><div>".nl2br(htmlentities($rowans['answer']))."</div></div>";
						}
						?>
						</td>
						<td valign="top"><?=$row['correct_answer']; ?></td>
						<td valign="top"><?=$row['active']; ?></td>
						<td valign="top">
						<table cellpadding="0" cellspacing="0" align="center">
						<tr><td><a href="qa.php?t=e&topic=<?=$_GET['topic']; ?>&id=<?=$row['id']; ?>#edit"><i class="fa fa-pencil-square-o" title="Edit"></i></a></td>
							<td width="5"></td>
							<td><a href="javascript:delquestion('<?=$row['id']; ?>');"><i class="fa fa-trash-o" title="Delete"></i></a></td>
						</tr>
						</table>
						</td>
					</tr>
					<?php } ?>
					</table>
					</form>
					<?php } else { ?>
					<p class="error">No QA Found</p>
					<?php }
				} else { ?>
					<p class="error">Please select the topic.</p>
				<?php } ?>

				<br><hr><a name="edit"></a><br>
				<?php
				$t = "";
				$question = "";
				$level = "";
				$file = "";
				$correctanswer = array();
				$answer = array();
				$answerid = array();
				if(isset($_GET['t']) && $_GET['t']=="e") {
					$t = $_GET['t'];
					if(isset($_GET['id'])) {
						$sql = "select * from questions where id = ".$_GET['id'];
						$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
						while($row = mysqli_fetch_assoc($rs)) {
							$question = $row['question'];
							$level = $row['active'];
							$correctanswer = explode(",",$row['correct_answer']);
							$type = $row['type'];
							$file = $row['file'];

							$sql1 = "select * from answers where question = ".$row['id']." order by id";
							$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
							$i=0;
							while($row1 = mysqli_fetch_assoc($rs1)) {
								if($row1['answer']!="") {
									$answer[$i] = str_replace("\"", "",$row1['answer']);
									$answerid[$i] = $row1['id'];
									$i++;
								}
							}
						}
					}
				}
				?>
				<script>
				jQuery(document).ready(function($) {
					$('#fl').addClass('hide');
					if($('#type').val()!="")
						$('#fl').removeClass('hide');
					else
						$('#fl').addClass('hide');

					$("#question, #answer1, #answer2").keyup(function() { 
						$(this).css('border-color',''); 
						$("#res-1").slideUp();
					});

					$('#type').change(function(e) {
						if($('#type').val()!="")
							$('#fl').removeClass('hide');
						else
							$('#fl').addClass('hide');
					});
					$('.addcv').on('click', function() { 
						$('#flq').click();
						return false;
					});
					$('#flq').change(function() {
						$('.flqspan').text('('+$('#flq')[0].files[0].name+')');
					});

					$('#submitbtn-1').click(function(e) {
						e.preventDefault();

						var flag = true;

						var question = $('#question').val();
						if($.trim(question)=="") {
							$('#question').css('border-color','#f00');
							flag = false;
						} else {
							$('#question').css('border-color','');
						}
						var type = $('#type').val();
						var flq = $('#flq').val();
						console.log(type);
						console.log(flq);
						if($.trim(type)!="" && $.trim(flq)=="" ) {
							$('.flq').css('border','1px solid #f00');
							flag = false;
						} else {
							$('.flq').css('border','0');
						}
						var answer1 = $('#answer1').val();
						if($.trim(answer1)=="") {
							$('#answer1').css('border-color','#f00');
							flag = false;
						} else {
							$('#answer1').css('border-color','');
						}
						var answer2 = $('#answer2').val();
						if($.trim(answer2)=="") {
							$('#answer2').css('border-color','#f00');
							flag = false;
						} else {
							$('#answer2').css('border-color','');
						}
						if ($('input:checkbox').filter(':checked').length < 1) {
							flag = false;
							$('.ca').css('background','#f00');
							$('.ca').css('color','#fff');
						}
						var countlen = $('.answers').length;
						$('.hftotans').val(countlen);

						if(flag) {
							var form = $('#form2')[0];
							var data = new FormData(form);

							$.ajax({
								type: "POST",
								url: "qa-process.php",
								data: data,
								processData: false,
								contentType: false,
								cache: false,
								success : function(data) {
									if(data == "Success!") {
										location.href = "qa.php?m=t&topic=<?=$_GET['topic'];?>";
									} else {
										output = '<div class="error">'+data+'</div>';
										$("#res-1").hide().html(output).slideDown();
										return false;
									}
								},
								error: function (e) {
									alert(e.responseText);
								}
							});
						} else {
							output = '<div class="error">Please complete Missing Fields!<br>At least 1 answer should be selected/checked as Correct Answer!</div>';
							$("#res-1").hide().html(output).slideDown();
							return false;
						}
					});
				});
				</script>
				<h2><?=($t=='e')?'Edit':'Add';?> Question</h2>
				<form action="qa.php?t=a" method="post" name="form2" id="form2" enctype="multipart/form-data">
				<input type="hidden" name="hfsub" value="<?=($t=='e')?'edit':'add';?>">
				<input type="hidden" name="hfid" value="<?=$_GET['id'];?>">
				<input type="hidden" name="hftopic" value="<?=$_GET['topic'];?>">
				<input type="hidden" name="hftotans" class="hftotans" value="">
				<table cellpadding="4" cellspacing="0" class="qa" border="0">
				<tr><td width="150">Question</td>
					<td><textarea name="question" id="question"><?=$question;?></textarea> </td>
					<td>*</td>
				</tr>
				<tr><td>Question Type</td>
					<td><select name="type" id="type">
						<option value="">-= Select =-
						<option value="Image">Image
						<option value="Audio">Audio
					</select>
					<script>document.getElementById("type").value="<?=$type;?>"</script></td>
					<td></td>
				</tr>
				<tr id="fl"><td>Upload File</td>
					<td><div style="margin-bottom:5px;" class="flq"><input type="file" name="flq" id="flq" class="inputfile">
					<label for="file"><div style="display:inline-block;" class="addcv"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="13" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"></path></svg> Click to Upload<br><small><em>(formats: jpg, png, gif, mp3) up to 1MB</em></small></div>  <br><span class="flqspan"></span></label></div>
					</td>
					<td colspan="2">
					<?php if($file!="") { ?>
						<b>Existing File:</b> <a href="questions/<?=$file;?>" target="_blank"><i class="fa fa-binoculars" title="View File"></i></a><br><br>
						<b>Keep File:</b> <input type="checkbox" name="keepfile" id="keepfile" value="Y"> Yes
					<?php } ?>
					</td>
				</tr>
				<tr><td>Level</td>
					<td><select name="level" id="level">
						<option value="">-= Select =-
						<option value="L">Low
						<option value="M">Medium
						<option value="H">Hard
					</select>
					<script>document.getElementById("level").value="<?=$level;?>"</script></td>
					<td></td>
				</tr>
				<tr><th></th>
					<th colspan="2">Answers</th>
					<th class="ca">Correct Answer</th>
				</tr>
				<tr><td>Answer A</td>
					<td><input type="hidden" name="answerid1" value="<?=$answerid[0];?>">
					<textarea name="answer1" id="answer1" class="answers"><?=(isset($answer[0]))?$answer[0]:"";?></textarea></td>
					<td> *</td>
					<td align="center"><input type="checkbox" name="correctanswer[]" class="correctanswer" value="A" <?=(in_array("A", $correctanswer)?"checked":"");?>></td>
				</tr>
				<tr><td>Answer B</td>
					<td><input type="hidden" name="answerid2" value="<?=$answerid[1];?>">
					<textarea name="answer2" id="answer2" class="answers"><?=(isset($answer[1]))?$answer[1]:"";?></textarea></td>
					<td> *</td>
					<td align="center"><input type="checkbox" name="correctanswer[]" class="correctanswer" value="B" <?=(in_array("B", $correctanswer)?"checked":"");?>></td>
				</tr>
				<tr><td>Answer C</td>
					<td colspan="2"><input type="hidden" name="answerid3" value="<?=(isset($answerid[2]))?$answerid[2]:"";?>">
					<textarea name="answer3" id="answer3" class="answers"><?=(isset($answer[2]))?$answer[2]:"";?></textarea></td>
					<td align="center"><input type="checkbox" name="correctanswer[]" class="correctanswer" value="C" <?=(in_array("C", $correctanswer)?"checked":"");?>></td>
				</tr>
				<tr><td>Answer D</td>
					<td colspan="2"><input type="hidden" name="answerid4" value="<?=(isset($answerid[3]))?$answerid[3]:"";?>">
					<textarea name="answer4" id="answer4" class="answers"><?=(isset($answer[3]))?$answer[3]:"";?></textarea></td>
					<td align="center"><input type="checkbox" name="correctanswer[]" class="correctanswer" value="D" <?=(in_array("D", $correctanswer)?"checked":"");?>></td>
				</tr>
				<tr><td>Answer E</td>
					<td colspan="2"><input type="hidden" name="answerid5" value="<?=(isset($answerid[4]))?$answerid[4]:"";?>">
					<textarea name="answer5" id="answer5" class="answers"><?=(isset($answer[4]))?$answer[4]:"";?></textarea></td>
					<td align="center"><input type="checkbox" name="correctanswer[]" class="correctanswer" value="E" <?=(in_array("E", $correctanswer)?"checked":"");?>></td>
				</tr>
				<tr><td>Answer F</td>
					<td colspan="2"><input type="hidden" name="answerid6" value="<?=(isset($answerid[5]))?$answerid[5]:"";?>">
					<textarea name="answer6" id="answer6" class="answers"><?=(isset($answer[5]))?$answer[5]:"";?></textarea></td>
					<td align="center"><input type="checkbox" name="correctanswer[]" class="correctanswer" value="F" <?=(in_array("F", $correctanswer)?"checked":"");?>></td>
				</tr>
				<tr><td>Answer G</td>
					<td colspan="2"><input type="hidden" name="answerid7" value="<?=(isset($answerid[6]))?$answerid[6]:"";?>">
					<textarea name="answer7" id="answer7" class="answers"><?=(isset($answer[6]))?$answer[6]:"";?></textarea></td>
					<td align="center"><input type="checkbox" name="correctanswer[]" class="correctanswer" value="G" <?=(in_array("G", $correctanswer)?"checked":"");?>></td>
				</tr>
				<tr><td>Answer H</td>
					<td colspan="2"><input type="hidden" name="answerid8" value="<?=(isset($answerid[7]))?$answerid[7]:"";?>">
					<textarea name="answer8" id="answer8" class="answers"><?=(isset($answer[7]))?$answer[7]:"";?></textarea></td>
					<td align="center"><input type="checkbox" name="correctanswer[]" class="correctanswer" value="H" <?=(in_array("H", $correctanswer)?"checked":"");?>></td>
				</tr>
				<tr><td>Answer I</td>
					<td colspan="2"><input type="hidden" name="answerid9" value="<?=(isset($answerid[8]))?$answerid[8]:"";?>">
					<textarea name="answer9" id="answer9" class="answers"><?=(isset($answer[8]))?$answer[8]:"";?></textarea></td>
					<td align="center"><input type="checkbox" name="correctanswer[]" class="correctanswer" value="I" <?=(in_array("I", $correctanswer)?"checked":"");?>></td>
				</tr>
				<tr><td>Answer J</td>
					<td colspan="2"><input type="hidden" name="answerid10" value="<?=(isset($answerid[9]))?$answerid[9]:"";?>">
					<textarea name="answer10" id="answer10" class="answers"><?=(isset($answer[9]))?$answer[9]:"";?></textarea></td>
					<td align="center"><input type="checkbox" name="correctanswer[]" class="correctanswer" value="J" <?=(in_array("J", $correctanswer)?"checked":"");?>></td>
				</tr>
				<tr><td colspan="2"><input type="submit" id="submitbtn-1" value=" <?=($t=='e')?'Update':'Add';?> "></td></tr>
				</table>
				</form>
				<div id="res-1"></div><br><br>
			</div><br>
		</div>
	</div>
</section>

<?php require_once("footer.php"); ?>