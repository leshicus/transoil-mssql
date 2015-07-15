<?php
$taskname = $_REQUEST["taskname"];
$subsystem = $_REQUEST["subsystem"];
$filename='../instruction/'.$subsystem.'/'.$taskname.'.doc';
$file_name= $taskname.'.doc';
header("Cache-control: private");
header("Content-type: application/force-download");
//header('Content-Type: application/octet-stream');
header("Content-Length: ".filesize($filename));
header("Content-Disposition: attachment; filename=instruction_".$file_name);
//readfile($filename);

echo file_get_contents($filename);