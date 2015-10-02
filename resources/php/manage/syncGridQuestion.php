<?session_start();
$userid = $_SESSION['userid'];

require_once("../db_connect.php");
require_once("../include.php");

$act = $_REQUEST['act'];

$data = json_decode(file_get_contents('php://input'), true);
$success = true;

switch ($act) {
    case 'create':
        foreach ($data as $row) {
            $questiontext = $row['questiontext'];
            $groupid = $row['groupid'];
            $knowid = $row['knowid'];

            $sql = "
                insert [transoil].[dbo].[question](
                  questiontext,
                  groupid,
                  knowid
                )values(
                  '$questiontext',
                  '$groupid',
                  '$knowid'
                );
            ";
            //echo $sql;
            try {
                $res = $conn->query($sql);
            } catch (Exception $e) {
                $success = false;
            }
        }

        if($success){
            echo json_encode(
                array('questionid' => $conn->lastInsertId()));
            _log($conn, $userid, 14, 'Создание. '.$conn->lastInsertId().', '.$questiontext);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $actid = $_REQUEST['actid'];
        $knowid = $_REQUEST['knowid'];
        $id = $_REQUEST['id'];
        $groupid = $_REQUEST['groupid'];
        $orgid = $_REQUEST['orgid'];
        $where = ' where 1=1 ';

        if($actid)
            $where .= ' and g.actid = '.$actid;
        if($knowid)
            $where .= ' and q.knowid = '.$knowid;
        if($groupid)
            $where .= ' and q.groupid = '.$groupid;
        if($orgid)
            $where .= ' and a.orgid = '.$orgid;
        if($id == 'root')
            $where = ' where 1=1 ';

        $sql = 'select
                  q.questionid,
                  q.questiontext,
                  q.groupid,
                  q.knowid,
                  g.actid
		        from [transoil].[dbo].[question] q
                  LEFT JOIN [transoil].[dbo].[grp] g ON
                  g.groupid = q.groupid
                  LEFT JOIN [transoil].[dbo].[activity] a ON
                  a.actid = g.actid'.
                $where;

        echo json_encode(_read($conn,$sql));
        break;
    case 'update':
        foreach ($data as $row) {
            $questionid = $row['questionid'];
            $questiontext = $row['questiontext'];
            $groupid = $row['groupid'];
            $knowid = $row['knowid'];

            $sql = "
                update [transoil].[dbo].[question]
                set questiontext = '$questiontext',
                    groupid = '$groupid',
                    knowid = '$knowid'
                where questionid = '$questionid'
            ";
            try {
                $res = $conn->query($sql);

                _log($conn, $userid, 14, 'Исправление или перемещение. '.$questionid.', '.$questiontext);
            } catch (Exception $e) {
                $success = false;
            }
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
    case 'destroy':
        foreach ($data as $row) {
            $questionid = $row['questionid'];

            $sql = "
                delete from [transoil].[dbo].[question]
                where questionid = '$questionid'
            ";
            try {
                $res = $conn->query($sql);

                _log($conn, $userid, 14, 'Удаление. '.$questionid);
            } catch (Exception $e) {
                $success = false;
                $message = $sql;
            }
        }
        if ($success) {
            echo json_encode(array('success' => $success));
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
