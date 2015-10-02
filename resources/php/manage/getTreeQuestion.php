<?
require_once("../db_connect.php");
require_once("../include.php");

// * организации
$orgQuery = "
            select
              a.orgid,
              a.orgname,
              a.orgabbr
            from [transoil].[dbo].[org] a
            order by a.orgabbr
        ";
try {
    $orgRes = $conn->query($orgQuery);
    $orgRes->setFetchMode(PDO::FETCH_ASSOC);
    while ($row = $orgRes->fetch()) {
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
            from [transoil].[dbo].[activity] a
            order by a.actnum
        ";
try {
    $actRes = $conn->query($actQuery);
    $actRes->setFetchMode(PDO::FETCH_ASSOC);
    while ($row = $actRes->fetch()) {
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
              g.groupnum,
              g.knowids
            from [transoil].[dbo].[grp] g
            order by g.groupnum
        ";
try {
    $groupRes = $conn->query($groupQuery);
    $groupRes->setFetchMode(PDO::FETCH_ASSOC);
    while ($row = $groupRes->fetch()) {
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

foreach ($groupList as $groupId => $group) {
    $groupid = $group['groupid'];
    $knowids = $group['knowids'];
    if ($knowids) {
        // * области знаний
        $knowQuery = "
            select
              k.knowid,
              k.knownum,
              k.knowname
            from [transoil].[dbo].[know] k
            where k.knowid in (" . $knowids . ")
            order by k.knownum
        ";
        //echo $knowQuery;
        try {
            $knowRes = $conn->query($knowQuery);
            $knowRes->setFetchMode(PDO::FETCH_ASSOC);
            $knowList = array();
            while ($row = $knowRes->fetch()) {
                foreach ($row as $k => $v)
                    $knowList[$i][$k] = $v;
                $i++;
            }
            $groupList[$groupId]['knowarr'] = $knowList;

        } catch (Exception $e) {
            $success = false;
            echo json_encode(
                array('success' => $success,
                    'message' => $groupQuery));
        }
    }
}

// * формирование дерева
$out = '{
"success": true,
"children": [';

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
        "orgid": "' . $rowOrg['orgid'] . '",';
        if (count(_filter_by_value($actList,'orgid',$rowOrg['orgid'])) == 0) {
            $out .= '"leaf": true';
        } else {
            $out .= '"leaf": false';
            $out .= ',
        "children": [';
            $cntAct = 0;
            foreach ($actList as $i => $rowAct) {
                if ($rowAct['orgid'] == $rowOrg['orgid']) {
                    if ($cntAct > 0) {
                        $out .= ',';
                    }
                    $out .= '
            {
                "id": "' . uniqid('',true) . '",
                "text": "' . $rowAct['actabbr'] . '",
                "actid": "' . $rowAct['actid'] . '",';
                    if (count(_filter_by_value($groupList,'actid',$rowAct['actid'])) == 0) {
                        $out .= '"leaf": true';
                    } else {
                        $out .= '"leaf": false';
                        $out .= ',
                "children": [';
                        $cntGroup = 0;
                        // * перебор групп
                        foreach ($groupList as $j => $rowGroup) {
                            if ($rowGroup['actid'] == $rowAct['actid']) {
                                if ($cntGroup > 0) {
                                    $out .= ',';
                                }
                                $out .= '
                    {
                        "id": "' . uniqid('',true) . '",
                        "text": "Группа № ' . $rowAct['actnum'] . '.' . $rowGroup['groupnum'] . ' ' . $rowGroup['groupname'] . '",
                        "groupid": ' . $rowGroup['groupid'] . ',';
                                //"leaf": false';
                                if ($rowGroup['groupnum'] == 0) {
                                    $out .= '"leaf": true';
                                } else {
                                    $out .= '"leaf": false';
                                    // * перебор областей знаний
                                    if ($rowGroup['knowids']) {
                                        $out .= ',
                        "children": [';
                                        $cntKnow = 0;
                                        foreach ($rowGroup['knowarr'] as $j => $rowKnow) {
                                            if ($cntKnow > 0) {
                                                $out .= ',';
                                            }
                                            $out .= '{
                                "id": "' . uniqid('',true) . '",
                                "text": "' . $rowKnow['knownum'] . ' (' . $rowKnow['knowname'] . ')' . '",
                                "leaf": true,
                                "groupid": ' . $rowGroup['groupid'] . ',
                                "knowid": ' . $rowKnow['knowid'] . '}';
                                            $cntKnow++;
                                        }
                                        $out .= ']';
                                    }
                                }

                                $out .= '}';
                                $cntGroup++;
                            }
                        }
                        $out .= ']';
                    }
                    $out .= '}';
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
]}';
echo $out;


$conn = null;
?>