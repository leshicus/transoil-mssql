<?
require_once("../db_connect.php");
require_once("../include.php");

$str = $_REQUEST['str'];
$str = str_replace(array('[',']','"'),"",$str);

$predefined = array('&', '<', '>', '"', '\'');
$allowed = array('&amp;', '&lt;', '&gt;', '&quot;', '&apos;');

if($str){
    $xml = '<?xml version="1.0" encoding="utf-8" ?>
<questestinterop>';
// * одновременно с выгрузкой заменяем все & на &amp;, т.к. для xml это спецсимвол
    $sql = "
  SELECT
       q.questionid,
       a.answerid,
       q.questiontext,
       a.answertext,
       a.correct,
       a.normdoc
  FROM question q,
       answer a
  WHERE a.questionid = q.questionid
  AND q.questionid IN (".$str.")";
    try {
        $res = $mysqli->query($sql);
        $list=array();
        while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
            foreach ($row as $k => $v)
                $arr[$k]= str_replace($predefined,$allowed,$v);
            array_push($list, $arr);
        }
    } catch (Exception $e) {
        $success = false;
    }

    $questionid = 0;
    foreach($list as $i => $answer){
        if($questionid != $answer['questionid']){ // * смена вопроса
            if($questionid != 0){ // * 1-й
                $xml .= '
                </render_choice></response_lid>
            </flow></presentation>
                <resprocessing>
                  <outcomes><decvar  vartype="Integer" defaultval="0"/></outcomes>
                  <respcondition title="Верно">
                    <conditionvar><varequal respident="'.$questionid.'">'.$answertext.'</varequal></conditionvar>
                    <setvar action="Set">1</setvar>
                    <displayfeedback feedbacktype="Response" linkrefid="'.$answerid.'"/>
                  </respcondition>
                </resprocessing>
                <itemfeedback ident="'.$answerid.'"><material><mattext>'.$normdoc.'</mattext></material></itemfeedback>
        </item>';
            }
            $questionid = $answer['questionid'];
            if($answer['correct'] == 1){
                $normdoc = $answer['normdoc'];
                $answerid = $answer['answerid'];
                $answertext = $answer['answertext'];
            }
            $xml .= '
        <item ident="'.$questionid.'">
            <presentation><flow>
                <material><mattext>'.$answer['questiontext'].'</mattext></material>
                <response_lid ident="'.$questionid.'" rcardinality="Single" rtiming="No"><render_choice shuffle="Yes">';
        }
        $xml .= '<response_label ident="'.$answer['answerid'].'">
                <flow_mat><material><mattext>'.$answer['answertext'].'</mattext></material></flow_mat>
            </response_label>';
    }
    $xml .= '</render_choice></response_lid>
            </flow></presentation>
                <resprocessing>
                  <outcomes><decvar  vartype="Integer" defaultval="0"/></outcomes>
                  <respcondition title="Верно">
                    <conditionvar><varequal respident="'.$questionid.'">'.$answertext.'</varequal></conditionvar>
                    <setvar action="Set">1</setvar>
                    <displayfeedback feedbacktype="Response" linkrefid="'.$answerid.'"/>
                  </respcondition>
                </resprocessing>
                <itemfeedback ident="'.$answerid.'"><material><mattext>'.$normdoc.'</mattext></material></itemfeedback>
        </item>
</questestinterop>';

    $filename ="export_imsqti_questions_".time().".xml";

    header("Content-type: application/force-download");
//header('Content-Type: text/xml');
    header('Content-Disposition:attachment; filename='.$filename);
    echo $xml;
}


if ($mysqli)
    $mysqli->close();
?>