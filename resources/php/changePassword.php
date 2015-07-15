<?session_start();
require_once("db_connect.php");
require_once("include.php");

$userid = $_SESSION['userid'];
$textLogin = $_REQUEST["textLogin"];
$textOldPassword = $_REQUEST["textOldPassword"];
$textNewPassword = $_REQUEST["textNewPassword"];
$success = true;
$message = 'Пароль изменен';
$oldPassSha1 = sha1($textOldPassword);
$newPassSha1 = sha1($textNewPassword);

// * проверим, что все необходимые поля заполнены
if (!$textLogin || !$textOldPassword || !$textNewPassword) {
    $success = false;
    $message = 'Не все поля заполнены';
} else {
    // * проверим, что пароль не начальный
    if (strtoupper($textNewPassword) == strtoupper($initPassword)) {
        $success = false;
        $message = 'Недопустимый пароль: ' . $initPassword;
    } else {
        // * проверка, что логин существует
        $sql_login = "
         select count(*) as nCNT
         from `user` u
         where u.login = '$textLogin'
        ";
        try {
            $res_login = $mysqli->query($sql_login);
            $row_login = $res_login->fetch_row();
        } catch (Exception $e) {
            $success = false;
            $message = $sql_login;
        }

        if ($row_login[0]) {
            // * проверим, что старый пароль верен

            $sql_pas = "
             select count(*) as nCNT
             from `user` u
             where u.login = '$textLogin'
             and u.password = '$oldPassSha1'
            ";
            try {
                $res_pas = $mysqli->query($sql_pas);
                $row_pas = $res_pas->fetch_row();
            } catch (Exception $e) {
                $success = false;
                $message = $sql_pas;
            }

            if ($row_pas[0]) {
                // * все ОК, поменяем старый пароль на новый
                $sql_change = "
                 update `user` u
                 set u.password = '$newPassSha1'
                 where u.login = '$textLogin'
                ";
                try {
                    $res_change = $mysqli->query($sql_change);
                } catch (Exception $e) {
                    $success = false;
                    $message = $sql_change;
                }
            } else {
                $message = 'Старый пароль указан неверно.';
                $success = false;
            }
        } else {
            $message = 'Указанный логин не зарегистрирован в системе.';
            $success = false;
        }
    }
}


if ($success) {
    echo json_encode(
        array('success' => $success,
            'message' => $message));
    _log($mysqli, $userid, 8, 'Смена пользователем');
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $message));
}


?>