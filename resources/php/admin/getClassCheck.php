<?
session_start();

require_once("../db_connect.php");
require_once("../include.php");

$success = true;
$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];

$query = "select
            count(*) as cnt
          from [transoil].[dbo].[class] c
          where c.examid = '$examid'
          and   c.userid = '$userid'
          and   c.reg = 1";
try {
//    $res = $conn->query($query);
//    $row = $res->fetch();

    $res = $conn->query($sql);
    $res->setFetchMode(PDO::FETCH_ASSOC);
    $row = $res->fetch();
} catch (Exception $e) {
    $success = false;
}

if ($success) {
    echo json_encode(
        array('success' => $success,
            'cnt' => $row[0]));
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $sql));
}

$conn = null;

?>