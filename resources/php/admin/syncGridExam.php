<?
session_start();
require_once("../db_connect.php");
require_once('../include.php');

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;
$userid = $_SESSION['userid'];

switch ($act) {
    case 'create':
        $fio = '';
        $orgid = $data['orgid'];
        $curdate = date('d.m.Y H:i');
        // * определим ФИО наблюдателя
        $sql_fio = "select
          CONCAT_WS(' ',u.familyname,u.firstname,u.lastname) as fio
        from `user` u
		where u.userid = '$userid'";
        try {
            $res_fio = $mysqli->query($sql_fio);
            $row = $res_fio->fetch_row();
            $fio = $row[0];
        } catch (Exception $e) {
            $success = false;
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        $sql = "
            insert into exam(
              examdate,
              userid,
              orgid
            )values(
              NOW(),
              '$userid',
              '$orgid'
            );
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            echo json_encode(
                    array('examid' => $mysqli->insert_id,
                        'userid' => $userid,
                        'examdate' => $curdate,
                        'orgid' => $orgid,
                        'fio' => $fio));
            _log($mysqli, $userid, 17, 'Создание: ' . $mysqli->insert_id . ', ' . $curdate);
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $dateFrom = $_REQUEST['dateFindFrom'];
        $dateTo = $_REQUEST['dateFindTo'];
        $testMode = $_REQUEST['testMode'];

        $where = "";
        if ($dateFrom)
            $where .= " and STR_TO_DATE(e.examdate, '%Y-%m-%d %H:%i') >= STR_TO_DATE('" . $dateFrom . "', '%Y-%m-%dT%H:%i') ";
        if ($dateTo)
            $where .= " and STR_TO_DATE(e.examdate, '%Y-%m-%d %H:%i') <= STR_TO_DATE('" . $dateTo . "', '%Y-%m-%dT%H:%i') ";
        if (!$dateFrom && !$dateTo)
            $where .= " and STR_TO_DATE(e.examdate, '%Y-%m-%d') = STR_TO_DATE(CURDATE(), '%Y-%m-%d') ";
        if ($testMode)
            $where .= " and e.orgid = (
                select a.orgid
                from `activity` a,
                     `group` g,
                     `speciality` s,
                     `user` u
                where a.actid = g.actid
                  and g.groupid = s.groupid
                  and s.specid = u.specid
                  and u.userid = '" . $userid . "'
                )";

        $sql = "select
                  examid,
                  DATE_FORMAT(examdate, '%d.%m.%Y %H:%i') as examdate,
                  e.userid,
                  CONCAT_WS(' ',u.familyname,u.firstname,u.lastname) as fio,
                  u.login,
                  e.orgid,
                  o.orgabbr
		        from `exam`   e,
		             `user` u,
		             `org` o
		        where o.orgid = e.orgid
		        and u.userid = e.userid " . $where .
            " order by examdate desc";
        //echo $sql;
        try {
            $res = $mysqli->query($sql);
            $list = array();
            while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
                foreach ($row as $k => $v)
                    $arr[$k] = $v;
                array_push($list, $arr);
            }
        } catch (Exception $e) {
            $success = false;
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        echo json_encode($list);
        break;
    case 'update':
        $orgid = $data['orgid'];
        $examid = $data['examid'];

        $sql = "
            update `exam`
            set orgid = '$orgid'
            where examid = '$examid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }
        if ($success) {
            echo json_encode(
                array('success' => $success));
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        break;
    case 'destroy':
        $examid = $data['examid'];

        $sql = "
            delete from exam
            where examid = '$examid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
            $message = $sql;
        }

        if ($success) {
            _log($mysqli, $userid, 17, 'Удаление: ' . $examid);
            echo json_encode(array('success' => $success));
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $message));
        }

        break;
    default:
        echo "default";
};

if ($mysqli)
    $mysqli->close();

?>
