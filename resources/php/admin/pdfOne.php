<?
session_start();
// * печать одиночной Экзаменационной ведомости в PDF
require_once("../db_connect.php");
require_once("../include.php");
require_once('pdf.inc.excelOneConsolidated.php');

$userid = $_REQUEST['userid'];
$examid = $_REQUEST['examid'];

// * случай печати отчета в Тестировании на самого пользователя
if($userid == 0){
    $userid = $_SESSION['userid'];
}

// * функция для апперкейса
function reverseStringCharactersCase($string)
{
    $reversedString = '';
    $string = iconv('UTF-8', 'cp1251', $string);
    for ($i = 0; $i < strlen($string); $i++) {
        $reversedString .= strtoupper($string[$i]);
    }
    return iconv('cp1251', 'UTF-8', $reversedString);
}

// * формирование массивов и переменных
$queryHeader = "select
            e.examdate,
            u.familyname,
            u.firstname,
            u.lastname,
            s.specname,
            (CASE c.result when 1 then 'СДАН'
              WHEN 0 THEN 'НЕ СДАН'
              ELSE '?'
             END)  as result,
            c.balls,
            (SELECT COUNT(*) FROM card t WHERE t.examid = e.examid AND t.userid = u.userid) AS numQuestions,
            o.orgabbr
          from exam e,
               `user` u,
               speciality s,
               class c,
               `group` g,
               `activity` a,
               `org` o
          where e.examid = '$examid'
          and u.userid = '$userid'
          and s.specid = u.specid
          and c.userid = u.userid
          and c.examid = e.examid
          and g.groupid = s.groupid
          and a.actid = g.actid
          and a.orgid = o.orgid
          ";
try {
    $resHeader = $mysqli->query($queryHeader);
    $rowHeader = $resHeader->fetch_row();

    $fioFull = $rowHeader[1].' '.$rowHeader[2].' '.$rowHeader[3];
    $fioAbbr = $rowHeader[1].' '.substr($rowHeader[2],0,2).'.'.substr($rowHeader[3],0,2).'.';
    $examDate = $rowHeader[0];
    $specName = $rowHeader[4];
    $result = $rowHeader[5];
    $balls = $rowHeader[6];
    $numQuestions = $rowHeader[7];
    $orgabbr = $rowHeader[8];
} catch (Exception $e) {
    $success = false;
}

$querySign = "select
            CONCAT(s.familyname,' ',SUBSTR(s.firstname,1,1),'.',SUBSTR(s.lastname,1,1),'.') as fio
          from signgroup s
          where s.examid = '$examid'
          ";
try {
    $resSign = $mysqli->query($querySign);
    $listSign=array();
    while ($row = $resSign->fetch_array(MYSQLI_ASSOC)) {
        foreach ($row as $k => $v)
            $arrSign[$k]= $v;
        array_push($listSign, $arrSign);
    }
} catch (Exception $e) {
    $success = false;
}

$queryQuestion = "select
            q.questiontext,
            IFNULL(a.answertext,'') as answertext,
            (CASE a.correct WHEN 0 THEN '-'
              WHEN 1 THEN '+'
              ELSE '-' END
            ) AS correct
          from card c
            LEFT JOIN question q on q.questionid = c.questionid
            LEFT JOIN answer a on a.answerid = c.answerid
          where c.examid = '$examid'
          and c.userid = '$userid'
          ";
try {
    $resQuestion = $mysqli->query($queryQuestion);
    $listQuestion=array();
    while ($row = $resQuestion->fetch_array(MYSQLI_ASSOC)) {
        foreach ($row as $k => $v)
            $arrQuestion[$k]= $v;
        array_push($listQuestion, $arrQuestion);
    }
} catch (Exception $e) {
    $success = false;
}



// * печать отчета
if($success){
    $p = new PDF();
    $p->SetMargins(25,20,10,20);// л в п н
    $p->AddPage('P');

    // * Заголовок Экзаменационная ведомость
    $p->setStyle('title');
    $p->text(0,'Экзаменационная ведомость',0,'R');
    $p->hr();

    // * Верхняя часть
    $p->Ln(5);
    $html = "<table cellpadding='3' border='1' align='left'>
    <tr>
		<td height='1' align='left' border='0000' width='30'>ФИО:</td>
		<td height='1' align='left' border='0000' style='bold'>".$fioFull."</td>
    </tr>
    <tr>
	    <td height='1' align='left' border='0000' width='30'>Организация:</td>
		<td height='1' align='left' border='0000'>".$orgabbr."</td>
	</tr>
	<tr>
	    <td height='1' align='left' border='0000' width='30'>Должность:</td>
		<td height='1' align='left' border='0000'>".$specName."</td>
	</tr>
	<tr>
	    <td height='1' align='left' border='0000' width='30'>Дата:</td>
		<td height='1' align='left' border='0000'>".$examDate."</td>
	</tr>
	</table>";
    $htmlConverted = $p->convert($html);
    $p->htmltable($htmlConverted);

    $p->Ln(5);

    // * таблица
    $html = "<table cellpadding='3' border='1' align='left' width='".$p->width."'>
    <tr repeat=1>
	    <td height='1' align='center' width='10'>№</td>
		<td height='1' align='center'>Вопрос</td>
		<td height='1' align='center'>Ответ</td>
		<td height='1' align='center' width='10'>Оценка</td>
	</tr>";

    $i=0;
    $j=0;
    foreach($listQuestion as $i => $question){
        $j = $i + 1;
        $html .= "
        <tr>
            <td height='1' align='center'>".$j."</td>
            <td height='1' align='left'>".$listQuestion[$i]['questiontext']."</td>
            <td height='1' align='left'>".$listQuestion[$i]['answertext']."</td>
            <td height='1' align='center'>".$listQuestion[$i]['correct']."</td>
        </tr>";
    }
    $html .= "</table>";
    $htmlConverted = $p->convert($html);
    $p->htmltable($htmlConverted);

    // * результат
    $p->Ln(5);
    $p->text(0, $balls. ' / '. $numQuestions,0,'R');
    $p->Ln(5);

    // * подписная часть
    $html = "<table cellpadding='3' border='1' align='left'>
    <tr>
	    <td height='15' align='left' border='0000' width='80'>Результат:</td>
		<td align='left' border='0000' style='bold'>".$result."</td>
	</tr>
    <tr>
	    <td height='15' align='left' border='0000' width='80'>Экзаменуемый:</td>
		<td align='left' border='0000' style='bold'>(".$fioAbbr.")</td>
	</tr>";

    $i=0;
    $j=0;
    foreach($listSign as $i => $sign){
        $j = $i + 1;
        $html .= "
        <tr>
            <td border='0000'></td>
            <td height='15' align='left' border='0000'>(".$listSign[$i]['fio'].")</td>
        </tr>";
    }
    $html .= "</table>";
    $htmlConverted = $p->convert($html);
    $p->htmltable($htmlConverted);
    $filename = "ведомость_".time().".pdf";
    $p->output($filename,'I');
}

if ($mysqli)
    $mysqli->close();

?>