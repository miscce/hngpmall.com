// ajax({
//     type:"",
//     url:"",
//     data:{},
//     success:()=>{},
//     error:()=>{},
//     timeout:200,
//     colName:""  // 后台接收的回调函数名所在的字段名
// })
function ajax(ops){
    // 解析参数
    let {type="get",url,data={},success,error,timeout=1000,colName} = ops
    // 处理数据
    let str = "";
    for(let i in data){
        str += `${i}=${data[i]}&`;
    }
    // 处理url
    url = type === "post" ? url : url+"?"+str+"__qft="+Date.now();

    // 区分ajax或jsonp
    if(type === "jsonp"){
        let script = document.createElement("script");
        script.src = url;
        document.body.appendChild(script);

        window[data[colName]] = function(res){
            success && success(res);
            script.remove();
            success = error = null;
        }
    }else{
        let xhr = new XMLHttpRequest();
        xhr.open(type, url, true);
        xhr.onload = function(){
            if(xhr.status === 200){
                success && success(xhr.responseText);
                success = error = null;
            }else{
                error && error(xhr.status);
                success = error = null;
            }
        }
        if(type === "get"){
            xhr.send()
        }else{
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.send(str.slice(0,str.length-1));
        }
    }
    // 处理超时
    // setTimeout(() => {
    //     error && error("timeout");
    //     success = error = null;
    // }, timeout);
}


