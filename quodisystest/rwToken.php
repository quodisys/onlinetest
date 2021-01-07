<?php
	class Token{
		public static function readToken(){
			$tokFile = fopen(dirname(__FILE__) . '/.token',"r");
			$secret = fgets($tokFile);
			fclose($tokFile);
			return $secret;
		}

		public static function writeToken($token){
			$tokFile = fopen(dirname(__FILE__) . '/.token',"w");
			fwrite($tokFile,$token);
			fclose($tokFile);
		}
	}
