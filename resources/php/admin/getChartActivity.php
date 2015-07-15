<?
require_once('../db_connect.php');

$dateFrom = $_REQUEST['dateFrom'];
$dateTo = $_REQUEST['dateTo'];
$org = $_REQUEST['org'];

/*$sql = "SELECT
    a.actabbr as name,
    (SELECT COUNT(*)
          FROM `user` u,
          speciality s,
          `group` g
          WHERE u.specid = s.specid
          AND g.groupid = s.groupid
          AND a.actid = g.actid
          AND u.userid IN (
            SELECT c.userid
            FROM exam e,
              class c
            WHERE e.examdate BETWEEN '$dateFrom' AND '$dateTo'
              AND c.examid = e.examid
              AND c.result <> -1
          )) AS data
  FROM activity a
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
}*/

// * получим максимальное количество групп
$sql = 'SELECT MAX(g.groupnum) as groupnum
        FROM `group` g';
try {
    $res = $mysqli->query($sql);
    $row = $res->fetch_row();
    $groupnum = $row[0];
} catch (Exception $e) {
    $success = false;
    echo '{"success" => '.$success.',
           "message" => '.$sql.'}';
}

// * запрос собираем по частям, чтобы количество g1 зависело от максимального числа групп
$sql = 'SELECT
    a.actabbr as name,
';

for($i = 1; $i <= $groupnum; $i++){
    $sql .= "
    (SELECT COUNT(*)
          FROM `user` u,
          speciality s,
          `group` g
          WHERE u.specid = s.specid
          AND g.groupid = s.groupid
          AND a.actid = g.actid
          AND u.userid IN (
            SELECT c.userid
            FROM exam e,
              class c
            WHERE e.examdate BETWEEN '".$dateFrom."' AND '".$dateTo."'
              AND c.examid = e.examid
              AND c.result <> -1
          )
          AND a.orgid = ".$org."
          AND g.groupnum = ".$i.") AS группа_".$i;
    if($i < $groupnum)
        $sql .= ',';
}

$sql .= '
  FROM activity a
  HAVING группа_1 > 0
';

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
