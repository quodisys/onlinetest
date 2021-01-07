<?php
	header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
	header("Cache-Control: post-check=0, pre-check=0", false);
	header("Pragma: no-cache");

	require 'csvmanager.php';

	$search = isset($_GET['search']) ? trim($_GET['search']) : '';

	if(isset($_GET['order']) && isset($_GET['type'])) {
	    $list_users = Csvmanager::search( $search, $_GET['order'], $_GET['type']);
	} else {
	    $list_users = Csvmanager::search( $search );
	}

	require '../config.php';
?>
<form method="POST">
	<div id="gennerate">
		<h3>Code Generate</h3>
		<div class="d-flex">
			<input type="text" id="code" name="token" class="form-control"/>
			<button type="button" onclick="generateCode()" class="button">
				Generate
			</button>
		</div>
	</div>
	<div id="passwordsetting">
		<h3>User Password Setting</h3>
		<div class="form-group d-flex">
			<input type="hidden" id="info_user" name="info_user" value="true"/>
			<input type="text" id="fname" name="fname"  class="form-control" placeholder="First Name" onkeypress="return blockSpecialChar(event)"/>
			<input type="text" id="lname" name="lname"  class="form-control" placeholder="Last Name" onkeypress="return blockSpecialChar(event)"/>
			<input type="email" id="email" name="email"  class="form-control" placeholder="Email"/>
			<input type="text" id="password" name="password" class="form-control" placeholder="Password" maxlength="8" />
			<button type="button" onclick="generateAccount()" class="button">
				Random password
			</button>
			<button type="button" onclick="cleanUserFields()" class="button btn-second">Clear</button>
		</div>
		<div class="submit-contain">
			<button type="button" onclick="submitForm(this)" class="button submit btt-stage" value="Submit">
				<span style='display: none;'><i class='fa fa-spinner fa-spin'></i> </span>
				Submit
			</button>
			<p class="alert"></p>
		</div>


		<hr>
		<div class="form-group" style="text-align:left">
			<input type="text" name="search" id="search-mct" placeholder="Search member" />
		</div>
		<table class="userlist">
			<style>
				@font-face {
					font-family: 'icomoon';
					src: url('asset/fonts/icomoon.eot?rh3nn8');
					src: url('asset/fonts/icomoon.eot?rh3nn8#iefix') format('embedded-opentype'),
						url('asset/fonts/icomoon.ttf?rh3nn8') format('truetype'),
						url('asset/fonts/icomoon.woff?rh3nn8') format('woff'),
						url('asset/fonts/icomoon.svg?rh3nn8#icomoon') format('svg');
					font-weight: normal;
					font-style: normal;
					font-display: block;
				}

				[class^="icon-"],
				[class*=" icon-"] {
					/* use !important to prevent issues with browser extensions that change fonts */
					font-family: 'icomoon' !important;
					speak: none;
					font-style: normal;
					font-weight: normal;
					font-variant: normal;
					text-transform: none;
					line-height: 1;

					/* Better Font Rendering =========== */
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
				}

				.icon-checkmark:before {
					content: "\e900";
				}

				.icon-close:before {
					content: "\e901";
				}
				.send-status i {
					position: relative;
					top: 2px;
					color: #6EBE44;
				}
				.begin_sort {
					cursor: pointer;
					background-repeat: no-repeat;
					padding-right: 20px !important;
					padding-top: 3px;
					background-position-y: 4px !important;
					background-position-x: 8px !important;
					background-size: 12px;
					background-image: url('/images/begin.svg') !important;
				}
				.sort_asc {
					cursor: pointer;
					background-repeat: no-repeat;
					padding-right: 20px;
					background-position-y: 4px;
					background-position-x: 8px;
					background-size: 9px;
					background-image: url('/images/up arrow.svg');
				}
				.sort_desc {
					cursor: pointer;
					background-repeat: no-repeat;
					padding-right: 20px;
					background-position-y: 5px;
					background-position-x: 8px;
					background-size: 9px;
					background-image: url('/images/down arrow.svg');
				}
				thead tr th {
					user-select: none;
					-webkit-user-select: none;
					-moz-user-select: none;
				}
				/* Awesome Modal CSS */
				.awesome-modal {
					display: none;
					background-color: #fff;
					border: 1px solid #979797;
					/* box-shadow: 0 0 26px 0 rgba(0, 0, 0, 0.2); */
					border-radius: 4px;
					padding: 1rem 2rem;
					width: 380px;
					max-width: 80%;
					position: fixed;
					top: 50%;
					left: 50%;
					-webkit-transform: translate3d(-50%, -50%, 0);
					transform: translate3d(-50%, -50%, 0);
					overflow: hidden;
					z-index: 999;
					-webkit-animation: bounce .4s ease forwards;
					animation: bounce .4s ease forwards;
				}
				.awesome-modal p {
					margin-bottom: 15px;
					font-size: 13px;
				}
				.awesome-modal * {
					-webkit-backface-visibility: hidden;
					backface-visibility: hidden;
				}

				.awesome-overlay {
					display: none;
					background-color: rgba(255, 255, 255, 0.7);
					position: fixed;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					z-index: 998;
					overflow: hidden;
					cursor: default;
				}

				.close-icon {
					position: absolute;
					width: 1rem;
					height: 1rem;
					top: .7rem;
					right: .7rem;
					transition: opacity .2s ease;
				}

				.close-icon::before,
				.close-icon::after {
					content: '';
					position: absolute;
					top: 50%;
					left: 50%;
					width: inherit;
					height: 2px;
					background-color: #999;
				}

				.close-icon::before {
					-webkit-transform: translate(-50%, -50%) rotate(45deg);
					transform: translate(-50%, -50%) rotate(45deg);
				}

				.close-icon::after {
					-webkit-transform: translate(-50%, -50%) rotate(135deg);
					transform: translate(-50%, -50%) rotate(135deg);
				}

				.modal-title {
					margin-top: 0;
					text-align: center;
				}

				:target {
					display: block;
				}

				:target~.awesome-overlay {
					display: block;
				}

				@-webkit-keyframes bounce {
					0% {
						-webkit-transform: translate3d(-50%, -50%, 0) scale(0.7);
						transform: translate3d(-50%, -50%, 0) scale(0.7);
					}

					45% {
						-webkit-transform: translate3d(-50%, -50%, 0) scale(1.05);
						transform: translate3d(-50%, -50%, 0) scale(1.05);
					}

					80% {
						-webkit-transform: translate3d(-50%, -50%, 0) scale(0.95);
						transform: translate3d(-50%, -50%, 0) scale(0.95);
					}

					100% {
						-webkit-transform: translate3d(-50%, -50%, 0) scale(1);
						transform: translate3d(-50%, -50%, 0) scale(1);
					}
				}

				@keyframes bounce {
					0% {
						-webkit-transform: translate3d(-50%, -50%, 0) scale(0.7);
						transform: translate3d(-50%, -50%, 0) scale(0.7);
					}

					45% {
						-webkit-transform: translate3d(-50%, -50%, 0) scale(1.05);
						transform: translate3d(-50%, -50%, 0) scale(1.05);
					}

					80% {
						-webkit-transform: translate3d(-50%, -50%, 0) scale(0.95);
						transform: translate3d(-50%, -50%, 0) scale(0.95);
					}

					100% {
						-webkit-transform: translate3d(-50%, -50%, 0) scale(1);
						transform: translate3d(-50%, -50%, 0) scale(1);
					}
				}

				#close {
					position: fixed;
					top: 50%;
					-webkit-transform: translateY(-50%);
					transform: translateY(-50%);
				}

				/*
				* You can add the class 'stop-scrolling' to
				* body tag (with JS), to prevent page scroll
				*/
				body.stop-scrolling {
					height: 100%;
					overflow: hidden;
				}

				* {
					box-sizing: border-box;
				}

				.btn {
					background-color: #8adcb3;
					color: #fff;
					padding: 0.5rem 1rem;
					display: inline-block;
					text-decoration: none;
					border-radius: 0.3rem;
					transition: 0.2s;
				}

				.btn:hover {
					background-color: #76c79f;
				}

				.btn:active {
					-webkit-transform: scale3d(0.9, 0.9, 1);
					transform: scale3d(0.9, 0.9, 1);
				}

				.btn+.btn {
					margin-left: 1.5rem;
				}

				.btn-modal {
					padding-top: 4px;
				}
				.button.btn-send {
					display: block;
					margin: 30px auto;
					margin-top: 25px;
					margin-bottom: 5px;
				}
				/* Choice */
				ul.level-choice,
				ul.strength-choice {
					list-style-type: none;
					margin: 0;
					padding: 0;
					/*display: flex;
					flex-wrap: wrap;*/
					display: grid;
					grid-template-columns: auto auto auto;
					user-select: none;
					-moz-user-select: none;
					-ms-user-select: none;
					-webkit-user-select: none;
				}

				.level-choice li,
				.strength-choice li {
					/* flex-grow: 1; */
					position: relative;
				}

				.awesome-modal .level-choice li,
				.awesome-modal .strength-choice li {
					color: #4A4A4A;
					font-family: "Proxima Nova";
					font-size: 14px;
					letter-spacing: -0.03px;
					line-height: 17px;
					margin-right: 25px;
				}

				ul.level-choice li input[type=radio],
				ul.strength-choice li input[type=radio] {
					position: absolute;
					visibility: hidden;
				}

				.awesome-modal ul.level-choice li label,
				.awesome-modal ul.strength-choice li label {
					display: block;
					position: relative;
					margin: 0 auto;
					cursor: pointer;
					z-index: 9;
					padding-left: 20px;
					font-size: 13px;
				}

				ul.level-choice li .check,
				ul.strength-choice li .check {
					position: absolute;
					border-radius: 100%;
					height: 21px;
					width: 21px;
					z-index: 5;
					top: 50%;
					transform: translateY(-50%);
					border: 1px solid #6D6E70;
				}

				ul.level-choice li input[type=radio]:checked~.check,
				ul.strength-choice li input[type=radio]:checked~.check {
					background: #D6BA69;
				}
				.awesome-modal .checkbox-mask::before {
					content: "";
					width: 15px;
					height: 15px;
					font-size: 20px;
					position: absolute;
					border-width: 1px;
					border-style: solid;
					border: 1px solid #6D6E70;
					border-image: initial;
					border-radius: 50%;
					left: 0;
					top: 2px;
				}
				.awesome-modal .checkbox-mask:after {
					content: '';
					border-radius: 50%;
					opacity: 0;
					position: absolute;
					left: 1px;
					top: 3px;
					font-size: 14px;
					font-weight: 300;
					color: #F16527;
					line-height: 20px;
					background-repeat: no-repeat;
					overflow: hidden;
					width: 15px;
					height: 15px;
					background: #D6BA69;
				}
			</style>

			<thead>
				<tr>
					<th style="width: 5%">ID <a class="sort_asc sort_id begin_sort"></a><a class="sort_asc sort_id" style="display:none;"></a><a class="sort_desc sort_id" style="display:none;"></a></th>
                    <th style="width: 15%">NAME <a class="sort_asc sort_name begin_sort"></a><a class="sort_asc sort_name" style="display:none;"></a><a class="sort_desc sort_name" style="display:none;"></a></th>
					<th style="width: 20%">EMAIL <a class="sort_asc sort_email begin_sort"></a><a class="sort_asc sort_email" style="display:none;"></a><a class="sort_desc sort_email" style="display:none;"></a></th>
					<th style="width: 15%">APPLY TO <a class="sort_asc sort_apply begin_sort"></a><a class="sort_asc sort_apply" style="display:none;"></a><a class="sort_desc sort_apply" style="display:none;"></a></th>
                    <th style="width: 15%">EXPIRE DATE <a class="sort_asc sort_expiredate begin_sort"></a><a class="sort_asc sort_expiredate" style="display:none;"></a><a class="sort_desc sort_expiredate" style="display:none;"></a></th>
					<th style="width: 10%">TEST STATUS <a class="sort_asc sort_status begin_sort"></a><a class="sort_asc sort_status" style="display:none;"></a><a class="sort_desc sort_status" style="display:none;"></a></th>
					<th style="width: 10%"></th>
					<th style="width: 10%"></th>
				</tr>
			</thead>
			<tbody>
				<?php
					if(!empty($list_users)) {
						foreach($list_users as $key => $user) {
							$var = $user[6];
							$date = str_replace('/', '-', $var);
							$date_format = date('d/m/Y H:i:s', strtotime('+48 hours', strtotime($date)));

							$status = '<span style="color:#ffc107">Not test</span>';

							if (!empty($user[8])) {
								$status = '<span style="color:#28a745">Done</span>';
							} else if (empty($user[8]) && !empty($user[5])) {
								$status = 'Tested IQ';
							}
							$level = '';
							if($user[10] == 1) {
								$level = "Intern";
							} else if ($user[10] == 2) {
								$level = "Junior";
							} else if ($user[10] == 3) {
								$level = "Mid - level";
							} else if ($user[10] == 4) {
								$level = "Senior";
							}

							if($user[11] == 'vn') {
								$language = 'Vietnamese';
							} else {
								$language = 'English';
							}

							if($user[13] == 'vn') {
								$language = 'Vietnamese';
							} else {
								$language = 'English';
							}

							$send_mail = '<td></td>';
							if ($user[14] == 1) {
								$send_mail = '<td class="send-status"><i class="icon-checkmark" title="sent email to this candidate"></i></td>';
							}

							if(is_numeric($user[0])) {

								$linkIq 	= '';
								$linkTech 	= '';

								try {
									$data 		= json_decode( $user[9], true );
									$linkIq 	= isset( $data['iq'] ) ? 'testresults/' . $data['iq'] : '';
									$linkTech 	= isset( $data['tech'] ) ? 'testresults/' . $data['tech'] : '';
								} catch (\Exception $e) {
									if ( strpos($user[9], 'tech_') === false ){
										$linkIq 	= 'testresults/' . $user[9];
									} else {
										$linkTech 	= 'testresults/' . $user[9];
									}
								}

								$user_json = json_encode($user);
								$send_tech_test_html = "<td style='width: 11%;'></td>";
								if ($status == 'Tested IQ') {
									$topic = "";
									$sql = "select * from topics order by topic";
									$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
									while($row = mysqli_fetch_assoc($rs)) {
										$topic .= "<li><input type='radio' id='".str_replace(".","",strtolower($row['topic']))."-$user[0]' name='checkbox-level' value='".$row['id']."'><label class='checkbox-mask' for='".str_replace(".","",strtolower($row['topic']))."-$user[0]'>".$row['topic']."</label></li>";
									}

									$send_tech_modal = "<div class='awesome-modal' id='sendTech-$user[0]'><a class='close-icon' href='#close'></a> <h3 class='modal-title'>Send Technical Test</h3> <p style='font-weight: bold;'>Send test to:</p><p>$user[1]</p><p>$user[2]</p><p style='font-weight: bold;'>Apply to:</p><div class='level'> <ul class='level-choice'> ".$topic."</ul> </div><button type='button' class='button submit btn-send btt-stage' onclick='sendtechtest(this,$user_json)'><span style='display: none;'><i class='fa fa-spinner fa-spin'></i> </span>Send</button></div><a class='awesome-overlay' href='#close'></a>";
									$send_tech_test_html =  "<td class='noaction' style='width: 11%;'><a type='button' class='button btn-modal btn-second' href='#sendTech-$user[0]' onclick=''>Send tech test</a> $send_tech_modal </td>";
								} else if ($user[5] == '') {
									$send_iq_modal = "<div class='awesome-modal' id='sendIQ-$user[0]'><a class='close-icon' href='#close'></a><h3 class='modal-title'>Send IQ Test</h3><p style='font-weight: bold;'>Send test to:</p><p>$user[1]</p><p>$user[2]</p><button class='button submit btn-send btt-stage' onclick='resetiqtest(this, $user_json)'><span style='display: none;'><i class='fa fa-spinner fa-spin'></i> </span>Send</button></div><a class='awesome-overlay' href='#close'></a>";
									$send_tech_test_html =  "<td class='noaction' style='width: 11%;'><a type='button' class='button btn-modal' href='#sendIQ-$user[0]' onclick=''>Send IQ test</a> $send_iq_modal </td> ";
								}
								// Dinesh Code - 23-10-2020
								if($user[2]!="") {
									$sql = "select * from candidates where email = '".$user[2]."'";
									$rs = mysqli_query($conn, $sql) or die(mysqli_error($conn));
									$row = mysqli_fetch_array($rs);
									$cv = ($row['flcv']!="")?'<a href="../cv/applications/'.$row['flcv'].'" target="_blank">CV</a>':"";
									$airtable_id = $row['airtable'];
									$airtable_iqmi = $row['airtable_iqmi'];
									$airtable_tech = $row['airtable_tech'];
									if(is_array($row['skills']))
										$skills = implode(",", $row['skills']);
									else
										$skills = str_replace(",", ", ",$row['skills']);
								}
								// End Dinesh Code
								$user_html =<<<EOF
								<tr>
									<td class="click-expand" style="width: 5%;">$user[0]</td>
									<td class="click-expand" style="width: 15%;">$user[1]</td>
									<td class="click-expand" style="width: 20%;">$user[2]</td>
									<td class="click-expand" style="width: 15%;">$user[7]</td>
									<td class="click-expand" style="width: 15%;">$date_format</td>
									<td class="click-expand" style="width: 11%;">$status</td>
									$send_tech_test_html
									$send_mail
								</tr>
								<tr class="expand">
									<td style="width: 100%;">
										<div class="expand">
											<table>
												<tbody>
													<tr>
														<td>Created date: </td>
														<td>$user[6]</td>
														<td>Apply for Company:</td>
														<td>$user[7]</td>
														<td>CV</td>
														<td>$cv</td>
													</tr>
													<tr>
														<td>Submitted date: </td>
														<td>$user[5]</td>
														<td>Position:</td>
														<td>$user[13]</td>
														<td>Airtable Main Id:</td>
														<td>$airtable_id</td>
													</tr>
													<tr>
														<td>Date of Birth:</td>
														<td>$user[12]</td>
														<td>Level:</td>
														<td>$level</td>
														<td>Airtable IQMI:</td>
														<td>$airtable_iqmi</td>
													</tr>
													<tr>
														<td>Email:</td>
														<td>$user[2]</td>
														<td>Testing Language:</td>
														<td>$language</td>
														<td>Airtable Tech:</td>
														<td>$airtable_tech</td>
													</tr>
													<tr>
														<td>Password:</td>
														<td>$user[3]</td>
													</tr>
													<tr><td>Skills</td>
														<td colspan="4" style="word-break:break-word;">$skills</td>
													</tr>
													<tr>
														<td class="title">Test Result</td>
													</tr>
													<tr>
														<td>IQ test:</td>
														<td><a target="blank" href="$linkIq">$linkIq</a></td>
													</tr>
													<tr>
														<td>Technical test:</td>
														<td><a target="blank" href="$linkTech">$linkTech</a></td>
													</tr>
												</tbody>
											</table>
										</div>
									</td>
								</tr>
EOF;
								echo $user_html;
							}
						}
					}
				?>
			</tbody>
		</table>
	</div>
</form>
