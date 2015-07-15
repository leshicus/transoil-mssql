<?
	$mysqli = new mysqli("localhost","root","","transoil");

	if ($mysqli->connect_errno) {
		printf("Connect failed: %s\n", $conn->connect_error);
		exit();
	}
    $mysqli->set_charset('utf8');
