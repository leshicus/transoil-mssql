<?
session_start();

require_once("../db_connect.php");
require_once("../include.php");

$success = true;
$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];

$query = "if not exists(
            select *
            from [transoil].[dbo].[class]
            where examid = '$examid'
            and userid='$userid'
          )
          insert [transoil].[dbo].[class]
            (examid, userid)
            values
            ('$examid','$userid')";
try {
    $res = $conn->query($query);
} catch (Exception $e) {
    $success = false;
}

if ($success) {
    echo json_encode(
        array('success' => $success));
    _log($conn, $userid, 17, 'Подача заявки: ' . $examid);
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $sql));
}

$conn = null;

?>