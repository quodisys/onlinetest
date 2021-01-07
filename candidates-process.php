<?php
session_start();

require_once('./config.php');

if(isset($_POST['hfsub']) && $_POST['hfsub']=="edit") {
	$id = $_POST['hfid'];
	$status = $_POST['status'];

	$sql = "update candidates set status='$status', modifieddate='".date("Y-m-d")."' where id=".$id;
	mysqli_query($conn, $sql) or die(mysqli_error($conn));
	echo "Success!";
}
?>