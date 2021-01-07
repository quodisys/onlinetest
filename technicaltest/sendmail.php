<?php
// require '../PHPMailer/src/Exception.php';
// require '../PHPMailer/src/PHPMailer.php';
// require '../PHPMailer/src/SMTP.php';
//
// use PHPMailer\PHPMailer\PHPMailer;
// use PHPMailer\PHPMailer\Exception;
//
// class Sendmail {
//
// 	const GUSER = 'mavutest@gmail.com';
// 	const GPWD = 'VuTheManh@gmail.com';
// 	const SMTPSERVER = 'secure166.inmotionhosting.com';
// 	const SMTPUSER = 'recruitment@quodisys.com';
// 	const SMTPPWD = '2018HRsuccess';
// 	const SMTPPORT = 465;
// 	/**
// 	 * static function send
// 	 * Send mail
// 	 */
// 	public static function send ($to, $subject, $body, $is_gmail = true, $pdf_patch = null) {
// 		throw new \Exception("Send mail aaaaaaaaaaaaaaaaaaaa", 1);
//
// 		global $error;
// 		$mail = new PHPMailer;
//
// 		//$mail->SMTPDebug = 1;
//
// 		$mail->IsSMTP();
// 		$mail->SMTPAuth = true;
// 		$mail->IsHTML(true);
// 		$mail->CharSet = 'UTF-8';
// 		if ($is_gmail) {
// 			$mail->SMTPSecure = 'ssl';
// 			$mail->Host = 'smtp.gmail.com';
// 			$mail->Port = 465;
// 			$mail->Username = self::GUSER;
// 			$mail->Password = self::GPWD;
// 		} else {
// 			$mail->SMTPSecure = 'ssl';
// 			$mail->Host = self::SMTPSERVER;
// 			$mail->Port = self::SMTPPORT;
// 			$mail->Username = self::SMTPUSER;
// 			$mail->Password = self::SMTPPWD;
// 			$mail->SetFrom(self::SMTPUSER,"Recruitment");
// 		}
//
// 		$mail->Subject = $subject;
// 		$mail->Body = $body;
// 		$mail->AddAddress($to);
// 		if(!empty($pdf_patch)){
// 			$mail->AddAttachment('testresults/'.$pdf_patch, $pdf_patch);
// 		}
// 		if ($to != 'ha.dinh@quodisys.com') {
// 			$mail->AddBCC('ha.dinh@quodisys.com');
// 		}
//
// 		if(!$mail->send()) {
// 			$error = 'Mail error: '.$mail->ErrorInfo;
// 			return false;
// 		} else {
// 			$error = 'Message sent!';
// 			return true;
// 		}
// 	}
// }
