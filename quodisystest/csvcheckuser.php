<?php
require_once("../login.php");
require_once("../config.php");
//require 'csvmanager.php';

$loginType = !isset($_POST['type']) ? 'iqqds' : $_POST['type'];

//$return = Csvmanager::checkUser($_POST['email'], $_POST['password'], $loginType);
$return = "";
if($_SESSION['cl']!="") {
	$sql = "select keyword, company from clients where id=".$_SESSION['cl'];
	$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
	$row = mysqli_fetch_assoc($rs);

	if($row['keyword']!="") {
		$_SESSION['comp'] = $row['keyword'];
		$sql1 = "select * from ".$row['keyword']."_candidates where id=".$_SESSION['ca']." and email='".$_POST['email']."' and password='".$_POST['password']."' and testsent='$loginType'";
		$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
		$row1 = mysqli_fetch_assoc($rs1);
		$count = mysqli_num_rows($rs1);
		if($count!=0) {
			if($row1['passwordused']==1) {
				$return = 'password_used';
			} else {
				$sql2 = "select * from ".$row['keyword']."_candidates_history where candidate=".$_SESSION['ca']." order by id desc limit 1";
				$rs2 = mysqli_query($conn, $sql2) or die(mysqli_error($conn));
				$row2 = mysqli_fetch_assoc($rs2);

				$today = date("Y-m-d H:i:s");
				$date_format = date( 'Y-m-d H:i:s', strtotime( '+48 hours', strtotime( $row2['createddate'] ) ) );

				if ( $today >= $date_format ) {
					$return = 'expired';
				} else {
					$sql1 = "update ".$row['keyword']."_candidates set passwordused=1 where id=".$_SESSION['ca'];
					$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));

					if($loginType=='iqqds')
						$iqtech = 'IQ Test Started';
					else {
						$topic = "";
						if(isset($_SESSION['po'])) {
							$sqlt = "select * from topics where id = ".$_SESSION['po'];
							$rst = mysqli_query($conn, $sqlt) or die(mysqli_error($conn));
							$rowt = mysqli_fetch_assoc($rst);
							$topic = $rowt['topic']." - ";
						}

						$iqtech = $topic.'Tech Test Started';
					}

					$sql1 = "insert into ".$row['keyword']."_candidates_history (candidate, status, createddate) values(".$_SESSION['ca'].", '".$iqtech."', '".date('Y-m-d H:i:s')."')";
					$rs1 = mysqli_query($conn, $sql1) or die(mysqli_error($conn));
				}
			}
		} else {
			$return = false;
		}
	} else {
		$return = false;
	}
} else {
	$return = false;
}



echo $return;
?>
