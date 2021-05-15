inputTainNumber=null;

String.prototype.replaceAll=function (str1,str2) {
return String(this).split(str1).join(str2);
}

function getHtml(url) {
return Utils.getWebText(url).replace(/<[^>]+>/g,"");
}

function getTainInfo(msg) {
try {
zz=getHtml("https://m.search.daum.net/search?nil_mtopsearch=suggest&sugo=10&q="+tainSity[Number(msg)-1]+tainNumber+"%ED%98%B8%EC%84%A0&w=tot&rq=&o=1").split(/지하철노선도|펼쳐보기/)[1].match(/(.+) (오른쪽|왼쪽)/g).join ("\n").replace(/^ +| +$/gm,"").split("\n");
box=[];
for (check=0;check<zz.length;check++) {
T=zz[check];
if (T.split(" ").length>2) {
역=T.match(/[^ ]+/)+"역";
환승역=T.replace(T.split(" ")[0],"").split(" ");
환승역.pop();
환승역="\n환승역 : "+환승역.join(",").replaceAll(/, ?,/,"").replace(/,$/,"").replaceAll(",,","");
내리는문="\n내리는문 : "+T.match(/(오른쪽|왼쪽)/)[0];
if (환승역.trim()=="환승역 :") {
box.push(역+내리는문);
}else {
box.push(역+환승역+내리는문);
}
}else {
box.push(T.replace(/ (오른쪽|왼쪽)$/,"")+"역\n내리는문 : "+T.match(/(오른쪽|왼쪽)$/)[0]);
}
}
tainSity=[];
tainNber=null;
inputTainNumber=null;
return box.join("\n\n");
}catch(e) {
return "정확한 숫자를 입력해주세요.";
}
}

tainSity=[];
tainNumber=null;

function getSity(tain,name) {
try {
T=getHtml("https://m.search.daum.net/search?nil_mtopsearch=suggest&sugo=10&q="+tain+"%ED%98%B8%EC%84%A0&w=tot&rq=&o=1");
sity=T.split(/지하철노선도|펼쳐보기/)[1].trim().replace(/^ +| +$/gm,"").split("\n\n")[0].split("\n");
tainSity=sity;
tainNumber=tain;
box=[];
for (check in sity) {
if (isRealTain(sity[check]+tain)) {
box.push(box.length+1+". "+sity[check]);
}
}
inputTainNumber=name;
return box.join("\n");
}catch(e) {
return "정확한 호선을 입력해주세요."
}
}

function isRealTain(name) {
return getHtml("https://m.search.daum.net/search?DA=SH2&w=tot&q="+name+"호선").split("내리는 문")[1]!=undefined
}

function response(room, msg, sender, isGroupChat, replier, ImageDB, packageName, threadId){
msg=msg.trim();
m=msg.split(" ")
if (m[0]=="/T"&&inputTainNumber==null) {
replier.reply("처리중....!");
replier.reply(getSity(m[1],sender));
return;
}
if (inputTainNumber==sender) {
replier.reply(getTainInfo(msg));
}
}