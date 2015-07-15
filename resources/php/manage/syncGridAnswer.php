<?session_start();
$userid = $_SESSION['userid'];

require_once("../db_connect.php");
require_once("../include.php");

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;

switch ($act) {
    case 'create':
        $answertext = $data['answertext'];
        $questionid = $data['questionid'];
        $correct = $data['correct'];
        $normdoc = $data['normdoc'];

        if ($correct) {
            $correct = 1;
        } else
            $correct = 0;

        $sql = "
                insert into answer(
                  answertext,
                  questionid,
                  correct,
                  normdoc
                )values(
                  '$answertext',
                  '$questionid',
                  '$correct',
                  '$normdoc'
                );
            ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            echo json_encode(
                    array('answerid' => $mysqli->insert_id));
            _log($mysqli, $userid, 13, 'Создание. ' . $mysqli->insert_id . ', ' . $answertext);
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $questionid = $_REQUEST['questionid'];
        $sql = 'select
                  answerid,
                  answertext,
                  questionid,
                  correct,
                  normdoc
		        from answer
		        where questionid='.$questionid;
        try {
            $res = $mysqli->query($sql);
            $list = array();
            while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
                foreach ($row as $k => $v)
                    $arr[$k] = $v;
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
        $answerid = $data['answerid'];
        $answertext = $data['answertext'];
        $questionid = $data['questionid'];
        $correct = $data['correct'];
        $normdoc = $data['normdoc'];

        if ($correct) {
            $correct = 1;
        } else
            $correct = 0;

        // * должен быть только один, занулим остальные
        //if($correct)
        $sql = "
                update answer
                set answertext = '$answertext',
                    questionid = '$questionid',
                    correct = '$correct',
                    normdoc = '$normdoc'
                where answerid = '$answerid'
            ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            echo json_encode(
                array('success' => $success));
            _log($mysqli, $userid, 13, 'Изменение. ' . $answertext);
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'destroy':
        $answerid = $data['answerid'];

        $sql = "
                delete from answer
                where answerid = '$answerid'
            ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            echo json_encode(
                array('success' => $success));
            _log($mysqli, $userid, 13, 'Удаление. ' . $answerid);
        } else {
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
