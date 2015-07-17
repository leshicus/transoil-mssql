<?session_start();
$userid = $_SESSION['userid'];

require_once("../db_connect.php");
require_once("../include.php");

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);

$actid = $_REQUEST['actid'];
$id = $_REQUEST['id'];
$groupid = $_REQUEST['groupid'];
$orgid = $_REQUEST['orgid'];

switch ($act) {
    case 'create':
        $sql = "
            insert into [transoil].[dbo].[speciality]
            (groupid, orgid, specname)
            values
            (" . $data['groupid'] . "," . $data['orgid'] .",'" . $data['specname'] . "')
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            echo json_encode(
                array('specid' => $mysqli->insert_id));
            _log($mysqli, $userid, 16, 'Создание: ' . $mysqli->insert_id . ', ' . $data['specname']);
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $where = ' where 1=1 ';

        if ($actid)
            $where .= ' and g.actid = ' . $actid;
        if ($groupid)
            $where .= ' and g.groupid = ' . $groupid;
        if ($orgid)
            $where .= ' and a.orgid = ' . $orgid;
        if ($id == 'root')
            $where = ' where 1=1 ';

        $sql = 'select
                  s.specid,
                  s.specname,
                  s.groupid,
                  a.orgid,
                  o.orgabbr
		        from [transoil].[dbo].[speciality] s
		         left join [transoil].[dbo].[grp] g on g.groupid = s.groupid
		         left join [transoil].[dbo].[activity] a on a.actid = g.actid
		         left join [transoil].[dbo].[org] o on o.orgid = a.orgid '
            . $where .
            ' order by s.specname';
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
        $specid = $data['specid'];
        $specname = $data['specname'];
        $groupid = $data['groupid'];

        $sql = "
            update [transoil].[dbo].[speciality]
            set specname = '$specname',
                groupid = '$groupid'
            where specid = '$specid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }
        if ($success) {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
            _log($mysqli, $userid, 16, 'Исправление: ' . $specid . ', ' . $specname);
        } else {
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        break;
    case 'destroy':
        $specid = $data['specid'];

        $sql = "
            delete from [transoil].[dbo].[speciality]
            where specid = '$specid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if ($success) {
            _log($mysqli, $userid, 16, 'Удаление: ' . $specid);
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
