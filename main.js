const c={};
const banScriptPath="sdcard/main/banScript.txt";
Api.reload("response.js");
const m=Bridge.getScopeOf("response.js").m;
const logPath="sdcard/kbot/logTime.txt";
const batteryPath="sdcard/kbot/checkBattery.txt";
const powerPath="sdcard/kbot/power.txt";

c.isClearLogTime=()=>{
var log=readFile(logPath);
var t=new Date().getHours()
return log!=t;
}

c.clearLog=()=>{
saveFile(logPath,new Date().getHours());
Log.clear()
Log.d("로그 청소 완료");
}

c.checkBattery=(max)=>{
if (readFile(batteryPath)=="false") return;
var battery=Device.getBatteryLevel()
if (battery<max) {
saveFile(powerPath,"true");
return true;
}
return false;
}

c.getScriptDataN=function() {
var scriptList=Api.getScriptNames();
var box={
onoff:0,
com:0,
coming:0
};
for (i in scriptList) {
Api.isOn(scriptList[i])?box.onoff++:0;
Api.isCompiling(scriptList[i])?box.coming++:0;
Api.isCompiled(scriptList[i])?box.com++:0;
}
return "스크립트 갯수 : "+scriptList.length+"개\n켜짐 : "+box.onoff+"개\n컴파일완료 : "+box.com+"개\n컴파일중 : "+box.coming+"개\n마지막 로그 청소 : "+readFile(logPath)+"시";
}

c.getScriptData=function () {
var scriptList=Api.getScriptNames();
var box=[];
for (check=0;check<scriptList.length;check++) {
box.push(scriptList[check]+" : \n"+(Api.isOn(scriptList[check])?"켜져있음":"꺼져있음")+", "+(Api.isCompiled(scriptList[check])?"컴파일됨":"컴파일안됨")+", "+(Api.isCompiling(scriptList[check])?"컴파일중":"컴파일중아님"));
}
return box.join("\n");
}

c.onScript=function () {
var scriptList=Api.getScriptNames();
for (i in scriptList) if (!c.isBanScript(scriptList[i])) Api.on(scriptList[i]);
return true;
}

c.offScript=function () {
var scriptList=Api.getScriptNames();
for (i in scriptList) if (!c.isBanScript(scriptList[i])) Api.off(scriptList[i]);
return true;
}

c.isBanScript=function (name) {
return banList.indexOf(name)!=-1;
}

c.getBanScript=function () {
var pro=readFile(banScriptPath);
try {
return pro==null?[]:eval(pro);
}catch (e) {
return [];
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

function hash(t) {
return java.lang.String(t).hashCode();
}

response=(infos)=>{
if (readFile(powerPath)=="true") return;
banList=c.getBanScript();
var msg=infos.msg.trim();
var sender=infos.sender;
var profile=hash(infos.ImageDB.getProfileImage());
c.isClearLogTime()?c.clearLog():0;
if (msg=="/상태") infos.replier.reply(c.getScriptData());
if (msg=="/상태n") infos.replier.reply(c.getScriptDataN());
if (c.checkBattery(6)) infos.replier.reply("배고파서 일그만할래요..!\n현재 배터리 : "+Device.getBatteryLevel());
if (m.isMaster(sender,profile)) {
msg=="/켜"?infos.replier.reply(c.onScript()):0;
msg=="/꺼"?infos.replier.reply(c.offScript()):0;
msg=="/리로드"?infos.replier.reply(Api.reload()):0;
}
saveFile(banScriptPath,banList.toSource());
}