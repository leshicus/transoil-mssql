<?session_start();
$userid = $_SESSION['userid'];

require_once("../db_connect.php");
require_once("../include.php");

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;

switch ($act) {
    case 'create':
        $timelimit = $data['timelimit'];
        $sql = "
            insert into activity (timelimit) values ($timelimit);
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo json_encode(
                array('actid' => $mysqli->insert_id));
            _log($mysqli, $userid, 12, 'Создание: '.$mysqli->insert_id.', '.$actabbr);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $sql = 'select
                  actname,
                  actabbr,
                  actnum,
                  actid,
                  orgid,
                  timelimit
		        from activity
		        order by actnum';
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
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        echo json_encode($list);
        break;
    case 'update':
        $actname = $data['actname'];
        $actabbr = $data['actabbr'];
        $actnum = $data['actnum'];
        $actid = $data['actid'];
        $orgid = $data['orgid'];
        $timelimit = $data['timelimit'];

        $sql = "
            update activity
            set actname = '$actname',
                actabbr = '$actabbr',
                actnum = '$actnum',
                orgid = '$orgid',
                timelimit = '$timelimit'
            where actid = '$actid'
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
            _log($mysqli, $userid, 12, 'Исправление: '.$actid.', '.$actabbr);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        break;
    case 'destroy':
        $actid = $data['actid'];

        $sql = "
            delete from activity
            where actid = '$actid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo json_encode(
                array('success' => $success));
            _log($mysqli, $userid, 12, 'Удаление: '.$actid);
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
