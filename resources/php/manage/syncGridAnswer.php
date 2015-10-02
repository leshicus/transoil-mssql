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
                insert [transoil].[dbo].[answer]
                (
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
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            echo json_encode(
                    array('answerid' => $conn->lastInsertId()));
            _log($conn, $userid, 13, 'Создание. ' . $conn->lastInsertId() . ', ' . $answertext);
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
		        from [transoil].[dbo].[answer]
		        where questionid='.$questionid;

        echo json_encode(_read($conn,$sql));
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
                update [transoil].[dbo].[answer]
                set answertext = '$answertext',
                    questionid = '$questionid',
                    correct = '$correct',
                    normdoc = '$normdoc'
                where answerid = '$answerid'
            ";
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            echo json_encode(
                array('success' => $success));
            _log($conn, $userid, 13, 'Изменение. ' . $answertext);
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'destroy':
        $answerid = $data['answerid'];

        $sql = "
                delete from [transoil].[dbo].[answer]
                where answerid = '$answerid'
            ";
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            echo json_encode(
                array('success' => $success));
            _log($conn, $userid, 13, 'Удаление. ' . $answerid);
        } else {
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
