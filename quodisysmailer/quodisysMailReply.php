<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class QuodisysMailReply {

	function __construct() {
		$this->mail = new PHPMailer;
		//$mail->SMTPDebug = 2;
		$this->mail->isSMTP();										// Set mailer to use SMTP
		$this->mail->Host = 'secure166.inmotionhosting.com';  		// Specify main and backup SMTP servers
		$this->mail->SMTPAuth = true;                               // Enable SMTP authentication
		$this->mail->Username = 'recruitment@qdsasia.com';               // SMTP username
		$this->mail->Password = 'Dec07qdshr!';                     // SMTP password
		$this->mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
		$this->mail->Port = 465;                                    // TCP port to connect to
		$this->mail->setFrom('recruitment@qdsasia.com', 'Quodisys');
		$this->mail->isHTML(true);                                  // Set email format to HTML
		$this->mail->AddEmbeddedImage('/qds-admin/images/thank_you_for_your_application_v3.png', 'thank_you');
	}
	public function sendEmail($subject, $body, $address) {

		$this->mail->Subject = $subject;
		$this->mail->Body    = $body;
		$this->mail->addAddress($address);
		if(! $this->mail->send()) {
			return 0;
		} else {
			return 1;
		}
	}
}
