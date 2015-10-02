<?
require_once("../db_connect.php");
require_once('../include.php');

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;

switch ($act) {
    case 'read':
        $dateFrom = $_REQUEST['dateFindFrom'];
        $dateTo = $_REQUEST['dateFindTo'];
        $comboLogtype = $_REQUEST['comboLogtype'];
        $where = "";
        if($comboLogtype)
            $where.= " and g.logtypeid = '" . $comboLogtype . "' ";
        if($dateFrom)
            $where.= " and DATEDIFF(mi, '" . $dateFrom . "', g.logdate) >= 0 ";
            //$where.= " and STR_TO_DATE(g.logdate, '%Y-%m-%d %H:%i') >= STR_TO_DATE('" . $dateFrom . "', '%Y-%m-%dT%H:%i')";
        if($dateTo)
            $where.= " and DATEDIFF(mi, g.logdate, '" . $dateTo . "') >= 0 ";
            //$where.= " and STR_TO_DATE(g.logdate, '%Y-%m-%d %H:%i') <= STR_TO_DATE('" . $dateTo . "', '%Y-%m-%dT%H:%i') ";
        if(!$dateFrom && !$dateTo)
            $where.= " and DATEDIFF(DAY, g.logdate, getdate()) = 0 ";
            //$where.= " and STR_TO_DATE(g.logdate, '%Y-%m-%d') = STR_TO_DATE(getdate(), '%Y-%m-%d') ";

        $sql = "select
                  g.logid,
                  --DATE_FORMAT(g.logdate, '%d.%m.%Y %H:%i') as logdate,
                  convert(varchar, g.logdate, 104) + ' ' +convert(varchar, g.logdate, 108) as logdate,
                  g.userid,
                  g.parameter,
                  g.logtypeid,
                  u.familyname+' '+u.firstname+' '+u.lastname as fio,
                  --CONCAT_WS(' ',u.familyname,u.firstname,u.lastname) as fio,
                  t.logtypename
		        from [transoil].[dbo].[log] g,
		            [transoil].[dbo].[usr] u,
		            [transoil].[dbo].[logtype] t
		        where u.userid = g.userid
		        and t.logtypeid = g.logtypeid ".$where.
		        " order by logid desc";
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
    default:
        echo "default";
};

$conn = null;

?>
