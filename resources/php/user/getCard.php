<?
session_start();
/* 1. Создание билета, сохранение его в [transoil].[dbo].[card]
* */
require_once("../db_connect.php");
require_once("../include.php");

$userid = $_SESSION['userid'];
$examid = $_REQUEST['examid'];
$know = $_REQUEST['know'];

if (isset($know)) { // самоподготовка
    if ($know) { // указана ОЗ
        $sql = "select
                    q.questionid
                from
                    [transoil].[dbo].[usr] u,
                    [transoil].[dbo].[speciality] s,
                    [transoil].[dbo].[question] q
                where u.userid = '$userid'
                and s.specid = u.specid
                and q.knowid = '$know'
                and q.groupid = s.groupid";
    } else { // не указана ОЗ
        $sql = "select
                    q.questionid
                from
                    [transoil].[dbo].[usr] u,
                    [transoil].[dbo].[speciality] s,
                    [transoil].[dbo].[question] q
                where u.userid = '$userid'
                and s.specid = u.specid
                and q.groupid = s.groupid";
    }

    try {
        $res = $conn->query($sql);
        $column = $res->fetchColumn(0);
        $str = implode(',',$column); // * преобразуем массив в строку
    } catch (Exception $e) {
        $success = false;
        $message = $sql;
    }
    //echo $str;
    //echo $sql;
    // * возможные вопросы
    if($str){
        $sql = "select
            q.questionid,
            q.questiontext,
            a.answerid,
            a.answertext
        from
            [transoil].[dbo].[question] q,
            [transoil].[dbo].[answer] a
        where a.questionid = q.questionid
        and q.questionid in (" . $str . ")";

        $list=_read($conn,$sql);
        // * проставим rownum
        $questionid = null;
        $cnt = 0;
        foreach ($list as $k => $row) {
            if ($row['questionid'] == $questionid) {
                $list[$k]['rownum'] = $cnt;
                continue;
            } else {
                $questionid = $row['questionid'];
                $cnt++;
                $list[$k]['rownum'] = $cnt;
            }
        }
    }
} else { // экзамен
    // * сколько вопросов должно быть в билете
    $sql = "
        select
            maxquestion
        from [transoil].[dbo].[tool] t
        where t.toolid = 1";
    try {
        $res = $conn->query($sql);
        $row = $res->fetch();
        $questionAmount = $row[0];
        if ($questionAmount > 0) {
            // * строка с рандомными questionid, в количестве $questionMaxInCard штук
//            $sql = "
//                select
//                    group_concat(questionid) as str
//                from
//                    (select
//                        q.questionid
//                    from
//                        [transoil].[dbo].[usr] u,
//                        [transoil].[dbo].[speciality] s,
//                        [transoil].[dbo].[question] q
//                    where u.userid = '$userid'
//                    and s.specid = u.specid
//                    and q.groupid = s.groupid
//                    ORDER BY RAND()
//                    LIMIT $questionAmount) t";
            $sql = "select
                        q.questionid
                    from
                        [transoil].[dbo].[usr] u,
                        [transoil].[dbo].[speciality] s,
                        [transoil].[dbo].[question] q
                    where u.userid = '$userid'
                    and s.specid = u.specid
                    and q.groupid = s.groupid";
            try {
                $res = $conn->query($sql);
                $column = $res->fetchColumn(0);

                shuffle($column); // * перемешаем
                $column = array_slice($array, 0, $questionAmount-1); // * обрежем до длины $questionAmount
                $str = implode(',',$column); // * преобразуем массив в строку

                if ($str) {
                    // * возможные вопросы
                    $sql = "select
                            q.questionid,
                            q.questiontext,
                            a.answerid,
                            a.answertext
                        from
                            [transoil].[dbo].[question] q,
                            [transoil].[dbo].[answer] a
                        where a.questionid = q.questionid
                        and q.questionid in (" . $str . ")";
                    try {
                        $list=_read($conn,$sql);

                        if (count($list) > 0) {
                            // * сохраним в [transoil].[dbo].[card] сгенерированные вопросы по билету
                            $questionid = null;
                            $cnt = 0;
                            foreach ($list as $k => $row) {
                                if ($row['questionid'] == $questionid) {
                                    $list[$k]['rownum'] = $cnt;
                                    continue;
                                } else {
                                    $questionid = $row['questionid'];

                                    $sql = "insert [transoil].[dbo].[card]
                                        (userid, examid, questionid)
                                        values
                                        ('$userid', '$examid', '$questionid')";
                                    try {
                                        // * сохранение в билет
                                        $res = $conn->query($sql);
                                    } catch (Exception $e) {
                                        $success = false;
                                        $message = $sql;
                                    }
                                    $cnt++;
                                    $list[$k]['rownum'] = $cnt;
                                }
                            }
                        }
                    } catch (Exception $e) {
                        $success = false;
                        $message = $sql;
                    }
                }
            } catch (Exception $e) {
                $success = false;
                $message = $sql;
            }
        }
    } catch (Exception $e) {
        $success = false;
        $message = $sql;
    }

}

if ($success) {
    if(count($list)){
       /* _kshuffle($list); // * перемешиваем вопросы-ответы
        $list = array_values($list);*/
        shuffle($list);
    }
    _log($conn, $userid, 9, $examid);
    $rows = array();
    $rows['rows'] = $list;
    echo json_encode($rows);
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $message));
}

$conn = null;

?>

