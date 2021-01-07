<?php
session_start();

require_once('./config.php');

if(isset($_POST['hfsub']) && $_POST['hfsub']=="add") {
	$topic = $_POST['topic'];
	$active = $_POST['active'];

	$sql = "select * from topics where topic='$topic'";
	$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	$count = mysqli_num_rows($result);

	if($count==0) {
		$sql = "insert into topics (topic, active) values('$topic', '$active')";
		mysqli_query($conn, $sql) or die(mysqli_error($conn));
		echo "Success!";
	} else {
		echo "Topic already exists!";
		exit();
	}
} elseif(isset($_POST['hfsub']) && $_POST['hfsub']=="edit") {
	$id = $_POST['hfid'];
	$topic = $_POST['topic'];
	$active = $_POST['active'];

	$sql = "update topics set topic='$topic', active='$active' where id=".$id;
	mysqli_query($conn, $sql) or die(mysqli_error($conn));
	echo "Success!";
}
?>