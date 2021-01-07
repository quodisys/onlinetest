<?php
$baseUrl = $_SERVER['PHP_SELF'];
if (isset($_POST['result']))
{
    sleep(1);
    $trueresult = array(
        " #1 : A"," #2 : 6"," #3 : 22,24"," #4 : E"," #5 : 27"," #6 : D", " #7 : C"," #8 : 48",
        " #9 : A"," #10 : 69237", " #11 : E", " #12 : C", " #13 : 9 , 3 , 2 , 6 , 1 , 3 , 6 , 3 , 3 , 3 , 2 , 5 , 5",
        " #14 : 51"," #15 : k,p"," #16 : E"," #17 : 8"," #18 : C"," #19 : 2.5,3"," #20 : B"," #21 : 0"," #22 : 42",
        " #23 : D"," #24 : 1a"," #25 : 31"," #26 : D"," #27 : 0.18,0.14"," #28 : C"," #29 : A"," #30 : E"
        );
    $result = $_POST['result'];
    $result_after_check = array();
    $result_after_check['rightanwser'] = 0;
    $result_after_check['unanwser'] = 0;
    for($i = 0;$i < 30;$i++)
    {
        if(strtoupper(str_replace(' ', '', $result[$i])) == strtoupper(str_replace(' ', '', $trueresult[$i]))) {
            $result_after_check['rightanwser'] = $result_after_check['rightanwser'] + 1;
        } else if (strpos($result[$i], '---n/a---') !== false) {
            $result_after_check['unanwser']  = $result_after_check['unanwser'] + 1;
        }
    }

    echo json_encode($result_after_check);
   die;
}
