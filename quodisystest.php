<?php
require_once("./login.php");
require_once('./config.php');

$msg="";

require_once("header.php");
?>
<h2>Dashboard</h2>

<?php require_once("menu.php"); ?>

<section class="section-padding">
	<div class="container">
		<div class="row">
			<div class="div2 gradient">
				<h2>QDS Test</h2>

				<iframe src="quodisystest/codegenerate.php" style="width:100%; height:100vh;" frameborder="0"></iframe>
			</div><br>
		</div>
	</div>
</section>

<?php require_once("footer.php"); ?>