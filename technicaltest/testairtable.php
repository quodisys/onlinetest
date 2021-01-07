<?php
$apikey = "keysuO520LMgC7x1q";

$json = '{"records":[{"fields":{"link_to_candidate":["receSm5vHjE73QIse"],"Optional_tech_score":2,"optional_rightanwser":"0","codelanguage":"","level":"3","﹟tech_results":"Technical Test"}}],"typecast":true}';

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
echo "<pre>";
print_r($jsonret);
echo "</pre>";

echo $jsonret['records'][0]['id'];

echo $jsonret['error']['type']."<br>".$jsonret['error']['message'];
?>