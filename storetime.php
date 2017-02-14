<?php

$action = $_GET['action'];

if ($action == 'store')
{
	$time = $_GET['time'];
    $day = $_GET['day'];
    $sym = ";";
	$data = $day .$sym .$time ;//.= join("\t", $row1)."\n";
	file_put_contents('time.csv',  $data  . "\r\n", FILE_APPEND);
	file_put_contents('timeOfAllUser.csv',  $data  . "\r\n", FILE_APPEND);

}
else if ($action == 'read')
{
	$file = file_get_contents('time.csv');

	$file = explode("\r\n", $file);

	echo json_encode(array_filter($file));
}