<?
session_start();
/* 1. Отмена билета после ошибки, удаление его в [transoil].[dbo].[card]
* */
require_once("../db_connect.php");
require_once("../include.php");

$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];

$sql = "delete from [transoil].[dbo].[card]
        where userid = '$userid'
        and examid = '$examid'";
try {
    $res = $conn->query($sql);
} catch (Exception $e) {
    $success = false;
    $message = $sql;
}

if ($success) {
    _log($conn, $userid, 11, 'Отмена билета после ошибки: '.$examid);
    echo json_encode(array('success' => $success));
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $message));
}
$conn = null;

?>

