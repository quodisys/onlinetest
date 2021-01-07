<?php
require '../vendor/autoload.php';
require_once '../vendor/dompdf/dompdf/autoload.inc.php';
require_once '../vendor/dompdf/dompdf/lib/html5lib/Parser.php';
require_once '../vendor/dompdf/dompdf/lib/php-font-lib/src/FontLib/Autoloader.php';
require_once '../vendor/dompdf/dompdf/lib/php-svg-lib/src/autoload.php';
require_once '../vendor/dompdf/dompdf/src/Autoloader.php';
Dompdf\Autoloader::register();
use Dompdf\Dompdf;
use Dompdf\Options;
class PDFConvert {

	/**
	 * Pdf result of IQ test
	 */
	static public function createPDF ($content = null, $company = null, $position = null, $name = null) {
		$pdf = $content;

		$current_date = date('Ymdhis');
		try{
			$dompdf = new Dompdf();
			$dompdf->set_option('defaultFont', 'Courier');
			$dompdf->loadHtml($pdf,'UTF-8');

			// (Optional) Setup the paper size and orientation
			$dompdf->setPaper('A4', 'portrait');

			// Render the HTML as PDF
			$dompdf->render();
			$output = $dompdf->output();
			$name = preg_replace('/[^A-Za-z0-9\-]/', '', $name);
			$position = preg_replace('/[^A-Za-z0-9\-]/', '', $position);
			$fileName = 'iq_'.$company.'_'.$position.'_'.$name.'_'.$current_date.'.pdf';
		    file_put_contents( dirname(__FILE__) . '/testresults/'.$fileName, $output);
			return $fileName;
		} catch (Exception $e) {
		    return false;
		}

	}

	/**
	 * Pdf result of TECHNICAL test
	 */
	static public function createPDFTech ($company, $codelanguage, $name, $questions, $result, $total_attempted, $total_un_attempted, $basic_rightanwser, $optional_rightanwser, $level, $pdffile, $logo) {
			$questions_list_html = '';
			$i = 1;
			foreach($questions as $key => $question){
				//echo "PDF COVER: ".$key;
				//print_r($question);
				if ($question->level == '' || $question->level == 'L') {
					$level1 = '<img src="asset/images/easy.svg" alt="easy">';
				} else if ($question->level == 'M'){
					$level1 = '<img src="asset/images/medium.svg" alt="easy">';
				} else if ($question->level == 'H'){
					$level1 = '<img src="asset/images/hard.svg" alt="easy">';
				}
				$q = htmlspecialchars($question->q);
				$ca = htmlspecialchars($question->ca);

				$ans = "";
				foreach($question->answers as $anskey => $answers){
					$ans .= '<div class="col-sm-12 mar-top-30"><p>('.$answers->alphabet.') '.$answers->question.'</p></div>';
				}

				$answer_html = <<<EOF
				<div>
				    <div class="main-box radio-question">
				        <div class="main-content">
				            <div class="main-question">
				                <p style="font-family:'Roboto-Bold'">$i. $level1 $q </p>
				            </div>
				            <div class="main-answer text-left">
				                $ans
				            </div>
							<div class="main-answer text-left">
				                <p style="font-family:'Roboto-Bold'">Entered Answer: {{ea}} </p>
				            </div>
							<div class="main-answer text-left">
				                <p style="font-family:'Roboto-Bold'">Correct Answer: $ca </p>
				            </div>
				            <div class="clearfix"></div>
				        </div>
				    </div>
				</div>
EOF;
				$i++;
				$answer = $result[$key];
				$array_answer = explode(":",$answer);
				if ($array_answer[1] != '---n/a---'){
					$answer_html = str_replace("{{ea}}", $array_answer[1], $answer_html);
				} else {
					$answer_html = str_replace("{{ea}}", "N/A", $answer_html);
				}
				$questions_list_html = $questions_list_html.$answer_html;
			}
			$pdf = '
			<!DOCTYPE html>
			<html lang="en">

			<head>
			    <meta charset="UTF8">
			    <meta name="viewport" content="width=device-width, initial-scale=1.0">
			    <meta http-equiv="X-UA-Compatible" content="ie=edge">
			    <title>Technical Test Result</title>
			    <link rel="stylesheet" href="style.css">
			</head>
			<body>
			    <div class="container" ng-init="questions">
			        <style>
			            @charset "utf8";

			            @font-face {
			                font-family: "Roboto";
			                src: url("asset/fonts/Roboto-Regular.ttf");
						}
						@font-face {
			                font-family: "DejaVuSans";
			                src: url("asset/fonts/DejaVuSans.ttf");
			            }

			            @font-face {
			                font-family: "Roboto-Bold";
			                src: url("asset/fonts/Roboto-Bold.ttf");
						}

						body {
							font-family: "Roboto", sans-serif;
						}
			            .logo-container {
							font-family: "Roboto", sans-serif;
			                width: 100%;
							margin-top: 30px;
							margin-left: 180px;
						}

						input.trigger-radio:before { font-family: DejaVuSans !important; }
						label.radio-label {font-family: Roboto !important; }

			            .logo-container img {
			                width: 100%;
			            }
						.hiden-answer-A, .hiden-answer-B, .hiden-answer-C, .hiden-answer-D {
							display: none;
						}
			            .page-title {
			                font-family: "Roboto", sans-serif;
			                color: #47B383;
			                font-size: 24px;
			                font-weight: bold;
			                letter-spacing: -0.05px;
			                line-height: 28px;
						}


			            .page-title {
			                text-align: center;
			                margin-top: 50px;
			            }

			            .result-container {
			                margin-top: 40px;
			            }

			            .summary-container {
			                width: 25%;
			                float: left;
			            }

			            .summary-container {
			                font-family: "Roboto", sans-serif;
			                font-size: 14px;
			                letter-spacing: -0.03px;
			                line-height: 17px;
							border-radius: 2px;
							display: block;
							width: 100%;
							margin-bottom: 30px;
			            }

			            .summary-container .table-container {
			                width: 40%;
			                border: 1px solid #E6E6E6;
			                text-align: center;
			                padding-left: 15px;
			                padding-right: 15px;
							margin-left: 15px;
							margin: 0 auto;
			            }

			            .summary-container table {
			                width: 100%;
			                text-align: left;
			                border-collapse: collapse;
			            }

			            .summary-container thead tr th {
			                padding: 9px 0;
			                border-bottom: 1px solid #979797;
			            }

			            .summary-container thead tr {
			                font-family: proxima nova-Thin;
			                color: #D6BA69;
			                text-align: left;
			                text-transform: uppercase;
			            }

			            .summary-container tbody td {
			                padding: 8px 0;
			            }

			            .levels-note {
			                color: #6D6E70;
			                font-family: roboto regular;
			                font-size: 15px;
			                letter-spacing: -0.03px;
			                line-height: 18px;
			            }

			            .levels-note {
			                width: 71.5%;
			                margin-top: 15px;
			                margin-left: 15px;
			                display: flex;
			                justify-content: center;
			            }

			            .levels-note>div {
			                position: relative;
			            }

			            .levels-note>div:not(:last-child) {
			                margin-right: 30px;
			            }

			            .easy-level::before,
			            .medium-level::before,
			            .hard-level::before {
			                display: block;
			                content: "";
			                position: absolute;
			                top: -7px;
			                left: -16px;
			                width: 12px;
			                height: 32px;
			                background-repeat: no-repeat;
			            }

			            .easy-level::before {
			                background-image: url("../../../images/easy.svg");
			            }

			            .medium-level::before {
			                background-image: url("../../../images/medium.svg");
			            }

			            .hard-level::before {
			                background-image: url("../../../images/hard.svg");
			            }

			            .question-record {
							overflow: auto;
							padding-left: 15px;
			            }

			            .question-record:last-child {
			                margin-bottom: 30px;
			            }

			            .question-record:not(:first-child) {
			                margin-top: 30px;
			            }

			            .questions-container {
							width: 100%;
							display: block;
							margin-top: 30px;
							padding: 0 30px;
			            }

			            .no {
			                width: 3%;
			                float: left;
			            }

			            .number {
			                position: relative;
			            }

			            .number::before {
			                display: block;
			                content: "";
			                position: absolute;
			                top: 20px;
			                left: 0px;
			                width: 12px;
			                height: 32px;
			                background-repeat: no-repeat;
			            }

			            .number.easy-level::before {
			                background-image: url("../../../images/easy.svg");
			            }

			            .number.medium-level::before {
			                background-image: url("../../../images/medium.svg");
			            }

			            .number.hard-level::before {
			                background-image: url("../../../images/hard.svg");
			            }

			            .no,
			            .question-title,
			            .multiple-choices .title {
			                color: #6D6E70;
			                font-family: roboto bold;
			                font-size: 18px;
			                font-weight: bold;
			                letter-spacing: -0.03px;
			                line-height: 21px;
			            }

			            .content {
			                width: 97%;
			                float: left;
			            }

			            .question-content {
			                margin-top: 12px;
			                color: #6D6E70;
			                font-family: roboto regular;
			                font-size: 15px;
			                letter-spacing: -0.03px;
			                line-height: 18px;
			            }

			            .multiple-choices {
			                margin-top: 12px;
			            }

			            .choices {
			                display: flex;
			                flex-wrap: wrap;
			                width: 35%;
			                margin-top: 17px;
			            }

			            .choices {
			                color: #6D6E70;
			                font-family: roboto regular;
			                font-size: 15px;
			                letter-spacing: -0.03px;
			                line-height: 18px;
			            }

			            .choices>li {
			                width: 50%;
			            }

			            .choices>li:nth-child(3),
			            .choices>li:nth-child(4) {
			                margin-top: 30px;
			            }

			            ul.choices {
			                list-style-type: none;
			                padding: 0;
			                display: flex;
			            }

			            .choices li {
			                position: relative;
			            }

			            .choices li.right-answer::after {
			                display: block;
			                content: "";
			                position: absolute;
			                top: 50%;
			                right: 40px;
			                width: 14px;
			                height: 14px;
			                background-repeat: no-repeat;
			                background-image: url(../../../images/accepted.svg);
			                transform: translateY(-50%);
			            }

			            ul.choices li input[type=radio] {
			                position: absolute;
			                visibility: hidden;
			            }

			            ul.choices li label {
			                display: block;
			                position: relative;
			                margin: 0 auto;
			                z-index: 9;
			                padding-left: 28px;
			            }

			            ul.choices li .check {
			                position: absolute;
			                border-radius: 100%;
			                height: 21px;
			                width: 21px;
			                z-index: 5;
			                top: 50%;
			                transform: translateY(-50%);
			                border: 1px solid #6D6E70;
			            }

			            ul.choices li input[type=radio]:checked~.check {
			                background: #D6BA69;
			            }
			        </style>
			        <!--<div class="logo-container text-center">{logo}</div>-->
			        <div class="page-title" style="font-family: "Roboto";">Technical Test Result</div>
			        <div class="result-container">
			            <div class="summary-container">
			                <div class="table-container">
			                    <table>
									<tbody>
										<tr>
			                                <td style="font-weight: bold; color:#2DB384; text-transform: uppercase;">Description</td>
			                                <td style="font-weight: bold; color:#2DB384; text-transform: uppercase;">Status</td>
			                            </tr>
			                            <tr>
			                                <td>Attempted Questions</td>
			                                <td>{total_attempted}</td>
			                            </tr>
			                            <tr>
			                                <td>Blank Answer</td>
			                                <td>{total_un_attempted}</td>
			                            </tr>
			                            <tr>
			                                <td>Basic Correct</td>
			                                <td>{basic_rightanwser}</td>
			                            </tr>
			                            <tr>
			                                <td>Optional Correct</td>
			                                <td>{optional_rightanwser}</td>
			                            </tr>
										<tr>
			                                <td>Level</td>
			                                <td>{level}</td>
			                            </tr>
										<tr>
			                                <td>What else you are good at? </td>
			                                <td>{codelanguage}</td>
			                            </tr>
			                        </tbody>
								</table>
			                </div>

			            </div>
			            <div class="questions-container">
			                <div class="question-record">
			                    <div class="question">
			                        {questions_list}
			                    </div>
			            </div>
			        </div>
			    </div>
			    </div>
			</body>
			</html>
			';

			$questions_list_html = str_replace("{{globalConfig.rootImage}}",'../technicaltest/asset/images/',$questions_list_html);
			//$pdf = str_replace("{logo}",'<img src="'.$logo.'" width="200">',$pdf);
			$pdf = str_replace("{total_attempted}",$total_attempted,$pdf);
			$pdf = str_replace("{total_un_attempted}",$total_un_attempted,$pdf);
			$pdf = str_replace("{basic_rightanwser}",$basic_rightanwser,$pdf);
			$pdf = str_replace("{optional_rightanwser}",$optional_rightanwser,$pdf);
			$pdf = str_replace("{questions_list}",$questions_list_html,$pdf);
			$pdf = str_replace("{level}",$level,$pdf);
			$pdf = str_replace("{codelanguage}",$codelanguage,$pdf);
			$current_date = date('Ymdhis');

			try {
				$dompdf = new Dompdf();
				$dompdf->loadHtml($pdf, 'UTF-8');
				$dompdf->render();
				$output = $dompdf->output();
				//$name = preg_replace('/[^A-Za-z0-9\-]/', '', $name);
				$pdffile = str_replace(' ', '', $pdffile);
				//$fileName = $current_date . '_' . 'tech_'  . $company . '_' . $name . '.pdf';
				$fileName = 'tech_' . $pdffile . '_' . $current_date . '.pdf';
				file_put_contents( dirname(__FILE__) . '/testresults/' . $fileName, $output );
				return $fileName;
			} catch (\Exception $e) {
				return false;
			}
	}
}