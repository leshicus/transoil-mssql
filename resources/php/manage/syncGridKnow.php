<?session_start();
$userid = $_SESSION['userid'];

require_once("../db_connect.php");
require_once("../include.php");

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;

switch ($act) {
    case 'create':
        $sql = "
            insert [transoil].[dbo].[know]()values();
        ";
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo json_encode(
                array('knowid' => $conn->lastInsertId()));
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $sql = 'select
                  knowid,
                  knowname,
                  knownum,
                  knowfullname
		        from [transoil].[dbo].[know]
		        order by knownum';

        echo json_encode(_read($conn,$sql));
        break;
    case 'update':
        $knowname = $data['knowname'];
        $knownum = $data['knownum'];
        $knowfullname = $data['knowfullname'];
        $knowid = $data['knowid'];

        $sql = "
            update [transoil].[dbo].[know]
            set knowname = '$knowname',
                knownum = '$knownum',
                knowfullname = '$knowfullname'
            where knowid = '$knowid'
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
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        break;
    case 'destroy':
        $knowid = $data['knowid'];

        $sql = "
            delete from [transoil].[dbo].[know]
            where knowid = '$knowid'
        ";
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo json_encode(
                array('success' => $success));
        }else{
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
