/**
 * 该JS文件用于解析各种服务器的存活状态
 */
/*var NpsResultArray = new Array([0],[0],[0],[0],[0]); //NPS 状态队列
var ECResultArray = new Array([0],[0],[0],[0],[0]);	//用户中心 状态队列
var BSResultArray = new Array([0],[0],[0],[0],[0]);	//接口服务器 状态队列
var UpdateResultArray = new Array([1],[1],[1],[1],[1]); //升级服务器 状态队列
var StpResultArray = new Array([0],[0],[0],[0],[0]); //STP 状态队列
var StprcResultArray = new Array([0],[0],[0],[0],[0]); //STPRC 状态队列
var Relay11ResultArray = new Array([0],[0],[0],[0],[0]); //RELAY1 状态队列
var Relay12ResultArray = new Array([0],[0],[0],[0],[0]); //RELAY2 状态队列
var RelayrcResultArray = new Array([0],[0],[0],[0],[0]); //RELAYRC 状态队列
*/
var StpNum = null;
var RelayNum = null;
var version = null;
function AnalyConfigStpAndRelayNum(data){
	StpNum = data.stpNum;
	RelayNum = data.relayNum;
	version = data.version;
	
	$('#versionDiv').html("<center>Version:"+version+"</center>");
}
function AnalysisNpsData(ip,SoundInstance,data){
	if(data==null  ||data==undefined){
		console.info("data为空");
		return;
	}
	console.info("NpsDATA:"+data.ret_info);
	var result = data.result;
	var time = data.time;
	if(result==0){
		var ret_info = JSON.parse(data.ret_info);
		var status = ret_info.status;
		SeverLiveStatusMap.get(ip).pop();
		SeverLiveStatusMap.get(ip).unshift(status);
		getLiveStatusForList(SeverLiveStatusMap.get(ip),ip,"NPS",time);
	}
	else{
		console.info("webSever与服务器通讯失败");
		SeverLiveStatusMap.get(ip).pop();
		SeverLiveStatusMap.get(ip).unshift(result);
		getLiveStatusForList(SeverLiveStatusMap.get(ip),ip,"NPS",time);
	}
}
function AnalysisInterFaceSeverData(ip,SoundInstance,data){
	if(data==null  ||data==undefined){
		console.info("data为空");
		//ViewInstance.src = "images/red.jpg";
		//return;
		return;
	}
	console.info("BSDATA:"+data);
	var result = data.result;
	var time = data.time;
	if(result==0){
		console.info("与webSever通讯成功");
		var ret_info = JSON.parse(data.ret_info);
		var status = ret_info.result.rc;
		SeverLiveStatusMap.get(ip).pop();
		SeverLiveStatusMap.get(ip).unshift(status);
		getLiveStatusForList(SeverLiveStatusMap.get(ip),ip,"BS",time);
	}
	else{
		//红灯
		console.info("webSever与服务器通讯失败");
		SeverLiveStatusMap.get(ip).pop();
		SeverLiveStatusMap.get(ip).unshift(result);
		getLiveStatusForList(SeverLiveStatusMap.get(ip),ip,"BS",time);
	}
}
function AnalysisUserCenterData(ip,SoundInstance,data){
	if(data==null  ||data==undefined){
		console.info("data为空");
		return;
	}
	var result = data.result;
	var time = data.time;
	if(result==0){
		var ret_info = JSON.parse(data.ret_info);
		var status = ret_info.status;
		console.info("与webSever通讯成功");
		SeverLiveStatusMap.get(ip).pop();
		SeverLiveStatusMap.get(ip).unshift(status);
		getLiveStatusForList(SeverLiveStatusMap.get(ip),ip,"EC",time);
	}
	else{
		console.info("webSever与服务器通讯失败");
		SeverLiveStatusMap.get(ip).pop();
		SeverLiveStatusMap.get(ip).unshift(result);
		getLiveStatusForList(SeverLiveStatusMap.get(ip),ip,"EC",time);
	}
}
function AnalysisUpdateServer(ip,SoundInstance,data){
	if(data==null  ||data==undefined){
		console.info("data为空");
		return;
		//return;
	}
	console.info("UPDATA:"+data);
	var result = data.result;
	var time = data.time;
	if(result==0){
		console.info("与webSever通讯成功");
		var ret_info = JSON.parse(data.ret_info);
		var status = ret_info.result.rc;
		SeverLiveStatusMap.get(ip).pop();
		SeverLiveStatusMap.get(ip).unshift(status);
		getLiveStatusForUpdate(SeverLiveStatusMap.get(ip),ip,"UPDATE",time);
	}
	else{
		//红灯
		console.info("webSever与服务器通讯失败");
		SeverLiveStatusMap.get(ip).pop();
		SeverLiveStatusMap.get(ip).unshift(result);
		getLiveStatusForUpdate(SeverLiveStatusMap.get(ip),ip,"UPDATE",time);
	}
}
function AnalysisSeverData(data,ip,type){
	var SeverTypeString = null;
	if(data==null  ||data==undefined){
		console.info("data为空");
		return;
	}
	switch(type){
		case 1:{
			SeverTypeString = "Stp";
			var result = data.result;
			var time = data.time;
			//console.info("STP时间:"+time);
			SeverLiveStatusMap.get(ip).pop();
			SeverLiveStatusMap.get(ip).unshift(result);
			getLiveStatusForSevers(SeverLiveStatusMap.get(ip),ip,SeverTypeString,time);
			break;
		}
		case 2:{
			SeverTypeString = "Stprc";
			var result = data.result;
			var time = data.time;
			SeverLiveStatusMap.get(ip).pop();
			SeverLiveStatusMap.get(ip).unshift(result);
			getLiveStatusForSevers(SeverLiveStatusMap.get(ip),ip,SeverTypeString,time);
			/*if(getStpSeverNum(data_all_stprc) == StpNum){
				document.getElementById(ip+SeverTypeString+"NumState").src = "images/green.jpg";
			}else{
				document.getElementById(ip+SeverTypeString+"NumState").src = "images/red.jpg";
			}*/
			break;
		}
		case 3:{
			SeverTypeString = "Relay";
			var result = data.result;
			var time = data.time;
			SeverLiveStatusMap.get(ip).pop();
			SeverLiveStatusMap.get(ip).unshift(result);
			getLiveStatusForSevers(SeverLiveStatusMap.get(ip),ip,SeverTypeString,time);
			break;
		}
		case 4:{
			SeverTypeString = "Relayrc";
			var result = data.result;
			var time = data.time;
			SeverLiveStatusMap.get(ip).pop();
			SeverLiveStatusMap.get(ip).unshift(result);
			getLiveStatusForSevers(SeverLiveStatusMap.get(ip),ip,SeverTypeString,time);
			/*if(getRelayTotalNum(data_all_relayrc) == RelayNum){
				document.getElementById(ip+SeverTypeString+"NumState").src = "images/green.jpg";
			}else{
				document.getElementById(ip+SeverTypeString+"NumState").src = "images/red.jpg";
			}*/
			break;
		}
	}
}
//用于STP STPRC RELAY RELAYRC 的状态队列分析
function getLiveStatusForSevers(LiveList,ip,SeverTypeString,currenttime){
	var SeverName = GetSeverNameByIp(xml_all,SeverTypeString,ip);
	var NowSeverStatus = LiveList[0];
	switch(SeverTypeString){
	case "Stp":{
			/*$.each(LiveList,function(i,val){
				if(val==0){
					//绿灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/green.jpg";
					//document.getElementById("sound").src = "";
					//document.getElementById("sound").src = "sound/"+getSeverInfoForSound(ip)+"error.wav";
				}
				else{
					//红灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/red.jpg";
					//document.getElementById("sound").src = "sound/nps_error.wav";
					document.getElementById(SeverName+"sound").src = "sound/"+SeverName+"error.wav";
					//如果有心跳告警，则将服务器时间放入队列中，并去重
					console.info("STP现在时间:"+currenttime);
					if(data_all_stp.ret_info == null || data_all_stp.ret_info == undefined){
						if(SeverLiveTimeMap.get(ip).indexOf(currenttime+"("+val+")") == -1){
							SeverLiveTimeMap.get(ip).unshift(currenttime+"("+val+")");
						}
					}else{
						if(SeverLiveTimeMap.get(ip).indexOf(FormatStpTime(data_all_stp)+"("+val+")") == -1){
							SeverLiveTimeMap.get(ip).unshift(FormatStpTime(data_all_stp)+"("+val+")");
						}
					}
				}
			});*/
			$.each(LiveList,function(i,val){
				if(val==0){
					//绿灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/green.jpg";
				}
				else{
					//红灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/red.jpg";
				}
			});
			if(NowSeverStatus != 0){
				document.getElementById(SeverName+"sound").src = "sound/"+SeverName+"error.wav";
				//如果有心跳告警，则将服务器时间放入队列中，并去重
				if(SeverLiveTimeMap.get(ip).indexOf(currenttime+"("+NowSeverStatus+")") == -1){
					SeverLiveTimeMap.get(ip).unshift(currenttime+"("+NowSeverStatus+")");
				}
			}
			break;
	}
	case "Stprc":{
			/*$.each(LiveList,function(i,val){
				if(val==0){
					//绿灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/green.jpg";
					//document.getElementById("sound").src = "";
					//document.getElementById("sound").src = "sound/"+getSeverInfoForSound(ip)+"error.wav";
				}
				else{
					//红灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/red.jpg";
					//document.getElementById("sound").src = "sound/nps_error.wav";
					document.getElementById(SeverName+"sound").src = "sound/"+SeverName+"error.wav";
					//如果有心跳告警，则将服务器时间放入队列中，并去重
					if(data_all_stprc.ret_info == null || data_all_stprc.ret_info == undefined){
						if(SeverLiveTimeMap.get(ip).indexOf(currenttime+"("+val+")") == -1){
							SeverLiveTimeMap.get(ip).unshift(currenttime+"("+val+")");
						}
					}else{
						if(SeverLiveTimeMap.get(ip).indexOf(FormatStpTime(data_all_stprc)+"("+val+")") == -1){
							SeverLiveTimeMap.get(ip).unshift(FormatStpTime(data_all_stprc)+"("+val+")");
						}
					}
				}
			});*/
			$.each(LiveList,function(i,val){
				if(val==0){
					//绿灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/green.jpg";
				}
				else{
					//红灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/red.jpg";
				}
			});
			if(NowSeverStatus != 0){
				document.getElementById(SeverName+"sound").src = "sound/"+SeverName+"error.wav";
				//如果有心跳告警，则将服务器时间放入队列中，并去重
				if(SeverLiveTimeMap.get(ip).indexOf(currenttime+"("+NowSeverStatus+")") == -1){
					SeverLiveTimeMap.get(ip).unshift(currenttime+"("+NowSeverStatus+")");
				}
			}
			break;
	}
	case "Relay":{
			/*$.each(LiveList,function(i,val){
				if(val==0){
					//绿灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/green.jpg";
					//document.getElementById("sound").src = "";
				}
				else{
					//红灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/red.jpg";
					//document.getElementById("sound").src = "sound/nps_error.wav";
					//document.getElementById("sound").src = "sound/"+getSeverInfoForSound(ip)+"error.wav";
					document.getElementById(SeverName+"sound").src = "sound/"+SeverName+"error.wav";
					//如果有心跳告警，则将服务器时间放入队列中，并去重
					if(SeverLiveTimeMap.get(ip).indexOf(FormatRelayTime(data_all_relay)+"("+val+")") == -1){
						SeverLiveTimeMap.get(ip).unshift(FormatRelayTime(data_all_relay)+"("+val+")");
					}
					if(data_all_relay.ret_info == null || data_all_relay.ret_info == undefined){
						if(SeverLiveTimeMap.get(ip).indexOf(currenttime+"("+val+")") == -1){
							SeverLiveTimeMap.get(ip).unshift(currenttime+"("+val+")");
						}
					}else{
						if(SeverLiveTimeMap.get(ip).indexOf(FormatStpTime(data_all_relay)+"("+val+")") == -1){
							SeverLiveTimeMap.get(ip).unshift(FormatStpTime(data_all_relay)+"("+val+")");
						}
					}
				}
			});*/
			$.each(LiveList,function(i,val){
				if(val==0){
					//绿灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/green.jpg";
				}
				else{
					//红灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/red.jpg";
				}
			});
			if(NowSeverStatus!= 0){
				document.getElementById(SeverName+"sound").src = "sound/"+SeverName+"error.wav";
				//如果有心跳告警，则将服务器时间放入队列中，并去重
/*				if(data_all_relay == null || data_all_relay == undefined || data_all_relay.ret_info == null || data_all_relay.ret_info == undefined){
					if(SeverLiveTimeMap.get(ip).indexOf(currenttime+"("+NowSeverStatus+")") == -1){
						SeverLiveTimeMap.get(ip).unshift(currenttime+"("+NowSeverStatus+")");
					}
				}else{
					if(SeverLiveTimeMap.get(ip).indexOf(FormatRelayTime(data_all_relay)+"("+NowSeverStatus+")") == -1){
						SeverLiveTimeMap.get(ip).unshift(FormatRelayTime(data_all_relay)+"("+NowSeverStatus+")");
					}
				}*/
				if(SeverLiveTimeMap.get(ip).indexOf(currenttime+"("+NowSeverStatus+")") == -1){
					SeverLiveTimeMap.get(ip).unshift(currenttime+"("+NowSeverStatus+")");
				}
			}
			break;
	}
	case "Relayrc":{
			/*$.each(LiveList,function(i,val){
				if(val==0){
					//绿灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/green.jpg";
					//document.getElementById("sound").src = "";
				}
				else{
					//红灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/red.jpg";
					//document.getElementById("sound").src = "sound/nps_error.wav";
					//document.getElementById("sound").src = "sound/"+getSeverInfoForSound(ip)+"error.wav";
					document.getElementById(SeverName+"sound").src = "sound/"+SeverName+"error.wav";
					//如果有心跳告警，则将服务器时间放入队列中，并去重
					if(SeverLiveTimeMap.get(ip).indexOf(FormatRelayrcTime(data_all_relayrc)+"("+val+")") == -1){
						SeverLiveTimeMap.get(ip).unshift(FormatRelayrcTime(data_all_relayrc)+"("+val+")");
					}
					if(data_all_relayrc.ret_info == null || data_all_relayrc.ret_info == undefined){
						if(SeverLiveTimeMap.get(ip).indexOf(currenttime+"("+val+")") == -1){
							SeverLiveTimeMap.get(ip).unshift(currenttime+"("+val+")");
						}
					}else{
						if(SeverLiveTimeMap.get(ip).indexOf(FormatStpTime(data_all_relayrc)+"("+val+")") == -1){
							SeverLiveTimeMap.get(ip).unshift(FormatStpTime(data_all_relayrc)+"("+val+")");
						}
					}
				}
			});*/
			$.each(LiveList,function(i,val){
				if(val==0){
					//绿灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/green.jpg";
				}
				else{
					//红灯
					document.getElementById(ip+SeverTypeString+"State"+i).src = "images/red.jpg";
				}
			});
			if(NowSeverStatus != 0){
				document.getElementById(SeverName+"sound").src = "sound/"+SeverName+"error.wav";
				//如果有心跳告警，则将服务器时间放入队列中，并去重
				/*if(data_all_relayrc == null || data_all_relayrc == undefined || data_all_relayrc.ret_info == null || data_all_relayrc.ret_info == undefined){
					if(SeverLiveTimeMap.get(ip).indexOf(currenttime+"("+NowSeverStatus+")") == -1){
						SeverLiveTimeMap.get(ip).unshift(currenttime+"("+NowSeverStatus+")");
					}
				}else{
					if(SeverLiveTimeMap.get(ip).indexOf(FormatRelayrcTime(data_all_relayrc)+"("+NowSeverStatus+")") == -1){
						SeverLiveTimeMap.get(ip).unshift(FormatRelayrcTime(data_all_relayrc)+"("+NowSeverStatus+")");
					}
				}*/
				if(SeverLiveTimeMap.get(ip).indexOf(currenttime+"("+NowSeverStatus+")") == -1){
					SeverLiveTimeMap.get(ip).unshift(currenttime+"("+NowSeverStatus+")");
				}
			}
			break;
		}
	}
}
//用于http服务器 的状态队列分析
function getLiveStatusForList(LiveList,ip,SeverTypeString,currenttime){
	console.info("心跳列表："+LiveList);
	$.each(LiveList,function(i,val){
		if(val == 0){
			//绿灯
			document.getElementById(ip+SeverTypeString+"State"+i).src = "images/green.jpg";
			//document.getElementById("sound").src = "";
		}
		else{
			//红灯
			document.getElementById(ip+SeverTypeString+"State"+i).src = "images/red.jpg";
		}
	});
	if(LiveList[0] != 0){
		//var time = getNowFormatDate();
		//SeverLiveTimeMap.get(ip).unshift(time);
		document.getElementById(GetSeverNameByIp(xml_all,SeverTypeString,ip)+"sound").src = "sound/"+GetSeverNameByIp(xml_all,SeverTypeString,ip)+"error.wav";
		//var time = getNowFormatDate();
		if(SeverLiveTimeMap.get(ip).indexOf(currenttime+"("+LiveList[0]+")") == -1){
			SeverLiveTimeMap.get(ip).unshift(currenttime+"("+LiveList[0]+")");
		}
	}
}
//由于升级服务器返回数据判断的标准不同，单独写个方法来判断
function getLiveStatusForUpdate(LiveList,ip,SeverTypeString,currenttime){
	console.info("心跳列表UPDATE："+LiveList);
	$.each(LiveList,function(i,val){
		if(val == 1){
			//绿灯
			document.getElementById(ip+SeverTypeString+"State"+i).src = "images/green.jpg";
			//document.getElementById("sound").src = "";
		}
		else{
			//红灯
			document.getElementById(ip+SeverTypeString+"State"+i).src = "images/red.jpg";
			
		}
	});
	if(LiveList[0] != 1){
		document.getElementById(GetSeverNameByIp(xml_all,SeverTypeString,ip)+"sound").src = "sound/"+GetSeverNameByIp(xml_all,SeverTypeString,ip)+"error.wav";
		//var time = getNowFormatDate();
		if(SeverLiveTimeMap.get(ip).indexOf(currenttime+"("+LiveList[0]+")") == -1){
			SeverLiveTimeMap.get(ip).unshift(currenttime+"("+LiveList[0]+")");
		}
	}
}
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
            + " " + date.getHours() + seperator2 + date.getMinutes()
            + seperator2 + date.getSeconds();
    return currentdate;
} 