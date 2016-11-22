var time,timeSite;

window.onload=function(){
 time = Date.now() / 1000;
}


window.onbeforeunload=function(){
 timeSite = Math.round( ( Date.now() / 1000 ) - time );
 var x = new XMLHttpRequest;
 x.open( 'get','/dokuwiki/lib/plugins/doctimeread/storetime.php?time=' + timeSite );
 x.send();
}