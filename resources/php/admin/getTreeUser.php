<?
require_once("../db_connect.php");
require_once("../include.php");

// * организации
$orgQuery = "
            select
              a.orgid,
              a.orgname,
              a.orgabbr
            from org a
            order by a.orgabbr
        ";
try {
    $orgRes = $mysqli->query($orgQuery);
    while ($row = $orgRes->fetch_array(MYSQLI_ASSOC)) {
        foreach ($row as $k => $v)
            $orgList[$i][$k] = $v;
        $i++;
    }
} catch (Exception $e) {
    $success = false;
    echo json_encode(
        array('success' => $success,
            'message' => $orgQuery));
}

// * виды деятельности
$actQuery = "
            select
              a.actid,
              a.actname,
              a.actnum,
              a.orgid,
              a.actabbr
            from activity a
            order by a.actnum
        ";
try {
    $actRes = $mysqli->query($actQuery);
    while ($row = $actRes->fetch_array(MYSQLI_ASSOC)) {
        foreach ($row as $k => $v)
            $actList[$i][$k] = $v;
        $i++;
    }
} catch (Exception $e) {
    $success = false;
    echo json_encode(
        array('success' => $success,
            'message' => $actQuery));
}

// * группы
$groupQuery = "
            select
              g.actid,
              g.groupid,
              g.groupname,
              g.groupnum
            from `group` g
            order by g.groupnum
        ";
try {
    $groupRes = $mysqli->query($groupQuery);
    while ($row = $groupRes->fetch_array(MYSQLI_ASSOC)) {
        foreach ($row as $k => $v)
            $groupList[$i][$k] = $v;
        $i++;
    }
} catch (Exception $e) {
    $success = false;
    echo json_encode(
        array('success' => $success,
            'message' => $groupQuery));
}

// * формирование дерева
/*$out = '{
        "success": true,
        "children": [';
$cntAct = 0;
foreach ($actList as $i => $rowAct) {
    if ($cntAct > 0) {
        $out .= ',';
    }

    $out .= '{
                "id": ' . $rowAct['actid'] . ',
                "text": "' . $rowAct['actabbr'] . '",
                "leaf": false';
    // * перебор групп
    if (count($groupList)) {
        $out .= ',
        "children": [';
        $cntGroup = 0;
        foreach ($groupList as $j => $rowGroup) {
            if ($rowGroup['actid'] == $rowAct['actid']) {
                if ($cntGroup > 0) {
                    $out .= ',';
                }
                $out .= '{
                    "id": "' . $rowAct['actid'] . '-' . $rowGroup['groupid'] . '",
                    "text": "Группа № ' . $rowAct['actnum'] . '.' . $rowGroup['groupnum'] . '",
                    "leaf": true,
                    //"expanded": true
                    "groupid": ' .$rowGroup['groupid'].',}';
                $cntGroup++;
            }
        }
        $out .= ']';
    }
    $out .= '}';
    $cntAct++;
}

$out .= ']}';
echo $out;*/

$out = '[';

// * перебор организаций
$cntOrg = 0;
foreach ($orgList as $i => $rowOrg) {
    if (count($rowOrg)) {
        if ($cntOrg > 0) {
            $out .= ',';
        }
        $out .= '
    {
        "id": "' . uniqid('',true) . '",
        "text": "' . $rowOrg['orgabbr'] . '",
        "orgid": ' . $rowOrg['orgid'] . ',';
        if (count(_filter_by_value($actList,'orgid',$rowOrg['orgid'])) == 0) {
            $out .= '"leaf": true';
        } else {
            $out .= '"leaf": false';
            $out .= ',
        "children": [';
            $cntAct = 0;
            foreach ($actList as $i => $rowAct) {
                if ($rowAct['orgid'] == $rowOrg['orgid']) {
                    if ($cntAct != 0) {
                        $out .= ',';
                    }
                    $out .= '
            {
                "id": "' . uniqid('',true) . '",
                "text": "' . $rowAct['actabbr'] . '",
                "actid": ' . $rowAct['actid'] . ',
                "leaf": false';
                    // * перебор групп
                    if (count(_filter_by_value($groupList, 'actid', $rowAct['actid']))) {
                        $out .= ',
                "children": [';
                        $cntGroup = 0;
                        foreach ($groupList as $j => $rowGroup) {
                            if ($rowGroup['actid'] == $rowAct['actid']) {
                                if ($cntGroup > 0) {
                                    $out .= ',';
                                }
                                $out .= '
                    {
                        "id": "' . uniqid('',true) . '",
                        "text": "Группа № ' . $rowAct['actnum'] . '.' . $rowGroup['groupnum'] . ' ' . $rowGroup['groupname'] . '",
                        "leaf": true,
                        "groupid": ' . $rowGroup['groupid'] . '}';
                                $cntGroup++;
                            }
                        }
                        $out .= '
                ]';
                    }
                    $out .= '
            }';
                    $cntAct++;
                }
            }
            $out .= '
        ]';
        }
    }
    $out .= '
    }';
    $cntOrg++;
}

$out .= '
]';

echo $out;

if ($mysqli)
    $mysqli->close();
?>