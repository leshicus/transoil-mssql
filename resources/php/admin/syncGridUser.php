<?session_start();
$userid_admin = $_SESSION['userid'];

require_once("../db_connect.php");
require_once("../include.php");

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);

switch ($act) {
    case 'create':
        require_once("../register.php");

        break;
    case 'read':
        $actid = $_REQUEST['actid'];
        $id = $_REQUEST['id'];
        $groupid = $_REQUEST['groupid'];
        $orgid = $_REQUEST['orgid'];
        $where = ' where 1=1 ';

        if($actid)
            $where .= ' and g.actid = '.$actid;
        if($groupid)
            $where .= ' and g.groupid = '.$groupid;
        if($orgid)
            $where .= ' and a.orgid = '.$orgid;
        if($id == 'root')
            $where = ' where 1=1 ';
        $sql = "select
                  u.userid,
                  u.familyname,
                  u.firstname,
                  u.lastname,
                  u.roleid,
                  u.login,
                  DATE_FORMAT(u.begindate, '%d.%m.%Y %H:%i') as begindate,
                  DATE_FORMAT(u.enddate, '%d.%m.%Y %H:%i') as enddate,
                  u.specid,
                  s.specname,
                  s.groupid,
                  u.password,
                  a.orgid,
                  a.actid,
                  o.orgid
		        from `user` u
		         left join `speciality` s on s.specid = u.specid
		         left join `group` g on g.groupid = s.groupid
		         left join `activity` a on a.actid = g.actid
		         left join `org` o on o.orgid = a.orgid "
		         .$where.
		        " order by u.familyname, u.firstname, u.lastname, u.begindate";
       // echo $sql;
        try {
            $res = $mysqli->query($sql);
            $list=array();
            while ($row = $res->fetch_array(MYSQLI_ASSOC)) {
                foreach ($row as $k => $v)
                    $arr[$k]= $v;
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
        //echo print_r($data);
        foreach ($data as $row) {
            //echo print_r($row);
            $userid = $row['userid'];
            $familyname = $row['familyname'];
            $firstname = $row['firstname'];
            $lastname = $row['lastname'];
            $roleid = $row['roleid'];
            $login = $row['login'];
            $begindate = $row['begindate'];
            $enddate = $row['enddate'];
            $specid = $row['specid'];
            $password = $row['password'];

            if (!$userid) $userid = null;
            if (!$familyname) $familyname = null;
            if (!$firstname) $firstname = null;
            if (!$lastname) $lastname = null;
            if (!$roleid) $roleid = null;
            if (!$login) $login = null;
            if (!$begindate) $begindate = null;
            if (!$enddate) $enddate = '0000-00-00 00:00:00';
            if (!$specid) $specid = null;

            // * администратор хочет сам себя заблокировать/разблокировать- нельзя
            if($userid_admin == $userid){
                $success = false;
                continue;
            }

            // * значения до изменений
            $sql = '
                select u.familyname,
                       u.firstname,
                       u.lastname,
                       u.login,
                       u.begindate,
                       u.enddate,
                       s.specid,
                       s.specname,
                       r.roleid,
                       r.rolename,
                       u.password
                from `user` u
                  LEFT JOIN `speciality` s ON s.specid = u.specid
                  LEFT JOIN `role` r ON r.roleid = u.roleid
                where u.userid = '.$userid;
            //echo $sql;
            try {
                $res = $mysqli->query($sql);
                $row = $res->fetch_row();

                $fio_0 = $row[0] . ' ' . $row[1] . ' ' . $row[2] . ' (' . $row[3] . ')';
                $begindate_0 = $row[4];
                $enddate_0 = $row[5];
                $specid_0 = $row[6];
                $specname_0 = $row[7];
                $roleid_0 = $row[8];
                $rolename_0 = $row[9];
                $password_0 = $row[10];
            } catch (Exception $e) {
                $success = false;
            }

            if(!$password){
                $password = $initPassword;
                $sql = "
                    update `user`
                    set familyname = '$familyname',
                        firstname = '$firstname',
                        lastname = '$lastname',
                        roleid = '$roleid',
                        specid = '$specid',
                        password = '$password',
                        enddate = DATE_FORMAT(STR_TO_DATE('".$enddate."', '%d.%m.%Y %H:%i'),'%Y.%m.%d %H:%i')
                    where userid = '$userid'
                ";
            }else{
                $sql = "
                    update `user`
                    set familyname = '$familyname',
                        firstname = '$firstname',
                        lastname = '$lastname',
                        roleid = '$roleid',
                        specid = '$specid',
                        enddate = DATE_FORMAT(STR_TO_DATE('".$enddate."', '%d.%m.%Y %H:%i'),'%Y.%m.%d %H:%i')
                    where userid = '$userid'
                ";
            }
            try {
                $res = $mysqli->query($sql);
            } catch (Exception $e) {
                $success = false;
            }
        }
        if($success){
            echo json_encode(
                array('success' => $success));
            // * логи
            if($password == $initPassword && $password != $password_0)
                _log($mysqli, $userid_admin, 3, 'Сброс пароля на начальный. '.$fio_0);
            if($enddate != '00.00.0000 00:00' && $enddate != '0000-00-00 00:00:00' && $enddate != null)
                _log($mysqli, $userid_admin, 3, 'Блокировка пользователя. '.$fio_0.', '.$enddate);
            if($enddate == '00.00.0000 00:00' && ($enddate_0 != '0000-00-00 00:00:00' && $enddate_0 != null))
                _log($mysqli, $userid_admin, 3, 'Разблокировка пользователя. '.$fio_0.', '.date('d.m.Y H:i'));
            if($specid_0 != $specid)
                _log($mysqli, $userid_admin, 3, 'Изменение специальности пользователя. '.$fio_0.', старая: '.$specname_0.', новая: '._getSpecname($mysqli,$specid));
            if($roleid_0 != $roleid)
                _log($mysqli, $userid_admin, 3, 'Изменение роли пользователя. '.$fio_0.', старая: '.$rolename_0.', новая: '._getRolename($mysqli,$roleid));
        }else{
            echo json_encode(
                array('success' => 'Ошибка запроса к базе',
                    'message' => $sql));
        }

        break;
    case 'destroy':
        foreach ($data as $row) {
            $userid = $row['userid'];
            $familyname = $row['familyname'];
            $firstname = $row['firstname'];
            $lastname = $row['lastname'];
            $login = $row['login'];
            $specid = $row['specid'];

            if (!$userid) $userid = null;
            if (!$familyname) $familyname = null;
            if (!$firstname) $firstname = null;
            if (!$lastname) $lastname = null;
            if (!$login) $login = null;
            if (!$specid) $specid = null;

            $fio = $familyname . ' ' . $firstname . ' ' . $lastname . ' (' . $login . ')';

            $sql = "
                delete from `user`
                where userid = '$userid'
            ";
            try {
                $res = $mysqli->query($sql);
            } catch (Exception $e) {
                $success = false;
                $message = $sql;
            }
        }

        if ($success) {
            echo json_encode(array('success' => $success));
            _log($mysqli, $userid_admin, 3, 'Удаление. '.$fio.', '._getSpecname($mysqli,$specid));
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
