<?php

$action = $_GET['action'];
//$usIsAdmin = $_GET['isadmin'];
//$usIsVisitor =  $_GET['isvisitor'];
//$usIsWikuUser = $_GET['iswikiuser'];
//$username =$_GET['username'];
if ($action == 'store')
{
		$time = $_GET['time'];
	    $day = $_GET['day'];
	    $sym = ";";
		$data = $day .$sym .$time ;
		if($_GET['isvisitor']=='1')
		{
			file_put_contents('visitor_time.csv',  $data  . "\r\n", FILE_APPEND);
		}
		if($_GET['iswikiuser']=='1')
		{
			file_put_contents($_GET['username'].'_time.csv',  $data  . "\r\n", FILE_APPEND);
		    file_put_contents('timeOfAllUser.csv',  $data  . "\r\n", FILE_APPEND);
		}
			
		
		
}
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