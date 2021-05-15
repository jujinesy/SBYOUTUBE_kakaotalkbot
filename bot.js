const scriptName="newBot.js";
const DB=DataBase;
const list=[0,1,2,3,4,5,6,7,8,9,"a","b","c","d","e","f"];
const list_h={a:10,b:11,c:12,d:13,e:14,f:15,A:10,B:11,C:12,D:13,E:14,F:15};
const list_b=[0,1]

Date.worldTime=(str)=>{
try {
var t=org.jsoup.Jsoup.connect("https://www.google.co.kr/search?q="+str+"시간").get().getElementsByClass("vk_c vk_gy vk_sh card-section sL6Rbf").text().replace(/사용자 의견| +$|^ +/gm,"").replace(/(?=(오전|오후)+(!?))/g,"\n").trim();
if (t=="") return "결과없어!";
return t;
}catch(e){
return "결과없어!!";
}
}

const readFile=(path)=>{
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
return f==null?null:String(f);
}

isDec=(d)=>{
return String(d).match(/[^0-9]/)==null;
}

isHex=(h)=>{
return String(h).match(/[^0-9a-fA-F]/)==null;
}

isOct=(o)=>{
return String(o).match(/[^0-7]/)==null;
}

isBin=(b)=>{
return String(b).match(/[^01]/)==null;
}

dToH=(d)=>{
if (!isDec(d)) return new Error(d+" is not dec");
if (d<16) return d;
box=[];
while (true) {
var a=d%16;
var d=Math.floor(d/16);
box.unshift(a);
if (d==0) break;
}
return box.map((_,s)=>{
return list[box[s]];
}).join("");
}

hToD=(h)=>{
if (!isHex(h)) return new Error(h+" is not hex");
h=String(h);
var box=[];
for (b=0;b<h.length;b++) {
var c=h[b];
var c=(isNaN(c)?list_h[c]:c);
box.push(c*Math.pow(16,(h.length-1-b)));
}
var d=0;
box.map((_,s)=>{
return d+=box[s];
})
return d;
}

dToB=(d)=>{
if (!isDec(d)) return new Error(d+" is not dec");
if (d<2) return d;
box=[];
while (true) {
var a=d%2;
var d=Math.floor(d/2);
box.unshift(a);
if (d==0) break;
}
return box.map((_,s)=>{
return list_b[box[s]];
}).join("");
}

bToD=(b)=>{
if (!isBin(b)) return new Error(d+" is not bin");
b=String(b);
var box=[];
for (a=0;a<b.length;a++) {
var c=b[a];
box.push(c*Math.pow(2,(b.length-1-a)));
}
var d=0;
box.map((_,s)=>{
return d+=box[s];
})
return d;
}

dToO=(d)=>{
if (!isDec(d)) return new Error(d+" is not dec");
if (d<8) return d;
box=[];
while (true) {
var a=d%8;
var d=Math.floor(d/8);
box.unshift(a);
if (d==0) break;
}
return box.map((_,s)=>{
return list[box[s]];
}).join("");
}

oToD=(o)=>{
if (!isOct(o)) return new Error(d+" is not oct");
o=String(o);
var box=[];
for (b=0;b<o.length;b++) {
var c=o[b];
box.push(c*Math.pow(8,(o.length-1-b)));
}
var d=0;
box.map((_,s)=>{
return d+=box[s];
})
return d;
}

hanTemp=()=>{
var a=org.jsoup.Jsoup.connect("https://www.wpws.kr/hangang/").get().body()
var temp=a.getElementById("temp").text();
var time=a.getElementById("foo2").text();
return temp+"\n"+time;
}

masterCheck=(sender,profile)=>{
return Bridge.getScopeOf("response.js").m.isMaster(sender,profile);
}

DataBase.set=(path,file)=>{
return FileStream.write(path,file);
}

DataBase.get=(path)=>{
return FileStream.read(path);
}

response=(infos)=>{
var msg=infos.msg.trim();
var sender=infos.sender.trim();
var room=infos.room.trim();
var reply=infos.replier;
var image=java.lang.String(infos.ImageDB.getProfileImage()).hashCode();
var isMaster=masterCheck(sender,image)
real(msg,sender,room,reply,image);
isMaster?master(msg,sender,room,reply,image):0;
}

real=(chat,user,room,replier,profile)=>{
chat.indexOf("/10->16")==0?replier.reply(dToH(chat.replace(/\/10\-\>16 ?/,""))):0;
chat.indexOf("/16->10")==0?replier.reply(hToD(chat.replace(/\/16\-\>10 ?/,""))):0;
chat.indexOf("/10->2")==0?replier.reply(dToB(chat.replace(/\/10\-\>2 ?/,""))):0;
chat.indexOf("/2->10")==0?replier.reply(bToD(chat.replace(/\/2\-\>10 ?/,""))):0;
chat.indexOf("/10->8")==0?replier.reply(dToO(chat.replace(/\/10\-\>8 ?/,""))):0;
chat.indexOf("/8->10")==0?replier.reply(oToD(chat.replace(/\/8\-\>10 ?/,""))):0;
switch(chat) {
case "/newBot":
relier.reply("냥");
break;
case "/han":
replier.reply(hanTemp());
break;
}
}

master=(chat,user,room,replier,profile)=>{
if (chat.match(/^\/eval ?/)) {
try {
replier.reply(eval(chat.replace(/\/eval ?/,"")));
}catch(e) {
replier.reply(e+"\nline : "+e.lineNumber);
}
}
}