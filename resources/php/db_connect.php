<?
	//$conn = new PDO("sqlsrv:Server=ALEX-ПК\\SQLEXPRESS;Database=transoil","root","");

$serverName = "ALEX-ПК\\SQLEXPRESS";
//$connectionInfo = array('Database'=>'transoil','CharacterSet'=>'UTF-8');
//$conn = sqlsrv_connect($serverName, $connectionInfo);
//if( !$conn )
//{
//    echo "Connection could not be established.\n";
//    die( print_r( sqlsrv_errors(), true));
//}
$dbname = 'transoil';

try {
    # MS SQL Server и Sybase через PDO_DBLIB
    $conn = new PDO("sqlsrv:Server=$serverName;Database=$dbname", NULL, NULL);
    //$DBH = new PDO("mssql:host=$serverName;dbname=$dbname", $user, $pass);

    # MySQL через PDO_MYSQL
    //$DBH = new PDO("mysql:host=$host;dbname=$dbname", $user, $pass);
}
catch(PDOException $e) {
    echo $e->getMessage();
}