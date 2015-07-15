<?session_start();
$userid = $_SESSION['userid'];

require_once("../db_connect.php");
require_once("../include.php");

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);

switch ($act) {
    case 'create':
        $sql = "
            insert into `group`()values();
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo json_encode(
                array('groupid' => $mysqli->insert_id));
            _log($mysqli, $userid, 15, 'Создание: '.$mysqli->insert_id.', '.$actid.', '.$groupnum);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $sql = 'select
                  g.actid,
                  g.groupnum,
                  g.groupname,
                  g.groupid,
                  /*(SELECT GROUP_CONCAT(gk.knowid)
                    FROM groupknow gk
                    WHERE gk.groupid = g.groupid
                  ) AS knowids*/
                  g.knowids
		        from `group` g
		        order by g.actid, g.groupnum';
        try {
            $res = $mysqli->query($sql);
            $list=array();
            while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
                foreach ($row as $k => $v){
                    if($k == 'knowids')
                        $arr[$k] = explode(",", $v); // * преобразуем строку вида а,б,с в массив [а,б,с]
                    else
                        $arr[$k]= $v;
                }
                array_push($list, $arr);
            }
        } catch (Exception $e) {
            $success = false;
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        echo json_encode($list);
        break;
    case 'update':
        $actid = $data['actid'];
        $groupnum = $data['groupnum'];
        $groupname = $data['groupname'];
        $groupid = $data['groupid'];
        $knowids = $data['knowids'];
        if($knowids)
            $knowids = implode($knowids,',');

        $sql = "
            update `group`
            set actid = '$actid',
                groupnum = '$groupnum',
                groupname = '$groupname',
                knowids = '$knowids'
            where groupid = '$groupid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }
        if($success){
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
            _log($mysqli, $userid, 15, 'Изменение: '.$groupid.', '.$actid.', '.$groupnum);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        break;
    case 'destroy':
        $groupid = $data['groupid'];

        $sql = "
            delete from `group`
            where groupid = '$groupid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo json_encode(
                array('success' => $success));
            _log($mysqli, $userid, 15, 'Удаление: '.$groupid);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    default:
        echo "default";
};

if ($mysqli)
    $mysqli->close();

?>
