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
var select;
window.onfocus = function()
{
    windowIsFocus = true;
}

window.onblur = function()
{
    windowIsFocus = false;
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



//Hauptfunktion
function testFunc()
{
    var usertools = document.getElementById('dokuwiki__content' ).getElementsByTagName( 'div' )[2];  
    select = document.createElement('SELECT');
    select.setAttribute('id','selectZeit');

    var option = document.createElement("option");
    option.value = "woche";
    option.text = "letzte Woche";
    select.appendChild(option);

    var option1 = document.createElement("option");
    option1.value = "monat";
    option1.text = "letzten Monat";
    select.appendChild(option1);

    var option2 = document.createElement("option");
    option2.value = "3monat";
    option2.text = "letzte 3 Monate";
    select.appendChild(option2);

    var option3 = document.createElement("option");
    option3.value = "6monat";
    option3.text = "letzte 6 Monate";
    select.appendChild(option3);

    var option4 = document.createElement("option");
    option4.value = "12monat";
    option4.text = "letzte 12 Monate";
    select.appendChild(option4);

    select.onchange = function(){grafzeichnen();}
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
    var td4 = document.createElement('td');
    td1.appendChild(timeNodeList);
    td2.appendChild(btn);
    td3.appendChild(graf);
    td4.appendChild(select);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr1.appendChild(td3);
    if(isAdmin == '1')
    {
        tr1.appendChild(td4);
    }
   
   
    table.appendChild(tr);
    table.appendChild(tr1);


    usertools.appendChild(table);
    btn.onclick = function (){einblenden(timeNodeList)};
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
    var v_date_visitor = [];
    var v_time_visitor = [];
    var time;
    var visitor_time;
    var visitor_date;
    var date;
    var v_konvert=[];
    var s_konvert;
    var visitorSumtime;
    var v_visitorSumtime =[];
    var max_time =0;
    var y=0;
    var zeitrimt;
    var data_split_v =[];
    var dateZeitraum = new Date();
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            var daten = JSON.parse(xhr.responseText);
            var data_split = daten.toString().split(",");
            if(isAdmin=="1")
            {
                var Zeitraum = document.getElementById("selectZeit").value;
                switch(Zeitraum)
                {
                    case "woche": dateZeitraum.setDate(dateZeitraum.getDate()-7);
                        break;
                    case "monat": dateZeitraum.setDate(dateZeitraum.getDate()-30);
                        break;
                    case "3monat": dateZeitraum.setDate(dateZeitraum.getDate()-90);
                        break;
                    case "6monat": dateZeitraum.setDate(dateZeitraum.getDate()-180);
                        break;
                    case "12monat": dateZeitraum.setDate(dateZeitraum.getDate()-365);
                        break;
                }
                var dd = dateZeitraum.getDate();
                var mm = dateZeitraum.getMonth()+1;
                var yyyy = dateZeitraum.getFullYear();

                if(dd<10){dd='0'+dd;}
                if(mm<10){mm='0'+mm;}
                dateZeitraum = dd+'.'+mm+'.'+yyyy;
            }
            for (var i = 0;i<data_split.length;i++) 
            {
                 var split_time = data_split[i].toString().split(';');
                 if(split_time[0]!="")
                 {
                    v_date.push(split_time[0]);
                    v_time.push(split_time[1]);
                 }
                 
                 if((isAdmin=='1') && (split_time[2]!=""))
                 {
                    v_date_visitor.push(split_time[2]);
                    v_time_visitor.push(split_time[3]);
                 }
                 
            }
            if(isAdmin=='1')
            {
                for(var z=0;z<v_date_visitor.length;z++)
                {
                    if(z!=0)
                    {
                        if(v_date_visitor[z]!="undefined")
                        {
                            if(visitor_date == v_date_visitor[z])
                            {
                                if(!isNaN(parseInt(v_time_visitor[z])))
                                {
                                    visitor_time = visitor_time + parseInt(v_time_visitor[z]);
                                }
                                //Letztes Element
                                if(z== v_date_visitor.length-1)
                                {
                                    visitorSumtime =visitor_date+";"+visitor_time+"\r\n";
                                    v_visitorSumtime.push(visitorSumtime);
                                    if(max_time<visitor_time){max_time =visitor_time;}
                                }
                            }
                            else
                            {
                                visitorSumtime =visitor_date+";"+visitor_time+"\r\n";
                                v_visitorSumtime.push(visitorSumtime);
                                if(max_time<visitor_time){max_time =visitor_time;}
                                visitor_date = v_date_visitor[z];
                                if(!isNaN(parseInt(v_time_visitor[z])))
                                {
                                    visitor_time = parseInt( v_time_visitor[z]);
                                }
                                else{visitor_time =0;}
                                //Letztes Element
                                if(z== v_date_visitor.length-1)
                                {
                                    visitorSumtime =visitor_date+";"+visitor_time+"\r\n";
                                    v_visitorSumtime.push(visitorSumtime);
                                    if(max_time<visitor_time){max_time =visitor_time;}
                                }
                            }
                        }
                    }
                    else
                    {
                        if(v_date_visitor[z]!="undefined")
                        {
                            visitor_time =parseInt( v_time_visitor[z]);
                            visitor_date = v_date_visitor[z];
                        }
                        
                    }
                }
            }
            for(var j = 0;j <v_date.length;j++)
            {
                if(j!=0)
                {
                    if(v_date[j]!="undefined")
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
                }
                else
                {
                    if(v_date[j]!="undefined")
                        {
                            time =parseInt( v_time[j]);
                            date = v_date[j];
                        }
                }
            }
            data_split =[];
            data_split = v_konvert.toString().split(",");
            var splitagain = data_split[0].toString().split(';');
            var s_datea = splitagain[0];
            s_datea = s_datea.split('.');
            var newDatea = s_datea[1] + "/" +s_datea[0] + '/' + s_datea[2];
            var werta =new Date(newDatea).getTime();

            var sad = dateZeitraum;
            sad = sad.split('.');
            var as = sad[1] + '/' + sad[0] + '/' + sad[2];
            zeitrimt = new Date(as).getTime();

            if(werta< zeitrimt )
            {
                var sdat= [] ;
                for(var i=0 ; i<data_split.length ; i++)
                {
                    var s= data_split[i].toString().split(";");
                    var s_date = s[0];
                    s_date = s_date.split('.');
                    var newDate = s_date[1] + "/" +s_date[0] + '/' + s_date[2];
                    var wert =new Date(newDate).getTime();
                    if((zeitrimt <wert)||(zeitrimt==wert))
                    {
                        sdat.push(data_split[i]);
                    }
                }
                data_split =[];
                data_split = sdat;
                if(data_split.length>8)
                {
                    var ldat =[];
                    ldat.push(data_split[0]);
                    for(var j=0;j==5;j++)
                    {
                        var item = data_split[Math.floor(Math.random()*data_split.length-1)];
                        if((item!=data_split[0])&&(item!=data_split[data_split.length]))
                        {
                            ldat.push(item);
                        }
                    }
                    ldat.push(data_split[data_split.length]);
                    data_split =[];
                    data_split = ldat;
                }
            }


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
            var le  = 0;
            var mi = 0;
            var minArray = [];
            var maxArray =[];
            var farbe_min;
            var farbe_max;
            if(isAdmin=='1')
            {
                data_split_v = v_visitorSumtime.toString().split(",");
                schritt =0;
                var splitagain = data_split_v[0].toString().split(';');
                var s_dates = splitagain[0];
                    s_dates = s_dates.split('.');
                    var newDates = s_dates[1] + "/" +s_dates[0] + '/' + s_dates[2];
                    var werts =new Date(newDates).getTime();
                    
                if(werts< zeitrimt)
                {
                    var sdat=[];
                    for(var i=0;i<data_split_v.length;i++)
                    {
                        var s= data_split_v[i].toString().split(";");
                        var sd = s[0];
                        sd = sd.split('.');
                        var newDaten = sd[1] + "/" +sd[0] + '/' + sd[2];
                        var wertn =new Date(newDaten).getTime();
                        if(( zeitrimt <wertn)||(zeitrimt==wertn))
                        {
                            sdat.push(data_split_v[i]);
                        }
                    }
                    data_split_v =[];
                    data_split_v = sdat;
                    if(data_split_v.length>8)
                    {
                        var ldat =[];
                        ldat.push(data_split_v[0]);
                        for(var j=0;j<6;j++)
                        {
                            var item = data_split_v[Math.floor(Math.random()*data_split_v.length-1)];
                            if((item!=data_split_v[0])&&(item!=data_split_v[data_split_v.length]))
                            {
                                ldat.push(item);
                            }
                        }
                        ldat.push(data_split_v[data_split_v.length]);
                        data_split_v =[];
                        data_split_v = ldat;
                    }
                }
            }
            if(data_split_v.length < data_split.length)
            {
                le = data_split.length;
                maxArray = data_split;
                me = data_split_v.length;
                farbe_max = "Wiki User";
                farbe_min = "Besucher";
                minArray = data_split_v;
            }
            if(data_split_v.length > data_split.length)
            {
                le = data_split_v.length;
                maxArray = data_split_v;
                me = data_split.length;
                minArray = data_split;
                farbe_min = "Wiki User";
                farbe_max = "Besucher";
            }
            if(data_split_v.length == data_split.length)
            {
                farbe_max = "Wiki User";
                farbe_min = "Besucher";
                le = data_split_v.length;
                minArray = data_split_v;
                me = data_split.length;
                maxArray = data_split;
            }
            


            if(isAdmin=='1')
            {
                ctx.fillStyle ="#04B404";
                ctx.fillRect(550,40,20,10);
                ctx.lineWidth =1;
                if(farbe_min=="Besucher")
                {
                    ctx.strokeText("Besucher",575,50);
                }
                else
                {
                    ctx.strokeText("WikiUser",575,50);
                }

                ctx.fillStyle ="#FF0000";
                ctx.fillRect(550,20,20,10);
                ctx.lineWidth =1;
                if(farbe_min=="Besucher")
                {
                    ctx.strokeText("WikiUser",575,30);
                }
                else
                {
                    ctx.strokeText("Besucher",575,30);
                }
                 
                
                
            }
            k = le-8;
            if(k<0){k=0;}
            for(k;k<le;k++)
            {
                if(isAdmin!="1")
                {
                    var splitted = data_split[k].toString().split(';');
                    ctx.lineWidth =1;
                    ctx.strokeText(splitted[0],20+schritt,max_time+50);
                    ctx.fillStyle ="#FF0000";
                    ctx.fillRect(50+schritt,  max_time-splitted[1]+30  ,5,splitted[1]);
                    ctx.strokeText(splitted[1],45+schritt,max_time-splitted[1]+20);
                    schritt = schritt + 70;
                }
                else
                {

                    var splitted_max   = maxArray[k].toString().split(';');
                    var splitted_min   = minArray[k].toString().split(';');

                    var int_max = splitted_max[0];
                    var s_datea = int_max.split('.');
                    var newDatea = s_datea[1] + "/" +s_datea[0] + '/' + s_datea[2];
                    var TimeStamp_Max =new Date(newDatea).getTime();

                    var int_min = splitted_min[0];
                    var sada = int_min.split('.');
                    var newDateddsca = sada[1] + "/" +sada[0] + '/' + sada[2];
                    var TimeStamp_Min =new Date(newDateddsca).getTime();
                    if(TimeStamp_Min == TimeStamp_Max)
                    {
                        ctx.lineWidth =1;
                        ctx.strokeText(splitted_max[0],20+schritt,max_time+50);
                        ctx.fillStyle ="#FF0000";
                        ctx.fillRect(50+schritt,  max_time-splitted_max[1]+30  ,5,splitted_max[1]);
                        ctx.strokeText(splitted_max[1],45+schritt,max_time-splitted_max[1]+20);
                        //Anonynm
                        ctx.fillStyle ="#04B404";
                        ctx.fillRect(65+schritt,  max_time-splitted_min[1]+30  ,5,splitted_min[1]);
                        ctx.strokeText(splitted_min[1],59+schritt,max_time-splitted_min[1]+20);
                        schritt = schritt + 70;
                    }

                    if(TimeStamp_Min< TimeStamp_Max)
                    {

                        if(TimeStamp_Min!="")
                        {
                            //Anonynm
                            ctx.lineWidth =1;
                            ctx.strokeText(splitted_min[0],20+schritt,max_time+50);
                            ctx.fillStyle ="#04B404";
                            ctx.fillRect(65+schritt,  max_time-splitted_min[1]+30  ,5,splitted_min[1]);
                            ctx.strokeText(splitted_min[1],59+schritt,max_time-splitted_min[1]+20);
                            schritt = schritt + 70;
                            maxArray.push(maxArray[k]);
                            maxArray.sort();
                            minArray.push(";");
                            le++;
                        }
                        else
                        {
                            ctx.lineWidth =1;
                            ctx.strokeText(splitted_max[0],20+schritt,max_time+50);
                            ctx.fillStyle ="#FF0000";
                            ctx.fillRect(50+schritt,  max_time-splitted_max[1]+30  ,5,splitted_max[1]);
                            ctx.strokeText(splitted_max[1],45+schritt,max_time-splitted_max[1]+20);
                            schritt = schritt + 70;
                            if(maxArray[k+1]!="")
                            {
                                le++;
                                minArray.push("");
                            }
                        }
                       
                    }
                    if(TimeStamp_Min> TimeStamp_Max)
                    {
                        if(TimeStamp_Max!="")
                        {

                            ctx.lineWidth =1;
                            ctx.strokeText(splitted_max[0],20+schritt,max_time+50);
                            ctx.fillStyle ="#FF0000";
                            ctx.fillRect(50+schritt,  max_time-splitted_max[1]+30  ,5,splitted_max[1]);
                            ctx.strokeText(splitted_max[1],45+schritt,max_time-splitted_max[1]+20);
                            schritt = schritt + 70;
                            minArray.push(minArray[k]);
                            minArray.sort();
                            maxArray.push(";");
                            le++;
                        }
                        else
                        {
                            //Anonynm
                            ctx.lineWidth =1;
                            ctx.strokeText(splitted_min[0],20+schritt,max_time+50);
                            ctx.fillStyle ="#04B404";
                            ctx.fillRect(65+schritt,  max_time-splitted_min[1]+30  ,5,splitted_min[1]);
                            ctx.strokeText(splitted_min[1],59+schritt,max_time-splitted_min[1]+20);
                            schritt = schritt + 70;
                            if(minArray[k+1]!="")
                            {
                                le++;
                                maxArray.push("");
                            }
                        }
                        
                     
                    }
                }
                
            }
             
            
        }
    }
    xhr.open( 'GET','/dokuwiki/lib/plugins/doctimeread/storetime.php?action=read'+'&isadmin='+isAdmin+'&isvisitor='+isVisitor+'&iswikiuser='+isWikiUser+'&username='+username);
    xhr.send(null);
}
