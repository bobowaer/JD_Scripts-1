const $ = Env("TX自选股(微信+APP)");
//$.idx = ($.idx = ($.getval('qczjSuffix') || '1') - 1) > 0 ? ($.idx + 1 + '') : ''; // 账号扩展字符
const notify = $.isNode() ? require("./sendNotify") : "";

const StockBodyArr = [];
let TxstockBodyVal = "";
const StockHdArr = [];
let TxstockheaderVal = "";
let stockscore = 0;

let bodys = $.getdata("txstock_body");
let headers = $.getdata("txstock_hd");


if (!(bodys && bodys != '')) {
  $.msg("", "", '请先到福利中心-今日任务,获取任务body...\n任务body获取越多，脚本可获得金币越多,获取不到的请手动做')
  $.done()
}


var COOKIES_SPLIT='\n'  //自定义多cookie之间连接的分隔符，默认为\n换行分割
const logs = 0; // 0为关闭日志，1为开启
const notifyInterval = 1;// 0为关闭通知，1为所有通知，
//const cointowalletid = 1;//提现金额1元或5元


let StockHd = [];
let StockBody = [];

if ($.isNode()) {
if (process.env.COOKIES_SPLIT){
    COOKIES_SPLIT = process.env.COOKIES_SPLIT;
};
console.log(`============ cookies分隔符为：${COOKIES_SPLIT} =============\n`);
if (process.env.STOCK_HEADER && process.env.STOCK_HEADER.indexOf(COOKIES_SPLIT) > -1) {
StockHd = process.env.STOCK_HEADER.split(COOKIES_SPLIT);
} else {
    StockHd = process.env.STOCK_HEADER.split()
};



if (process.env.STOCK_BODY && process.env.STOCK_BODY.indexOf(COOKIES_SPLIT) > -1) {
StockBody = process.env.STOCK_BODY.split(COOKIES_SPLIT);
} else {
    StockBody = process.env.STOCK_BODY.split()
};

}


if ($.isNode()) {
    Object.keys(StockHd).forEach((item) => {
        if (StockHd[item]) {
          StockHdArr.push(StockHd[item])
        }
      })

    Object.keys(StockBody).forEach((item) => {
        if (StockBody[item]) {
          StockBodyArr.push(StockBody[item])
        }
      })

      console.log(`============ 共${QQreadhdArr.length}个QQ阅读APP账号  =============\n`)
      console.log(`============ 脚本执行-北京时间(UTC+8)：${new Date(new Date().getTime() + 8 * 60 * 60 * 1000).toLocaleString()}  =============\n`)
    } else {
    StockHdArr.push($.getdata('StockHd'));
    StockBodyArr.push($.getdata('StockBody'));
}

let indexLast = $.getdata('txstock_body_index');
$.begin = indexLast ? parseInt(indexLast,10) : 1;



//脚本控制
let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
  GetCookie()
} else {
  !(async () => {
    await all();
    await msgShow();
  })()
      .catch((e) => {
        $.log('', `❌ ${$.name}, 失败! 原因: ${e}!`, '')
      })
      .finally(() => {
        $.done();
      })
}

//获取cookie函数
function GetCookie() {
    if($request && $request.method != `OPTIONS`&& $request.body.indexOf("action=taskdone")>=0) {
      const TxstockBodyVal = $request.body;
      const taskid= $response.body;
       let StockBodyArr=[];
       if (TxstockBodyVal) {
       let bodys=$.getdata('txstock_body');
       if(bodys){
          if(bodys.indexOf(TxstockBodyVal)!=-1){
              $.msg('body重复跳过');
              $.done();
          }

        TxstockBodyVal = bodys.split('#');

       bodys=StockBodyArr+'#'+bodys;
      }
      else{
          bodys=TxstockBodyVal;
      }
       $.setdata(bodys,'txstock_body')
       $.msg('','',`添加任务编号${taskid.id}body请求: 成功🎉,当前任务body总数${StockBodyArr.length+1}`)
       }

 }


    if($request && $request.method != `OPTIONS`&& $request.url.indexOf("activity_task.fcgi")>=0) {
const TxstockheaderVal = JSON.stringify($request.headers)
    if (TxstockheaderVal)        $.setdata(TxstockheaderVal,'txstock_hd')
    $.log(`[${jsname}] 获取任务headers: 成功,TxstockheaderVal: ${TxstockheaderVal}`)
    $.msg(jsname, `获取任务headers: 成功🎉`, ``)
 }

}

//通知
function msgShow() {
  return new Promise(async resolve => {
    let nowTimes = new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000);
    $.msg($.name, "",$.message);
    resolve()
  })
}

//执行函数整合
async function all() {
if (!StockBodyArr[0]) {
    console.log($.name, '【提示】请把抓包的请求体填入Github 的 Secrets 中，请以#隔开')
    $.msg($.name, '提示：⚠️请先到福利中心-今日任务,获取任务body...\n');
    return;
  } else {console.log(`============ 共${GetUserInfourlArr.length}个${$.name}账号  =============\n`
  );
  console.log(`==================脚本执行- 北京时间(UTC+8)：${new Date(new Date().getTime() + new Date().getTimezoneOffset()*60*1000 + 8*60*60*1000).toLocaleString()}=====================\n`)}

  $.msg('', '', `腾迅股票任务body数：${StockBodyArr.length}个\n上次执行到第${$.begin}个\n`)
  $.index = 0;

  for (let i = indexLast ? indexLast : 0; i < StockBodyArr.length; i++) {
    if (StockBodyArr[i]) {
      TxstockBodyVal = StockBodyArr[i];
      TxstockheaderVal = StockHdArr[i];
      $.index = $.index + 1;
      console.log(`-------------------------\n\n开始 🚴‍♂️腾迅股票第${$.index}个金币任务🚴‍`)
    }
    await TxStockCoin();
  }
  $.msg('', '', `共完成${$.index}个任务\n共计获得${stockscore}个金币，任务请求结束`)
}

//执行函数1
function TxStockCoin(timeout = 10000) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url: `https://wzq.tenpay.com/cgi-bin/activity_task.fcgi`,
        headers: JSON.parse(TxstockheaderVal),
		    body: TxstockheaderVal,
      }
      $.post(url, async(err, resp, data) => {
        try {
           $.begin=$.begin+1;
           let res=$.begin%StockBodyArr.length
           $.setdata(res+"", 'txstock_body_index');
           $.coin = JSON.parse(data);
    if($.coin.reward_type == 20101)
     $.message +=`本次任务获得`+$.coin.amount+'个金币🏅，延迟10s后执行下一个任务\n';

       stockscore += stockcoin.data.score;
       //await $.wait(3000);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}


// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}