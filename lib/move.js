function move(ele, data, cb){
    clearInterval(ele.t);
    ele.t = setInterval(()=>{
        var onoff = true;
        for(var i in data){
            var iNow = i === "opacity" ? getStyle(ele, i) * 100 :  parseInt(getStyle(ele, i));

            var speed = (data[i] - iNow) / 6;
            speed = speed<0 ? Math.floor(speed) : Math.ceil(speed);

            if(iNow != data[i]) onoff = false;

            ele.style[i] = i === "opacity" ? (iNow + speed) / 100 : iNow + speed + "px";
        }
        if(onoff){
            clearInterval(ele.t);
            cb && cb();
        }
    },30);
}

function getStyle(ele, attr){
    return getComputedStyle ? getComputedStyle(ele, false)[attr] : ele.currentStyle[attr];
}