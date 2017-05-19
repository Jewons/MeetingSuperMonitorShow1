/**
 * This js used for index.jsp
 */
/*$(document).ready(function(){
	*//*************************************************//*
	getMonitorSeverList();
});*/
/**
 * 获取正在监控的STP,STPRC,RELAY,RELAYRC的信息，循环调用http服务器的运行状态，进入页面就开始载入
 */
var  request_time_out = 1000000; // 设置请求超时时间
var  Interval_time = 10000;		// 设置请求间隔时间 
function loopGetData(){
	LoadXml();
	getMonitorSeverList();
	//setInterval("getMonitorSeverList()",15000);
/*	getNpsData();
	setInterval("getNpsData()",5000);
	getUserCenterData();
	setInterval("getUserCenterData()",5000);
	getInterfaceSeverData();
	setInterval("getInterfaceSeverData()",5000);
	getUpdateServerStatus();
	setInterval("getUpdateServerStatus()",5000);*/
	getConfigStpAndRelayNum();
}
/**
 * 获取后台配置文件中记录的应监控的STP 和 Relay的数量，用于STPRC和RELAYRC的数量告警
 */
function getConfigStpAndRelayNum(){
	var severType = 1;
	$.ajax({
		type : "post",
		url : "search.GetConfigStpAndRelayNum.action",
		dataType : "json",
		data : "severType="+severType,
		beforeSend : function() {
			
		},
		complete : function() {
			
		},
		success : function(data) {
			console.info(data);
			AnalyConfigStpAndRelayNum(data);
		},
		error : function(request, textStatus, errorThrown) {
			
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}
/**
 * 获取NPS服务器的运行状态
 */
function getNpsData(ip,type){
	
	var severType = 1;
	
	var _sound = document.getElementById("sound");
	var npsStatus =$.ajax({
		type : "post",
		url : "search.GetNpsStatus.action",
		timeout : request_time_out,
		dataType : "json",
		data : "severIp=" + ip + "&SeverType=" + type,
		beforeSend : function() {
			//_severState.src = "images/waiting.gif";
		},
		complete : function(XMLHttpRequest,status) {
			if(status=='timeout'){//超时,status还有success,error等值的情况
			 　　　　npsStatus.abort();
			 $('#connectStatus').html("请求发送超时，正在重试");
			}
			setTimeout("getNpsData('"+ip+"','"+type+"')",Interval_time);
		},
		success : function(data) {
			flag = false;
			console.info(data);
			//$("#connectStatus").remove();
			$('#connectStatus').remove();
			AnalysisNpsData(ip,_sound,data);
		},
		error : function(request, textStatus, errorThrown) {
			//$("#connectStatus").html("与webSever失去连接");
			//alert("与webSever失去连接");
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}
/**
 * 获取用户中心服务器的运行状态
 */
function getUserCenterData(ip,type){
	
	var severType = 1;
	//var _severState = document.getElementById(ip+"ECState");
	var _sound = document.getElementById("sound");
	var EUCstatus = $.ajax({
		type : "post",
		url : "search.GetUserCenterStatus.action",
		timeout : request_time_out,
		dataType : "json",
		data : "severIp=" + ip + "&SeverType=" + type,
		beforeSend : function() {
			//_severState.src = "images/waiting.gif";
		},
		complete : function(XMLHttpRequest,status) {
			if(status=='timeout'){//超时,status还有success,error等值的情况
			 　　　　EUCstatus.abort();
			}
			setTimeout("getUserCenterData('"+ip+"','"+type+"')",Interval_time);
		},
		success : function(data) {
			AnalysisUserCenterData(ip,_sound,data);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}
/**
 * 获取接口服务器的运行状态
 */
function getInterfaceSeverData(ip,type){
	
	var severType = 1;
	//var _severState = document.getElementById(ip+"BSState");
	var _sound = document.getElementById("sound");
	var ManagerStatus = $.ajax({
		type : "post",
		url : "search.GetInterfaceSeverStatus.action",
		timeout : request_time_out,
		dataType : "json",
		data : "severIp=" + ip + "&SeverType=" + type,
		beforeSend : function() {
			//_severState.src = "images/waiting.gif";
		},
		complete : function(XMLHttpRequest,status) {
			if(status=='timeout'){//超时,status还有success,error等值的情况
			 　　　　ManagerStatus.abort();
			}
			setTimeout("getInterfaceSeverData('"+ip+"','"+type+"')",Interval_time);
		},
		success : function(data) {
			AnalysisInterFaceSeverData(ip,_sound,data);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}
/**
 * 获取升级服务器的运行状态
 */
function getUpdateServerStatus(ip,type){
	var severType = 1;
	//var _severState = document.getElementById("UPDATEseverState");
	//var _severState = document.getElementById(ip+"UPDATEState");
	var _sound = document.getElementById("sound");
	var upStatus = $.ajax({
		type : "post",
		url : "search.GetUpdateSeverStatus.action",
		timeout : request_time_out,
		dataType : "json",
		data : "severIp=" + ip + "&SeverType=" + type,
		beforeSend : function() {
			//_severState.src = "images/waiting.gif";
		},
		complete : function(XMLHttpRequest,status) {
			if(status=='timeout'){//超时,status还有success,error等值的情况
			 　　　　upStatus.abort();
			}
			setTimeout("getUpdateServerStatus('"+ip+"','"+type+"')",Interval_time);
		},
		success : function(data) {
			console.info(data);
			AnalysisUpdateServer(ip,_sound,data);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

/**
 * 获取后台正在监控的服务器
 */
function getMonitorSeverList(){
	var severType = 1;
	$.ajax({
		type : "post",
		url : "search.GetAllMonitorSeverInfo.action",
		dataType : "json",
		data : "severType="+severType,
		beforeSend : function() {
			
		},
		complete : function() {
			
		},
		success : function(data) {
			showMonitringSevers(data);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}
function getServerLiveStatus(ip,type){
	var seversStatus = $.ajax({
		type : "post",
		url : "search.GetServerLiveStatus.action",
		timeout : request_time_out,
		dataType : "json",
		data : "severIp=" + ip + "&SeverType=" + type,
		beforeSend : function() {
			
		},
		complete : function(XMLHttpRequest,status) {
			if(status=='timeout'){//超时,status还有success,error等值的情况
			 　　　　seversStatus.abort();
			}
			setTimeout("getServerLiveStatus('"+ip+"',"+type+")",Interval_time);
		},
		success : function(data) {
			AnalysisSeverData(data,ip,type);
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}

/**
 * 向websever发送要进入二级页面监控的服务器的IP地址和服务器类型
 * @param ip
 * @param type
 */
/*function postSeverInfoForCheckDetail(ip,type){
	$.ajax({
		type : "post",
		url : "search.postSeverInfoForCheckDetail.action",
		dataType : "json",
		data : "ipString=" + ip + "&severtype=" + type,
		beforeSend : function() {
			
		},
		complete : function() {
			
		},
		success : function(data) {
			//TODO:确定是否有返回值，返回数据决定是否进入二级监控页面
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}*/
/**
 * TODO:动态添加监控服务器，第一版暂时不用
 */
/*function addMonitorSever(){
	$.ajax({
		type : "post",
		url : "addMonitorSever.action",
		dataType : "json",
		data : "severType="+severType,
		beforeSend : function() {
			
		},
		complete : function() {
			
		},
		success : function(data) {
			addMonitorSever();
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}*/