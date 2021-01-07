<?php if(isset($_SESSION['user'])) {?>
<div id="navbar">
	<p>
	<?php if(isset($_SESSION['usertype']) && $_SESSION['usertype']==0) { ?>
	<a href="topics.php">Topics</a>&nbsp;|&nbsp;<a href="company.php">Company</a>&nbsp;|&nbsp;<a href="company-candidates.php">Candidates</a>
	<?php } else { ?>
	<a href="profile.php">Profile</a>&nbsp;|&nbsp;<a href="candidates.php">Candidates</a>&nbsp;|&nbsp;<a href="quodisystest.php">Online Test</a>
	<?php } ?>
	&nbsp;|&nbsp;<a href="logout.php"><i class="fa fa-sign-out" title="Logout"></i></a></p>
</div>
<?php } ?>