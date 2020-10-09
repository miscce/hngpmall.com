const http = require("http");
const fs = require("fs");
const url = require("url");
const querystring = require("querystring");
const { get } = require("https");

const server = http.createServer(function(req,res){
    if(req.url !== "/favicon.ico"){
        // switch (req.url) {
        //     case "/index":res.write("hello");
        //         break;
        //     case "/login":res.write("login");
        //         break;
        //     default:res.write("404 Not Found");
        //         break;
        // }
        // console.log(url.parse(req.url).pathname)
        
        const urlObj = url.parse(req.url,true);
        if(urlObj.pathname === "/api"){
                // if(urlObj.query.user === "admin" && urlObj.query.pass === "123"){
                //     res.write("登录成功")
                // }
                let data = "";
                req.on("data",(s)=>{data +=s});
                req.on("end",()=>{
                    if(data === ""){
                        // let data;
                        data = urlObj.query;
                    }else{
                        data = querystring.parse(data);
                    }
                switch (data.type) {
                    case "reg":login(data,req,res);
                        break;
                    case "login":reg(data,req,res);
                        break;
                    case "checkuser":checkuser(data,req,res);
                        break;
                    case "brand":brand(data,req,res);
                        break;
                    case "goods":goods(data,req,res);
                        break;
                    case "detail":detail(data,req,res);
                        break;
                    default:console.log(2);
                        res.end();
                }
                })
                
        }else{
            fs.readFile("./www" + urlObj.pathname,function(err,data){
                if(!err){
                    res.write(data)
                }else{
                    res.write("404")
                }
                
            res.end();
            })
        }
    }
}).listen(3000,function(){
    console.log("server running");
})

// fs.readFile("1.txt","utf-8",function(err,data){
//     console.log(data)
// })

// fs.writeFile("2.txt","22",function(err){
//     console.log(err)
// })
var status = 0;
var isLogin = false;
var arr = [];
var msg = {};
function login(data,req,res){
    if(arr.length ==0){
        status =1;
    }else{
    for(var i=0;i<arr.length ;i++){
        if(arr[i].user === data.user && arr[i].pass === data.pass){
            status =2;
        }else{
            status=3;
        }
    }
        }   
    
    if(status ===1){
        if(data.user.length === 0 ||data.pass.length === 0 ){
            msg = {code:404,msg:"用户名密码不允许为空"}
        }else{
            arr.push({
                user:data.user,
                pass:data.pass
            })
            msg = {code:1,msg:"注册成功"}
        }
    }else if(status ===2){
        msg = {code:4,msg:"用户名重复"}
    }else if(status === 3){
        if(data.user.length === 0 ||data.pass.length === 0 ){
            msg = {code:404,msg:"用户名密码不允许为空"}
        }else{
        arr.push({
            user:data.user,
            pass:data.pass
        })
        msg = {code:1,msg:"注册成功"}
    }
    }
    res.write(JSON.stringify(msg));
    console.log(arr);
    res.end();
}
function reg(data,req,res){
    for(var i=0;i<arr.length;i++){
        if(arr[i].user === data.user && arr[i].pass === data.pass){
            arr[i].state = 1;
            msg = {code:2,msg:"登录成功",data:arr[i]}
        }else{
            msg = {code:3,msg:"登录失败",data:"NOT DATA"}
        }
    }
    res.write(JSON.stringify(msg));
    res.end();
}

function brand(data,req,res){
    fs.readFile("./www/" + data.file,function(err,data){
        if(!err){
            res.write(data)
        }else{
            res.write("404")
        }
        
    res.end();
    })
}
function goods(data,req,res){
    fs.readFile("./www/" + data.file,function(err,data){
        if(!err){
            res.write(data)
        }else{
            res.write("404")
        }
        
    res.end();
    })

}
function detail(data,req,res){
    let goodsData = fs.readFileSync("./www/data/goods.json");
    res.write(goodsData);
    res.end();
}
function checkuser(data,req,res){
    console.log(arr)
    console.log(data.user)
    for(var i=0;i<arr.length ;i++){
        if(arr[i].user === data.user){
            status =2;
        }else{
            status = 5;
        }

    }
    if(arr.length ==0){
        status =5;
    }
    if(status ===2){
        res.write("false");
    }else if(status === 5){
        res.write("true");
    }
    
    res.end();
}