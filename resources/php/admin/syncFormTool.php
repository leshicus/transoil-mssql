<?session_start();
require_once("../db_connect.php");
require_once("../include.php");

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$userid = $_SESSION['userid'];

switch ($act) {
    case 'read':
        $sql = "select *
		        from [transoil].[dbo].[tool] u";
        try {
            $list = array();
            $res = $conn->query($sql);
            $res->setFetchMode(PDO::FETCH_ASSOC);
            while($row = $res->fetch()) {
                array_push($list, $row);
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
        /*foreach ($data as $k=>$row) {
            $values .= $k." = $row,";
        }

        $values .= "toolid = toolid";
        $sql = "update [transoil].[dbo].[tool]
                    set ".$values;*/
        $sql = "update [transoil].[dbo].[tool]
                set examtimermin = " . $data['examtimermin'] . ',' . "
                maxquestion = " . $data['maxquestion'] . ',' . "
                minquestion = " . $data['minquestion'] . ',' . "
                regstatdur = " . $data['regstatdur'] . ',' . "
                regstatint = " . $data['regstatint'] . ',' . "
                examtimermin = " . $data['examtimermin'] . "
                where toolid = 1";
        //echo $sql;
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            echo json_encode(
                array('success' => $success));
            _log($conn, $userid, 18, 'Изменение: ' . $values);
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $message));
        }

        break;
    default:
        echo "default";
};

$conn = null;

?>
