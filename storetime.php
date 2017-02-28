<?php
//Data write
$action = $_GET['action'];
if ($action == 'store')
{
		$time = $_GET['time'];
	    $day = $_GET['day'];
	    $sym = ";";
		
		if($_GET['isvisitor']=='1')
		{
			$data = "".$sym."". $sym. $day .$sym .$time ;
			file_put_contents('timeOfAllUser.csv',  $data  . "\r\n", FILE_APPEND);
		}
		if($_GET['iswikiuser']=='1')
		{
			$data = $day .$sym .$time.$sym.$sym ;
			file_put_contents($_GET['username'].'_time.csv',  $data  . "\r\n", FILE_APPEND);
		    file_put_contents('timeOfAllUser.csv',  $data  . "\r\n", FILE_APPEND);
		}	
}
//Data read
else if ($action == 'read')
{
	if($_GET['iswikiuser']=='1')
	{
		$file = file_get_contents($_GET['username'].'_time.csv');
		$file = explode("\r\n", $file);
		echo json_encode(array_filter($file));
	}
	if($_GET['isadmin']=='1')
	{
		$file = file_get_contents('timeOfAllUser.csv');
		$file = explode("\r\n", $file);
		echo json_encode(array_filter($file));
	}
}