<?session_start();
$userid = $_SESSION['userid'];

require_once("../db_connect.php");
require_once("../include.php");

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;

switch ($act) {
    case 'create':
        $orgname = $data['orgname'];
        $orgabbr = $data['orgabbr'];

        $sql = "
            insert [transoil].[dbo].[org](
              orgname,
              orgabbr
            )values(
              '$orgname',
              '$orgabbr'
            );
        ";
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            echo json_encode(
                array('orgid' => $conn->lastInsertId()));
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $sql = 'select
                  orgid,
                  orgname,
                  orgabbr
		        from [transoil].[dbo].[org]
		        order by orgabbr';

//        try {
//            $list = array();
//            $res = $conn->query($sql);
//            $res->setFetchMode(PDO::FETCH_ASSOC);
//            while($row = $res->fetch()) {
//                array_push($list, $row);
//            }
//        } catch (Exception $e) {
//            $success = false;
//            echo json_encode(
//                array('success' => $success,
//                    'message' => $sql));
//        }
//        echo json_encode($list);
        echo json_encode(_read($conn,$sql));
        break;
    case 'update':
        $orgname = $data['orgname'];
        $orgabbr = $data['orgabbr'];
        $orgid = $data['orgid'];

        $sql = "
            update [transoil].[dbo].[org]
            set orgname = '$orgname',
                orgabbr = '$orgabbr'
            where orgid = '$orgid'
        ";
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }
        if ($success) {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'destroy':
        $orgid = $data['orgid'];

        $sql = "
            delete from [transoil].[dbo].[org]
            where orgid = '$orgid'
        ";
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            echo json_encode(
                array('success' => $success));
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    default:
        break;
};

$conn = null;
?>
