<?php

$action = $_GET['action'];

if ($action == 'store')
{
	$time = $_GET['time'];
    $day = $_GET['day'];
	file_put_contents('time.txt',  $time  . "\r\n", FILE_APPEND);
}
else if ($action == 'read')
{
	$file = file_get_contents('time.txt');

	$file = explode("\r\n", $file);

	echo json_encode(array_filter($file));
}