<?
require_once('../db_connect.php');

$sql = "select
          roleid as id,
          rolename as  name
        from role";
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
