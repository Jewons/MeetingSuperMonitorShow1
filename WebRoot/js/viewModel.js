/**
 * 此文件，用来展示主界面上的表格
 */

var SeverLiveStatusMap = new Map();
var SeverLiveTimeMap = new Map();

/*var stp_mettingNum = 0;
var stp_speakerNum = 0;
var stp_memberNum = 0;
var relay_mettingNum = 0;
var relay_speakerNum = 0;
var relay_memeberNum = 0;
var stprc_severNum = 0;
var stprc_overloadNum = 0;
var relayrc_severNum = 0;
var relayrc_overloadNum = 0;*/
/*function addMonitorSever(){
			var html = "";
			var SeverType = $("#sever-type").val().trim();
			var SeverName = $("#sever-name").val().trim();
			var Ip		  = $("#sever-ip").val();
			var Port      = $("#sever-name").val();
			
			html+=  "<tbody>" +
					"<tr>" +
					"<td>"+SeverType+"</td>" +
					"<td>"+SeverName+"</td>" +
					"<td><img id='severState' src=""/></td>" +
					"<td>查看</td>" +
					"</tr>" +
					"</tbody>";
			
			$('#severTable').html(html);	
	
}*/
function showMonitringSevers(data){
	var html="";
	var soundhtml="";
	//所监控的服务器类型，1.STP 2.STPRC 3.RELAY 4.RELAYRC 
	if(data == null || data == undefined || data.result != 0){
		console.info("showMonitringSevers：所传data无效"+data);
		return;
	}
	
	var SeverInfoList = data.items;
	$.each(SeverInfoList,function(i,val){
		var SeverType;
		var IpPort = val.ip;
		var SeverTypeInt = val.type;
		switch (SeverTypeInt){
			case 1:{
				SeverType = "Stp";
				var SeverName = GetSeverNameByIp(xml_all,SeverType,IpPort);
				var LiveTimeList = new Array([0]);
				SeverLiveTimeMap.put(IpPort,LiveTimeList);
				//selectSeverToGetData(IpPort,SeverTypeInt); 
				html = "<tr><td>"+SeverType+"</td>" +
				"<td><a onclick=openDialog('"+SeverType+"Detail.jsp','"+IpPort+"',"+SeverTypeInt+")>"+SeverName+"</a></td>" +
				"<td>"+val.ip+"</td>"+
				"<td>" +
				"<img id='"+val.ip+SeverType+"State0' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State1' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State2' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State3' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State4' src='images/gray.jpg'/>" +
				"</td>"+
				"<td><a id='"+SeverName+"LastLive' onclick=popTheLiveTimeArray('"+IpPort+"',"+SeverTypeInt+")>--</a></td>"+
				"<td>--</td>"+
				"<td>" +
					"<table border=1 style='font-size:12px'>" +
						"<tr>"+
							"<td>会议</th>"+
							"<td>发言</th>"+
							"<td>参会</th>"+
						"</tr>"+
						"<tr id='"+SeverName+"Info'>"+
							"<td>--</td>"+
							"<td>--</td>"+
							"<td>--</td>"+
						"</tr>"+
					"</table>" +
				"</td>";
				soundhtml = "<audio id='"+SeverName+"sound' autoplay='autoplay'/>";
				selectSeverToGetLiveTime(IpPort,SeverTypeInt);
				var LiveStatusList = new Array([0],[0],[0],[0],[0]);
				SeverLiveStatusMap.put(IpPort, LiveStatusList);
				break;
			}	
			case 2:{
				SeverType = "Stprc";
				var SeverName = GetSeverNameByIp(xml_all,SeverType,IpPort);
				var LiveTimeList = new Array([0]);
				SeverLiveTimeMap.put(IpPort,LiveTimeList);
				//selectSeverToGetData(IpPort,SeverTypeInt);
				html = "<tr><td>"+SeverType+"</td>" +
				//"<td><a onclick=openDialog('"+SeverType+"Detail.jsp','"+IpPort+"',"+SeverTypeInt+")>"+getStprcInfo(IpPort)+"</a></td>" +
				"<td><a onclick=openDialog('"+SeverType+"Detail.jsp','"+IpPort+"',"+SeverTypeInt+")>"+SeverName+"</a></td>" +
				"<td>"+val.ip+"</td>"+
				"<td>" +
				"<img id='"+val.ip+SeverType+"State0' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State1' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State2' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State3' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State4' src='images/gray.jpg'/>" +
				"</td>"+
				"<td><a id='"+SeverName+"LastLive' onclick=popTheLiveTimeArray('"+IpPort+"',"+SeverTypeInt+")>--</a></td>"+
				"<td><img id='"+val.ip+SeverType+"NumState' src='images/gray.jpg'/></td>"+
				"<td>" +
					"<table border=1 style='font-size:12px'>" +
					"<tr>"+
						"<td>STP</th>"+
						"<td>过载</th>"+
					"</tr>"+
					"<tr id='"+SeverName+"Info'>"+
						"<td>--</td>"+
						"<td>--</td>"+
					"</tr>"+
					"</table>" +
				"</td>";
				soundhtml = "<audio id='"+SeverName+"sound' autoplay='autoplay'/>";
				selectSeverToGetLiveTime(IpPort,SeverTypeInt);
				var LiveStatusList = new Array([0],[0],[0],[0],[0]);
				SeverLiveStatusMap.put(IpPort, LiveStatusList);
				break;
			}
			case 3:{
				SeverType = "Relay";
				var SeverName = GetSeverNameByIp(xml_all,SeverType,IpPort);
				var LiveTimeList = new Array([0]);
				SeverLiveTimeMap.put(IpPort,LiveTimeList);
				//selectSeverToGetData(IpPort,SeverTypeInt); //调用获取详细信息ACTION，用于在主页上显示
				html = "<tr><td>"+SeverType+"</td>" +
				"<td><a onclick=openDialog('"+SeverType+"Detail.jsp','"+IpPort+"',"+SeverTypeInt+")>"+SeverName+"</a></td>" +
				"<td>"+val.ip+"</td>"+
				"<td>" +
				"<img id='"+val.ip+SeverType+"State0' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State1' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State2' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State3' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State4' src='images/gray.jpg'/>" +
				"</td>"+
				"<td><a id='"+SeverName+"LastLive' onclick=popTheLiveTimeArray('"+IpPort+"',"+SeverTypeInt+")>--</a></td>"+
				"<td>--</td>"+
				"<td>" +
				"<table border=1 style='font-size:12px'>" +
					"<tr>"+
						"<td>会议</th>"+
						"<td>发言</th>"+
						"<td>参会</th>"+
					"</tr>"+
					"<tr id='"+SeverName+"relay'>"+
						"<td>--</td>"+
						"<td>--</td>"+
						"<td>--</td>"+
					"</tr>"+
				"</table>" +
				"</td>";
				soundhtml = "<audio id='"+SeverName+"sound' autoplay='autoplay'/>";
				selectSeverToGetLiveTime(IpPort,SeverTypeInt);
				var LiveStatusList = new Array([0],[0],[0],[0],[0]);
				SeverLiveStatusMap.put(IpPort, LiveStatusList);
				break;
			}
			case 4:{
				SeverType = "Relayrc";
				var SeverName = GetSeverNameByIp(xml_all,SeverType,IpPort);
				var LiveTimeList = new Array([0]);
				SeverLiveTimeMap.put(IpPort,LiveTimeList);
				//selectSeverToGetData(IpPort,SeverTypeInt);
				html = "<tr><td>"+SeverType+"</td>" +
				"<td><a onclick=openDialog('"+SeverType+"Detail.jsp','"+IpPort+"',"+SeverTypeInt+")>"+SeverName+"</a></td>" +
				"<td>"+val.ip+"</td>"+
				"<td>" +
				"<img id='"+val.ip+SeverType+"State0' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State1' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State2' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State3' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State4' src='images/gray.jpg'/>" +
				"</td>"+
				"<td><a id='"+SeverName+"LastLive' onclick=popTheLiveTimeArray('"+IpPort+"',"+SeverTypeInt+")>--</a></td>"+
				"<td><img id='"+val.ip+SeverType+"NumState' src='images/gray.jpg'/></td>"+
				"<td>" +
					"<table border=1 style='font-size:12px'>" +
						"<tr>"+
							"<td>Relay</th>"+
							"<td>过载</th>"+
						"</tr>"+
						"<tr id='"+SeverName+"Info'>"+
							"<td>--</td>"+
							"<td>--</td>"+
						"</tr>"+
					"</table>" +
				"</td>";
				soundhtml = "<audio id='"+SeverName+"sound' autoplay='autoplay'/>";
				selectSeverToGetLiveTime(IpPort,SeverTypeInt);
				var LiveStatusList = new Array([0],[0],[0],[0],[0]);
				SeverLiveStatusMap.put(IpPort, LiveStatusList);
				break;
			}
			case 5:{
				SeverType = "NPS";
				var SeverName = GetSeverNameByIp(xml_all,SeverType,IpPort);
				var LiveTimeList = new Array([0]);
				SeverLiveTimeMap.put(IpPort,LiveTimeList);
				html = "<tr><td>"+SeverType+"</td>" +
				"<td>"+SeverName+"</td>" +
				"<td><div class=testDiv title='"+val.ip+"'>"+val.ip+"</div></td>"+
				"<td>" +
				"<img id='"+val.ip+SeverType+"State0' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State1' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State2' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State3' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State4' src='images/gray.jpg'/>" +
				"</td>"+
				"<td><a id='"+SeverName+"NPSLastLive' onclick=popTheLiveTimeArray('"+IpPort+"',"+SeverTypeInt+")>--</a></td>"+
				"<td>--</td>"+
				"<td>--</td>";
				soundhtml = "<audio id='"+SeverName+"sound' autoplay='autoplay'/>";
				selectSeverToGetLiveTime(IpPort,SeverTypeInt);
				var LiveStatusList = new Array([0],[0],[0],[0],[0]);
				SeverLiveStatusMap.put(IpPort, LiveStatusList);
				break;
			}	
			case 6:{
				SeverType = "EC";
				var SeverName = GetSeverNameByIp(xml_all,SeverType,IpPort);
				var LiveTimeList = new Array([0]);
				SeverLiveTimeMap.put(IpPort,LiveTimeList);
				html = "<tr><td>"+SeverType+"</td>" +
				"<td>"+SeverName+"</td>" +
				"<td><div class=testDiv title='"+val.ip+"'>"+val.ip+"</div></td>"+
				"<td>" +
				"<img id='"+val.ip+SeverType+"State0' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State1' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State2' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State3' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State4' src='images/gray.jpg'/>" +
				"</td>"+
				"<td><a id='"+SeverName+"LastLive' onclick=popTheLiveTimeArray('"+IpPort+"',"+SeverTypeInt+")>--</a></td>"+
				"<td>--</td>"+
				"<td>--</td>";
				soundhtml = "<audio id='"+SeverName+"sound' autoplay='autoplay'/>";
				selectSeverToGetLiveTime(IpPort,SeverTypeInt);
				var LiveStatusList = new Array([0],[0],[0],[0],[0]);
				SeverLiveStatusMap.put(IpPort, LiveStatusList);
				break;
			}
			case 7:{
				SeverType = "BS";
				var SeverName = GetSeverNameByIp(xml_all,SeverType,IpPort);
				var LiveTimeList = new Array([0]);
				SeverLiveTimeMap.put(IpPort,LiveTimeList);
				html = "<tr><td>"+SeverType+"</td>" +
				"<td>"+SeverName+"</td>" +
				"<td><div class=testDiv title='"+val.ip+"'>"+val.ip+"</div></td>"+
				"<td>" +
				"<img id='"+val.ip+SeverType+"State0' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State1' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State2' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State3' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State4' src='images/gray.jpg'/>" +
				"</td>"+
				"<td><a id='"+SeverName+"LastLive' onclick=popTheLiveTimeArray('"+IpPort+"',"+SeverTypeInt+")>--</a></td>"+
				"<td>--</td>"+
				"<td>--</td>";
				soundhtml = "<audio id='"+SeverName+"sound' autoplay='autoplay'/>";
				selectSeverToGetLiveTime(IpPort,SeverTypeInt);
				var LiveStatusList = new Array([0],[0],[0],[0],[0]);
				SeverLiveStatusMap.put(IpPort, LiveStatusList);
				break;
			}
			case 8:{
				SeverType = "UPDATE";
				var SeverName = GetSeverNameByIp(xml_all,SeverType,IpPort);
				var LiveTimeList = new Array([0]);
				SeverLiveTimeMap.put(IpPort,LiveTimeList);
				html = "<tr><td>"+SeverType+"</td>" +
				"<td>"+SeverName+"</td>" +
				"<td><div class=testDiv title='"+val.ip+"'>"+val.ip+"</div></td>"+
				"<td>" +
				"<img id='"+val.ip+SeverType+"State0' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State1' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State2' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State3' src='images/gray.jpg'/>" +
				"<img id='"+val.ip+SeverType+"State4' src='images/gray.jpg'/>" +
				"</td>"+
				"<td><a id='"+SeverName+"LastLive' onclick=popTheLiveTimeArray('"+IpPort+"',"+SeverTypeInt+")>--</a></td>"+
				"<td>--</td>"+
				"<td>--</td>";
				soundhtml = "<audio id='"+SeverName+"sound' autoplay='autoplay'/>";
				selectSeverToGetLiveTime(IpPort,SeverTypeInt);
				var LiveStatusList = new Array([1],[1],[1],[1],[1]);
				SeverLiveStatusMap.put(IpPort, LiveStatusList);
				break;
			}
			default:{
				SeverType = "undefined";
				break;
			}
		}
				$("#severTable").append(html);
				$("#soundList").append(soundhtml);
				//将页面画完之后，向webSever发送IP和服务器类型，获取该服务器的心跳状态
				switch (SeverTypeInt){
				case 5:{
					//NPS
					getNpsData(IpPort,SeverTypeInt);
					//setInterval("getNpsData('"+IpPort+"',"+SeverTypeInt+")",5000);	
					break;
				}	
				case 6:{
					//用户中心
					getUserCenterData(IpPort,SeverTypeInt);
					//setInterval("getUserCenterData('"+IpPort+"',"+SeverTypeInt+")",5000);
					break;
				}
				case 7:{
					//接口服务器
					getInterfaceSeverData(IpPort,SeverTypeInt);
					//setInterval("getInterfaceSeverData('"+IpPort+"',"+SeverTypeInt+")",5000);
					break;
				}
				case 8:{
					//升级服务器
					getUpdateServerStatus(IpPort,SeverTypeInt);
					//setInterval("getUpdateServerStatus('"+IpPort+"',"+SeverTypeInt+")",5000);
					break;
				}
				default:{
					//调用其他类型服务器（STP STPRC RELAY RELAYRC）
					getServerLiveStatus(IpPort,SeverTypeInt);
					//setInterval("getServerLiveStatus('"+IpPort+"',"+SeverTypeInt+")",5000);	
					getSeverShowInfo(IpPort,SeverTypeInt);
					break;
				}
			}		
	});
}
function openDialog(DetailPage,ipPort,SeverType){
	//1.打开二级监控页面
	window.open(DetailPage+"?ipPort="+ipPort+"&SeverType="+SeverType);
	//2.判断severType的值，决定调用哪个ACTION
}
function popTheLiveTimeArray(ipPort,SeverType){
	switch(SeverType){
		case 1:{
			var typeString = "Stp";
			if(SeverLiveTimeMap.get(ipPort).length > 1){
			SeverLiveTimeMap.get(ipPort).shift();
			$('#'+GetSeverNameByIp(xml_all,typeString,ipPort)+'LastLive').html(SeverLiveTimeMap.get(ipPort)[0]);
			}
			break;
		}
		case 2:{
			var typeString = "Stprc";
			if(SeverLiveTimeMap.get(ipPort).length > 1){
			SeverLiveTimeMap.get(ipPort).shift();
			$('#'+GetSeverNameByIp(xml_all,typeString,ipPort)+'LastLive').html(SeverLiveTimeMap.get(ipPort)[0]);
			}
			break;
		}
		case 3:{
			var typeString = "Relay";
			if(SeverLiveTimeMap.get(ipPort).length > 1){
			SeverLiveTimeMap.get(ipPort).shift();
			$('#'+GetSeverNameByIp(xml_all,typeString,ipPort)+'LastLive').html(SeverLiveTimeMap.get(ipPort)[0]);
			}
			break;
		}
		case 4:{
			var typeString = "Relayrc";
			if(SeverLiveTimeMap.get(ipPort).length > 1){
				SeverLiveTimeMap.get(ipPort).shift();
				$('#'+GetSeverNameByIp(xml_all,typeString,ipPort)+'LastLive').html(SeverLiveTimeMap.get(ipPort)[0]);
			}
			break;
		}
		case 5:{
			var typeString = "NPS";
			if(SeverLiveTimeMap.get(ipPort).length > 1){
			SeverLiveTimeMap.get(ipPort).shift();
			$('#'+GetSeverNameByIp(xml_all,typeString,ipPort)+'LastLive').html(SeverLiveTimeMap.get(ipPort)[0]);
			}
			break;
		}
		case 6:{
			var typeString = "EC";
			if(SeverLiveTimeMap.get(ipPort).length > 1){
			SeverLiveTimeMap.get(ipPort).shift();
			$('#'+GetSeverNameByIp(xml_all,typeString,ipPort)+'LastLive').html(SeverLiveTimeMap.get(ipPort)[0]);
			}
			break;
		}
		case 7:{
			var typeString = "BS";
			if(SeverLiveTimeMap.get(ipPort).length > 1){
			SeverLiveTimeMap.get(ipPort).shift();
			$('#'+GetSeverNameByIp(xml_all,typeString,ipPort)+'LastLive').html(SeverLiveTimeMap.get(ipPort)[0]);
			}
			break;
		}
		case 8:{
			var typeString = "UPDATE";
			if(SeverLiveTimeMap.get(ipPort).length > 1){
			SeverLiveTimeMap.get(ipPort).shift();
			$('#'+GetSeverNameByIp(xml_all,typeString,ipPort)+'LastLive').html(SeverLiveTimeMap.get(ipPort)[0]);
			}
			break;
		}
	}
}
/*function selectSeverToGetData(ip,severType){
	switch(severType){
	case 1:{
		getStpDetail(ip,severType);
		setInterval("getStpDetail('"+ip+"','"+severType+"')",5000);
		getStpShowInfo();
		setInterval("getStpShowInfo()",5000);
		break;
	}
	case 2:{
		getStpRcDetail(ip,severType);
		setInterval("getStpRcDetail('"+ip+"','"+severType+"')",5000);
		getStprcShowInfo();
		setInterval("getStprcShowInfo()",5000);
		break;
	}
	case 3:{
		//getRelayDetailData(ip,severType);
		//setInterval("getRelayDetailData('"+ip+"',"+severType+")",5000);	
		getRelayShowInfo(ip,severType);
		setInterval("getRelayShowInfo('"+ip+"',"+severType+")",5000);
		break;
	}
	case 4:{
		getRelayrcDetail(ip,severType);
		setInterval("getRelayrcDetail('"+ip+"',"+severType+")",5000);	
		getRelayrcShowInfo();
		setInterval("getRelayrcShowInfo()",5000);
		break;
	}
	}
}*/
function selectSeverToGetLiveTime(ip,severType){
	var TypeString;
	switch(severType){
		case 1:{
			TypeString = "Stp";
			getLastLiveForStp(ip,TypeString);
			setInterval("getLastLiveForStp('"+ip+"','"+TypeString+"')",Interval_time);
			break;
		}
		case 2:{
			TypeString = "Stprc";
			getLastLiveForStprc(ip,TypeString);
			setInterval("getLastLiveForStprc('"+ip+"','"+TypeString+"')",Interval_time);
			break;
		}
		case 3:{
			TypeString = "Relay";
			getLastLiveForRelay(ip,TypeString);
			setInterval("getLastLiveForRelay('"+ip+"','"+TypeString+"')",Interval_time);
			break;
		}
		case 4:{
			TypeString = "Relayrc";
			getLastLiveForRelayrc(ip,TypeString);
			setInterval("getLastLiveForRelayrc('"+ip+"','"+TypeString+"')",Interval_time);
			break;
		}
		case 5:{
			TypeString = "NPS";
			getLastLiveForNps(ip,TypeString);
			setInterval("getLastLiveForNps('"+ip+"','"+TypeString+"')",Interval_time);
			break;
		}
		case 6:{
			TypeString = "EC";
			getLastLiveForEC(ip,TypeString);
			setInterval("getLastLiveForEC('"+ip+"','"+TypeString+"')",Interval_time);
			break;
		}
		case 7:{
			TypeString = "BS";
			getLastLiveForBS(ip,TypeString);
			setInterval("getLastLiveForBS('"+ip+"','"+TypeString+"')",Interval_time);
			break;
		}
		case 8:{
			TypeString = "UPDATE";
			getLastLiveForUPDATE(ip,TypeString);
			setInterval("getLastLiveForUPDATE('"+ip+"','"+TypeString+"')",Interval_time);
			break;
		}
	}
	
}
function getSeverShowInfo(ip,severType){
	switch(severType){
	case 1:{
		getStpShowInfo(ip,severType);
		//setInterval("getStpShowInfo('"+ip+"',"+severType+")",Interval_time)
		break;
	}
	case 2:{
		getStprcShowInfo(ip,severType,true);
		//setInterval("getStprcShowInfo('"+ip+"',"+severType+")",Interval_time)
		break;
	}
	case 3:{
		getRelayShowInfo(ip,severType);
		//setInterval("getRelayShowInfo('"+ip+"',"+severType+")",Interval_time)
		break;
	}
	case 4:{
		getRelayrcShowInfo(ip,severType,true);
		//setInterval("getRelayrcShowInfo('"+ip+"',"+severType+")",Interval_time)
		break;
	}
	}
}
function getStpShowInfo(ip,severType){
	/*stp_mettingNum = getMeetingNum(data_all_stp);
	stp_speakerNum = getSpeakerNum(data_all_stp);
	stp_memberNum = getMemberNum(data_all_stp);
	
	var html = "<td>"+stp_mettingNum+"</td>"+
				"<td>"+stp_speakerNum+"</td>"+
				"<td>"+stp_memberNum+"</td>";
	$('#stpDataInfo').html(html);*/
	chart_flag_stp = false;
	getStpDetail(ip,severType);
}
function getStprcShowInfo(ip,severType,flag){
/*	stprc_severNum = getStpSeverNum(data_all_stprc);
	stprc_overloadNum = getOverLoadStpNum(data_all_stprc);
	
	var html = "<td>"+stprc_severNum+"</td>"+
				"<td>"+stprc_overloadNum+"</td>";
	
	$('#stprcDataInfo').html(html);*/
	chart_flag_stprc = false;
	getStpRcDetail(ip,severType,flag);
	
}
function getRelayShowInfo(ip,severType){
	chart_flag_relay = false;
	getRelayDetailData(ip,severType);
}
function getRelayrcShowInfo(ip,severType,flag){
/*	relayrc_severNum = getRelayTotalNum(data_all_relayrc);
	relayrc_overloadNum =getOverLoadRelayNum(data_all_relayrc);
	
	var html = "<td>"+relayrc_severNum+"</td>"+
				"<td>"+relayrc_overloadNum+"</td>";
	$('#relayrcDataInfo').html(html);*/
	chart_flag_relayrc = false;
	getRelayrcDetail(ip,severType,flag);
	
}
//NPS获取上一次心跳时间
function getLastLiveForNps(ip,typeString){
	var html = SeverLiveTimeMap.get(ip)[0];
	$('#'+GetSeverNameByIp(xml_all,"NPS",ip)+typeString+'LastLive').html(html);
}
//BS获取上一次心跳时间
function getLastLiveForBS(ip,typeString){
	var html = SeverLiveTimeMap.get(ip)[0];
	$('#'+GetSeverNameByIp(xml_all,typeString,ip)+'LastLive').html(html);
}
//EC获取上一次心跳时间
function getLastLiveForEC(ip,typeString){
	var html = SeverLiveTimeMap.get(ip)[0];
	$('#'+GetSeverNameByIp(xml_all,typeString,ip)+'LastLive').html(html);
}
//UPDATE获取上一次心跳时间
function getLastLiveForUPDATE(ip,typeString){
	var html = SeverLiveTimeMap.get(ip)[0];
	$('#'+GetSeverNameByIp(xml_all,typeString,ip)+'LastLive').html(html);
}
//STP获取上一次心跳停止时间
function getLastLiveForStp(ip,typeString){
	var html = SeverLiveTimeMap.get(ip)[0];
	$('#'+GetSeverNameByIp(xml_all,typeString,ip)+'LastLive').html(html);
}
//STPRC获取上一次心跳停止时间
function getLastLiveForStprc(ip,typeString){
	var html = SeverLiveTimeMap.get(ip)[0];
	$('#'+GetSeverNameByIp(xml_all,typeString,ip)+'LastLive').html(html);
}
//RELAY获取上一次心跳停止时间
function getLastLiveForRelay(ip,typeString){
	var html = SeverLiveTimeMap.get(ip)[0];
	$('#'+GetSeverNameByIp(xml_all,typeString,ip)+'LastLive').html(html);
}
//RELAYRC获取上一次心跳停止时间
function getLastLiveForRelayrc(ip,typeString){
	var html = SeverLiveTimeMap.get(ip)[0];
	$('#'+GetSeverNameByIp(xml_all,typeString,ip)+'LastLive').html(html);
}
