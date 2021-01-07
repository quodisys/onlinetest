<?php

require 'PHPMailer/src/Exception.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class QuodisysMail {

	function __construct() {
		$this->mail = new PHPMailer;
		$this->mail->CharSet = "UTF-8";
		//$mail->SMTPDebug = 2;
		$this->mail->isSMTP();										// Set mailer to use SMTP
		$this->mail->Host = 'secure166.inmotionhosting.com';  		// Specify main and backup SMTP servers
		$this->mail->SMTPAuth = true;                               // Enable SMTP authentication
		$this->mail->Username = 'recruitment@qdsasia.com';               // SMTP username
		$this->mail->Password = 'Dec07qdshr!';                     // SMTP password
		$this->mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
		$this->mail->Port = 465;                                    // TCP port to connect to
		$this->mail->setFrom('recruitment@qdsasia.com', 'Quodisys');
		$this->mail->addAddress('hr@qdsasia.com');
		$this->mail->isHTML(true);                                  // Set email format to HTML
	}
	public function sendEmail($subject, $body) {
		$this->mail->Subject = $subject;
		$this->mail->Body    = $body;

		if(! $this->mail->send()) {
			return 0;
		} else {
			return 1;
		}
	}

}
