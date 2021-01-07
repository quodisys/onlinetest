<?php
$db = "quodisys_onlinetest";
$user="root";
$pass="";
$host="localhost";
//$conn=new mysqli($host, $user, $pass) or die($mysqli->connect_error);
//mysqli_select_db($conn, $db);

$conn = mysqli_connect($host, $user, $pass, $db);
if (!$conn) {
    echo "Error: Unable to connect to MySQL." . PHP_EOL;
    echo "Debugging errno: " . mysqli_connect_errno() . PHP_EOL;
    echo "Debugging error: " . mysqli_connect_error() . PHP_EOL;
    exit;
}

$pwd_opt = ['cost' => 12,];

//define('HR_EMAIL', "hr@qdsasia.com");
define('HR_EMAIL', "srinanoo@gmail.com");

$alphabet = range('A', 'Z');
//echo $alphabet[3]; // returns D
//echo array_search('D', $alphabet);

/*$password = "qdstestsonline";
$pwd = password_hash($password, PASSWORD_BCRYPT, $pwd_opt);
$query = "INSERT INTO authentication (auth) VALUES('".$pwd."')";
echo $query."<br><br>";*/
?>