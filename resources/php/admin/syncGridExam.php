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
//        $sql_fio = "select
//          CONCAT_WS(' ',u.familyname,u.firstname,u.lastname) as fio
//        from [transoil].[dbo].[usr] u
//		where u.userid = '$userid'";
        $sql_fio = "select
          u.familyname+' '+u.firstname+' '+u.lastname as fio
        from [transoil].[dbo].[usr] u
		where u.userid = '$userid'";
        try {
            $res_fio = $conn->query($sql_fio);
            $row = $res_fio->fetch();
            $fio = $row[0];
        } catch (Exception $e) {
            $success = false;
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        $sql = "
            insert [transoil].[dbo].[exam](
              examdate,
              userid,
              orgid
            )values(
              GETDATE(),
              '$userid',
              '$orgid'
            );
        ";
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            echo json_encode(
                    array('examid' => $conn->lastInsertId(),
                        'userid' => $userid,
                        'examdate' => $curdate,
                        'orgid' => $orgid,
                        'fio' => $fio));
            _log($conn, $userid, 17, 'Создание: ' . $conn->lastInsertId() . ', ' . $curdate);
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
            $where .= " and DATEDIFF(mi,e.examdate, '" . $dateFrom . "') >= 0 ";
            //$where .= " and STR_TO_DATE(e.examdate, '%Y-%m-%d %H:%i') >= STR_TO_DATE('" . $dateFrom . "', '%Y-%m-%dT%H:%i') ";
        if ($dateTo)
            $where .= " and DATEDIFF(mi,'" . $dateTo . "',e.examdate) >= 0 ";
            //$where .= " and STR_TO_DATE(e.examdate, '%Y-%m-%d %H:%i') <= STR_TO_DATE('" . $dateTo . "', '%Y-%m-%dT%H:%i') ";
        if (!$dateFrom && !$dateTo)
            $where .= " and DATEDIFF(DAY,e.examdate, getdate()) = 0 ";
            //$where .= " and STR_TO_DATE(e.examdate, '%Y-%m-%d') = STR_TO_DATE(getdate(), '%Y-%m-%d') ";
        if ($testMode)
            $where .= " and e.orgid = (
                select a.orgid
                from [transoil].[dbo].[activity] a,
                     [transoil].[dbo].[grp] g,
                     [transoil].[dbo].[speciality] s,
                     [transoil].[dbo].[usr] u
                where a.actid = g.actid
                  and g.groupid = s.groupid
                  and s.specid = u.specid
                  and u.userid = '" . $userid . "'
                )";

        $sql = "select
                  examid,
                  --DATE_FORMAT(examdate, '%d.%m.%Y %H:%i') as examdate,
                  convert(varchar, e.examdate, 104) + ' '+ convert(varchar, e.examdate, 108) as examdate,
                  e.userid,
                  u.familyname+' '+u.firstname+' '+u.lastname as fio,
                  --CONCAT_WS(' ',u.familyname,u.firstname,u.lastname) as fio,
                  u.login,
                  e.orgid,
                  o.orgabbr
		        from [transoil].[dbo].[exam]   e,
		             [transoil].[dbo].[usr] u,
		             [transoil].[dbo].[org] o
		        where o.orgid = e.orgid
		        and u.userid = e.userid " . $where .
            " order by examdate desc";
        try {
            $list = array();
            $res = $conn->query($sql);
            $res->setFetchMode(PDO::FETCH_ASSOC);
            while($row = $res->fetch()) {
                array_push($list, $row);
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
            update [transoil].[dbo].[exam]
            set orgid = '$orgid'
            where examid = '$examid'
        ";
        try {
            $res = $conn->query($sql);
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
            delete from [transoil].[dbo].[exam]
            where examid = '$examid'
        ";
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
            $message = $sql;
        }

        if ($success) {
            _log($conn, $userid, 17, 'Удаление: ' . $examid);
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

$conn = null;

?>
