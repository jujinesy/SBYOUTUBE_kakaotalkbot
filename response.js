const scriptName="response.js";
const masterRoom="XFNaMe0052";
const all=Array(1001).join("\0");
const dnum=[["111","101","101","101","111"],["001","001","001","001","001"],["111","001","111","100","111"],["111","001","111","001","111"],["101","101","111","001","001"],["111","100","111","001","111"], ["111","100","111","101","111"], ["111","101","001","001","001"], ["111","101","111","101","111"], ["111","101","111","001","001"]]
const s_dnum=["0","1","0","1","0"];
const lastSender=[null]
const dEn={a:["111","001","011","101","111"],A:["010","111","101","111","101"],b:["100","110","101","101","111"],B:["110","101","110","101","111"],c:["000","000","111","100","111"],C:["011","100","100","100","011"],d:["001","001","011","101","111"],D:["110","111","101","111","110"],e:["111","101","111","100","111"],E:["111","100","111","100","111"],f:["011","010","111","010","010"],F:["111","100","111","100","100"],g:["111","101","111","001","110"],G:["111","100","101","101","111"],h:["100","100","111","101","101"],H:["101","101","111","101","101"],i:["010","000","010","010","010"],I:["111","010","010","010","111"],j:["010","000","010","010","110"],J:["001","001","001","101","111"],k:["000","100","101","110","101"],K:["101","101","110","101","101"],l:["010","010","010","010","010"],L:["100","100","100","100","111"],m:["\u2008\u2008","\u2008\u2008","\u2008\u2008","\u2008\u2008","m"],M:["\u2008\u2008","\u2008\u2008","\u2008\u2008","\u2008\u2008","M"],n:["000","000","111","101","101"],N:["101","111","111","111","101"],o:["000","000","010","101","010"],O:["010","101","101","101","010"],p:["000","111","101","111","100"],P:["110","101","110","100","100"],q:["000","111","101","111","001"],Q:["010","101","101","010","001"],r:["000","000","110","101","100"],R:["110","101","110","101","101"],w :["\u2008\u2008","\u2008\u2008","\u2008\u2008","\u2008\u2008","w"],W:["\u2008\u2008","\u2008\u2008","\u2008\u2008","\u2008\u2008","W"],s:["000","011","001","010","011"],S:["011","100","010","001","110"],t:["010","111","010","010","011"],T:["111","010","010","010","010"],u:["000","000","101","101","111"],U:["101","101","101","101","111"],v:["000","000","101","101","010"],V:["101","101","101","101","010"],x:["000","000","101","010","101"],X:["101","101","010","101","101"],y:["000","000","101","010","110"],Y:["101","101","010","010","010"],z:["000","011","001","010","011"],Z:["110","001","010","100","011"]};
const learnPath="sdcard/learn/Obj.txt";
const learnOK=["???!","??????!","???????????????!","????????????"];
const canReplyRooms=[];
w={};
n={};
n.dobae={};
dobae={};
dobae_R={};
pin=[["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],[0,1,2,3,4,5,6,7,8,9]];
inputPinNumber=null;
inputPassMaster=["???????????????????????????"];
profileDB={};
learn=function () {
return "??????";
}
inputThisWord=null;

Utils.json=(url)=> {
return JSON.parse(Utils.getWebText(url).replace(/<[^>]+>/g,""));
}

Array.prototype.charCode=function () {
var g=[]
for (check=0;check<this.length;check++) g.push(this[check].charCodeAt(0));
return g;
}

learn.getObj=function () {
if (readFile(learnPath)==null) return {};
try {
return JSON.parse(readFile(learnPath));
}catch(e) {
Log.d("?????? ??????");
return {};
}
}

learn.study=function (msg,sender) {
if (sender==null||sender==undefined) sender="";
var study=msg.match(/(.+)???????????????? (.+)????????????????$/);
if (study==null) return;
study.shift();
for (check=0;check<2;check++) {
var thisS=study[check];
if (thisS.match(/???$/)!=null) {
var test=thisS.replace(/???$/,"");
test=n.choice(test,"???","");
study[check]=test;
}
}
if (studyObj[study[0]]!=null) return "?????? ??????????????????";
studyObj[study[0]]=[study[1],sender];
return learnOK[Math.floor(Math.random()*learnOK.length)];
}

learn.deleteWord=function (word) {
if (studyObj[word]==undefined) return "????????? ?????? ??????!";
delete studyObj[word];
return "????????? ???????????? ????????????!";
}

Api.replyLog=function (r,s,i,m,re) {
if (r=="?????????") return;
if (Api.canReply(masterRoom)) return Api.replyRoom(masterRoom,"room : "+r+"\nsender : "+s+"\nprofile : "+i+"\nmsg : "+m+"\nreply : "+re);
return Log.d("room : "+r+"\nsender : "+s+"\nprofile : "+i+"\nmsg : "+m+"\nreply : "+re);
}

Device.getWifiHz=function () {
    var wifiManager = Api.getContext().getSystemService(android.content.Context.WIFI_SERVICE);
    var wifiInfo = wifiManager.getConnectionInfo();
    if (wifiInfo.is24GHz()) return "2.4GHz";
    if (wifiInfo.is5GHz ()) return "5GHz";
    return "-1";
}

Device.getWifiName=function () {
    var wifiManager = Api.getContext().getSystemService(android.content.Context.WIFI_SERVICE);
    var wifiInfo = wifiManager.getConnectionInfo();
    return wifiInfo.wifiSsid;
}

Device.getPhoneData=function () {
return "[ ???????????? ]\n???????????? ?????? : "+Device.getWifiName()+"\n???????????? ?????? : "+Device.getWifiSpeed()+"Mb/s\n???????????? ?????? : "+Device.getWifiHz()+"\n\n[ ????????? ]\n"+n.Dnum(Device.getBatteryLevel())+"%\n????????????,??????????????? : "+((Device.isCharging()+","+Device.getPlugType()).replace(/false(.+)/,"??????????????? ??????").replace("true","?????????"))+"\n????????? ?????? : "+(Device.getBatteryTemperature()/10)+"??c\n????????? ?????? : "+Device.getBatteryVoltage()+"mV";
}

Device.getWifiSpeed=function () {
    var wifiManager = Api.getContext().getSystemService(android.content.Context.WIFI_SERVICE);
    var wifiInfo = wifiManager.getConnectionInfo();
    if (wifiInfo != null) {
        return wifiInfo.getLinkSpeed();
    }
}

function readFile(path) {
var b=new java.io.File(path);
if(!(b.exists())) return null;
var c=new java.io.FileInputStream(b); 
var d=new java.io.InputStreamReader(c);
var e=new java.io.BufferedReader(d);
var f=e.readLine();
var g="";
while((g=e.readLine())!=null){
f+="\n"+g;
}
c.close();
d.close();
e.close();
return f.toString();
}

function saveFile(path,file) {
FileStream.write(path,file);
}

n.hashCode=function (t) {
return java.lang.String(t).hashCode();
}

n.choice=function (w,t,f) {
return (w.charCodeAt(w.length-1)-0xAC00)%28==0?w+t:w +f;
}

n.splitKorean=function (kor) {
 var kor=String(kor);
 var f = ['???', '???', '???', '???', '???', '???', '???','???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???', '???'];
 var s = ['???', '???', '???', '???', '???',['???','???'], '???',['???','???'], '???', ['???','???'], ['???','???'], ['???','???'], '???', '???',['???','???'], ['???','???','???'], ['???','???'], '???', '???', ['???','???'], '???'];
 var t = ['', '???', '???', '???', '???', '???', '???','???', '???', '???', '???', '???', '???', '???','???', '???', '???', '???', '???', '???', '???','???', '???', '???', '???', '???', '???', '???'];
 var ga = 44032;
 var box=[];
 for (a=0;a<kor.length;a++) {
  var un = kor.charCodeAt(a);
  un=un-ga;
  var fn = parseInt(un / 588);
  var sn = parseInt((un - (fn * 588)) / 28);
  var tn = parseInt(un % 28);
  if (f[fn]==undefined) {
   box.push(kor[a])
  }else if (t[tn]==""||t[tn]==undefined) {
   box.push(f[fn]);
   box.push(s[sn]);
  }else {
   box.push(f[fn]);
   box.push(s[sn]);
   box.push(t[tn]);
  }
 }
 return box;
}

n.bmi=function (t,b) {
t1=t/100
Bmi=(b/(t1*t1)).toFixed(2)
reply=[[Bmi<=18.5,"?????????"],[Bmi>18.5&&Bmi<=23,"??????"],[Bmi>23&&Bmi<=25,"?????????"],[Bmi>25&&Bmi<=30,"????????????"],[Bmi>30,"???????????????"]];
for (check=0;check<reply.length;check++) {
if (eval(reply[check][0])) re=reply[check][1];
}
return "?????? : "+t+"\n????????? : "+b+"\n??? bmi?????? : "+Bmi+","+re;
}

n.makePin=function (num) {
try {
pinnum="";
for (a=0;a<num;a++) {
pins=Math.floor(Math.random()*3);
pinss=Math.floor(Math.random()*pin[pins].length);
pinnum+=pin[pins][pinss];
}
return pinnum;
}catch(e) {
return e;
}
}

n.timer=function (se){
java.lang.Thread.sleep(se*1000);
return;
}

n.dobae.room=function(ro,se) {
dobae_R[ro]=true;
n.timer(se);
dobae_R[ro]=false;
}

n.dobae.sender=function(ar,name) {
ar=eval(ar);
if (ar.length<7) return "";
for (check=0;check<ar.length;check++) {
if (ar[check]!=name) return "";
}
pinNum=[]
for (check=0;check<4;check++) {
pinNum.push(Math.floor(Math.random()*10));
}
dobae[name]=pinNum.join("");
return "????????? ?????? ?????????????????? ?????????!\n"+name+"?????? ????????????????????? \n"+n.Dnum(pinNum.join(""))+"\n?????????~!";
}

n.Dnum=function (num) {
num=String(num);
if (n.isEmpty(num)||isNaN(num)) return new Error(num +" is not number");
if (n.maxLength(num,7)) return new Error("maxLength is 7");
box=[];
for (check=0;check<5;check++) {
dn=[]
for (check_s=0;check_s<num.length;check_s++) {
dn.push(dnum[Number(num[check_s])][check]);
}
box.push(dn.join(" "));
}
return box.join("\n").replace(/1/g,"???").replace(/0/g,"???");
}

n.dEn=function (en) {
if (n.maxLength(en,7)) return new Error("maxLength is 7");
box=[];
for (check=0;check<5;check++) {
dn=[]
for (check_s=0;check_s<en.length;check_s++) {
dn.push(dEn[en[check_s]][check]);
}
box.push(dn.join(" "));
}
return box.join("\n").replace(/1/g,"???").replace(/0/g,"???");
}

n.maxLength=function (str,num) {
if (num==null||num==""||str.length>num) return true;
return false;
}

n.getHtml=function (URL){
try {
return all+Utils.getWebText(URL).replace(/<[^>]+>/g,"");
}catch(e) {
return e;
}
}

n.isEmpty=function (t){
String(t).trim();
banlist=[undefined,null,""];
for (a=0;a<3;a++) {
if (t==banlist[a]) return true;
}
return false;
}

n.rand=function (num) {
if (n.isEmpty(num)||isNaN(num)) return new Error(num+" is not number");
return Math.floor(Math.random()*num);
}

n.hangang=function (){
return n.getHtml("https://www.wpws.kr/hangang/").match(/??????[???-???\n ]+\d+\.\d+???/)[0].replace(/\n/gi,"").match(/[^ ]+/g).join(" ")+"?????????";
}

n.clock=function (){
h=String(new Date().getHours()%12);
if (h.length==1) h="0"+h;
min=String(new Date().getMinutes());
if (min.length==1) min="0"+min;
box=[];
for (check=0;check<5;check++) {
box.push(dnum[Number(h[0])][check]+" "+dnum[Number(h[1])][check]+" "+s_dnum[check]+" "+dnum[Number(min[0])][check]+" "+dnum[Number(min[1])][check]);
}
return box.join("\n").replace(/1/g,"???").replace(/0/g,"???");
}

n.DELETE=function (ar,li) {
ar=eval(ar);
if (ar.indexOf(li)==-1) return false;
box=[];
for (check=0;check<ar.length;check++) {
if (ar[check]!=li) box.push(ar[check]);
if (ar[check]==li) li=null;
}
return box;
}

const m={
isMaster:function (name,imageDB) {
return master.indexOf(name)!=-1&&m.profileImage[name]==imageDB;
},
getMaster:function (){
masters=readFile("sdcard/kbot/masters.txt");
if (masters==null) return [];
return eval(masters);
},
giveMaster:function (name,profile){
if (master.indexOf(name)!=-1) return "?????? ???????????????~!";
if (profileDB[name]==undefined) return "?????? ????????? ????????? ????????????";
master.push(name);
m.profileImage[name]=profileDB[name];
return true;
},
masterPin:function (name){
if (!Api.canReply(name)) return false;
pin_s=n.makePin(10);
m.pins[name]=pin_s
Api.replyRoom(name,pin_s);
return true;
},
takeMaster:function (name){
if (master.indexOf(name)==-1) return false;
master=n.DELETE(master,name);
delete m.profileImage[name];
return true;
},
masterCheck:function (name,imageDB,pin) {
if (m.pins[name]!=pin) return false;
delete m.pins[name];
m.profileImage[name]=imageDB;
if (master.indexOf(name)==-1) master.push(name);
return true;
},
getProfileImage:function (){
pro=readFile("sdcard/kbot/masterProfileImage.txt");
if (pro==null) return {};
try {
return JSON.parse(pro);
}catch(e) {
Log.e("????????????");
return {};
}
},
changeProfile:function(name) {
if (master.indexOf(name)==-1&&m.profileImage[name]==profileDB[name]) return false;
if (profileDB[name]==undefined) return "?????? ????????? ????????? ????????????!";
m.profileImage[name]=profileDB[name];
return true;
}
}

m.pins={};

w.isTrueWord=function (str) {
try {
inputWordData=n.getHtml("http://m.dic.daum.net/search.do?q="+str).split(/?????? ??????[\n ]+????????????[ \n]+/)[1].split(/(???????????????|????????????) [\n ]+?????? ?????????|????????????/)[2].trim().replace(/^ +| +$/gm,"")
}catch(e) {
return false;
}
return inputWordData .indexOf(str)==0||inputWordData.match(/(.+) (.+)/)[2]==str;
}

Device.chargeTime=()=>{
if (!Device.isCharging()) return "??????????????? ??????";
var thisB=Device.getBatteryLevel();
var B=Device.getBatteryLevel;
for (;thisB==B();) {
java.lang.Thread.sleep(100);
}
var thisB=B();
var t=0;
for (;thisB==B();t++) {
java.lang.Thread.sleep(100);
}
return t;
}

master=m.getMaster();
m.profileImage=m.getProfileImage();

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName){
var msg=msg.trim();
var profile=n.hashCode(ImageDB.getProfileImage());
master=m.getMaster();
m.profileImage=m.getProfileImage();
profileDB[sender]=profile;
canReplyRooms.indexOf(room)==-1?canReplyRooms.push(room):0;
studyObj=learn.getObj();
if (room==masterRoom) {
s_isMaster=m.isMaster;
m.isMaster=function () {
return true;
}
room="?????????";
}
if (studyObj[msg]!=undefined) {
inputThisWord=msg;
replier.reply(studyObj[msg][0]);
}
if (msg=="??????????????????") {
if (studyObj[inputThisWord]==null) {
replier.reply(".....?");
}else {
replier.reply(learn.deleteWord(inputThisWord));
inputThisWord=null;
}
}
if (msg.match(/(.+)???????????????? (.+)????????????????/)) {
replier.reply(learn.study(msg,sender));
}
if (msg=="/??????") {
Api.replyRoom(room,"???????????????");
}
if (msg=="/??????d") {
replier.reply(Device.getPhoneData());
}
if (msg.indexOf("/d")==0&&dobae_R[room]!=true) {
Api.replyRoom(room,n.Dnum(msg.replace(/\/d ?/,"")));
n.dobae.room(room,10);
}
if (msg=="/???????????????") {
Api.replyRoom(room,n.clock());
}
if (msg=="/??????") {
Api.replyRoom(room,n.hangang());
}
if (msg.indexOf("/??????")==0) {
Api.replyRoom(room,n.getHtml(msg.match(/\/?????? ?(.+)/)[1]));
}
if (msg.indexOf("/en")==0&&dobae_R[room]!=true) {
Api.replyRoom(room,n.dEn(msg.replace(/\/en ?/,"")));
n.dobae.room(room,10);
}
if (msg=="/?????????") {
pinId=n.makePin(4);
Api.makeNoti("????????????",pinId);
inputPinNumber=pinId;
Api.replyRoom(room,"???????????? ?????????????????????.");
Api.replyLog(room,sender,profile,msg,"????????? ??????[[??????]["+pinId+"]]");
}
if (msg.indexOf("/"+inputPinNumber)==0) {
try {
outputEval=eval(msg.substr(5));
if (n.isEmpty(outputEval)) return Api.replyRoom(room,"??????????????? 0?????????");
Api.replyRoom(room,outputEval);
Api.replyLog(room,sender,profile,msg,outputEval);
}catch(e) {
Api.replyRoom(room,e+"\nline : "+e.lineNumber);
Api.replyLog(room,sender,profile,msg,e+"\nline : "+e.lineNumber);
}
}
if (msg=="/test") replier.reply(profile);
if (msg=="/??????"&&inputPassMaster.indexOf(sender)!=-1) replier.reply(m.masterPin(sender));
if (msg.indexOf("/??????")==0) replier.reply(m.masterCheck(sender,profile,msg.split(" ")[1]));
if (m.isMaster(sender,profile)) {
if (msg.indexOf("name")==0) {
try {
var output=eval(msg.substr(5));
replier.reply(output);
Api.replyLog(room,sender,profile,msg,output);
}catch(e) {
replier.reply(new Error(e)+"\nat : "+e.lineNumber);
Api.replyLog(room,sender,profile,msg,e+"\nline : "+e.lineNumber);
}
}
}
lastSender.unshift(sender);
if (lastSender.length>7) lastSender.pop()
master!=null&&saveFile("sdcard/kbot/masters.txt",master.toSource());
saveFile("sdcard/kbot/masterProfileImage.txt",JSON.stringify(m.profileImage));
if (m.isMaster()==true) m.isMaster=s_isMaster
saveFile(learnPath,JSON.stringify(studyObj))
}