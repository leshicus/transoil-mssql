<?
session_start();

require_once("../db_connect.php");
require_once("../include.php");

$success = true;
$message = '';
$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];

$query = "select count(*)
          from card
          where examid = '$examid'
          and userid = '$userid'";
try {
    $res = $mysqli->query($query);
    $row = $res->fetch_row();
    $cnt = $row[0];
} catch (Exception $e) {
    $success = false;
}
//* экзамен уже проходился
if($cnt){
    $message = 'Нельзя повторно проходить один и тот же экзамен';
}

if ($success) {
    echo json_encode(
        array('success' => $success,
            'cnt' => $cnt));
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $message));
}

if ($mysqli)
    $mysqli->close();

?>