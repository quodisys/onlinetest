<?php
require_once("../config.php");

require '../PHPMailer/src/Exception.php';
require '../PHPMailer/src/PHPMailer.php';
require '../PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Sendmail {
	const GUSER = 'mavutest@gmail.com';
	const GPWD = 'VuTheManh@gmail.com';
	const SMTPSERVER = 'secure166.inmotionhosting.com';
	const SMTPUSER = 'recruitment@qdsasia.com';
	const SMTPPWD = 'Dec07qdshr!';
	const SMTPPORT = 465;
	/**
	 * static function send
	 * Send mail
	 */
	public static function send ($to, $subject, $body, $is_gmail = true, $pdf_patch = null) {

		global $error;
		$mail = new PHPMailer;

		// $mail->SMTPDebug = 1;

		$mail->IsSMTP();
		$mail->SMTPAuth = true;
		$mail->IsHTML(true);
		$mail->CharSet = 'UTF-8';
		if ($is_gmail) {
			$mail->SMTPSecure = 'ssl';
			$mail->Host = 'smtp.gmail.com';
			$mail->Port = 465;
			$mail->Username = self::GUSER;
			$mail->Password = self::GPWD;
			$mail->SetFrom(self::SMTPUSER,"Recruitment");
		} else {
			$mail->SMTPSecure = 'ssl';
			$mail->Host = self::SMTPSERVER;
			$mail->Port = self::SMTPPORT;
			$mail->Username = self::SMTPUSER;
			$mail->Password = self::SMTPPWD;
			$mail->SetFrom(self::SMTPUSER,"Recruitment");
		}

		$mail->Subject = $subject;
		$mail->Body = $body;
		$mail->AddAddress($to);
		if(!empty($pdf_patch)){
			$mail->AddAttachment( dirname(__FILE__) . '/testresults/'.$pdf_patch, $pdf_patch);
		}
		/*if ($to != 'hr@qdsasia.com') {
			$mail->AddBCC('hr@qdsasia.com');
		}*/
		$mail->AddBCC(HR_EMAIL);

		if(!$mail->send()) {
			$error = 'Mail error: '.$mail->ErrorInfo;
			throw new \Exception('Mail error: '.$mail->ErrorInfo, 1);
			return false;
		} else {
			$error = 'Message sent!';
			return true;
		}
	}
}
