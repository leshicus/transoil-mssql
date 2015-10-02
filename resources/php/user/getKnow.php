<?
require_once("../db_connect.php");

$query = "select
              k.knowid,
              k.knownum,
              k.knowname
            from [transoil].[dbo].[know] k
            order by k.knownum";

echo json_encode(_read($conn,$sql));

$conn = null;

?>