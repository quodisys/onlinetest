<?php
$postdata = file_get_contents("php://input",true);
$results = json_decode($postdata, TRUE);
//print_r($request);

if(isset($results) && count($results)>0) {

	//var_dump($results);
	require_once('../qds-admin/config.php');
	$apikey = "keysuO520LMgC7x1q";

	$candidate_id = "";
	$position = "";

	$email = $results['test_results']['candidate_info']['email'];
	$sql = "select * from candidates where email = '".$email."' order by id desc limit 1";
	$id = "";

	$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	while($row = mysqli_fetch_assoc($rs)) {
		$id = $row['id'];
		$candidate_id = $row['airtable'];
		$position = $row['position'];
	}

	$iq = $results['test_results']['iq_score'];
	$mi_linguistic = $results['test_results']['mi_test_results']['linguistic'];
	$mi_logic = $results['test_results']['mi_test_results']['logic'];
	$mi_musical = $results['test_results']['mi_test_results']['musical'];
	$mi_body_kinesthetic = $results['test_results']['mi_test_results']['bodily_kinesthetic'];
	$mi_spatial_visual = $results['test_results']['mi_test_results']['visual_spatial'];
	$mi_interpersonal = $results['test_results']['mi_test_results']['interpersonal'];
	$mi_intrapersonal = $results['test_results']['mi_test_results']['intrapersonal'];
	$honesty_test = $results['test_results']['honesty_test_results'];
	$attitude_test = $results['test_results']['attitude_test_results'];
	$testing_language = $results['test_results']['candidate_info']['language'];

	$json_array = [
		'records' => [
			[
				'fields' => [
					'link_to_candidates' => [
						$candidate_id
					],
					'position_applied' => $position,
					'iq_test' => $iq,
					'mi_linguistic' => $mi_linguistic,
					'mi_logic' => $mi_logic,
					'mi_musical' => $mi_musical,
					'mi_body_kinesthetic' => $mi_body_kinesthetic,
					'mi_spatial_visual' => $mi_spatial_visual,
					'mi_interpersonal' => $mi_interpersonal,
					'mi_intrapersonal' => $mi_intrapersonal,
					'honesty_test' => $honesty_test,
					'attitude_test' => $attitude_test,
					'testing_language' => $testing_language,
					'misc_notes' => ''
				]
			]
		],
		'typecast' => true
	];
	$json = json_encode($json_array);
	//print_r($json);
	//exit();
	$url = "https://api.airtable.com/v0/appzc6U8ZGamKQRer/iqmi_results";
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
	curl_setopt($ch, CURLOPT_HTTPHEADER, [
		'Authorization: Bearer '.$apikey,
		'Content-Type: application/json'
	]);
	curl_setopt($ch, CURLOPT_POST, 1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $json);
	$res = curl_exec($ch);
	curl_close($ch);

	$jsonret = json_decode($res, TRUE);
	/*echo "<pre>";
	print_r($jsonret);
	echo "</pre>";*/

	//echo $jsonret['error']['type']."<br>".$jsonret['error']['message'];
	if(isset($jsonret['error']['type']) && $jsonret['error']['type']!="") {
		$sql = "insert into airtable set email = '".$email."', type = '".$jsonret['error']['type']."', message = '".$jsonret['error']['message']."', fromwhere='IQMI Preliminary', createddate = '".date("Y-m-d")."'";
		mysqli_query($conn, $sql) or die(mysqli_error($conn));
		exit();
	} else {
		echo "Airtable";

		$sql = "update candidates set airtable_iqmi = '".$jsonret['records'][0]['id']."' where id = ".$id;
		mysqli_query($conn, $sql) or die(mysqli_error($conn));
	}
}
?>