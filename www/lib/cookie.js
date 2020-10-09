function setCookie(key,val,ops={}){

    var data = "";
    if(ops.expires){
        var d = new Date();
        d.setDate(d.getDate()+ops.expires);
        data = `;expires=${d}`
    }
    let path = ops.path ? `path = ${ops.path}` : "/";
    document.cookie = `${key}=${val};${path}${data}`

};


function getCookie(key){
    var arr = document.cookie.split("; ");
    for(var i=0;i<arr.length;i++){
        if(arr[i].split("=")[0] === key){
            return arr[i].split("=")[1];
        }
    }
    return "";
};


function delCookie(key,ops={}){
    setCookie(key,null,{expires:-1})
};
