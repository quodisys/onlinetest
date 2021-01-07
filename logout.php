<?php
session_start();

if(isset($_SESSION['usertype'])) $t = $_SESSION['usertype'];

unset($_SESSION['user']);
unset($_SESSION['userid']);
unset($_SESSION['usertype']);
unset($_SESSION["keyword"]);
unset($_SESSION["company"]);
unset($_SESSION["website"]);
unset($_SESSION["logo"]);

if($t==0) header("Location: admin.php"); else header("Location: index.php");
?>