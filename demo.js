var oDemo = document.getElementById('demo');
var manageCookie = {
    setCookie: function (name, value, time) {
        document.cookie = name + '=' + value + ';max-age=' + time;
        return this;
    },
    removeCookie: function (name) {
        this.setCookie(name, '', -1);
        return this;
    },
    getCookie: function (name, callback) {
        var allCookieArr;
       
        allCookieArr = document.cookie.split('; ');
        for (var i = 0; i < allCookieArr.length; i++) {
            var itemCookieArr = allCookieArr[i].split('=');
            if (itemCookieArr[0] == name) {
                callback(itemCookieArr[1]);
                return this;
            }
        }
        callback(undefined);
        return this;
    }
}
var drag = {
    init: function (dom) {

        this.dom = dom;
        var _this = this;
        manageCookie.getCookie('newLeft', function (data) {
            if(data!=null){
                _this.dom.style.left = data + 'px';
            }
            
        });
        manageCookie.getCookie('newTop', function (data) {
            if(data!=null){
                _this.dom.style.top = data + 'px';
            }
            
        });
        this.bindEvent();

    },
    bindEvent: function () {
        this.dom.onmousedown = this.mouseDown.bind(this);

    },
    mouseDown: function (e) {

        document.onmousemove = this.mouseMove.bind(this);
        document.onmouseup = this.mouseUp.bind(this);

        this.disX = e.clientX - this.dom.offsetLeft;

        this.disY = e.clientY - this.dom.offsetTop;
    },
    mouseMove: function (e) {

        this.newLeft = e.clientX - this.disX;

        this.newTop = e.clientY - this.disY;

        this.dom.style.left = this.newLeft + 'px';

        this.dom.style.top = this.newTop + 'px';
    },
    mouseUp: function () {
        document.onmousemove = null;
        document.onmouseup = null;
        manageCookie.setCookie('newLeft', this.newLeft, 10000).setCookie('newTop', this.newTop, 10000);
    }
}
drag.init(oDemo);

// manageCookie
//     .setCookie('dyf', '21', 3000)
//     .setCookie('wd', '51', 3000)
//     .setCookie('gyf', '261', 3000)
//     .getCookie();
