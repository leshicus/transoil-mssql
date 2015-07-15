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
            insert into know()values();
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo json_encode(
                array('knowid' => $mysqli->insert_id));
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
		        from know
		        order by knownum';
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
        $knowname = $data['knowname'];
        $knownum = $data['knownum'];
        $knowfullname = $data['knowfullname'];
        $knowid = $data['knowid'];

        $sql = "
            update know
            set knowname = '$knowname',
                knownum = '$knownum',
                knowfullname = '$knowfullname'
            where knowid = '$knowid'
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
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        break;
    case 'destroy':
        $knowid = $data['knowid'];

        $sql = "
            delete from know
            where knowid = '$knowid'
        ";
        try {
            $res = $mysqli->query($sql);
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

if ($mysqli)
    $mysqli->close();

?>
