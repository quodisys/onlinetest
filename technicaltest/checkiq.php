<?php
$baseUrl = $_SERVER['PHP_SELF'];
if (isset($_POST['result']))
{
    sleep(1);
    $result = $_POST['result'];
    $result_after_check = array();
    $result_after_check['basic_rightanwser'] = 0;
    $result_after_check['optional_rightanwser'] = 0;
    $result_after_check['unanwser'] = 0;
    $result_after_check['anwser'] = 0;
    $i = 0;
    foreach($result as $answer){
        $i++;
        $array_answer = explode(":",$answer);
        if (trim($array_answer[1] == trim($array_answer[2]))) {
            if($i <= 15) {
                $result_after_check['basic_rightanwser'] = $result_after_check['basic_rightanwser'] + 1;
            } else {
                $result_after_check['optional_rightanwser'] = $result_after_check['optional_rightanwser'] + 1;
            }
        }
        if (strpos($array_answer[1], '---n/a---') !== false) {
            $result_after_check['unanwser']  = $result_after_check['unanwser'] + 1;
        }
    }
    $result_after_check['anwser'] = $i - $result_after_check['unanwser'];
    echo json_encode($result_after_check);
    die;
}
?>
