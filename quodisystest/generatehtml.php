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
	<div id="passwordsetting">
		<h3>User Settings</h3>
		<!--<div class="d-flex">
			<input type="text" id="code" name="token" class="form-control" placeholder="Generate Token"/>
			<button type="button" onclick="generateCode()" class="button">
				Generate
			</button>
		</div><br>-->
		<div class="form-group d-flex">
			<input type="hidden" id="code" name="token" class="form-control" placeholder="Generate Token" value="" />
			<input type="hidden" id="info_user" name="info_user" value="true"/>
			<input type="text" id="fname" name="fname"  class="form-control" placeholder="First Name" onkeypress="return blockSpecialChar(event)"/>
			<input type="text" id="lname" name="lname"  class="form-control" placeholder="Last Name" onkeypress="return blockSpecialChar(event)"/><br><br>
			<input type="email" id="email" name="email"  class="form-control" placeholder="Email"/>
			<select id="positionalt" name="positionalt" class="form-control" placeholder="Category: eg., Developer, Marketing" />
				<option value="">-= Select Category =-
				<option value="IT">IT
				<option value="Sales">Sales
				<option value="Marketing">Marketing
				<option value="Finance">Finance
				<option value="Customer Service">Customer Service
				<option value="HR">HR
				<option value="Management">Management
			</select><br><br>
			<input type="text" id="password" name="password" class="form-control" placeholder="Password" maxlength="8" />
			<button type="button" onclick="generateAccount()" class="button">
				Generate Password
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

	</div>
</form>
