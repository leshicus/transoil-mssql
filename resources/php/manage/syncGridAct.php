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
            insert [transoil].[dbo].[activity] (timelimit) values ($timelimit);
        ";
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo json_encode(
                array('actid' => $conn->lastInsertId()));
            _log($conn, $userid, 12, 'Создание: '.$conn->lastInsertId().', '.$actabbr);
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
		        from [transoil].[dbo].[activity]
		        order by actnum';

        echo json_encode(_read($conn,$sql));
        break;
    case 'update':
        $actname = $data['actname'];
        $actabbr = $data['actabbr'];
        $actnum = $data['actnum'];
        $actid = $data['actid'];
        $orgid = $data['orgid'];
        $timelimit = $data['timelimit'];

        $sql = "
            update [transoil].[dbo].[activity]
            set actname = '$actname',
                actabbr = '$actabbr',
                actnum = '$actnum',
                orgid = '$orgid',
                timelimit = '$timelimit'
            where actid = '$actid'
        ";
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }
        if($success){
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
            _log($conn, $userid, 12, 'Исправление: '.$actid.', '.$actabbr);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        break;
    case 'destroy':
        $actid = $data['actid'];

        $sql = "
            delete from [transoil].[dbo].[activity]
            where actid = '$actid'
        ";
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo json_encode(
                array('success' => $success));
            _log($conn, $userid, 12, 'Удаление: '.$actid);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    default:
        echo "default";
};

$conn = null;

?>
