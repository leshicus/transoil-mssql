<?
session_start();

require_once("../db_connect.php");
require_once("../include.php");

$success = true;
$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];

$query = "insert ignore into class
            (examid, userid)
            values
            ('$examid','$userid')";
try {
    $res = $mysqli->query($query);
} catch (Exception $e) {
    $success = false;
}

if ($success) {
    echo json_encode(
        array('success' => $success));
    _log($mysqli, $userid, 17, 'Подача заявки: '.$examid);
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $sql));
}

if ($mysqli)
    $mysqli->close();

?>