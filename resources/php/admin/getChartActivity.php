<?
require_once('../db_connect.php');

$dateFrom = $_REQUEST['dateFrom'];
$dateTo = $_REQUEST['dateTo'];
$org = $_REQUEST['org'];

// * получим максимальное количество групп
$sql = 'SELECT MAX(g.groupnum) as groupnum
        FROM [transoil].[dbo].[grp] g';
try {
    $res = $conn->query($sql);
    $res->setFetchMode(PDO::FETCH_ASSOC);
    $row = $res->fetch();

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
          FROM [transoil].[dbo].[usr] u,
          [transoil].[dbo].[speciality] s,
          [transoil].[dbo].[grp] g
          WHERE u.specid = s.specid
          AND g.groupid = s.groupid
          AND a.actid = g.actid
          AND u.userid IN (
            SELECT c.userid
            FROM [transoil].[dbo].[exam] e,
              [transoil].[dbo].[class] c
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
  FROM [transoil].[dbo].[activity] a
  HAVING группа_1 > 0
';

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
