'use strict'
var app = {
    win: $(window),
    cookie: {
        set: function (name, value, options) {
            if (!options) {
                options = options || {
                };
            }
            var hour = options.hour ? options.hour : 0;
            var path = options.path ? options.path + ';' : '/';
            if (hour) {
                var today = new Date();
                var expire = new Date();
                expire.setTime(today.getTime() + 3600000 * hour);
            }
            window.document.cookie = name + '=' + encodeURI(value) + '; ' + (hour ? ('expires=' + expire.toGMTString() + '; ')  : '') + ('path=' + path);
            return true;
        },
        get: function (name) {
            var reg = new RegExp('(?:^|;+|\\s+)' + name + '=([^;]*)');
            var m = window.document.cookie.match(reg);
            return (!m ? '' : decodeURI(m[1]));
        },
        remove: function (name, path) {
            var path = path ? path + ';' : '/';
            window.document.cookie = name + '=; expires=Mon, 1 Jun 2014 01:00:00 GMT; ' + (path ? ('path=' + path + '; ')  : 'path=/; ');
        }
    },
    localStorage: {
        set: function (key, value) {
            if (window.localStorage) {
                localStorage.setItem(key, value);
            } else {
                app.cookie.set(key, value);
            }
        },
        get: function (key) {
            if (window.localStorage) {
                return localStorage.getItem(key);
            } else {
                return app.cookie.set(key);
            }
        },
        remove: function (key) {
            if (window.localStorage) {
                localStorage.removeItem(key);
            } else {
                app.cookie.remove(key);
            }
        },
        clear: function () {
            if (window.localStorage) {
                localStorage.clear();
            } else {
            }
        }
    },
    isMobile: function (str) {
        var regu = /^[1][0-9]{10}$/;
        var re = new RegExp(regu);
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    getQueryString : function(e) {
        var t = new RegExp("(^|&)" + e + "=([^&]*)(&|$)"),
            n = window.location.search.substr(1).match(t);
        return null != n ? decodeURIComponent(n[2]) : null
    },
    formatTime : function (t){
        if(isNaN(t)){
            return "00:00:00";
        }
        var h = parseInt(t/3600);
        var m,s;
        var dd = t%3600
        m = parseInt(dd/60);
        s = parseInt(dd%60);
        h = h>9 ? h : "0"+h;
        s = s>9 ? s : "0"+s;
        s = s ==60? "00" : s;
        m = s ==60? ++m :m;

        m = m>9 ? m : "0"+m;
        m = m ==60? "00" : m;
        return h+":"+m+":"+s
    }
};
