// 修改为您的apikey.可在官网（https://www.yunpian.com)登录后获取
var https = require('https');
var qs = require('querystring');

const apikey = '3127d9c4c0883038fdd24b550d250958';
// 修改为您要发送的手机号码，多个号码用逗号隔开
const mobile = 'xxxxxxxxxxx';
// 修改为您要发送的短信内容
const text = `【云片网】您的验证码是${Math.random()*1000}`;
// 指定发送的模板编号
//var tpl_id = 1;
// 指定发送模板的内容
//var tpl_value =  {'#code#':'1234','#company#':'yunpian'};
// 语音短信的内容
//var code = '1234';
// 查询账户信息https地址
//var get_user_info_uri = '/v2/user/get.json';
// 智能匹配模板发送https地址
const sms_host = 'sms.yunpian.com';
//var voice_host = 'voice.yunpian.com';

const send_sms_uri = '/v2/sms/single_send.json';
// 指定模板发送接口https地址
const send_tpl_sms_uri = '/v2/sms/tpl_single_send.json';
// 发送语音验证码接口https地址
//const send_voice_uri = '/v2/voice/send.json';









//send_tpl_sms(send_tpl_sms_uri,apikey,mobile,tpl_id,tpl_value);


export function send_sms(mobile,text,callback){
    var post_data = {
        'apikey': apikey,
        'mobile':mobile,
        'text':text,
    };//这是需要提交的数据
    var content = qs.stringify(post_data);
    post(send_sms_uri,content,sms_host,callback);
}

export function send_tpl_sms(mobile,tpl_id,tpl_value,callback){
    var post_data = {
        'apikey': apikey,
        'mobile':mobile,
        'tpl_id':tpl_id,
        'tpl_value':qs.stringify(tpl_value),
    };//这是需要提交的数据
    var content = qs.stringify(post_data);
    post(send_tpl_sms_uri,content,sms_host,callback);
}

function post(uri,content,host,callback){
    var options = {
        hostname: host,
        port: 443,
        path: uri,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        }
    };
    var req = https.request(options, function (res) {
        // console.log('STATUS: ' + res.statusCode);
        // console.log('HEADERS: ' + JSON.stringify(res.headers));
        res.setEncoding('utf8');
        res.on('data', function (chunk) {
            console.log('BODY: ' + chunk);
            callback(chunk)
        });
    });
    //console.log(content);
    req.write(content);

    req.end();
}