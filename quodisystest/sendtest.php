<?php
require_once("../login.php");
require_once("../config.php");

require 'sendmail.php';
//require 'csvmanager.php';
require 'pdfconver.php';

$postdata = file_get_contents("php://input",true);
$request = json_decode($postdata);

/*echo $request->emailbodynew."<BR>";
echo $_SESSION["comp"]."<BR>";
echo $request->position."<BR>";
echo $request->name;*/

$sql = "select keyword, logo, toemail from clients where id=".$_SESSION['cl'];
$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
$row = mysqli_fetch_assoc($rs);
$keyword = $row['keyword'];
$toemail = $row['toemail'];
if($toemail=="") $toemail = HR_EMAIL;
$_SESSION["logo"] = $row['logo'];

$sqls = "select firstname, lastname from ".$keyword."_candidates where id=".$_SESSION['ca'];
$rss = mysqli_query($conn, $sqls) or die(mysqli_error($conn));
$rows = mysqli_fetch_assoc($rss);
$name = $rows['firstname']." ".$rows['lastname'];

$pdf_patch = PDFConvert::createPDF($request->emailbodynew, $_SESSION["comp"], $request->position, $name);
if($pdf_patch) {
	if (Sendmail::send($toemail, $request->position." - ".$name, $request->emailbody, false, $pdf_patch)) {
		// send success
		/*Csvmanager::finishTest( array(
			'email' 	=> $request->email,
			'password' 	=> $request->password,
			'company'	=> $request->company,
			'position' 	=> $request->position,
			'birthday' 	=> $request->birthday,
			'language' 	=> $request->language,
			'pdf_patch'	=> $pdf_patch
		) );*/

		/*$sql = "select keyword from clients where id=".$_SESSION['cl'];
		$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
		$row = mysqli_fetch_assoc($rs);*/

		//echo $row['keyword']."\n".$pdf_patch."\n";

		//if($row['keyword']!="") {
		if($keyword!="") {
			$sql1 = "update ".$row['keyword']."_candidates set position='".$request->position."', dob='".$request->birthday."', language='".$request->language."', submitteddate='".date('Y-m-d H:i:s')."', iqteststatus='IQ Test Done' where id=".$_SESSION['ca'];
			$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));

			$sql1 = "insert into ".$_SESSION["keyword"]."_candidates_history (candidate, status, createddate) values(".$_SESSION['ca'].", 'IQ Test Complete', '".date('Y-m-d H:i:s')."')";
			$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));

			$sql1 = "insert into ".$_SESSION["keyword"]."_candidates_results (candidate, iqresult, createddate) values(".$_SESSION['ca'].", '".$pdf_patch."', '".date('Y-m-d H:i:s')."')";
			$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
		}
	} else {
		// send fail
		$testsendfail_folder = dirname(__FILE__) . "/testsendfail/";
		$current_date = date('Ymdhis');
		$filename = $testsendfail_folder . $current_date . ".html";
		$f = fopen($filename, "w") or die("Unable to open file!");
		fwrite($f, pack("CCC",0xef,0xbb,0xbf));
		fwrite($f, $request->emailbody);
		fclose($f);
	}
} else {
	// send fail
	$testsendfail_folder = dirname(__FILE__) . "/testsendfail/";
	$current_date = date('Ymdhis');
	$filename = $testsendfail_folder . $current_date . ".html";
	$f = fopen($filename, "w") or die("Unable to open file!");
	fwrite($f, pack("CCC",0xef,0xbb,0xbf));
	fwrite($f, $request->emailbody);
	fclose($f);
}
echo 'End1';
