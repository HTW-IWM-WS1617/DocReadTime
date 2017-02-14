var time, timeSite, date,dateSite;
var timeNodeList;
var time1;
var windowIsFocus;
var timeOld=0;
var intervall;
var lastTime=0;
var timeAb=0;
var diff=0;
window.onfocus = function()
{
    windowIsFocus = true;
}

window.onblur = function()
{
    windowIsFocus = false;
}

//Hauptfunktion
function testFunc()
{
    var usertools = document.getElementById('dokuwiki__content' ).getElementsByTagName( 'div' )[2]; 
    
    var table = document.createElement('table');
    table.style.width = '100%';
    var tbdy = document.createElement('tbody');
    tbdy.setAttribute('id','Haupttabelle');
    
    timeNodeList = document.createElement( 'p' );
    timeNodeList.setAttribute( 'id', 'session_counter' );
    var timeText = document.createTextNode( '' );
    var btn = document.createElement("BUTTON");        
    btn.setAttribute('id','session_button');
    var t = document.createTextNode("Ein- u. Ausblenden");       
    btn.appendChild(t);     
    var graf = document.createElement('canvas');
    graf.setAttribute('id','canvas');
    graf.setAttribute('style', '"height: 300px; width: 100%;"');

    intervall = setInterval(function()
    {
         if(windowIsFocus)
         {
            time1 = Math.round( Date.now()/1000 - time );
            if(lastTime!=0)
            {diff = time1 - lastTime;
                timeAb = time1 -diff ;
                time1 = timeAb;
                lastTime++;
            }
            
            
            timeText.nodeValue = "Die Zeit beträgt: "+time1  +" Sekunden";

         }
         else
         {
            lastTime = time1;
         }
        } ,1000 );
   
    
    timeNodeList.appendChild( timeText );


    var tr = document.createElement('tr');   
    var tr1 = document.createElement('tr');
    var td1 = document.createElement('td');
    var td2 = document.createElement('td');
    var td3 = document.createElement('td');
    td1.appendChild(timeNodeList);
    td2.appendChild(btn);
    td3.appendChild(graf);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr1.appendChild(td3);
    table.appendChild(tr);
    table.appendChild(tr1);


    usertools.appendChild(table);
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
 var x = new XMLHttpRequest;
 x.open( 'get','/dokuwiki/lib/plugins/doctimeread/storetime.php?action=store&time=' + time1+'&day='+date );
 x.send();
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
            var v_date =[];
            var v_time =[];
            var daten = JSON.parse(xhr.responseText);
            var data_split = daten.toString().split(",");
            for (var i = 0;i<data_split.length;i++) {
             var split_time = data_split[i].toString().split(';');
             v_date.push(split_time[0]);
             v_time.push(split_time[1]);
            }
            ctx.moveTo(0,daten[i]);
            ctx.lineTo(300,150);
            ctx.stroke();
        }
    }
    xhr.open( 'GET','/dokuwiki/lib/plugins/doctimeread/storetime.php?action=read' );
    xhr.send(null);
}
