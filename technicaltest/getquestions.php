<?php
require 'google-api-php-client-2.2.4/vendor/autoload.php';
require_once('../config.php');

// Get the API client and construct the service object.
//$spreadsheetId = '1bSsrkmpLkpv7tSf0_x5u1cQ2DEfnVX1IcCDkS-_d0fM';
$spreadsheetId = '1tALnJlC3bri2J6nL4qjBSYwMvPs5bbtaozi14vdhX28';
$client = getClient();
$service = new Google_Service_Sheets($client);

/**
 * Returns an authorized API client.
 * @return Google_Client the authorized client object
 */
function getClient()
{
    $client = new Google_Client();
    $client->setApplicationName('Google Sheets API PHP Quickstart');
    $client->setScopes(Google_Service_Sheets::SPREADSHEETS_READONLY);
    $client->setAuthConfig('credentials.json');
    $client->setAccessType('offline');
    $client->setPrompt('select_account consent');

    // Load previously authorized token from a file, if it exists.
    // The file token.json stores the user's access and refresh tokens, and is
    // created automatically when the authorization flow completes for the first
    // time.
    $tokenPath = 'token.json';
    if (file_exists($tokenPath)) {
        $accessToken = json_decode(file_get_contents($tokenPath), true);
        $client->setAccessToken($accessToken);
    }

    // If there is no previous token or it's expired.
    if ($client->isAccessTokenExpired()) {
        // Refresh the token if possible, else fetch a new one.
        if ($client->getRefreshToken()) {
            $client->fetchAccessTokenWithRefreshToken($client->getRefreshToken());
        } else {
            // Request authorization from the user.
            $authUrl = $client->createAuthUrl();
            printf("Open the following link in your browser:\n%s\n", $authUrl);
            print 'Enter verification code: ';
            $authCode = trim(fgets(STDIN));

            // Exchange authorization code for an access token.
            $accessToken = $client->fetchAccessTokenWithAuthCode($authCode);
            $client->setAccessToken($accessToken);

            // Check to see if there was an error.
            if (array_key_exists('error', $accessToken)) {
                throw new Exception(join(', ', $accessToken));
            }
        }
        // Save the token to a file.
        if (!file_exists(dirname($tokenPath))) {
            mkdir(dirname($tokenPath), 0700, true);
        }
        file_put_contents($tokenPath, json_encode($client->getAccessToken()));
    }
    return $client;
}

// Prints the names and majors of students in a sample spreadsheet:
// https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
function randomGen($min = 1, $max = 15, $quantity = 15) {
    $max = ($max > 0) ? $max : 1;
    $numbers = range($min, $max);
    shuffle($numbers);
    return array_slice($numbers, 0, $quantity);
}

/**
 * Get array question
 */
function getarraylistnumber($values) {
    $level = $_POST['level'];
    $easy_question_number = 15;
    if ($level == 1) {
        $medium_question_number = round($easy_question_number * 0.5);
        $hard_question_number = round($easy_question_number * 0.4);
    } else if ($level == 2){
        $medium_question_number = round($easy_question_number * 0.7);
        $hard_question_number = round($easy_question_number * 0.1);
    } else if ($level == 3){
        $medium_question_number = round($easy_question_number * 0.6);
        $hard_question_number = round($easy_question_number * 0.4);
    } else {
        $medium_question_number = round($easy_question_number * 0.4);
        $hard_question_number = round($easy_question_number * 0.6);
    }
    $easy_question_number = $easy_question_number - $medium_question_number - $hard_question_number;
    $easy_question_array = array();
    $medium_question_array = array();
    $hard_question_array = array();
    $question_array = array();
    foreach ($values as $key => $row) {
		if($row['level'] == '' || $row['level'] == 'L'){
			$easy_question_array[] = $key;
		} else if ($row['level'] == 'M'){
			$medium_question_array[] = $key;
		} else {
			$hard_question_array[] = $key;
		}
    }

    if(count($hard_question_array) < $hard_question_number) {
        $medium_question_number = $medium_question_number + ($hard_question_number - count($hard_question_array));
    } else {
        shuffle($hard_question_array);
        $hard_question_array = array_slice($hard_question_array, 0, $hard_question_number);
    }
    if(count($medium_question_array) < $medium_question_number) {
        $easy_question_number = $easy_question_number + ($medium_question_number - count($medium_question_array));
    } else {
        shuffle($medium_question_array);
        $medium_question_array = array_slice($medium_question_array, 0, $medium_question_number);

    }

    shuffle($easy_question_array);
    $easy_question_array = array_slice($easy_question_array, 0, $easy_question_number);
    $question_array = array_merge($question_array, $hard_question_array);
    $question_array = array_merge($question_array, $medium_question_array);
    $question_array = array_merge($question_array, $easy_question_array);
    return $question_array;
}


/*************************************
 *          POST ACTION
 *************************************/
try {

} catch (\Exception $e) {

}

$questionstemp = array();
$questionsfinal = array();
$questions = array();
$answers = array();
if($_POST['position']!="") {
	$questionstemp = getQuestions($_POST['position']);

	$questionsfinal = $questionstemp;

	/*if(count($questionstemp)>15) {
		$data_temp = getarraylistnumber($questionstemp);

		foreach ($questionstemp as $key => $row) {
			if(!in_array($key, $data_temp)) {
				unset($questionstemp[$key]);
			}
		}

		$questionsfinal = array_values($questionstemp);
	} else {
		$questionsfinal = $questionstemp;
	}*/

	/*$sqlq = "select * from topics where id = ".$_POST['position'];
	$rsq = mysqli_query($conn, $sqlq) or die(mysqli_error($conn));
	$rowq = mysqli_fetch_assoc($rsq);
	if(isset($_POST['codelanguage']) && $_POST['codelanguage']!="") {
		$sqlqa = "select * from questions where topic in (SELECT id from topics where topic = '".$_POST['codelanguage']."') order by rand() limit 5";

		$questions = getQuestions($sqlqa);
	}
	$questionsfinal = array_merge($questionstemp, $questions);*/

	//echo count($questionsfinal);
	//print_r($questionsfinal);
}

function getQuestions($pos) {
	global $conn;
	$pos1 = explode(",", $pos);
	$i=0;
	$j=0;
	foreach($pos1 as $val) {
		$sqlqa = "select * from questions where topic = ".$val." order by rand() limit 15";

		$rsqa = mysqli_query($conn, $sqlqa) or die(mysqli_error($conn));
		while($rowqa = mysqli_fetch_assoc($rsqa)) {
			if($rowqa['type']=="Image" && $rowqa['file']!="") {
				$qt = "<br><br><img src='../questions/".$rowqa['file']."' style='max-width:100%'>";
				$questions[$i]["q"] = $rowqa['question'].$qt;
			} else if($rowqa['type']=="Audio" && $rowqa['file']!="") {
				$qt = "<br><br><audio src='../questions/".$rowqa['file']."' controls></audio>";
				$questions[$i]["q"] = $rowqa['question'].$qt;
			} else {
				$questions[$i]["q"] = $rowqa['question'];
			}
			$questions[$i]["ca"] = $rowqa['correct_answer'];
			$questions[$i]["level"] = $rowqa['active'];
			if($rowqa['correct_answer']!="" && strpos($rowqa['correct_answer'], ",")!==false)
				$questions[$i]["type"] = "checkbox";
			else
				$questions[$i]["type"] = "radio";
			$sqlqas = "select * from answers where question = ".$rowqa['id']." order by label";
			$rsqas = mysqli_query($conn, $sqlqas) or die(mysqli_error($conn));
			$j=0;
			if(isset($answers) && count($answers)>0) $answers = array();
			while($rowqas = mysqli_fetch_assoc($rsqas)) {
				//$answers[$j++] = "(".$rowqas['label'].") ".$rowqas['answer'];
				$answers[$j++] = array("alphabet"=>$rowqas['label'], "question"=>$rowqas['answer']);
			}
			if(count($answers)>0){
				$questions[$i]["answers"] = $answers;
				$i++;
			}
		}
	}
	return $questions;
}

echo json_encode($questionsfinal);
die;
