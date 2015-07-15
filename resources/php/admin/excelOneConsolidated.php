<?
session_start();

// * печать одиночной Сводной ведомости в Excel
require_once("../db_connect.php");
require_once("../include.php");
require_once("excelOneConsolidated_template.php");

$examarr = $_REQUEST['examarr'];
$dateFindFrom = $_REQUEST['dateFindFrom'];
$dateFindTo = $_REQUEST['dateFindTo'];

if (!$dateFindTo)
    $dateFindTo = date('d.m.Y');


// * формирование массивов и переменных
$queryHeader = "select
            DATE_FORMAT(e.examdate, '%d.%m.%Y %H:%i') as examdate,
            CONCAT(u.familyname,' ',u.firstname,' ',u.lastname) as fio,
            s.specname,
            (CASE c.result when 1 then 'сдан'
              WHEN 0 THEN 'не сдан'
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
          where e.examid in ($examarr)
          and s.specid = u.specid
          and c.userid = u.userid
          and c.examid = e.examid
          and g.groupid = s.groupid
          and a.actid = g.actid
          and a.orgid = o.orgid
          order by fio, specname, examdate
          ";

try {
    $resHeader = $mysqli->query($queryHeader);

    $list = array();
    while ($row = $resHeader->fetch_array(MYSQLI_ASSOC)) {
        foreach ($row as $k => $v)
            $arr[$k] = $v;
        array_push($list, $arr);
    }
} catch (Exception $e) {
    $success = false;
}

header('Content-Type: application/vnd.ms-excel');
header("Content-Disposition: attachment; filename=сводная_ведомость_".time().".xml");

$excel = $header;
$excel .= '<Row ss:Index="3">
    <Cell><Data ss:Type="String">Период:</Data></Cell>
    <Cell><Data ss:Type="String">'.$dateFindFrom.' - '.$dateFindTo.'</Data></Cell>
   </Row>
   <Row ss:StyleID="s64" ss:Index="5">
    <Cell ss:StyleID="s63"><Data ss:Type="String">№</Data></Cell>
    <Cell ss:StyleID="s63"><Data ss:Type="String">ФИО</Data></Cell>
    <Cell ss:StyleID="s63"><Data ss:Type="String">Специальность</Data></Cell>
    <Cell ss:StyleID="s63"><Data ss:Type="String">Организация</Data></Cell>
    <Cell ss:StyleID="s63"><Data ss:Type="String">Дата</Data></Cell>
    <Cell ss:StyleID="s63"><Data ss:Type="String">Баллы</Data></Cell>
    <Cell ss:StyleID="s63"><Data ss:Type="String">Результат</Data></Cell>
   </Row>'
;

$number = 0;

    foreach($list as $k => $row){
        $number++;
        $excel .= '<Row ss:AutoFitHeight="1">
    <Cell ss:StyleID="s70"><Data ss:Type="Number">'.$number.'</Data></Cell>
    <Cell ss:StyleID="s66"><Data ss:Type="String">'.$row['fio'].'</Data></Cell>
    <Cell ss:StyleID="s66"><Data ss:Type="String">'.$row['specname'].'</Data></Cell>
    <Cell ss:StyleID="s66"><Data ss:Type="String">'.$row['orgabbr'].'</Data></Cell>
    <Cell ss:StyleID="s66"><Data ss:Type="String">'.$row['examdate'].'</Data></Cell>
    <Cell ss:StyleID="s69"><Data ss:Type="String">'.$row['balls'] .' / '. $row['numQuestions'].'</Data></Cell>
    <Cell ss:StyleID="s69"><Data ss:Type="String">'.$row['result'].'</Data></Cell>
   </Row>';
    }


$excel .= $footer;
echo $excel;

if ($mysqli)
    $mysqli->close();

?>