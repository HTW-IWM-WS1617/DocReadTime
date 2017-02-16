var time, timeSite, date,dateSite;
var timeNodeList;
var time1;
var windowIsFocus;
var timeOld=0;
var intervall;
var lastTime=0;
var timeAb=0;
var diff=0;
var isAdmin;
var isWikiUser;
var isVisitor;
var username ="";
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
    var datetimepicker = document.createElement('DateTimePicker');
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
    var admin = document.getElementById('dokuwiki__usertools' ).getElementsByClassName( 'action admin' )[0];
    var visitor = document.getElementById('dokuwiki__usertools' ).getElementsByClassName( 'action login' )[0];
    if(admin == null)
    {
        isAdmin = '0';
    }
    else
    {
        var isAdminBool = admin.toString().includes("admin");
        if(isAdminBool==true)
            {isAdmin ='1';}
        else{isAdmin='0';}
    }
    if(visitor == null)
    {
        isVisitor = '0';
    }
    else
    {
        var isVisitorBool = visitor.toString().includes("login");
        if(isVisitorBool ==true)
        {
            isVisitor ='1';
        }
        else
        {
            isVisitor ='0';
        }
    }
    if((isVisitor=='0') && (isAdmin=='0'))
    {
        isWikiUser ='1';
        username = document.getElementsByClassName('user').item(0).getElementsByTagName('bdi').item(0).innerHTML;
    }
    else
    {
        isWikiUser ='0';
    }
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
 x.open( 'get','/dokuwiki/lib/plugins/doctimeread/storetime.php?action=store&time=' + time1+'&day='+date +'&isadmin='+isAdmin+'&isvisitor='+isVisitor+'&iswikiuser='+isWikiUser+'&username='+username);
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
    var v_date =[];
    var v_time =[];
    var time;
    var date;
    var v_konvert=[];
    var s_konvert;
    var max_time =0;
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var daten = JSON.parse(xhr.responseText);
            var data_split = daten.toString().split(",");
            for (var i = 0;i<data_split.length;i++) 
            {
                 var split_time = data_split[i].toString().split(';');
                 v_date.push(split_time[0]);
                 v_time.push(split_time[1]);
            }
            for(var j = 0;j <v_date.length;j++)
            {
                if(j!=0)
                {
                    if(date == v_date[j])
                    {
                        if(!isNaN(parseInt(v_time[j])))
                        {
                            time = time + parseInt(v_time[j]);
                        }
                        if(j== v_date.length-1)
                        {
                            s_konvert =date+";"+time+"\r\n";
                            v_konvert.push(s_konvert);
                            if(max_time<time){max_time =time;}
                        }
                    }
                    else
                    {
                        s_konvert =date+";"+time+"\r\n";
                        v_konvert.push(s_konvert);
                        if(max_time<time){max_time =time;}
                        date = v_date[j];
                        if(!isNaN(parseInt(v_time[j])))
                        {
                            time = parseInt( v_time[j]);
                        }
                        else{time =0;}
                        if(j== v_date.length-1)
                        {
                            s_konvert =date+";"+time+"\r\n";
                            v_konvert.push(s_konvert);
                            if(max_time<time){max_time =time;}
                        }
                    }
                }
                else
                {
                    time =parseInt( v_time[j]);
                    date = v_date[j];
                }
            }
            data_split =[];
            data_split = v_konvert.toString().split(",");
            //Zeichnen
            var canvas = document.getElementById('canvas');
            canvas.width = 650;
            canvas.height = max_time+70;
            var ctx = canvas.getContext('2d');
            ctx.beginPath();
            //Achsen
            ctx.font ='10pt Ariel';
            ctx.strokeText('Zeit in s',0,20);
            ctx.strokeText('Tag',610,max_time+30);
            ctx.moveTo(20,30);
            ctx.lineTo(20,max_time+30);
            ctx.lineWidth =5;
            ctx.strokeStyle = "#000";
            ctx.stroke();

            ctx.moveTo(20,max_time+30);
            ctx.lineTo(600,max_time+30);
            ctx.lineWidth =5;
            ctx.strokeStyle = "#000";
            ctx.stroke();
            var schritt=0;
            var k=0;
            k = data_split.length-8;
            if(k<0){k=0;}
            for(k;k<data_split.length;k++)
            {
                var splitted = data_split[k].toString().split(';');
                ctx.lineWidth =1;
                ctx.strokeText(splitted[0],20+schritt,max_time+50);
                ctx.fillStyle ="#FF0000";
                ctx.fillRect(50+schritt,  max_time-splitted[1]+30  ,5,splitted[1]);
                ctx.strokeText(splitted[1],45+schritt,max_time-splitted[1]+20);
                schritt = schritt + 70;
            }
            
        }
    }
    xhr.open( 'GET','/dokuwiki/lib/plugins/doctimeread/storetime.php?action=read'+'&isadmin='+isAdmin+'&isvisitor='+isVisitor+'&iswikiuser='+isWikiUser+'&username='+username);
    xhr.send(null);
}
