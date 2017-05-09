import express from 'express';
import {join,resolve} from "path";
import {realpathSync} from "fs";
import './db/mongodb-connection';
import {send_sms,send_tpl_sms} from './sendMessageCode';
import  bodyParser  from 'body-parser';
import {AccountsModel} from './db/user'
const app = express();
const ROOT_PATH = realpathSync(resolve(__dirname, '../'));

app.use('/node_modules',express.static(join(ROOT_PATH, 'node_modules')));
app.use('/dist',express.static(join(ROOT_PATH, 'dist')));
app.use('/bin',express.static(join(ROOT_PATH, 'bin')));
app.use(bodyParser.json());

app.get('/', function(req, res) {
    res.send(`
        <html>
        <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
            <script src="/node_modules/jquery/dist/jquery.js"></script>
            <script src="/node_modules/bootstrap/dist/js/bootstrap.min.js"></script>
        </head>
        <body>
        <div id="root"></div>

        <script src="/bin/client.bundle.js"></script>
        </body>
        </html>
    `);
});

app.post('/veryfication',function (req,res) {
    req.accepts('application/json');
    res.set('Content-Type','application/json');
    console.log(req.body);
    const mobile = req.body.num;
    const text =Math.floor(Math.random()*1000000);
    send_tpl_sms(mobile,'1',{'#code#':text,'#company#':'奇奇区块链'},function (chunk) {
        console.log('chunk');
        res.send(JSON.stringify({code:text}));
    });
});

app.post('/api/user',function (req,res,next) {
    req.accepts('application/json');
    res.set('Content-Type','application/json');
    const account = req.body.data.account;
    const tele = req.body.data.tele;
    console.log("req.body*****",req.body)
    AccountsModel.find({account:account},function (err,docs) {
        if(err){
            res.send(JSON.stringify({docs:{},msg:"查找出错，请联系管理员"}));
        } else if(typeof docs =='undefined'){
            const accounts = new AccountsModel({account:account,tele:tele})
            accounts.save(function (err,docs) {
                if(err){
                    console.log('err',err);
                    res.send(JSON.stringify({docs:{},msg:"添加出错，请联系管理员"}));
                }
                if(docs){
                    console.log(docs);
                    res.send(JSON.stringify({docs,msg:"添加成功"}));
                }
            })
            return;
        } else if(docs.length >0  ){
            console.log(docs)

            res.send(JSON.stringify({docs,msg:'不要重复添加'}));

        } else if(docs.length === 0){
            const accounts = new AccountsModel({account:account,tele:tele})
            accounts.save(function (err,docs) {
                if(err){
                    console.log('err',err);
                    res.send(JSON.stringify({docs:{},msg:"添加出错，请联系管理员"}));
                }
                if(docs){
                    console.log(docs);
                    res.send(JSON.stringify({docs,msg:"添加成功"}));
                }
            })
        } else {

        }

    });

});

app.post('/api/getuser',function (req,res) {
    req.accepts('application/json');
    res.set('Content-Type','application/json');
    const tele = req.body.tele;
    if(tele == '18800102517' || tele == '13071122875'){
        AccountsModel.find(function (err,docs) {
            if(docs){
                console.log(docs)
                res.send(JSON.stringify({docs,msg:'请求成功'}));
            } else{
                res.send(JSON.stringify({docs:{},msg:"查找出错，请联系管理员"}));
            }

        });
    } else {
        AccountsModel.find({tele:tele},function (err,docs) {
            if(docs){
                console.log(docs)
                res.send(JSON.stringify({docs,msg:'请求成功'}));
            } else{
                res.send(JSON.stringify({docs:{},msg:"查找出错，请联系管理员"}));
            }

        });
    }


})


app.listen(4000);