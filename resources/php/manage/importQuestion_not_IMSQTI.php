<?session_start();
$userid = $_SESSION['userid'];

require_once("../db_connect.php");
require_once("../include.php");

$questiontext = '';
$answertext = '';
$correct = '';
$normdoc = '';
$numQuestion = 0;
$message = '';

$knowid = $_REQUEST['knowid'];
$groupid = $_REQUEST['groupid'];
if(!$knowid) $knowid = null;
if(!$groupid) $groupid = null;

if ($_FILES) {
    set_time_limit(600);  // * 5 минут
    $file = $_FILES['import']['tmp_name'];

    $xmlStr = file_get_contents($file);

    if ($xmlObj = @simplexml_load_string($xmlStr)){
        $arrXml = _objectsIntoArray($xmlObj);
        foreach ($arrXml['question'] as $r => $arrQuestion) {
            $questiontext = $arrQuestion['questiontext'];
            if ($questiontext != '') {
                $sql = "
                    insert [transoil].[dbo].[question](
                      questiontext,
                      knowid,
                      groupid
                    )values(
                        ?,
                        ?,
                        ?
                    )
                ";
                //echo $sql;
                try {
                    // * prepare для того, чтобы была возможность вставлять null
                    $stmt = $conn->prepare($sql);
                    $stmt->bind_param('sss', $questiontext, $knowid, $groupid);
                    $stmt->execute();
                    $questionid = $stmt->insert_id;
                    $stmt->close();
                    _log($conn, $userid, 14, 'Импорт. '.$questionid.', '.$questiontext);
                    $numQuestion++;
                } catch (Exception $e) {
                    $success = false;
                    $message = 'Ошибка в скрипте загрузки вопросов';
                }
            }

            foreach ($arrQuestion['answer'] as $a => $arrAnswer) {
                $answertext = $arrAnswer['answertext'];
                $correct = $arrAnswer['correct'];
                $normdoc = $arrAnswer['normdoc'];

                if ($correct == '') $correct = '0';

                if ($success && $questionid && $answertext != '') {
                    $sql = "
                        insert [transoil].[dbo].[answer]
                        (
                          questionid,
                          answertext,
                          correct,
                          normdoc
                        )values(
                          $questionid,
                          '$answertext',
                          '$correct',
                          '$normdoc'
                        );
                    ";
                    try {
                        $res = $conn->query($sql);
                        _log($conn, $userid, 13, 'Импорт. ' . $conn->lastInsertId() . ', ' . $answertext);
                    } catch (Exception $e) {
                        $success = false;
                        $message = 'Ошибка в скрипте загрузки ответов';
                    }
                }
            }
        }
    }else{
        $success = false;
        $message = 'Ошибка в файле иморта (тэги)';
    }
} else {
    $success = false;
    $message = 'Ошибка в файле иморта';
}

if($success){
    echo json_encode(
        array('success' => $success,
            'message' => 'Загружено вопросов: ' . $numQuestion));
}else{
    echo json_encode(
        array('success' => $success,
            'message' => $message));
}



$conn = null;
?>
