<?php
$success = true;
$initPassword = 'init';
$initRole = 3;  // * роль по умолчанию, предоставляема при регистрации нового пользователя

function _log($conn,$userid, $logtypeid, $parameter)
{
    //$curdate = date('Y.m.d H:i');
    $sql = "
         insert [transoil].[dbo].[log]
         (logdate, userid, parameter, logtypeid)
         values
         (GETDATE(), '$userid', '$parameter', '$logtypeid')
        ";
    try {
        $res = $conn->query($sql);
    } catch (Exception $e) {
        $success = false;
    }
}
//function _logtext($conn,$text)
//{
//    //$curdate = date('Y.m.d H:i');
//    $sql = "
//         insert `logtext`
//         (lgtext,lgdate)
//         values
//         ('$text',GETDATE())
//        ";
//    try {
//        $res = $conn->query($sql);
//    } catch (Exception $e) {
//        $success = false;
//    }
//}

function _read($conn, $sql)
{
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
    return $list;
}

function _getSubsystemName($conn,$subsystemid)
{
    $sql = '
         select s.subsystemname
         from [transoil].[dbo].[subsystem] s
         where s.subsystemid = '.$subsystemid;
    try {
        $res = $conn->query($sql);
        $row = $res->fetch();
    } catch (Exception $e) {
        $success = false;
    }
    return $row[0];
}

function _getUserName($conn,$userid)
{
    $sql = '
         select u.familyname,
                u.firstname,
                u.lastname,
                u.login
         from [transoil].[dbo].[usr] u
         where u.userid = '.$userid;
    try {
        $res = $conn->query($sql);
        $row = $res->fetch();
    } catch (Exception $e) {
        $success = false;
    }
    $str = $row[0] . ' ' . $row[1] . ' ' . $row[2] . ' (' . $row[3] . ')';
    return $str;
}

function _getSpecname($conn,$specid)
{
    $sql = '
         select u.specname
         from [transoil].[dbo].[speciality] u
         where u.specid = '.$specid;
    try {
        $res = $conn->query($sql);
        $row = $res->fetch();
    } catch (Exception $e) {
        $success = false;
    }
    return $row[0];
}

function _getRolename($conn,$roleid)
{
    $sql = '
         select u.rolename
         from [transoil].[dbo].[role] u
         where u.roleid = '.$roleid;
    try {
        $res = $conn->query($sql);
        $row = $res->fetch();
    } catch (Exception $e) {
        $success = false;
    }
    return $row[0];
}

// * парсер XML
function _objectsIntoArray($arrObjData, $arrSkipIndices = array())
{
    $arrData = array();

    // if input is object, convert into array
    if (is_object($arrObjData)) {
        $arrObjData = get_object_vars($arrObjData);
    }

    if (is_array($arrObjData)) {
        foreach ($arrObjData as $index => $value) {
            if (is_object($value) || is_array($value)) {
                $value = _objectsIntoArray($value, $arrSkipIndices); // recursive call
            }
            if (in_array($index, $arrSkipIndices)) {
                continue;
            }
            if($value)
                $arrData[$index] = $value;
            else
                $arrData[$index] = null;
        }
    }
    // * одновременно с парсингом заменяем все # на &
   // str_replace('#','&',$arrData);
    return $arrData;
}

// * перемешивание multidemensional array
function _shuffle_assoc($list) {
    if (!is_array($list)) return $list;

    $keys = array_keys($list);
    shuffle($keys);
    $random = array();
    foreach ($keys as $key) {
        $random[$key] = $list[$key];
    }
    return $random;
}

function _kshuffle(&$array) {
    if(!is_array($array) || empty($array)) {
        return false;
    }
    $tmp = array();
    foreach($array as $key => $value) {
        $tmp[] = array('k' => $key, 'v' => $value);
    }
    shuffle($tmp);
    $array = array();
    foreach($tmp as $entry) {
        $array[$entry['k']] = $entry['v'];
    }
    return true;
}

// * фильтрация массива по заданному элементу
function _filter_by_value ($array, $index, $value){
    if(is_array($array) && count($array)>0)
    {
        foreach(array_keys($array) as $key){
            $temp[$key] = $array[$key][$index];

            if ($temp[$key] == $value){
                $newarray[$key] = $array[$key];
            }
        }
    }
    return $newarray;
}
?>