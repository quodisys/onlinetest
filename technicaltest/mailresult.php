<?php
require 'sendmail.php';

$postdata = file_get_contents("php://input",true);
$request = json_decode($postdata);

	//if (Sendmail::send("quodisystest@gmail.com",$request->position." - ".$request->name, $request->emailbody,false)){
	if (Sendmail::send("hr@qdsasia.com",$request->position." - ".$request->name, $request->emailbody,false)){
		// send success
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
