<?
require_once("../db_connect.php");
require_once("../include.php");

$str = $_REQUEST['str'];

$xml = '<?xml version="1.0" encoding="utf-8" ?>
        <root>';
// * одновременно с выгрузкой заменяем все & на #, т.к. для xml это спецсимвол
$sql = '
  SELECT
       q.questionid,
       replace(q.questiontext,"'.'&'.'","'.'#'.'") as questiontext,
       replace(a.answertext,"'.'&'.'","'.'#'.'") as answertext,
       replace(a.correct,"'.'&'.'","'.'#'.'") as correct,
       replace(a.normdoc,"'.'&'.'","'.'#'.'") as normdoc
  FROM [transoil].[dbo].[question] q,
       [transoil].[dbo].[answer] a
  WHERE a.questionid = q.questionid
  AND q.questionid IN ('.$str.')';
try {
    $list = array();
    $res = $conn->query($sql);
    $res->setFetchMode(PDO::FETCH_ASSOC);
    while($row = $res->fetch()) {
        array_push($list, $row);
    }
} catch (Exception $e) {
    $success = false;
}

$questionid = 0;
foreach($list as $i => $answer){
    if($questionid != $answer['questionid']){ // * смена вопроса
        if($questionid != 0) // * 1-й
            $xml .= '</question>';
        $questionid = $answer['questionid'];
        $xml .= '<question>
                <questiontext>'.$answer['questiontext'].'</questiontext>';
    }
    $xml .= '<answer>
                <answertext>'.$answer['answertext'].'</answertext>
                <correct>'.$answer['correct'].'</correct>
                <normdoc>'.$answer['normdoc'].'</normdoc>
            </answer>';
}
$xml .= '</question>
         </root>';

$filename ="export_questions_".time().".xml";

header("Content-type: application/force-download");
//header('Content-Type: text/xml');
header('Content-Disposition:attachment; filename='.$filename);
echo $xml;

$conn = null;
?>