<?session_start();
$userid = $_SESSION['userid'];

require_once("../db_connect.php");
require_once("../include.php");

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$message = '';

switch ($act) {
    case 'create':
        /*$actid = $data['actid'];
        $groupnum = $data['groupnum'];

        $sql = "
            insert [transoil].[dbo].[grp](
              actid,
              groupnum
            )values(
              '$actid',
              '$groupnum'
            );
        ";
        try {
            $res = $conn->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo json_encode(
                array('groupid' => $conn->lastInsertId()));
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }*/
        break;
    case 'read':
        $examid = $_REQUEST['examid'];

        if($examid)
            $where .= ' and c.examid = '.$examid;

        $sql = "select
                  examid,
                  c.userid,
                  balls,
                  result,
                  u.familyname+' '+u.firstname+' '+u.lastname as fio,
                  --CONCAT_WS(' ',u.familyname,u.firstname,u.lastname) as fio,
                  u.login,
                  reg,
                  a.timelimit
		        from [transoil].[dbo].[class] c,
		             [transoil].[dbo].[usr]  u,
		             [transoil].[dbo].[activity] a,
		             [transoil].[dbo].[speciality] s,
		             [transoil].[dbo].[grp] g
		        where u.userid = c.userid
                and s.specid = u.specid
                and g.groupid = s.groupid
                and a.actid = g.actid "
                .$where.
		        " order by fio";

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
        foreach ($data as $row) {
            $userid = $row['userid'];
            $examid = $row['examid'];
            $reg = $row['reg'];

            if (!$userid) $userid = null;
            if (!$examid) $examid = null;
            if (!$reg) $reg = null;

            // * проверим, может человек уже прошел экзамен
            $sql = "
                    select count(*) as cnt
                    from [transoil].[dbo].[class]
                    where userid = '$userid'
                    and examid = '$examid'
                    and (result is null
                      or result = -1)
            ";
            try {
                $res = $conn->query($sql);
                $res->setFetchMode(PDO::FETCH_ASSOC);
                $row = $res->fetch();

                $result = $row[0];
            } catch (Exception $e) {
                $success = false;
            }

            if($result != 0){
                $sql = "
                    update [transoil].[dbo].[class]
                    set reg = '$reg'
                    where userid = '$userid'
                    and examid = '$examid'
                ";
                try {
                    $res = $conn->query($sql);
                } catch (Exception $e) {
                    $success = false;
                }
            }else{ // * нельзя снять регистрацию уже сдавшего экзамен
                $success = false;
                $message = 'Нельзя отменить регистрацию после прохождения экзамена';
            }
        }
        if($success){
            echo json_encode(
                array('success' => $success));
            _log($conn, $userid, 17, 'Регистрация: '.$examid);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $message));
        }

        break;
    case 'destroy':
        foreach ($data as $row) {
            $examid = $row['examid'];
            $userid = $row['userid'];
            $sql = "
                delete from [transoil].[dbo].[class]
                where userid = '$userid'
                and examid = '$examid'
            ";
            try {
                $res = $conn->query($sql);
            } catch (Exception $e) {
                $success = false;
            }
            // * удаление билета
            $sql = "
                delete from [transoil].[dbo].[card]
                where userid = '$userid'
                and examid = '$examid'
            ";
            try {
                $res = $conn->query($sql);
            } catch (Exception $e) {
                $success = false;
            }
        }
        if($success){
            echo json_encode(
                array('success' => $success));
            _log($conn, $userid, 17, 'Удаление регистрации: '.$examid);
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    default:
        echo "default";
};

$conn = null;

?>
