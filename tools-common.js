// creater for Zr_Ryze
/****************************
* 名称: tools.xxxxxxx        *
* 功能: 基础工具类             *
*****************************/
var tools = new function() {
	var _this = this;
	/*******************************************************************************
	 * 名称: tools.init
	 * 功能: 页面初始化vue
	 * 输入: option vue属性
	 * 输出:new Vue
	 ******************************************************************************/
	_this.init = function(option,callback) {
		var defualtOption = {
			el: "body",
			data:{
				modal:{
					show:false,
					type:""
				}
			},
			methods:{
				hideModal:function(){
					item.modal.show = false;
					item.modal.type = "";
				}
			}
		};
		var initOption = $.extend(true, defualtOption, option);
		var newvue = new Vue(initOption);
		if(callback)
			newvue.$nextTick(function(){
				callback(this);
			})
		return newvue;
	};
	/*******************************************************************************
	 * 名称: tools.setTitle
	 * 功能: 设置页面title
	 * 输入: title
	 * 输出: title
	 ******************************************************************************/
	_this.setTitle = function(title){
		document.title = title;
		if (/ip(hone|od|ad)/i.test(navigator.userAgent)) {
			var i = document.createElement('iframe');
			i.src = '../common/imgs/favicon.ico';
			i.style.display = 'none';
			i.onload = function() {
				setTimeout(function() {
					i.remove();
				}, 9)
			};
			document.body.appendChild(i);
		}
	}
	/*******************************************************************************
	 * 名称: tools.isNull
	 * 功能: 判断obj是否为空
	 * 输入: @param obj 参数
	 * 输出: 如果参数obj是true或者false(表示该obj为不为空)
	 ******************************************************************************/
	_this.isNull = function(obj) {
		return null == obj || undefined == obj || "null" == String(obj) || "" == String(obj) || "undefined" == String(obj) || "NAN" == obj || NaN == obj;
	};
	/*******************************************************************************
	 * 名称: tools.isNotNull
	 * 功能: 判断obj是否不为空
	 * 输入: @param obj 参数
	 * 输出: 如果参数obj是true或者false(表示该obj为不为空)
	 ******************************************************************************/
	_this.isNotNull = function(obj) {
		return !_this.isNull(obj);
	};
	/******************************************************************************
	 * 名称: tools.isTrue
	 * 功能: 判断obj是否为true
	 * 输入: @param obj 参数
	 * 输出: 如果参数obj是true或者false(表示该obj为不为true)
	 *****************************************************************************/
	_this.isTrue = function(obj) {
		return true == obj || "true" == obj;
	};
	/******************************************************************************
	 * 名称: tools.postJson
	 * 功能: 判断obj是否为true
	 * 输入: @param obj 参数
	 * 输出: 如果参数obj是true或者false(表示该obj为不为true)
	 *****************************************************************************/
	_this.postJson = function(url, params, successCallback, errorCallback) {
		var beforeSend = function(request) {
			// request.setRequestHeader("session_id", "5850d8a91f9e814f95ff2ed7");
		};
		$.ajax({
			url: url,
			type: 'POST',
			data: params,
			async:true,
			beforeSend: beforeSend
		}).done(function(result) {
			if(_this.isTrue(result.success)){
				successCallback(result);
			}else{
				errorCallback(result);
			}
		}).fail(function(result) {
			errorCallback(result);
		});
	};
	/****************************************************************************
	 * 名称: tools.getUrlParam
	 * 功能: get Url参数
	 * 输入: @param obj 参数
	 * 输出:
	 ***************************************************************************/
	_this.getUrlParam = function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
			return decodeURI(r[2]);
		return null;
	};
	/**************************************************************************
	 * 名称: tools.getUrlParam
	 * 功能: 本地储存
	 * 输入: @param name value 参数
	 * 输出:
	 *************************************************************************/
	_this.setLocalStorage = function(name, value) {
		if (value) {
			localStorage.setItem(name, value);
		} else {
			localStorage.removeItem(name);
		}
	};
	/**************************************************************************
	 * 名称: tools.getUrlParam
	 * 功能: 取本地储存
	 * 输入: @param name value 参数
	 * 输出:
	 *************************************************************************/
	_this.getLocalStorage = function(name) {
		return localStorage.getItem(name);
	};
	/*********************************************************************
	 * 名称: tools.getRandomNum
	 * 功能: 生成短UID
	 * 输入: @param result, orderNumber, type 参数
	 * 输出:
	 ********************************************************************/
	_this.getRandomNum = function() {
		return (new Date().getTime()) + ("0000" + (Math.random() * Math.pow(36, 4) << 0).toString(36)).substr(-4);
	};
	/*********************************************************************
	 * 名称: _this.buildObject
	 * 功能: 数组重组
	 * 输入: @param arr(原数组), key(遍历key), value(遍历key), func(model方法)参数
	 * 输出:
	 ********************************************************************/
	_this.buildObject = function(listArr, keys) {
	    var list = new Array();
	    listArr.forEach(function(lo, li, la){
	        var listObj = new Object();
	        keys.forEach(function(ko, ki, ka){
	            for (var key_ in lo) {
	                if (key_ == ko) {
	                    listObj[ko] = lo[key_];
	                }
	            }
	        })
	        list.push(listObj);
	    })
	    return list;
	};
	/*********************************************************************
	 * 名称: _this.removeKey
	 * 功能: 删除object对象的key
	 * 输入: @param obj(对象)  arr(数组)参数
	 * 输出:
	 ********************************************************************/
	_this.removeKey = function(obj, arr) {
		var param = $.extend(true, {}, obj);
		for (var i = 0; i < arr.length; i++) {
			delete param[arr[i]];
		}
		return param;
	};
	/*********************************************************************
	 * 名称: _this.setParam
	 * 功能: 过滤提交的参数
	 * 输入: @param obj(对象)  arr(数组)参数
	 * 输出:
	 ********************************************************************/
	_this.setParam = function(obj, arr) {
		var param = {};
		for (var i = 0; i < arr.length; i++) {
			param[arr[i]] = obj[arr[i]];
		}
		return param;
	};
	/*********************************************************************
	 * 名称: tools.filterParam
	 * 功能: 校验提交的参数
	 * 输入: @param obj(对象)  arr(数组)参数
	 * 输出: callback(@param) || 错误提示
	 ********************************************************************/
	_this.filterParam = function(paramArr, callback) {
		var paramTrue = false;
		var newParam = new Object();
		$.each(paramArr,function(key, obj) {
			newParam[key] = obj.value;
			if(obj.value){
				if(obj.verify){
					if(obj.verify == 'mobile'){
						var reg = /^0?1[3|4|5|8][0-9]\d{8}$/;
						if (reg.test(obj.value)) {
						    paramTrue = true;
						    return true;
						}else{
						    modal.showMsg("手机号格式不正确");
						    paramTrue = false;
						    return false;
						};
					}else if(obj.verify == 'email'){
						var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
						if (myreg.test(obj.value)) {
						    paramTrue = true;
						    return true;
						}else{
						    modal.showMsg("邮箱格式不正确");
						    paramTrue = false;
						    return false;
						};
					}
				}else if(obj.minLength){
					if(obj.value.length < obj.minLength){
					    modal.showMsg(obj.name + "不能小于" + obj.minLength + "位");
					    paramTrue = false;
					    return false;
					}
				}else if(obj.maxLength){
					if(obj.value.length > obj.maxLength){
					    modal.showMsg(obj.name + "不能大于" + obj.maxLength + "位");
					    paramTrue = false;
					    return false;
					}
				}else{
					paramTrue = true;
					return true;
				}
			}else{
			    modal.showMsg(obj.name + "不能为空");
			    paramTrue = false;
			    return false;
			}
		});
		if(paramTrue){
			callback(newParam);
		}
	};
	/*********************************************************************
	 * 名称: _this.openWeb
	 * 功能: 校验提交的参数
	 * 输入: @param url(html及html所在文件夹)  params(数组)参数
	 * 输出:
	 ********************************************************************/
	_this.openWeb = function(options){
		var openUrl = "",
			url = options.url,
			params = options.params;
		if(!params){
			openUrl = url +".html";
		}else{
			if(params.length == 1){
				openUrl = url +".html?" + params[0];
			}else{
				openUrl = url +".html?" + params.shift();
				params.forEach(function(param){
					openUrl += "&" + params;
				})
			}
		}
		window.location.href = openUrl;
	};
}
/****************************
* 名称: cookie.xxxxxxx       *
* 功能: 弹窗类            	*
*****************************/
var cookie = new function(){
	var _this = this;
	/*********************************************************************
	* 名称: cookie.set
	* 功能: 设置cookie
	* 输入: @param name value 参数
	* 输出: none
	********************************************************************/
	_this.set = function(name,value){
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days*24*60*60*1000);
		document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString();
	};
	/*********************************************************************
	* 名称: cookie.get
	* 功能: 读取cookie
	* 输入: @param name 参数
	* 输出: value
	********************************************************************/
	_this.get = function(name){
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
		if(arr=document.cookie.match(reg)){
			return unescape(arr[2]);
		}else{
			return null;
		}
	};
	/*********************************************************************
	* 名称: cookie.del
	* 功能: 删除cookie
	* 输入: @param name 参数
	* 输出: none
	********************************************************************/
	_this.del = function(name){
		var exp = new Date();
		exp.setTime(exp.getTime() - 1);
		var cval=getCookie(name);
		if(cval!=null)
		document.cookie= name + "="+cval+";expires="+exp.toGMTString();
	}
}
/****************************
* 名称: modal.xxxxxxx        *
* 功能: 弹窗类            	*
*****************************/
var modal = new function(){
	var _this = this;
	/*********************************************************************
	* 名称: modal.selectModal
	* 功能: 下拉选
	* 输入: @param model(vue实例), arr(下拉列表), func(model方法) 参数
	* 输出: 下拉选
	********************************************************************/
	_this.selectModal = function(model, arr) {
		var keys = ['id','name'];
		if (tools.isNotNull(model.keys)) {
			keys = $.extend(true, keys, model.keys);
		}
		var title = "";
		if (tools.isNotNull(model.title)) {
			title = model.title;
		}
		var vueModel = model.vue;
		var arrList = tools.buildObject(arr,keys);
		vueModel.title = title;
		vueModel.list = arrList;
	};
	/********************************************************************
	* 名称: modal.hideMsg
	* 功能: 提示框消失
	* 输入: @param 参数
	* 输出: 隐藏modal
	*******************************************************************/
	var msgTime;
	_this.hideMsg = function() {
		clearTimeout(msgTime);
		$(".msg_modal").remove();
	};
	/*********************************************************************
	* 名称: modal.showMsg
	* 功能: 提示框
	* 输入: @param type(提示框状态)  msg(提示信息)参数
	* 输出: 显示modal
	********************************************************************/
	_this.showMsg = function(desc) {
		clearTimeout(msgTime);
		$(".msg_modal").remove();
		var html = '<div class="msg_modal">' + desc + '</div>';
		$("body").append(html);
		msgTime = setTimeout(function() {
			_this.hideMsg();
		}, 3000);
	};
	/*********************************************************************
	* 名称: modal.delModal
	* 功能: 提示框
	* 输入: @param type(提示框状态)  msg(提示信息)参数
	* 输出: 显示modal
	********************************************************************/
	_this.delModal = function(options,successCallback,errorCallback){
		var options = $.extend(true, {
			title:"温馨提示",
			text:"您确定吗？",
			successBtn:"确定",
			errorBtn:"取消"
		}, options);
		var template = '<div id="group-modal-container" class="group-modal-container">';
	    	template+= '<div class="group-modal-title">'+options.title+'</div>';
	    	template+= '<div class="group-modal-text">'+options.text+'</div>';
			template+= '<div class="group-modal-btns">';
			template+= '<div class="group-modal-btn btn-close">'+options.errorBtn+'</div>';
			template+= '<div class="group-modal-btn btn-success">'+options.successBtn+'</div>';
			template+= '</div></div>';
		$("body").append(template);
		$(".group-modal-btn.btn-success").click(function(){
			if(successCallback)
				successCallback();
			$("#group-modal-container").remove();
			item.hideModal();
		})
		$(".group-modal-btn.btn-close").click(function(){
			if(errorCallback)
				errorCallback();
			$("#group-modal-container").remove();
			item.hideModal();
		})
	};
}
/****************************
* 名称: wxSever.xxxxxxx      *
* 功能: 微信相关	          	*
*****************************/
var wxSever = new function(){
	var _this = this;
	/*********************************************************************
	* 名称: wxSever.wxConfig
	* 功能: 微信sdk
	* 输入: @param id(html及html所在文件夹)  params(数组)参数
	* 输出:
	********************************************************************/
	_this.wxConfig = function(options,callback){
		var postUrl = options.url?options.url:'',
			jsApis = options.apis?options.apis:'',
			sdkDebug = options.debug?options.debug:false;
		tools.postJson(postUrl, {
			url: location.href.split('#')[0],
			apis: jsApis,
			isDebug:sdkDebug
		}, function (result) {
			eval(result.data.wxConfig);
			if(callback)
				callback();
		}, function (result) {
			modal.showMsg(result.errorMsg);
		});
	}
	/************************************************************************
	* 名称: wxSever.wxPayInit
	* 功能: 微信支付
	* 输入: @param result, orderNumber, type 参数
	* 输出:
	***********************************************************************/
	_this.wxPayInit = function(result, orderNumber, successCallback,errorCallback) {
		var dataJson = result.data.payConfig;
		WeixinJSBridge.invoke(
			'getBrandWCPayRequest', {
				"appId": dataJson.appId, //公众号名称，由商户传入
				"timeStamp": dataJson.timeStamp, //时间戳，自1970年以来的秒数
				"nonceStr": dataJson.nonceStr, //随机串
				"package": dataJson.package,
				"signType": "MD5", //微信签名方式：
				"paySign": dataJson.sign //微信签名
			},
			function(res) {
				// modal.showMsg(res);
				if(res.err_msg == 'get_brand_wcpay_request:ok'){
					modal.showMsg("支付成功");
					if(successCallback)
						successCallback();
				}else if(res.err_msg == 'get_brand_wcpay_request:cancel'){
					modal.showMsg("取消支付");
					if(errorCallback)
						errorCallback(0);
				}else{
					modal.showMsg("支付失败");
					if(errorCallback)
						errorCallback(-1);
				}
				// callBackPay(res, orderNumber, type);
			}
		);
	};

}
/*************************************************************************
* 名称: errorImage
* 功能: 图片错误显示
* 输入: @param e this
* 输出: url
*************************************************************************/
var errorImage = function(e, type) {
	$(e).attr("src", "img/icon-01.png");
	$(e).attr("onerror", null);
}

/*************************************************************************
* 名称: EventUtil
* 功能: 过滤粘贴
* 输入: @param e this
* 输出: url
*************************************************************************/
var EventUtil = {
	addHandler: function(element, type, handler) {
		if (element.addEventListener) {
			element.addEventListener(type, handler, false);
		} else if (element.attachEvent) {
			element.attachEvent("on" + type, handler);
		} else {
			element["on" + type] = handler;
		}
	},
	getEvent: function(event) {
		return event ? event : window.event;
	},
	getClipboardText: function(event) {
		var clipboardData = (event.clipboardData || window.clipboardData);
		return clipboardData.getData("text");
	},
	setClipboardText: function(event, value) {
		if (event.clipboardData) {
			return event.clipboardData.setData("text/plain", value);
		} else if (window.clipboardData) {
			return window.clipboardData.setData("text", value);
		}
	},
	preventDefault: function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}
};