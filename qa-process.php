<?php
session_start();

require_once('./config.php');
$target_dir = "questions/";
$allowed = array("jpg", "jpeg", "png", "gif", "mp3");
$current_date = date('Ymdhis');

if(isset($_POST['hfsub']) && $_POST['hfsub']=="add") {
	$topic = $_POST['hftopic'];
	$question = mysqli_real_escape_string($conn, $_POST['question']);
	$level = $_POST['level'];
	$totalanswers = $_POST['hftotans'];
	$correctanswer = implode(",",$_POST['correctanswer']);
	$type = $_POST['type'];
	$answers = "";
	$answersql = "";
	$file = "";

	if(isset($_FILES["flq"]) && $_FILES["flq"]["error"] == 0){
		$filename1 = $_FILES["flq"]["name"];
		$filetype1 = $_FILES["flq"]["type"];
		$filesize1 = $_FILES["flq"]["size"];

		$target_file = $target_dir . basename($_FILES["flq"]["name"]);

		if (file_exists($target_file)) {
			echo "Sorry, file already exists.";
			exit();
		}

		$ext = pathinfo($filename1, PATHINFO_EXTENSION);
		if(!in_array($ext, $allowed)) {
			echo "Error in uploading the attachment. Please check the file size and/or type (note: ONLY jpg, jpeg, png, gif, mp3 files and upto 1MB) and try again!";
			exit();
		}

		// Verify file size - 1MB maximum
		$maxsize = 1 * 1024 * 1024;
		if($filesize1 > $maxsize) {
			echo "Error in uploading the attachment. Please check the file size and/or type (note: ONLY jpg, jpeg, png, gif, mp3 files and upto 1MB) and try again!";
			exit();
		} else {
			$filename1 = $current_date."-".$filename1;
			move_uploaded_file($_FILES["flq"]["tmp_name"], $target_dir . $filename1);
		}
	} else{
		echo "Error in uploading the attachment. Please try again!";
		exit();
	}

	if($_FILES["flq"]["name"]!="") $file = $current_date."-".$_FILES["flq"]["name"];

	$sql = "select * from questions where topic=$topic and question='$question'";
	$result = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	$count = mysqli_num_rows($result);

	if($count==0) {
		$sql = "insert into questions (topic, question, correct_answer, active, type, file) values($topic, '$question', '$correctanswer', '$level', '$type', '$file')";
		mysqli_query($conn, $sql) or die(mysqli_error($conn));
		$qid = mysqli_insert_id($conn);

		for($i=1,$j=0; $i<=$totalanswers; $i++,$j++) {
			if($_POST['answer'.$i]!="") {
				$answers = mysqli_real_escape_string($conn, $_POST['answer'.$i]);
				$answersql .= "($qid, '$answers', '$alphabet[$j]'),";
			}
		}
		if($answersql!="") {
			$answersql = "insert into answers (question, answer, label) values ".substr($answersql, 0, strlen($answersql)-1);
			mysqli_query($conn, $answersql) or die(mysqli_error($conn));
			echo "Success!";
		} else {
			echo "Please try again. ".mysqli_error($conn);
			exit();
		}
	} else {
		echo "Question already exists!";
		exit();
	}

} elseif(isset($_POST['hfsub']) && $_POST['hfsub']=="edit") {
	$topic = $_POST['hftopic'];
	$id = $_POST['hfid'];
	$question = mysqli_real_escape_string($conn, $_POST['question']);
	$level = $_POST['level'];
	$totalanswers = $_POST['hftotans'];
	$correctanswer = implode(",",$_POST['correctanswer']);
	$type = $_POST['type'];
	if(isset($_POST['keepfile'])) $keepfile = $_POST['keepfile']; else $keepfile = "";
	$answers = "";
	$answersid = "";
	$answersql = "";

	if(isset($_FILES["flq"]) && $_FILES["flq"]["error"] == 0){
		$filename1 = $_FILES["flq"]["name"];
		$filetype1 = $_FILES["flq"]["type"];
		$filesize1 = $_FILES["flq"]["size"];

		$target_file = $target_dir . basename($_FILES["flq"]["name"]);

		if (file_exists($target_file)) {
			echo "Sorry, file already exists.";
			exit();
		}

		$ext = pathinfo($filename1, PATHINFO_EXTENSION);
		if(!in_array($ext, $allowed)) {
			echo "Error in uploading the attachment. Please check the file size and/or type (note: ONLY jpg, jpeg, png, gif, mp3 files and upto 1MB) and try again!";
			exit();
		}

		// Verify file size - 1MB maximum
		$maxsize = 1 * 1024 * 1024;
		if($filesize1 > $maxsize) {
			echo "Error in uploading the attachment. Please check the file size and/or type (note: ONLY jpg, jpeg, png, gif, mp3 files and upto 1MB) and try again!";
			exit();
		} else {
			$filename1 = $current_date."-".$filename1;
			move_uploaded_file($_FILES["flq"]["tmp_name"], $target_dir . $filename1);
		}
	}

	if($_FILES["flq"]["name"]!="") $file = $current_date."-".$_FILES["flq"]["name"]; else $file = "";

	$sql = "update questions set question='$question', correct_answer='$correctanswer', active='$level', type='$type'";
	if($keepfile!="Y" && $file!="") $sql .= ", file='$file'";
	$sql .= " where id = ".$id;
	mysqli_query($conn, $sql) or die(mysqli_error($conn));

	for($i=1,$j=0; $i<=$totalanswers; $i++,$j++) {
		$answers = mysqli_real_escape_string($conn, $_POST['answer'.$i]);
		$answersid = mysqli_real_escape_string($conn, $_POST['answerid'.$i]);
		if($answers!="") {
			if($answersid!="")
				$answersql = "update answers set answer = '$answers', label = '$alphabet[$j]' where id = $answersid";
			else
				$answersql = "insert into answers set question = $id, answer = '$answers', label = '$alphabet[$j]'";
		} elseif($answersid!="") {
			$answersql = "delete from answers where id = $answersid";
		}
		if($answersql!="") mysqli_query($conn, $answersql) or die(mysqli_error($conn));
		$answers = "";
		$answersid = "";
		$answersql = "";
	}
	echo "Success!";
}
?>