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

	$email = $results['testresults']['candidate_info']['email'];
	$sql = "select * from candidates where email = '".$email."' order by id desc limit 1";
	$id = "";

	$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	while($row = mysqli_fetch_assoc($rs)) {
		$id = $row['id'];
		$candidate_id = $row['airtable'];
	}

	//$Optional_tech_score = $results['testresults']['test_score'];
	$basic_score = $results['testresults']['test_score'];
	$optional_rightanwser = '"'.$results['testresults']['optional_rightanwser'].'"';
	$codelanguage = $results['testresults']['candidate_info']['codelanguage'];
	$level = $results['testresults']['candidate_info']['level'];
	$tech_results = 'Technical Test';

	$json_array = [
		'records' => [
			[
				'fields' => [
					'link_to_candidate' => [
						$candidate_id
					],
					//'Optional_tech_score' => $Optional_tech_score,
					'basic_score' => $basic_score,
					'optional_rightanwser' => $optional_rightanwser,
					'codelanguage' => $codelanguage,
					'level' => $level,
					'﹟tech_results' => $tech_results,
				]
			]
		],
		'typecast' => true
	];
	$json = json_encode($json_array);
	//print_r($json);
	//exit();
	$url = "https://api.airtable.com/v0/appzc6U8ZGamKQRer/tech_results";
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
		$sql = "insert into airtable set email = '".$email."', type = '".$jsonret['error']['type']."', message = '".$jsonret['error']['message']."', fromwhere='Technical Test', createddate = '".date("Y-m-d")."'";
		mysqli_query($conn, $sql) or die(mysqli_error($conn));

		echo $jsonret['error']['message'];
		exit();
	} else {
		echo "Airtable";

		$sql = "update candidates set airtable_tech = '".$jsonret['records'][0]['id']."' where id = ".$id;
		mysqli_query($conn, $sql) or die(mysqli_error($conn));
	}
}
?>