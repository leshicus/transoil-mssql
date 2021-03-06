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
    $res = $conn->query($query);
    $row = $res->fetch();
    $cnt = $row[0];
    if ($cnt != 0){
        $query = "select a.timelimit
                from [transoil].[dbo].[usr] u
                  LEFT JOIN [transoil].[dbo].[speciality] s ON
                    u.specid = s.specid
                  LEFT JOIN [transoil].[dbo].[grp] g ON
                    g.groupid = s.groupid
                  LEFT JOIN [transoil].[dbo].[activity] a ON
                    a.actid = g.actid
                where u.userid = '$userid'";
        try {
            $res = $conn->query($query);
            $row = $res->fetch();
            $timelimit = $row[0];
        } catch (Exception $e) {
            $success = false;
        }
    }
} catch (Exception $e) {
    $success = false;
}

if ($success) {
    echo json_encode(
        array('success' => $success,
            'cnt' => $cnt,
            'timelimit' => $timelimit));
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $sql));
}

$conn = null;

?>