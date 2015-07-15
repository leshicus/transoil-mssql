<?
require_once('../db_connect.php');

$dateFrom = $_REQUEST['dateFrom'];
$dateTo = $_REQUEST['dateTo'];
$act = $_REQUEST['act'];
$org = $_REQUEST['org'];

/*$sql = "
    SELECT k.knowname as name,
    (SELECT COUNT(*)
      FROM `group` g,
      card c,
      question q,
      answer a,
      activity v
      WHERE '$act' = v.actabbr
      and v.actid = g.actid
      AND q.questionid = c.questionid
      AND g.groupid = q.groupid
      AND k.knowid = q.knowid
      AND a.answerid = c.answerid
      AND a.correct = 1
      AND c.userid IN (
        SELECT c.userid
        FROM exam e,
          class c
        WHERE e.examdate BETWEEN '$dateFrom' AND '$dateTo'
          AND c.examid = e.examid
          AND c.result <> -1
      )) AS data
    FROM know k
    HAVING data>0
";*/
$sql = "
    SELECT k.knowname as name,
    ((SELECT COUNT(*)
      FROM `group` g,
      card c,
      question q,
      answer a,
      activity v
      WHERE '$act' = v.actabbr
      AND v.orgid = '$org'
      and v.actid = g.actid
      AND q.questionid = c.questionid
      AND g.groupid = q.groupid
      AND k.knowid = q.knowid
      AND a.answerid = c.answerid
      AND a.correct = 1
      AND c.userid IN (
        SELECT c.userid
        FROM exam e,
          class c
        WHERE e.examdate BETWEEN '$dateFrom' AND '$dateTo'
          AND c.examid = e.examid
          AND c.result <> -1
      ))
      /
    (SELECT COUNT(*)
      FROM question q,
      `group` g,
      activity a
      WHERE q.knowid = k.knowid
        AND a.orgid = '$org'
        AND q.groupid = g.groupid
        AND a.actid = g.actid
        AND a.actabbr = '$act')) * 10000 AS data
    FROM know k
    HAVING data>0
";

try {
    $res = $mysqli->query($sql);
    $list=array();
    while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
        foreach ($row as $k => $v)
            $arr[$k]= $v;
        array_push($list, $arr);
    }
} catch (Exception $e) {
    $success = false;
    echo '{"success" => '.$success.',
           "message" => '.$sql.'}';
}
echo json_encode($list);

?>
