var time, timeSite;


function testFunc()
{
    var usertools = document.getElementById( 'dokuwiki__usertools' ).getElementsByTagName( 'ul' )[0];
    var timeNodeList = document.createElement( 'li' );
    timeNodeList.setAttribute( 'id', 'session_counter' );
    var timeText = document.createTextNode( '' );
    var btn = document.createElement("BUTTON");        
    btn.setAttribute('id','session_button');
    //btn.onclick=einblenden('dokuwiki__usertools');
    var t = document.createTextNode("Ein- u. Ausblenden");       
    btn.appendChild(t);                                
    document.body.appendChild(btn);    
    setInterval(function(){
        var time1 = Math.round( ( Date.now() / 1000 ) - time );
        timeText.nodeValue = "Die Zeit beträgt: "  +time1 +" Sekunden";
    } ,1000 );

    timeNodeList.appendChild( timeText );
    usertools.appendChild( timeNodeList );
}

window.onload=function(){
 time = Date.now() / 1000;
 testFunc();
}

      
window.onbeforeunload=function(){
 timeSite = Math.round( ( Date.now() / 1000 ) - time );
 var x = new XMLHttpRequest;
 x.open( 'get','/dokuwiki/lib/plugins/doctimeread/storetime.php?time=' + timeSite );
 x.send();
}

function einblenden(li )
{
    with ( document.getElementById( li ).style ) {
        if ( display == "none" ) {
            display = "inline";
        } else {
            display = "none";
        }
    }
}

/*<html>
<head>
<title>DocReadTime</title>
<script language="JavaScript" type="text/javascript"></head>
<body>
    
<p>Ihre Zeit</p>
<input type="button" value="Ein-/ausblenden"
       onclick="einblenden('news1')"><br>
<div id="news1" style="display: none;">Die Zeit betr&auml;gt: <?php 
echo $time; ?></div>

</body>
</html>*/