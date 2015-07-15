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
    set_time_limit(600);  // * 10 минут
    $file = $_FILES['import']['tmp_name'];

    $xmlStr = file_get_contents($file);

    if ($xmlObj = @simplexml_load_string($xmlStr)){
        $arrXml = _objectsIntoArray($xmlObj);

        if(count($arrXml['item']['presentation']) == 1)
            $arr = $arrXml;
        else
            $arr = $arrXml['item'];
        //print_r($arr);
        foreach ($arr as $r => $item) {
            $presentation = $item['presentation'];
            //print_r($item);
            $flow = $presentation['flow'];
            $material = $flow['material'];
            $questiontext = $material['mattext'];

            if ($questiontext != '') {
                $sql = "
                    insert into question(
                      questiontext,
                      knowid,
                      groupid
                    )values(
                        ?,
                        ?,
                        ?
                    )
                ";

                try {
                    // * prepare для того, чтобы была возможность вставлять null
                    $stmt = $mysqli->prepare($sql);
                    $stmt->bind_param('sss', $questiontext, $knowid, $groupid);
                    $stmt->execute();
                    $questionid = $stmt->insert_id;
                    $stmt->close();
                    //_log($mysqli, $userid, 14, 'Импорт. '.$questionid.', '.$questiontext);
                    $numQuestion++;
                } catch (Exception $e) {
                    $success = false;
                    $message = 'Ошибка добавления вопроса';
                }
            }

            $response_lid = $flow['response_lid'];
            $render_choice = $response_lid['render_choice'];
            $response_label = $render_choice['response_label'];

            foreach ($response_label as $a => $arrAnswer) {
                $flow_mat = $arrAnswer['flow_mat'];
                $material = $flow_mat['material'];
                $answertext = $material['mattext'];

                if ($answertext == '') $answertext = '0';
                if ($success && $questionid) {
                    $sql = "
                        insert into answer(
                          questionid,
                          answertext,
                          correct,
                          normdoc
                        )values(
                          $questionid,
                          '$answertext',
                          0,
                          null
                        );
                    ";
                    try {
                        $res = $mysqli->query($sql);
                        $answerid = $mysqli->insert_id;
                        //_log($mysqli, $userid, 13, 'Импорт. ' . $mysqli->insert_id . ', ' . $answertext);
                    } catch (Exception $e) {
                        $success = false;
                        $message = 'Ошибка добавления ответа';
                    }
                }
            }
            $resprocessing = $item['resprocessing'];
            $respcondition = $resprocessing['respcondition'];
            $conditionvar = $respcondition['conditionvar'];
            $answertext = $conditionvar['varequal'];
            if ($answertext == '') $answertext = '0';
            $itemfeedback = $item['itemfeedback'];
            $material = $itemfeedback['material'];
            $normdoc = $material['mattext'];

            //echo print_r($answertext.$answerid.$normdoc);
            $sql = "
                        update answer a
                        set a.correct = 1,
                            a.normdoc = '$normdoc'
                        where a.questionid = '$questionid'
                        and   a.answertext = '$answertext'
                    ";

            try {
                $res = $mysqli->query($sql);
                //_log($mysqli, $userid, 13, 'Импорт. ' . $mysqli->insert_id . ', ' . $answertext);
            } catch (Exception $e) {
                $success = false;
                $message = 'Ошибка обновления ответа';
            }
        }
    }else{
        $success = false;
        $message = 'Ошибка в файле иморта (тэги)';
        //$message = '111';
    }
} else {
    $success = false;
    $message = 'Ошибка в файле иморта';
    //$message = '222';
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



if ($mysqli)
    $mysqli->close();
?>
