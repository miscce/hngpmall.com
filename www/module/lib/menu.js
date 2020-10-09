;(function(){

    class menu{
        constructor(){
            this.ali = document.querySelector(".goods-list").children;
            this.amenu = document.querySelectorAll(".Secondary-menu");
            // console.log(this.ali);
            // console.log(this.amenu);

            this.init();
        }
        init(){
            for(let i = 0;i<this.ali.length;i++){
                this.addEvent(i);
            }
        }
        addEvent(i){
            var that = this;
            this.ali[i].onmouseover = function(){
                that.setDefault();
                that.setActive(i);
            }
            this.ali[i].onmouseout = function(){
                that.setDefault();
            }
            this.amenu[i].onmouseover = function(){
                that.setDefault();
                that.setActive(i);
            }
            this.amenu[i].onmouseout = function(){
                that.setDefault();
            }
        }
        setDefault(){
            for(let i = 0;i<this.ali.length;i++){
                this.ali[i].className = "tl";    
                this.amenu[i].style.display = "none";
            }
        }
        setActive(i){
            this.amenu[i].style.cursor = "pointer";
            this.amenu[i].style.display = "block";
            this.ali[i].className = "tl menu-active";
        }
    }

    window.menu = menu;
    // new menu();
}());