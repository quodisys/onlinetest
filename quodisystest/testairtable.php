<?php
$apikey = "keysuO520LMgC7x1q";

/*$json = '{"records":[{"fields":{"link_to_candidates":["receSm5vHjE73QIse"],"position_applied":"Web - Wordpress","iq_test":1,"mi_linguistic":0,"mi_logic":0,"mi_body_kinesthetic":0,"mi_spatial_visual":0,"mi_interpersonal":4,"mi_intrapersonal":4,"honesty_test":1,"attitude_test":10,"testing_language":"en","misc_notes":""}}],"typecast": true}';

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
echo "<pre>";
print_r($jsonret);
echo "</pre>";

$icmq_id = $jsonret['records'][0]['id'];*/

$jsonold = '{"records":[{"id":"receSm5vHjE73QIse","fields":{"recruitment_stage":"IQ\/MI Tests Complete"}}],"typecast":true}';

$json = '{"records":[{"id":"receSm5vHjE73QIse","fields":{"recruitment_stage":"☑️ IQ\/MI Tests Complete","link__iqmi_results":["recJrr8XihCOn1TPY"]}}]}';

echo "<pre>";
print_r(json_decode($json, TRUE));
echo "</pre>";

$url = "https://api.airtable.com/v0/appzc6U8ZGamKQRer/candidates";
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