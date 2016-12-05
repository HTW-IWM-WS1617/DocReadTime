<?php

$time = $_GET['time'];

file_put_contents('time.txt', $time . "\r\n", FILE_APPEND);