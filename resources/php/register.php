<?
require_once("db_connect.php");
require_once("include.php");

$data = json_decode(file_get_contents('php://input'), true);
$textLogin = ($_REQUEST["textLogin"] ? $_REQUEST["textLogin"] : $data[0]['login']);
$textFamily = $_REQUEST["textFamily"] ? $_REQUEST["textFamily"] : $data[0]['familyname'];
$textName = $_REQUEST["textName"] ? $_REQUEST["textName"] : $data[0]['firstname'];
$textLastname = $_REQUEST["textLastname"] ? $_REQUEST["textLastname"] :  $data[0]['lastname'];
$comboSpeciality = $_REQUEST["comboSpeciality"] ? $_REQUEST["comboSpeciality"] : $data[0]['specid'];
$roleid = $data[0]['roleid'];
$textPassword = $_REQUEST["textPassword"] ? $_REQUEST["textPassword"] : $data[0]['password'];

$initRole = ($roleid ? $roleid : $initRole);
$message = 'Вы зарегистрировались.';

// * проверим, что все необходимые поля заполнены
if (!$textLogin || !$textFamily || !$textName || !$comboSpeciality || !$textPassword) {
    $success = false;
    $message = 'Не все поля заполнены';
} else {
    // * проверим, что пароль не начальный
    if (strtoupper($textPassword) == strtoupper($initPassword)) {
        $success = false;
        $message = 'Не допустимый пароль: ' . $initPassword;
    } else {
        // * проверка, что логин уже существует, либо сочетание ФИО-специальность
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
        if (!$row_login[0]) {
            $sql_fio = "
             select count(*) as nCNT
             from `user` u
             where u.familyname = '$textFamily'
             and u.firstname = '$textName'
             and u.lastname = '$textLastname'
             and u.specid = '$comboSpeciality'
            ";
            try {
                $res_fio = $mysqli->query($sql_fio);
                $row_fio = $res_fio->fetch_row();
            } catch (Exception $e) {
                $success = false;
                $message = $sql_fio;
            }
            if (!$row_fio[0]) {
                $passSha1 = sha1($textPassword);
                $sql = "
                    insert into user(
                      familyname,
                      firstname,
                      lastname,
                      specid,
                      password,
                      login,
                      begindate,
                      roleid
                    )values(
                      '$textFamily',
                      '$textName',
                      '$textLastname',
                      '$comboSpeciality',
                      '$passSha1',
                      '$textLogin',
                      NOW(),
                      '$initRole'
                    );
                ";
                try {
                    $res = $mysqli->query($sql);
                } catch (Exception $e) {
                    $success = false;
                    $message = $sql;
                }
            } else {
                $message = 'Указанное сочетание ФИО-специальность уже зарегистрировано в системе.';
                $success = false;
            }
        } else {
            $message = 'Указанный логин уже зарегистрирован в системе.';
            $success = false;
        }
    }
}

if ($success) {
    echo json_encode(
        array('success' => $success,
            'userid' => $mysqli->insert_id));
    _log($mysqli, $mysqli->insert_id, 3, 'Создание: '.$textFamily.' '.$textName.' '.$textLastname.', '.$comboSpeciality.', '.$textLogin);
} else {
    echo json_encode(
        array('success' => $success,
            'message' => $message));
}


?>