<?
require_once("../db_connect.php");

$query = "select
              k.knowid,
              k.knownum,
              k.knowname
            from know k
            order by k.knownum";
try {
    $res = $mysqli->query($query);
    $list = array();
    while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
        foreach ($row as $k => $v)
            $arr[$k] = $v;
        array_push($list, $arr);
    }
} catch (Exception $e) {
    echo json_encode(
        array('success' => false,
            'message' => $query));
}
echo json_encode($list);

if ($mysqli)
    $mysqli->close();

?>