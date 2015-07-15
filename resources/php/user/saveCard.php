<?
session_start();

require_once("../db_connect.php");
require_once("../include.php");

$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];
$questionid = $_REQUEST['questionid'];
$answerid = $_REQUEST['answerid'];

$sql = "
    update card
    set answerid = '$answerid'
    where userid = '$userid'
    and examid = '$examid'
    and questionid = '$questionid'";
try {
    $res = $mysqli->query($sql);
} catch (Exception $e) {
    $success = false;
    $message = $sql;
}
if ($success) {
    //_log($mysqli, $userid, 9, $examid);
    echo json_encode(array('success' => $success));
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $message));
}

if ($mysqli)
    $mysqli->close();

?>

