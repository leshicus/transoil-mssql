<?
session_start();

require_once("../db_connect.php");
require_once("../include.php");

$success = true;
$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];

$query = "select
            count(*) as cnt
          from class c
          where c.examid = '$examid'
          and   c.userid = '$userid'
          and   c.reg = 1";
try {
    $res = $mysqli->query($query);
    $row = $res->fetch_row();
    $cnt = $row[0];
    if ($cnt != 0){
        $query = "select a.timelimit
                from `user` u
                  LEFT JOIN `speciality` s ON
                    u.specid = s.specid
                  LEFT JOIN `group` g ON
                    g.groupid = s.groupid
                  LEFT JOIN `activity` a ON
                    a.actid = g.actid
                where u.userid = '$userid'";
        try {
            $res = $mysqli->query($query);
            $row = $res->fetch_row();
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

if ($mysqli)
    $mysqli->close();

?>