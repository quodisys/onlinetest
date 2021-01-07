<?php
session_start();

require_once('./config.php');

if(isset($_POST['hfsub']) && $_POST['hfsub']=="add") {
	$email = $_POST['email'];
	$password = $_POST['password'];
	$pwd = password_hash($password, PASSWORD_BCRYPT, $pwd_opt);
	$company = $_POST['company'];
	$keyword = substr(str_replace(" ", "", strtolower($company)), 0, 14);
	$website = $_POST['website'];
	$logo = $_POST['logo'];
	$fromname = $_POST['fromname'];
	$fromemail = $_POST['fromemail'];
	$toemail = $_POST['toemail'];
	$topics = $_POST['topics'];
	if(count($topics)>0) $topics = implode(",", $topics);
	$active = $_POST['active'];

	$sql = "select * from clients where email='$email'";
	$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	$count = mysqli_num_rows($result);

	if($count==0) {
		$sql = 'CREATE TABLE IF NOT EXISTS '.$keyword.'_candidates LIKE candidates';
		mysqli_query($conn, $sql) or die(mysqli_error($conn));

		$sql = 'CREATE TABLE IF NOT EXISTS '.$keyword.'_candidates_history LIKE candidates_history';
		mysqli_query($conn, $sql) or die(mysqli_error($conn));

		$sql = 'CREATE TABLE IF NOT EXISTS '.$keyword.'_candidates_results LIKE candidates_results';
		mysqli_query($conn, $sql) or die(mysqli_error($conn));

		$sql = "insert into clients (email, auth, company, keyword, website, logo, fromname, fromemail, toemail, topics, active, createddate) values('$email', '$pwd', '$company', '$keyword', '$website', '$logo', '$fromname', '$fromemail', '$toemail', '$topics', '$active', '".date('Y-m-d H:i:s')."')";
		mysqli_query($conn, $sql) or die(mysqli_error($conn));

		echo "Success!";
	} else {
		echo "Company already exists!";
		exit();
	}
} elseif(isset($_POST['hfsub']) && $_POST['hfsub']=="edit") {
	$id = $_POST['hfid'];
	$company = $_POST['company'];
	$email = $_POST['email'];
	$oldpassword = $_POST['oldpassword'];
	$password = $_POST['password'];
	$password1 = password_hash($password, PASSWORD_BCRYPT, $pwd_opt);
	$website = $_POST['website'];
	$logo = $_POST['logo'];
	$fromname = $_POST['fromname'];
	$fromemail = $_POST['fromemail'];
	$toemail = $_POST['toemail'];
	if(isset($_POST['topics'])) {
		$topics = $_POST['topics'];
		if(count($topics)>0) $topics = implode(",", $topics);
	} else $topics = "";
	$active = $_POST['active'];

	if($oldpassword=="" && $password=="") {
		$sql = "update clients set company='$company', active='$active', website='$website', logo='$logo', fromname='$fromname', fromemail='$fromemail', toemail='$toemail', topics='$topics', modifieddate='".date('Y-m-d H:i:s')."' where email='$email'";
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
			$sql = "update clients set company='$company', auth='$password1', active='$active', website='$website', logo='$logo', fromname='$fromname', fromemail='$fromemail', toemail='$toemail', topics='$topics' where email='$email'";
			mysqli_query($conn, $sql) or die(mysqli_error($conn));
			echo "Success!";
		}
	}
}
?>