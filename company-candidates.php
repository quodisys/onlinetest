<?php
require_once("./login.php");
require_once('./config.php');
$msg="";
$id="";
$keyword="";
$company="";
if(isset($_GET['id'])) $id=$_GET['id'];
if($id!="") {
	$sql1 = "select company, keyword from clients where id=".$id;
	$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
	$row1 = mysqli_fetch_assoc($rs1);
	$company = $row1['company']." - ";
	$keyword = $row1['keyword'];
}
require_once("header.php");
?>
<h2>Dashboard</h2>

<?php require_once("menu.php"); ?>

<section class="section-padding">
	<div class="container">
		<div class="row">
			<div class="div2 gradient">
				<h2><?=$company;?>Candidates</h2>

				<?php
				if($company!="") {
					$sql = "select * from ".$keyword."_candidates order by id desc";
					$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
					$totalrecords = mysqli_num_rows($rs);
				} else {
					$sql = "select * from clients order by id desc";
					$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
					$totalrecords = mysqli_num_rows($rs);
				}
				$totalrecords = mysqli_num_rows($rs);
				?>
				<?php if($totalrecords>0) { ?>
				<form name="form1" id="form1" action="company-candidates.php" method="post">
				<table width="98%" cellpadding="10" cellspacing="0" border="0" bordercolor="#CCCCCC">
				<tr><td class="tableheadbg">Company</td>
					<td class="tableheadbg">Name</td>
					<td class="tableheadbg">Email</td>
					<td class="tableheadbg">Category</td>
					<td class="tableheadbg">Status</td>
					<td class="tableheadbg" width="17%">Actions</td>
				</tr>
				<?php
				$recsArr = array();
				$i=0;
				if($company=="") {
					while($row3 = mysqli_fetch_assoc($rs)) {
						$keyword = $row3['keyword'];
						$sql3 = "select * from ".$keyword."_candidates order by id desc";
						$rs3 = mysqli_query($conn, $sql3) or die(mysqli_error($conn));
						while($row = mysqli_fetch_assoc($rs3)) {
							$recs = new stdClass();
							foreach($row as $key => $value) {
								$recs->$key = $value;
							}
							$recs->keyword = $keyword;
							array_push($recsArr, $recs);
						}
					}
				} else {
					while($row = mysqli_fetch_assoc($rs)) {
						$recs = new stdClass();
						foreach($row as $key => $value) {
							$recs->$key = $value;
						}
						$recs->keyword = $keyword;
						array_push($recsArr, $recs);
					}
				}
				echo "<pre>";
				//print_r($recsArr);
				echo "</pre>";
				foreach($recsArr as $key => $row) {
				?>
				<tr><td valign="top" class="click-expand"><?=$row->company;?></td>
					<td valign="top" class="click-expand"><?=$row->firstname." ".$row->middlename." ".$row->lastname;?></td>
					<td valign="top" class="click-expand"><?=$row->email;?></td>
					<td valign="top" class="click-expand"><?=$row->positionalt;?></td>
					<td valign="top" class="click-expand">
					<?php
					if($row->testsent=='iqqds' || $row->testsent=='techqds')
						echo "IQ Test Sent"."<br>";
					echo $row->iqteststatus."<br>";
					if($row->testsent=='techqds')
						echo "Tech Test Sent"."<br>";
					echo str_replace(",","<br>",$row->techteststatus);
					?>
					</td>
					<td valign="top" class="click-expand">
					<table cellpadding="0" cellspacing="0" align="center">
					<tr><!--<td align="right"><a href="company-candidates.php?t=e&id=<?=$row->id;?>"><i class="fa fa-pencil-square-o" title="Edit"></i></a></td>
						<td width="5"></td>-->
						<td align="center"><a href="javascript:delcandidate('<?=$row->id;?>');"><i class="fa fa-trash-o" title="Delete"></i></a></td>
					</tr>
					</table>
					</td>
				</tr>
				<tr class="expand">
					<td style="width: 100%;" colspan="6">
						<div class="expand">
							<table cellpadding="10" width="100%">
								<tbody>
									<tr>
										<td width="16.6666667%" class="tableheadbg">Apply for Company:</td>
										<td width="16.6666667%"><?=$row->company;?></td>
										<td width="16.6666667%" class="tableheadbg">Position:</td>
										<td width="16.6666667%"><?=$row->position;?></td>
										<td width="16.6666667%" class="tableheadbg">DOB:</td>
										<td width="16.6666667%"><?=$row->dob;?></td>
									</tr>
									<tr>
										<td class="tableheadbg">CV:</td>
										<td><?=$row->flcv;?></td>
										<td class="tableheadbg">Level:</td>
										<td><?=$row->level;?></td>
										<td class="tableheadbg">Experience:</td>
										<td><?=$row->yearsexperience;?></td>
									</tr>
									<tr>
										<td class="tableheadbg">Email:</td>
										<td><?=$row->email;?></td>
										<td class="tableheadbg">Language:</td>
										<td><?=$row->language;?></td>
										<td class="tableheadbg">Password:</td>
										<td><?=$row->password;?></td>
									</tr>
									<!--<tr>
										<td class="tableheadbg">Airtable Main Id:</td>
										<td><?=$row->airtable;?></td>
										<td class="tableheadbg">Airtable IQMI:</td>
										<td><?=$row->airtable_iqmi;?></td>
										<td class="tableheadbg">Airtable Tech:</td>
										<td><?=$row->airtable_tech;?></td>
									</tr>-->
									<tr><td class="tableheadbg">Skills</td>
										<td colspan="5" style="word-break:break-word;"><?=$row->skills;?></td>
									</tr>
									<tr>
										<td class="tableheadbg">Created date:</td>
										<td><?=$row->createddate;?></td>
										<td class="tableheadbg">Modified date:</td>
										<td><?=$row->modifieddate;?></td>
										<td class="tableheadbg">Selection Status:</td>
										<td class="tableheadbg"><?=$row->status;?></td>
									</tr>
									<tr><td colspan="6" class="tableheadbg">Candidate History:</td></tr>
									<tr><td colspan="6" valign="top">
										<?php
										$sql1 = "select * from ".$row->keyword."_candidates_history where candidate=".$row->id." order by id desc";
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
										$sql1 = "select * from ".$row->keyword."_candidates_results where candidate=".$row->id." order by id desc";
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
										<td><?=$row->submitteddate; ?></td>
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
				</script>
				<?php } else { ?>
				<p class="error">No Candidates Found</p>
				<?php } ?>
			</div><br>
		</div>
	</div>
</section>

<?php require_once("footer.php"); ?>