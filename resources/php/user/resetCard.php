<?
session_start();
/* 1. Отмена билета после ошибки, удаление его в `card`
* */
require_once("../db_connect.php");
require_once("../include.php");

$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];

$sql = "delete from `card`
        where userid = '$userid'
        and examid = '$examid'";
try {
    $res = $mysqli->query($sql);
} catch (Exception $e) {
    $success = false;
    $message = $sql;
}

if ($success) {
    _log($mysqli, $userid, 11, 'Отмена билета после ошибки: '.$examid);
    echo json_encode(array('success' => $success));
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $message));
}
if ($mysqli)
    $mysqli->close();

?>

