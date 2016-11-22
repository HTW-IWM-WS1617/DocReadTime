<?php

$time = $_GET['time'];

file_put_contents('test.txt', $time . "\r\n", FILE_APPEND);