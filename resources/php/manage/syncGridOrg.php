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
            insert into org(
              orgname,
              orgabbr
            )values(
              '$orgname',
              '$orgabbr'
            );
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo json_encode(
                array('orgid' => $mysqli->insert_id));
        }else{
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
		        from org
		        order by orgabbr';
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
        $orgname = $data['orgname'];
        $orgabbr = $data['orgabbr'];
        $orgid = $data['orgid'];

        $sql = "
            update org
            set orgname = '$orgname',
                orgabbr = '$orgabbr'
            where orgid = '$orgid'
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
        $orgid = $data['orgid'];

        $sql = "
            delete from org
            where orgid = '$orgid'
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
