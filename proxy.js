const http = require("http");
const https = require("https");
const url = require("url");

http.createServer(function(req,res){
    res.writeHead(200, {
		'Content-Type': 'application/json;charset=utf-8',
		'Access-Control-Allow-Credentials': true,
		'Access-Control-Allow-Origin': '*'
  })
    const pathname = url.parse(req.url).pathname
    if(pathname.indexOf("/proxy") !== -1){
        pathnameUrl = pathname.replace("/proxy","/");
        let url;
        url = "https://wanandroid.com" + pathnameUrl
        https.get(url,(resObj)=>{
            resObj.on("data",(data)=>{
                
                res.write(data)
                
    res.end();
            })
        })
    }
}).listen(3000,function(){
    console.log("server running")
})