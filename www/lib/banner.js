;(function(){
    class Banner{
        constructor(ops){
            let {item,btn=false,list=false,autoPlay=false,delayTime=3000,moveTime=300,index=0} = ops
            this.item = item[0];
            this.imgBox = item[0].children[0];
            this.page=item[0].children[1];
            this.index = index;
            this.list = list;
            this.iPrev = null;
            this.init();
            if(btn)this.createBtn();
            if(list)this.createList();
            if(autoPlay)this.autoPlay();
        }
        init(){
            this.imgBox.children[this.index].style.display = "block";

        }
        createBtn(){
            let pagechange = document.createElement("div");
            this.page.appendChild(pagechange);
            pagechange.className = "pagechange-ol";

            this.btnLeft = document.createElement("button");
            pagechange.appendChild(this.btnLeft);
            this.btnRight = document.createElement("button");
            pagechange.appendChild(this.btnRight);

            this.btnLeft.className = "prev";
            this.btnRight.className = "next";

            
            this.addEvent();
        }
        createList(){
            this.listUl = document.createElement("ul");
            let listLi = "";
            for(let i =0;i<this.imgBox.children.length;i++){
                listLi += "<li></li>";
            }
            this.listUl.innerHTML = listLi;
            this.item.appendChild(this.listUl);
            this.listUl.className = "listUl";

            this.listUl.children[this.index].className = "on";

            this.addEvent()
        }
        addEvent(){
            var that = this;
            if(this.btnLeft && this.btnRight){
                this.btnLeft.onclick = function(){
                    if(that.index === 0){
                        that.index = that.imgBox.children.length-1;
                        that.iPrev = 0;
                    }else{
                        that.index--;
                        that.iPrev = that.index+1;
                    }
                    that.setList()
                    that.imgMove();
                }

                this.btnRight.onclick = function(){
                    // if(that.index === that.imgBox.children.length-1){
                    //     that.index = 0;
                    //     that.iPrev = that.imgBox.children.length-1;
                    // }else{
                    //     that.index++;
                    //     that.iPrev = that.index-1;
                    // }
                    // that.setList()
                    // that.imgMove();
                    that.rightClick();
                }
            }

            this.item.addEventListener("click",function(eve){
                let e =eve || window.event;
                let tar = e.target || e.srcElement;
                if(tar.nodeName === "LI"){
                    that.setList();
                    tar.className = "on";
                    if(tar.xuhao<that.index || tar.xuhao>that.index){
                        that.imgBox.children[tar.xuhao].style.display = "block";
                        that.imgBox.children[that.index].style.display = "none";
                        that.index = tar.xuhao;
                    // }else if(tar.xuhao>that.index){
                    //     that.imgBox.children[tar.xuhao].style.display = "block";
                    //     that.imgBox.children[that.index].style.display = "none";
                    //     that.index = tar.xuhao;
                    }
                }
            })

        }
        rightClick(){
            if(this.index === this.imgBox.children.length-1){
                this.index = 0;
                this.iPrev = this.imgBox.children.length-1;
            }else{
                this.index++;
                this.iPrev = this.index-1;
            }
            this.setList()
            this.imgMove();
        }
        imgMove(){
            this.imgBox.children[this.iPrev].style.display = "none";
            this.imgBox.children[this.index].style.display = "block";
            
            if(this.list)this.listUl.children[this.index].className = "on";
        }
        setList(){
            if(this.list){
                for(let i=0;i<this.listUl.children.length;i++){
                    this.listUl.children[i].className = "";
                    this.listUl.children[i].xuhao = i
                }
            }

        
        }
        autoPlay(){
            var that = this;
            let t = setInterval(() => {
                this.rightClick();
            }, 2000);

            this.item.onmouseover = function(){
                clearInterval(t);
            }
            this.item.onmouseout = function(){
                t = setInterval(() => {
                    that.rightClick();
                }, 2000);
            }
        }
    }

    window.Banner = Banner;
})();