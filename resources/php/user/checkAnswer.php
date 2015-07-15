<?
session_start();

require_once("../db_connect.php");
require_once("../include.php");

$success = true;
$answerid = $_REQUEST['answerid'];
$questionid = $_REQUEST['questionid'];

if ($answerid) { // * указан ответ
    $query = "
    SELECT a.correct,
          a1.normdoc,
          a1.answertext
    FROM `answer` a,
      `question` q,
      `answer` a1
    WHERE q.questionid = a.questionid
      AND a.answerid = '$answerid'
      AND a1.questionid = q.questionid
      AND a1.correct = 1";
} else {
    $query = "
    SELECT null,
           a1.normdoc,
           a1.answertext
    FROM `question` q,
      `answer` a1
    WHERE q.questionid = '$questionid'
      AND a1.questionid = q.questionid
      AND a1.correct = 1";
}
try {
    $res = $mysqli->query($query);
    $row = $res->fetch_row();
} catch (Exception $e) {
    $success = false;
}

if ($success) {
    echo json_encode(
        array('success' => $success,
            'correct' => $row[0],
            'normdoc' => $row[1],
            'answertext' => $row[2]));
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $sql));
}

if ($mysqli)
    $mysqli->close();

?>