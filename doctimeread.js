var time, timeSite, date,dateSite;
var timeNodeList;

//Hauptfunktion
function testFunc()
{
    var usertools = document.getElementById('dokuwiki__content' ).getElementsByTagName( 'div' )[2]; 
    timeNodeList = document.createElement( 'p' );
    timeNodeList.setAttribute( 'id', 'session_counter' );
    var timeText = document.createTextNode( '' );
    var btn = document.createElement("BUTTON");        
    btn.setAttribute('id','session_button');
    var t = document.createTextNode("Ein- u. Ausblenden");       
    btn.appendChild(t);     
    var graf = document.createElement('canvas');
    graf.setAttribute('id','canvas');
    graf.setAttribute('style', '"height: 300px; width: 100%;"')   ;
    setInterval(function(){
        var time1 = Math.round( ( Date.now() / 1000 ) - time );
        timeText.nodeValue = "Die Zeit beträgt: "+time1 +" Sekunden";
    } ,1000 );
    timeNodeList.appendChild( timeText );
    usertools.appendChild(btn);
    usertools.appendChild( timeNodeList );
    usertools.appendChild(graf);
    btn.onclick = function (){einblenden(timeNodeList)};
}

//Zeitmessung wird gestartet
window.onload=function(){
 time = Date.now() / 1000;
 var today = new Date();
 var dd = today.getDate();
 var mm = today.getMonth()+1;
 var yyyy = today.getFullYear();

 if(dd<10){dd='0'+dd;}
 if(mm<10){mm='0'+mm;}
 today = dd+'.'+mm+'.'+yyyy;
 date = today;
 testFunc();
 grafzeichnen();
}

//Zeitmessung wird gestoppt und gespeichert      
window.onbeforeunload=function(){
 timeSite = Math.round( ( Date.now() / 1000 ) - time );
 var x = new XMLHttpRequest;
 x.open( 'get','/dokuwiki/lib/plugins/doctimeread/storetime.php?action=store&time=' + timeSite+'&day='+date );
 x.send();
}

//Zeit stoppen
$(window).focus()
{
    
}

//Funktion zum ein und ausblenden der Zeit
function einblenden(timenode )
{
    if(timenode.style.display == 'none')
     {
      timenode.style.display = 'block'; 
     }
     else
     {
        timenode.style.display = 'none';
     }
}


//Funktion um den Graf zu Zeichnen
function grafzeichnen() {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
 
    ctx.beginPath();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var daten = JSON.parse(xhr.responseText);
           
            for (var i = 0;i<daten.length;i++) {
             
            ctx.moveTo(0,daten[i]);
            ctx.lineTo(300,150);
            }
            ctx.stroke();
        }
    }
    xhr.open( 'GET','/dokuwiki/lib/plugins/doctimeread/storetime.php?action=read' );
    xhr.send(null);
}
