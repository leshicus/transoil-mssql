<?
require_once('../db_connect.php');

$dateFrom = $_REQUEST['dateFrom'];
$dateTo = $_REQUEST['dateTo'];
$act = $_REQUEST['act'];
$org = $_REQUEST['org'];

/*$sql = "
    SELECT k.knowname as name,
    (SELECT COUNT(*)
      FROM [transoil].[dbo].[grp] g,
      [transoil].[dbo].[card] c,
      [transoil].[dbo].[question] q,
      [transoil].[dbo].[answer] a,
      [transoil].[dbo].[activity] v
      WHERE '$act' = v.actabbr
      and v.actid = g.actid
      AND q.questionid = c.questionid
      AND g.groupid = q.groupid
      AND k.knowid = q.knowid
      AND a.answerid = c.answerid
      AND a.correct = 1
      AND c.userid IN (
        SELECT c.userid
        FROM [transoil].[dbo].[exam] e,
          [transoil].[dbo].[class] c
        WHERE e.examdate BETWEEN '$dateFrom' AND '$dateTo'
          AND c.examid = e.examid
          AND c.result <> -1
      )) AS data
    FROM [transoil].[dbo].[know] k
    HAVING data>0
";*/
$sql = "
    SELECT k.knowname as name,
    ((SELECT COUNT(*)
      FROM [transoil].[dbo].[grp] g,
      [transoil].[dbo].[card] c,
      [transoil].[dbo].[question] q,
      [transoil].[dbo].[answer] a,
      [transoil].[dbo].[activity] v
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
        FROM [transoil].[dbo].[exam] e,
          [transoil].[dbo].[class] c
        WHERE e.examdate BETWEEN '$dateFrom' AND '$dateTo'
          AND c.examid = e.examid
          AND c.result <> -1
      ))
      /
    (SELECT COUNT(*)
      FROM [transoil].[dbo].[question] q,
      [transoil].[dbo].[grp] g,
      [transoil].[dbo].[activity] a
      WHERE q.knowid = k.knowid
        AND a.orgid = '$org'
        AND q.groupid = g.groupid
        AND a.actid = g.actid
        AND a.actabbr = '$act')) * 10000 AS data
    FROM [transoil].[dbo].[know] k
    HAVING data>0
";

try {
    $list = array();
    $res = $conn->query($sql);
    $res->setFetchMode(PDO::FETCH_ASSOC);
    while($row = $res->fetch()) {
        array_push($list, $row);
    }
} catch (Exception $e) {
    $success = false;
    echo '{"success" => '.$success.',
           "message" => '.$sql.'}';
}

echo json_encode($list);
$conn = null;
?>
