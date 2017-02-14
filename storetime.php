<?php

$action = $_GET['action'];

if ($action == 'store')
{
	$time = $_GET['time'];
    $day = $_GET['day'];
    $sym = ";";
	$data = $day .$sym .$time ."\n";//.= join("\t", $row1)."\n";
	file_put_contents('time.csv',  $data  . "\r\n", FILE_APPEND);


}
else if ($action == 'read')
{
	$file = file_get_contents('time.txt');

	$file = explode("\r\n", $file);

	echo json_encode(array_filter($file));
}