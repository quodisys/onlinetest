<?php
require 'csvmanager.php';
if(isset($_POST['order']) && isset($_POST['type'])) {
    $list_users = Csvmanager::search($_POST['search'], $_POST['order'], $_POST['type']);
} else {
    $list_users = Csvmanager::search($_POST['search']);
}
?>
<?php
    if(!empty($list_users)) {
        foreach($list_users as $key => $user) {
            if(is_numeric($user[0])) {
                echo "<tr>";
                echo "<td>".$user[0]."</td>";
                echo "<td>".$user[1]."</td>";
                echo "<td>".$user[2]."</td>";
                echo "<td>".$user[3]."</td>";
                echo "<td>".$user[5]."</td>";
                echo "<td>".$user[6]."</td>";
                $var = $user[6];
                $date = str_replace('/', '-', $var);
                $date_format = date('d/m/Y H:i:s', strtotime('+48 hours', strtotime($date)));
                echo "<td>".$date_format."</td>";
                echo "<td>".$user[7]."</td>";
                echo "</tr>";
            }
        }
    }
?>
