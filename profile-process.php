<?php
session_start();

require_once('./config.php');

if(isset($_POST['hfsub']) && $_POST['hfsub']=="edit") {
	$email = $_POST['email'];
	$company = $_POST['company'];
	$oldpassword = $_POST['oldpassword'];
	$password = $_POST['password'];
	$password1 = password_hash($password, PASSWORD_BCRYPT, $pwd_opt);
	$website = $_POST['website'];
	$logo = $_POST['logo'];
	$fromname = $_POST['fromname'];
	$fromemail = $_POST['fromemail'];
	$toemail = $_POST['toemail'];

	if($oldpassword=="" && $password=="") {
		$sql = "update clients set company='$company', website='$website', logo='$logo', fromname='$fromname', fromemail='$fromemail', toemail='$toemail', modifieddate='".date('Y-m-d H:i:s')."' where email='$email'";
		mysqli_query($conn, $sql) or die(mysqli_error($conn));
		echo "Success!";
	} else {
		$sql = "select auth from clients where email='$email'";
		$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
		$count = mysqli_num_rows($rs);
		$row = mysqli_fetch_assoc($rs);

		$pwd = $row["auth"];

		if($count==0 || !password_verify($oldpassword, $pwd)) {
			echo "Old Password didn't match!";
			exit();
		} else {
			$sql = "update clients set company='$company', auth='$password1', website='$website', logo='$logo', fromname='$fromname', fromemail='$fromemail', toemail='$toemail' where email='$email'";
			mysqli_query($conn, $sql) or die(mysqli_error($conn));
			echo "Success!";
		}
	}
}
?>