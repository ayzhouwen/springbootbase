//*********************************************************公共js技术函数(非业务逻辑)开始************************************************************
//提示
function tips(content) {
    layer.msg(content);
}
//关闭所有layer对话框
function closeAll() {
    layer.closeAll();
}
//加载中。。。
function load() {
    layer.load(2);
}
//确认框
function confirm(content, callback,callback1) {
    layer.confirm(content, {
        skin: 'layui-layer-molv',
        title: '提示'
    }, function(index) {
        if(callback)
            callback();
        layer.close(index);
    },function(index) {
        if(callback1)
            callback1();
        layer.close(index);
    });

}


function customopen2(divid,width,height,callback,titletxt,endback)
{
    alertbar=true;
    index2=layer.open({
        type: 1,
        btn:["保存","取消"],
        shade:[0.3,'#333'],
        // offset:'auto',
        yes:function(index, layero)
        {
            if($.isFunction(callback)){
                callback();
            }

        },
        cancel:function(index,layero)
        {
            try{
                if(dialogarrindex)
                    dialogarrindex.pop();
            }
            catch(r)
            {

            }

            layer.close(index2);
        },
       // skin: 'layui-layer-lan', //加上边框
        skin: 'zwlayer', //加上边框
        area: [width, height], //宽高
        content:$("#"+divid),
        title: titletxt
    });
    return index2;
}

function prePage(callback) {
    curPage = curPage * 1 - 1;
    callback();
}

function nextPage(callback) {
    curPage = curPage * 1 + 1;
    callback();
}

function pageSure(callback) {
    var page = $.trim($("#pageInput").val());
    if(page == '')
        return;
    if(isNaN(page)) {
        tips("请输入正确的页码");
        return;
    }
    if(parseInt(page) < 1 || parseInt(page) > parseInt(totalPage)) {
        tips("超出页码范围，无法跳转");
        return;
    }
    curPage = parseInt(page);
    callback();
}

//数组remove方法定义
// Array.prototype.remove = function(val) {
//     var index = this.indexOf(val);
//     if(index > -1) {
//         this.splice(index, 1);
//     }
// };

//map方法定义
function myMap() {
    this.elements = new Array();

    //获取MAP元素个数
    this.size = function() {
        return this.elements.length;
    }

    //判断MAP是否为空
    this.isEmpty = function() {
        return(this.elements.length < 1);
    }

    //删除MAP所有元素
    this.clear = function() {
        this.elements = new Array();
    }

    //向MAP中增加元素（key, value)
    this.put = function(_key, _value) {
        var exist=this.containsKey(_key);
        if(exist){
         this.remove(_key);
        }

        this.elements.push({
            key: _key,
            value: _value
        });

    }

    //删除指定KEY的元素，成功返回True，失败返回False
    this.remove = function(_key) {
        var bln = false;
        try {
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].key == _key) {
                    this.elements.splice(i, 1);
                    return true;
                }
            }
        } catch(e) {
            bln = false;
        }
        return bln;
    }

    //获取指定KEY的元素值VALUE，失败返回NULL
    this.get = function(_key) {
        try {
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].key == _key) {
                    return this.elements[i].value;
                }
            }
        } catch(e) {
            return null;
        }
    }

    //获取指定索引的元素（使用element.key，element.value获取KEY和VALUE），失败返回NULL
    this.element = function(_index) {
        if(_index < 0 || _index >= this.elements.length) {
            return null;
        }
        return this.elements[_index];
    }

    //判断MAP中是否含有指定KEY的元素
    this.containsKey = function(_key) {
        var bln = false;
        try {
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].key == _key) {
                    bln = true;
                }
            }
        } catch(e) {
            bln = false;
        }
        return bln;
    }

    //判断MAP中是否含有指定VALUE的元素
    this.containsValue = function(_value) {
        var bln = false;
        try {
            for(i = 0; i < this.elements.length; i++) {
                if(this.elements[i].value == _value) {
                    bln = true;
                }
            }
        } catch(e) {
            bln = false;
        }
        return bln;
    }

    //获取MAP中所有VALUE的数组（ARRAY）
    this.values = function() {
        var arr = new Array();
        for(i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].value);
        }
        return arr;
    }

    //获取MAP中所有KEY的数组（ARRAY）
    this.keys = function() {
        var arr = new Array();
        for(i = 0; i < this.elements.length; i++) {
            arr.push(this.elements[i].key);
        }
        return arr;
    }
}

//验证
var validate = function() {
    //return  new validate;
};

validate.prototype = {
//小数只取2位
    moneyvalidate : function (pstr, num, isMinus) { //pstr:当前字符串,num:限制金额总位数(小数只取2位),isMinus:允许为负数
        if (!pstr)
            return;
        var str = pstr;
        var oldStr = str.substr(0, str.length - 1);
        var num = arguments[1] ? arguments[1] : 6;
        var minusFlag = arguments[2] ? arguments[2] : false;
        var errorN = /^0[0-9]{1}/;
        if (errorN.test(str)) {
            return oldStr;
        }
        //var r= /^[1-9][0-9]{1,3}\.[0-9]{0,1}$|^[1-9][0-9]{0,5}$|^0\.[0-9]{0,1}$|^0$/;
        var restr = "^[0-9][0-9]{0," + (num - 3) + "}\\.[0-9]{0,2}$|^[1-9][0-9]{0," + (num - 1) + "}$|^0\\.[0-9]{0,1}$|^0$";
        if (minusFlag) {
            if (str == '-' && str.length == 1) {
                return str;
            }
            restr = "^-?[0-9][0-9]{0," + (num - 3) + "}\\.[0-9]{0,2}$|^-?[1-9][0-9]{0," + (num - 1) + "}$|^-?0\\.[0-9]{0,1}$|^0$";
        }
        var re = new RegExp(restr, "g");
        if (re.test(str)) {
            return str;
        } else {
            return oldStr;
        }

    },
    //小数只取1位
    moneyvalidate2 : function (pstr, num, isMinus) { //pstr:当前字符串,num:限制金额总位数(小数只取1位),isMinus:允许为负数
        if (!pstr)
            return;
        var str = pstr;
        var oldStr = str.substr(0, str.length - 1);
        var num = arguments[1] ? arguments[1] : 6;
        var minusFlag = arguments[2] ? arguments[2] : false;
        var errorN = /^0[0-9]{1}/;
        if (errorN.test(str)) {
            return oldStr;
        }
        //var r= /^[1-9][0-9]{1,3}\.[0-9]{0,1}$|^[1-9][0-9]{0,5}$|^0\.[0-9]{0,1}$|^0$/;
        var restr = "^[0-9][0-9]{0," + (num - 3) + "}\\.[0-9]{0,1}$|^[1-9][0-9]{0," + (num - 1) + "}$|^0\\.[0-9]{0,1}$|^0$";
        if (minusFlag) {
            if (str == '-' && str.length == 1) {
                return str;
            }
            restr = "^-?[0-9][0-9]{0," + (num - 3) + "}\\.[0-9]{0,1}$|^-?[1-9][0-9]{0," + (num - 1) + "}$|^-?0\\.[0-9]{0,1}$|^0$";
        }
        var re = new RegExp(restr, "g");
        if (re.test(str)) {
            return str;
        } else {
            return oldStr;
        }

    },

    passValidate : function (pass, num, isMinus) { //电话号码或密码验或负整数
        var num = arguments[1] ? arguments[1] : 6;
        var minusFlag = arguments[2] ? arguments[2] : false;
        var str = pass;
        var oldStr = str.substr(0, str.length - 1);
        var restr;
        restr = "^[0-9]{1," + num + "}$";
        if (minusFlag) {
            if (str == '-' && str.length == 1) {
                return str;
            }
            restr = "^-?[0-9]{1," + num + "}$";
        }
        var re = new RegExp(restr, "g");
        if (re.test(str)) {
            return str;
        } else {
            return oldStr;
        }

    }
    //是否为正整数,返回相应的字符串,切记这个函数的返回值,contain0  为true包含0
    ,isInt:function(pstr,contain0){
        var str = pstr;
        var oldStr = str.substr(0, str.length - 1);
        var restr;
        if(contain0){
            restr = "^[0-9]+[0-9]*$";
        }else{
            restr = "^[1-9]+[0-9]*$";
        }

        var re = new RegExp(restr, "g");
        if (re.test(str)) {
            return str;
        } else {
            return oldStr;
        }

    },
    isIntBool:function(pstr){
        var str = pstr;
        var restr;
        restr = "^[1-9]+[0-9]*$";
        var re = new RegExp(restr, "g");
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }

    }
    //检测是否为有效金额可以为整数,也可以为小数,返回相应的字符串
    ,ismoney:function(pstr){

        var str = pstr;
        var oldStr = str.substr(0, str.length - 1);
        var restr;
        //小数正则:/^[+-]?[1-9]?[0-9]*\.[0-9]*$/
        restr = "^[1-9]+[0-9]*$|^[+-]?[1-9]?[0-9]*\\.[0-9]*$";
        var re = new RegExp(restr, "g");
        if (re.test(str)) {
            return str;
        } else {
            return oldStr;
        }
    }
    ,ismoneyBool:function(pstr){

        var str = pstr;
        var restr;
        //小数正则:/^[+-]?[1-9]?[0-9]*\.[0-9]*$/
        restr = "^[1-9]+[0-9]*$|^[+-]?[1-9]?[0-9]*\\.[0-9]*$";
        var re = new RegExp(restr, "g");
        if (re.test(str)) {
            return true;
        } else {
            return false;
        }
    },	//检测是否是邮箱
    isEmail: function(str) {
        var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
        return reg.test(str);
    },
    //验证帐号是否合法,验证规则：字母、数字、下划线组成，字母开头，4-16位。
    checkUser: function(str) {
        var re = /^[a-zA-z]\w{3,15}$/;
        if(re.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    //验证手机号码,验证规则：11位数字，以1开头。
    checkMobile: function(str) {
        var re = /^1\d{10}$/
        if(re.test(str)) {
            return true;
        } else {
            return false;
        }
    },
    //验证电话号码
    //验证规则：区号+号码，区号以0开头，3位或4位
    //号码由7位或8位数字组成
    //区号与号码之间可以无连接符，也可以“-”连接
    //如01088888888,010-88888888,0955-7777777
    checkPhone: function(str) {
        var re = /^0\d{2,3}-?\d{7,8}$/;
        if(re.test(str)) {
            return true;
        } else {
            return false;
        }
    }
    ,
    //验证身份证http://www.cnblogs.com/lzrabbit/archive/2011/10/23/2221643.html
    IdentityCodeValid:function (code) {
        var city={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江 ",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北 ",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",51:"四川",52:"贵州",53:"云南",54:"西藏 ",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外 "};
        var tip = "";
        var pass= true;

        if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)){
            tip = "身份证号格式错误";
            pass = false;
        }

        else if(!city[code.substr(0,2)]){
            tip = "地址编码错误";
            pass = false;
        }
        else{
            //18位身份证需要验证最后一位校验位
            if(code.length == 18){
                code = code.split('');
                //∑(ai×Wi)(mod 11)
                //加权因子
                var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
                //校验位
                var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
                var sum = 0;
                var ai = 0;
                var wi = 0;
                for (var i = 0; i < 17; i++)
                {
                    ai = code[i];
                    wi = factor[i];
                    sum += ai * wi;
                }
                var last = parity[sum % 11];
                if(parity[sum % 11] != code[17]){
                    tip = "校验位错误";
                    pass =false;
                }
            }
        }
        if(!pass) alert(tip);
        return pass;
    }


}
var v = new validate(); //page输入框验证

String.prototype.endWith = function(s) {
    if(s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if(this.substring(this.length - s.length) == s)
        return true;
    else
        return false;
    return true;
}
String.prototype.startWith = function(s) {
    if(s == null || s == "" || this.length == 0 || s.length > this.length)
        return false;
    if(this.substr(0, s.length) == s)
        return true;
    else
        return false;
    return true;
}

function formatDouble(num) {
    num = num.toFixed(2);
    if(num.endsWith(".00")) {
        num = num.substring(0, num.length - 3);
    } else if(num.endsWith("0")) {
        num = num.substring(0, num.length - 1);
    }
    return num;
}

//保留两位小数
//功能：将浮点数四舍五入，取小数点后n位
//http://www.cnblogs.com/hongchenok/archive/2011/11/02/2232810.html
function toDecimal(x, n) {
    var num = arguments[1] ? arguments[1] : 2;
    n=num;
    var f = parseFloat(x);
    function  getN(n){
        var sum =1;
        for (var i=0 ;i< n;i++){
            sum*=10;
        }
        return sum ;
    }
    if (isNaN(f)) {
        return 0;
    }

    f = Math.round(x * getN(n)) / getN(n);
    return f;
}



//强制保留小数位,注意此函数返回的是字符串,不能用于数值计算,只能用于显示,切记,切记,再切记

function toDecimalFormatStr(x, n) {
    function  getN(n){
        var sum =1;
        for (var i=0 ;i< n;i++){
            sum*=10;
        }
        return sum ;
    }
    var num = arguments[1] ? arguments[1] : 2;
    n=num;
    var f = parseFloat(x);
    if (isNaN(f)) {
        n=0
    }
    var f = Math.round(x * getN(n)) / getN(n);
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }

    while (s.length <= rs + num) {
        s += '0';
    }
    return s;
}



//日期格式化用法
//alert(new Date().Format("yyyy年MM月dd日"));
//alert(new Date().Format("MM/dd/yyyy"));
//alert(new Date().Format("yyyyMMdd"));
//alert(new Date().Format("yyyy-MM-dd hh:mm:ss"));
Date.prototype.Format = function (format) { //日期格式化http://www.jb51.net/article/22657.htm
    var o = {
        "M+" : this.getMonth() + 1, //month
        "d+" : this.getDate(), //day
        "h+" : this.getHours(), //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth() + 3) / 3), //quarter
        "S" : this.getMilliseconds() //millisecond
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}

//转日期,支持字符串,毫秒数

function getDate(millisecond) {
    if(!millisecond){
        return ''
    }
    var date= new Date(millisecond);
    return date.Format("yyyy-MM-dd");
}

//转日期时间,,毫秒数
function getDateTime(millisecond) {
    if(!millisecond){
        return ''
    }
    var date= new Date(millisecond);
    return date.Format("yyyy-MM-dd hh:mm:ss");
}

//查询请求参数变量
function getQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var url=  decodeURI(window.location.search)
    var r = url.substr(1).match(reg);
    if(r !=null)return  unescape(r[2]); return '';
}


//延迟加载函数
function delayCall(time,call,param){
    if(!time){return}
    if(!call){return}
    setTimeout(function(){call(param)},time);
}

//延迟跳转
function delayTourl(url,time){
    if(!url){return}
    if(!time){time=2000}
    setTimeout(function(){location.href=url},time);
}

// //指定索引插入元素
// Array.prototype.insert = function (index, item) {
//     this.splice(index, 0, item);
// };
//毫秒数
function timeStamp(){
    var myData = new Date();
    var times = myData.getTime();//
    return  times;
}


//截取取年月日时分秒
function getSplitTime(date){
    if(date&&date.length>19){
        return date.substring(0,19)
    }else{
        return date
    }
}

//设置默认值
function setDef(obj,def) {
   return !obj?def:obj;
}

//http://blog.csdn.net/yenange/article/details/7463897
//全部中文检测
function isAllChinese(temp)
{
  if(!temp){
      return false;
  }

    var reg=/[^\u4e00-\u9fa5]/;
    if(reg.test(temp)) return false;
    return true;
}


//检测下拉列表中的选项是否存在其val

function checkSelHaveVal(selId,val) {
    var have=false;
    $('#'+selId+"   option").each(function (i,v) {
        if ($(v).val()==val){
            have =true;
            return false;
        }
    })

    return have;
}

//去除转义等特殊字符字符
 function excludeSpecial(s) {
    // 去掉转义字符
    s = s.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
    // 去掉特殊字符
    s = s.replace(/[\@\#\$\%\^\&\*\{\}\:\"\L\<\>\?]/);
    return s;
};

//去除后缀
function remove_suffix(str,sep) {
    sep=sep?sep:',';
    if(str[str.length-1]==sep){
        str = str.substr(0, str.length - 1);
    }

    return str;
}




//
// jQuery.extend(jQuery.validator.messages, {
//     required: "必选字段",
//     remote: "请修正该字段",
//     email: "请输入正确格式的电子邮件",
//     url: "请输入合法的网址",
//     date: "请输入合法的日期",
//     dateISO: "请输入合法的日期 (ISO).",
//     number: "请输入合法的数字",
//     digits: "只能输入整数",
//     creditcard: "请输入合法的信用卡号",
//     equalTo: "请再次输入相同的值",
//     accept: "请输入拥有合法后缀名的字符串",
//     maxlength: jQuery.validator.format("请输入一个长度最多是 {0} 的字符串"),
//     minlength: jQuery.validator.format("请输入一个长度最少是 {0} 的字符串"),
//     rangelength: jQuery.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
//     range: jQuery.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
//     max: jQuery.validator.format("请输入一个最大为 {0} 的值"),
//     min: jQuery.validator.format("请输入一个最小为 {0} 的值")
// });

//*********************************************************公共js技术函数(非业务逻辑)结束************************************************************



//****************************************************公共业务逻辑开始*************************************************





//**********************输入验证开始************************************



// //判断是否为空
// jQuery.validator.addMethod("notNegative", function(value, element) {
//     return value<0?false:true;
// }, "不能输入负数");
//
// jQuery.validator.addMethod("notDecimal", function(value, element) {
//     value+="";
//
//     return  value.indexOf('.')>=0?false:true
// }, "不能输入小数");
//
// //判断是否为空
// jQuery.validator.addMethod("notEmpty", function(value, element) {
//     value=value.replace(/(^\s*)|(\s*$)/g, "");
//     return  !value?false:true;
// }, "不能为空");
//


//小数点位数不能超过2位
// jQuery.validator.addMethod("max-d2", function(value, element) {
//     debugger
//     var restr="[.][0-9]*";
//     var re = new RegExp(restr, "g");
//     var result=re.exec(value);
// if(result&&result[0].length>3){
//     return false
// }
//     return  true
// }, "小数点位数不能超过2位");


//**********************输入验证结束************************************






//验证表单有没有错误样式
function  validateFrmError(fimId) {
    var flag=true ;  //true 验证通过,false验证失败
    $(fimId).find('.error').each(function () {
            if ($(this).css('display') !='none'){
                flag=false;
            }
    })

    return  flag;
}







//设置批量审批的chk,当前选择的chk序列化
function batch_sel_file_setLocalChk(){
    localStorage.setItem('batch_file_isSel',1);
    var batch_sel_file_list=[];
    $('.chk').each(function () {
        var self=$(this);
        if (self.get(0).checked){
            var node={fileUuid:self.attr('fileUuid')}
            batch_sel_file_list.push(node)
        }
    })

    localStorage.setItem("batch_sel_file_list", JSON.stringify(batch_sel_file_list));

}



//****************************************************公共业务逻辑结束*************************************************

//获取用户类别
function get_yhlb_zydj_str(role_type) {
    var str="";
    switch(role_type*1){
        case 1:
            str='个人用户'
            break;
        case 2:
            str='单位用户'
            break;
        case 3:
            str='代理机构'
            break;
        case 4:
            str='特殊用户'
            break;
    }
    return str
}