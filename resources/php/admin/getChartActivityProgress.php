<?
require_once('../db_connect.php');

$dateFrom = $_REQUEST['dateFrom'];
$dateTo = $_REQUEST['dateTo'];
$act = $_REQUEST['act'];
$org = $_REQUEST['org'];

$sql = "SELECT
    a.actabbr as name,
    (SELECT COUNT(*)
          FROM [transoil].[dbo].[usr] u,
          [transoil].[dbo].[speciality] s,
          [transoil].[dbo].[grp] g,
          [transoil].[dbo].[class] c
          WHERE u.specid = s.specid
          AND g.groupid = s.groupid
          AND a.actid = g.actid
          AND c.userid = u.userid
          AND c.result = 0
          AND u.userid IN (
            SELECT c.userid
            FROM [transoil].[dbo].[exam] e,
              [transoil].[dbo].[class] c
            WHERE e.examdate BETWEEN '$dateFrom' AND '$dateTo'
              AND c.examid = e.examid
              AND c.result <> -1
          )) AS data,
    'не успешно' as result
  FROM [transoil].[dbo].[activity] a
  WHERE a.actabbr = '$act'
  AND a.orgid = '$org'
  HAVING data>0
  union
  SELECT
    a.actabbr as name,
    (SELECT COUNT(*)
          FROM [transoil].[dbo].[usr] u,
          [transoil].[dbo].[speciality] s,
          [transoil].[dbo].[grp] g,
          [transoil].[dbo].[class] c
          WHERE u.specid = s.specid
          AND g.groupid = s.groupid
          AND a.actid = g.actid
          AND c.userid = u.userid
          AND c.result = 1
          AND u.userid IN (
            SELECT c.userid
            FROM [transoil].[dbo].[exam] e,
              [transoil].[dbo].[class] c
            WHERE e.examdate BETWEEN '$dateFrom' AND '$dateTo'
              AND c.examid = e.examid
              AND c.result <> -1
          )) AS data,
    'успешно' as result
  FROM [transoil].[dbo].[activity] a
  WHERE a.actabbr = '$act'
  AND a.orgid = '$org'
  HAVING data>0
";
//echo $sql;
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
