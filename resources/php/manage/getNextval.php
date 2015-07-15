<?
// получить следующее значение id из последовательности
require_once("../include.php");

$success = true;
$seq = $_REQUEST['seq'];

$query_id = "select
             $seq.nextval as id
             from dual";

try {
    $result = oci_parse($conn, $query_id);
    if (!(oci_execute($result))) throw new Exception;
    while ($row = oci_fetch_array($result, OCI_ASSOC)) {
        $output[] = $row;
    }
    oci_free_statement($result);
    echo json_encode(array('success' => true, 'id' => $output[0]['ID']));
} catch (Exception $e) {
    echo json_encode(
        array('success' => false,
            'message' => $query));
}

if ($conn)
    oci_close($conn);
?>