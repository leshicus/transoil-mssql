<?
require_once('../db_connect.php');

$sql = "select
          roleid as id,
          rolename as  name
        from role";

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
