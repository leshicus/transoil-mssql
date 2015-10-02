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
    FROM [transoil].[dbo].[answer] a,
      [transoil].[dbo].[question] q,
      [transoil].[dbo].[answer] a1
    WHERE q.questionid = a.questionid
      AND a.answerid = '$answerid'
      AND a1.questionid = q.questionid
      AND a1.correct = 1";
} else {
    $query = "
    SELECT null,
           a1.normdoc,
           a1.answertext
    FROM [transoil].[dbo].[question] q,
      [transoil].[dbo].[answer] a1
    WHERE q.questionid = '$questionid'
      AND a1.questionid = q.questionid
      AND a1.correct = 1";
}
try {
    $res = $conn->query($query);
    $row = $res->fetch();
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

$conn = null;

?>