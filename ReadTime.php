<?php
/**
 * Created by PhpStorm.
 * User: el-ba
 * Date: 07.11.2016
 * Time: 19:31
 */


/* setzen der Cacheverwaltung auf 'private' */

session_cache_limiter('private');
$cache_limiter = session_cache_limiter();

/* setzen der Cache-Verfallszeit auf 30 Minuten */
session_cache_expire(30);
$cache_expire = session_cache_expire();

/* starten der Session */

session_start();

echo "Die Cacheverwaltung ist jetzt auf $cache_limiter gesetzt<br />";
echo "Die Session wird für $cache_expire Minuten im Cache gespeichert";
?>
