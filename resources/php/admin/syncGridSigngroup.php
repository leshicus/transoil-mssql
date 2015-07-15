<?
// * без логирования. зачем оно тут?
require_once("../db_connect.php");
require_once("../include.php");

$act = $_REQUEST['act'];
$data = json_decode(file_get_contents('php://input'), true);
$success = true;

switch ($act) {
    case 'create':
        $examid = $data['examid'];

        $sql = "
            insert into `signgroup`(
              examid
            )values(
              '$examid'
            );
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }

        if($success){
            echo json_encode(
                array('signgroupid' => $mysqli->insert_id));
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    case 'read':
        $examid = $_REQUEST['examid'];
        $where = ' where 1=1 ';

        if($examid)
            $where .= ' and examid = '.$examid;

        $sql = "select
                  signgroupid,
                  examid,
                  familyname,
                  firstname,
                  lastname,
                  CONCAT_WS(' ',familyname,firstname,lastname) as fio
		        from `signgroup`"
		        .$where.
		        " order by familyname, firstname";
        //echo $sql;
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
        $signgroupid = $data['signgroupid'];
        $familyname = $data['familyname'];
        $firstname = $data['firstname'];
        $lastname = $data['lastname'];

        if(!$familyname) $familyname = null;
        if(!$firstname) $firstname = null;
        if(!$lastname) $lastname = null;

        $sql = "
            update `signgroup`
            set familyname = '$familyname',
                firstname = '$firstname',
                lastname = '$lastname'
            where signgroupid = '$signgroupid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
        }
        if($success){
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }else{
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }

        break;
    case 'destroy':
        $signgroupid = $data['signgroupid'];

        $sql = "
            delete from `signgroup`
            where signgroupid = '$signgroupid'
        ";
        try {
            $res = $mysqli->query($sql);
        } catch (Exception $e) {
            $success = false;
            echo json_encode(
                array('success' => $success,
                    'message' => $sql));
        }
        break;
    default:
        echo "default";
};

if ($mysqli)
    $mysqli->close();

?>
