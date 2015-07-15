<?session_start();
require_once("db_connect.php");
require_once("include.php");

$textLogin = $_REQUEST["textLogin"];
/*$textFamily = $_REQUEST["textFamily"];
$textName = $_REQUEST["textName"];
$textLastname = $_REQUEST["textLastname"];
$comboSpeciality = $_REQUEST["comboSpeciality"];*/
$comboSystem = $_REQUEST["comboSystem"];
$textPassword = $_REQUEST["textPassword"];
$success = true;
$message = '';

//todo поменять в реальной базе пароли на зашифрованные, длина строки 40
// * проверим, что пароль не начальный
if (strtoupper($textPassword) == strtoupper($initPassword)) {
    $success = false;
    $message = 'Недопустимый пароль: ' . $initPassword;
} else {
    // * проверим, что пользователь зарегистрирован
    $sql_reg = "
     select u.userid
     from `user` u
     where u.login = '$textLogin'
     and (u.enddate is null or u.enddate = '0000-00-00 00:00:00')
    ";

    try {
        $res_reg = $mysqli->query($sql_reg);
        $row_reg = $res_reg->fetch_row();
    } catch (Exception $e) {
        $success = false;
        $message = $sql_reg;
    }
    $userid = $row_reg[0];
    if ($userid) { // * пользователь существует. 
        // * Проверим доступ к подсистеме
        $sql_sys = "
         select count(*) as nCNT
         from `user`     u,
              roleaccess ra
         where u.userid = '$userid'
         and   ra.roleid = u.roleid
         and   ra.subsystemid = '$comboSystem'
        ";
        try {
            $res_sys = $mysqli->query($sql_sys);
            $row_sys = $res_sys->fetch_row();
            // * проверка пароля
            $passSha1 = sha1($textPassword);
            //echo $passSha1;
            $sql_pas = "
             select count(*) as nCNT
             from `user`     u
             where u.userid = '$userid'
             and   u.password = '$passSha1'
            ";
            try {
                $res_pas = $mysqli->query($sql_pas);
                $row_pas = $res_pas->fetch_row();
            } catch (Exception $e) {
                $success = false;
                $message = $sql_pas;
            }
            $nCNT1 = $row_pas[0];
            if(!$nCNT1){ // * неверный пароль
                $message = 'Неверный пароль.';
                $success = false;
            }else{
                // * узнаем ФИО пользователя, чтобы вернуть в программу
                $sql_fio = "
                     select CONCAT(u.familyname,' ',u.firstname,' ',u.lastname) as fio
                     from `user`     u
                     where u.userid = '$userid'
                    ";
                try {
                    $res_fio = $mysqli->query($sql_fio);
                    $row_fio = $res_fio->fetch_row();
                } catch (Exception $e) {
                    $success = false;
                    $message = $sql_fio;
                }
                $fio = $row_fio[0];
            }
        } catch (Exception $e) {
            $success = false;
            $message = $sql_sys;
        }
        $nCNT2 = $row_sys[0];
        if(!$nCNT2){ // * нет доступа к подсистеме
            $message = 'Доступ к подсистеме не разрешен.';
            $success = false;
        }
    } else {
        $message = 'Указанный логин не зарегистрированы в системе.';
        $success = false;
    }
}

if ($success) {
    echo json_encode(
        array('success' => $success,
            'message' => $message,
            'userid' => $userid,
            'fio' => $fio));
    _log($mysqli, $userid, 1, 'Вход: '._getSubsystemName($mysqli,$comboSystem));
    $_SESSION['userid'] = $userid;
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $message));
}


?>