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
                insert into question(
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
                $res = $mysqli->query($sql);
            } catch (Exception $e) {
                $success = false;
            }
        }

        if($success){
            echo json_encode(
                array('questionid' => $mysqli->insert_id));
            _log($mysqli, $userid, 14, 'Создание. '.$mysqli->insert_id.', '.$questiontext);
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
		        from question q
                  LEFT JOIN `group` g ON
                  g.groupid = q.groupid
                  LEFT JOIN `activity` a ON
                  a.actid = g.actid'.
                $where;
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
        foreach ($data as $row) {
            $questionid = $row['questionid'];
            $questiontext = $row['questiontext'];
            $groupid = $row['groupid'];
            $knowid = $row['knowid'];

            $sql = "
                update question
                set questiontext = '$questiontext',
                    groupid = '$groupid',
                    knowid = '$knowid'
                where questionid = '$questionid'
            ";
            try {
                $res = $mysqli->query($sql);

                _log($mysqli, $userid, 14, 'Исправление или перемещение. '.$questionid.', '.$questiontext);
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
                delete from question
                where questionid = '$questionid'
            ";
            try {
                $res = $mysqli->query($sql);

                _log($mysqli, $userid, 14, 'Удаление. '.$questionid);
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

if ($mysqli)
    $mysqli->close();

?>
