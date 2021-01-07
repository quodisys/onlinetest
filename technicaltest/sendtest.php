<?php
require_once("../login.php");
require_once("../config.php");

require '../quodisystest/sendmail.php';
//require '../quodisystest/csvmanager.php';
require '../quodisystest/pdfconver.php';

$postdata = file_get_contents("php://input",true);
$request = json_decode($postdata);

/*$pdf_patch = PDFConvert::createPDFTech(
	$request->company,
	$request->codelanguage,
	$request->name,
	$request->questions,
	$request->result,
	$request->total_attempted,
	$request->total_un_attempted,
	$request->basic_rightanwser,
	$request->optional_rightanwser,
	$request->level
);*/

$sql = "select keyword, logo, toemail from clients where id=".$_SESSION['cl'];
$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn)." - 1");
$row = mysqli_fetch_assoc($rs);
$keyword = $row['keyword'];
$logo = $row['logo'];
$toemail = $row['toemail'];
if($toemail=="") $toemail = HR_EMAIL;

$topic = "";
if(isset($_SESSION['po'])) {
	$sqlt = "select * from topics where id in (".$_SESSION['po'].")";
	$rst = mysqli_query($conn, $sqlt) or die(mysqli_error($conn)." - 2");
	while($rowt = mysqli_fetch_assoc($rst)) {
		$topic .= $rowt['topic'].", ";
	}
	if($topic!="") $topic = substr($topic, 0, strlen($topic)-2)." - ";
}

$sqls = "select skills, company, position, firstname, lastname, techteststatus from ".$keyword."_candidates where id=".$_SESSION['ca'];
$rss = mysqli_query($conn, $sqls) or die(mysqli_error($conn)." - 3");
$rows = mysqli_fetch_assoc($rss);
$skills = $rows['skills'];
if($skills!="") $skills .= ","; else $skills = "";
$techteststatus = $rows['techteststatus'];
if($techteststatus!="") $techteststatus .= ","; else $techteststatus = "";
if($rows['position']!="") $position = $rows['position']; else $position = "";
$name = $rows['firstname']." ".$rows['lastname'];
$company = strtolower($rows['company']);

$pdffile = str_replace(" - ","",$topic).'_'.$company.'_'.$position.'_'.$name;

//echo $keyword."=".$topic."=".$_SESSION['po'];

$pdf_patch = PDFConvert::createPDFTech(
	$_SESSION["comp"],
	$request->codelanguage,
	$request->name,
	$request->questions,
	$request->result,
	$request->total_attempted,
	$request->total_un_attempted,
	$request->basic_rightanwser,
	$request->optional_rightanwser,
	$request->level,
	$pdffile,
	$logo
);
if($pdf_patch!="" && $pdf_patch!=false){
	$body = '<table style="width:500px"><tr><td style="text-align:left;font-size:14px;padding-left:6px;width:167px">Level</td><td style="text-align:left;font-size:14px;padding-left:6px;width:290px">'.$request->level.'</td></tr></table>';
	$body .= $request->emailbody;

	if (Sendmail::send($toemail, $topic."Technical Test - " . $_SESSION["comp"] . " - " . $name, $body, false, $pdf_patch)){
		// send success
		/*Csvmanager::finishTechnicalTest( array(
			'email' 				=> $request->email,
			'password' 				=> $request->password,
			'name' 					=> $request->name,
			'company' 				=> $request->company,
			'level'					=> $request->level,
			'total_attempted' 		=> $request->total_attempted,
			'total_un_attempted'	=> $request->total_un_attempted,
			'basic_rightanwser' 	=> $request->basic_rightanwser,
			'optional_rightanwser' 	=> $request->optional_rightanwser,
			'pdf_patch' 			=> $pdf_patch
		) );*/

		if($keyword!="") {
			$sql1 = "update ".$keyword."_candidates set skills='".$skills.$request->codelanguage."', level='".$request->level."', techteststatus='".$techteststatus.$topic."Tech Test Done' where id=".$_SESSION['ca'];
			$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));

			$sql1 = "insert into ".$keyword."_candidates_history (candidate, status, createddate) values(".$_SESSION['ca'].", '".$topic."Tech Test Complete', '".date('Y-m-d H:i:s')."')";
			$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));

			$sql1 = "insert into ".$keyword."_candidates_results (candidate, techtype, techresult, createddate) values(".$_SESSION['ca'].", '".str_replace(" - ","",$topic)."' ,'".$pdf_patch."', '".date('Y-m-d H:i:s')."')";
			$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
		}
		echo "In-";
	} else {
		// send fail
		$testsendfail_folder = dirname(__FILE__) . "/testsendfail/";
		$current_date = date('Ymdhis');
		$filename = $testsendfail_folder . $current_date . ".html";
		$f = fopen($filename, "w") or die("Unable to open file!");
		fwrite($f, pack("CCC",0xef,0xbb,0xbf));
		fwrite($f, $request->emailbody);
		fclose($f);
		echo "Out-";
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
	echo "Outer-";
}
echo 'End';
