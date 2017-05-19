
function getRelayInfo(relayIp){
	var relayMap = new Map();
	relayMap.put("210.51.168.106:10026","北京联通");
	relayMap.put("114.112.74.10:10023","北京电信");
	relayMap.put("112.65.213.211:10026","上海联通");
	relayMap.put("180.153.194.179:10023","上海电信");
	relayMap.put("122.13.78.227:10026","广东联通");
	relayMap.put("125.88.254.160:10023","广东电信");
	relayMap.put("125.211.202.29:10026","哈尔滨联通");
	relayMap.put("222.171.242.143:10023","哈尔滨电信");
	relayMap.put("123.138.91.25:10026","西安联通");
	relayMap.put("124.116.176.118:10023","西安电信");
	relayMap.put("220.249.119.218:10026","武汉联通");
	relayMap.put("61.183.245.141:10023","武汉电信");
    relayMap.put("222.178.179.74:10023", "重庆电信");
    relayMap.put("10.130.68.152:33537", "152Relay11");
    relayMap.put("10.130.68.152:33538", "152Relay12");
    relayMap.put("10.130.66.21:33537", "localRelay11");
    relayMap.put("10.130.66.21:33538", "localRelay12");
    
	var message = relayMap.get(relayIp);
	if(message!=null&&message !=undefined){
		return message;
	}else{
		return relayIp;
	}
}
function getNpsInfo(npsUrl){
	var npsMap = new Map();
	npsMap.put("http://222.73.29.12:8018/nps_x1/parameter/getServiceParameters","测试网NPS");
	var message = npsMap.get(npsUrl);
	if(message!=null&&message !=undefined){
		return message;
	}else{
		return analysisUrlString(npsUrl);
	}
}
function getSeverInfoForSound(Url){
	var severMap = new Map();
	severMap.put("http://222.73.29.12:8018/nps_x1/parameter/getServiceParameters","testNPS");
	severMap.put("http://103.25.23.103:20001/MeetingManage/callService","BS");
	severMap.put("http://103.25.23.99/EnterpriseUserCenter/eucService","EC");
	severMap.put("10.130.68.152:20012","152STPRC");
	severMap.put("10.130.68.152:20018","152STP");
	severMap.put("10.130.68.152:10032","152RELAYRC");
	severMap.put("10.130.68.152:33537","152Relay11");
	severMap.put("10.130.68.152:33538","152Relay12");
	severMap.put("10.130.66.21:33537", "localRelay11");
	severMap.put("10.130.66.21:33538", "localRelay12");
	var message = severMap.get(Url);
	if(message!=null&&message !=undefined){
		return message;
	}else{
		return Url;
	}
}
function getStpInfo(StpIP){
	var stpMap = new Map();
	stpMap.put("10.130.68.152:20018","152STP");
	var message = stpMap.get(StpIP);
	if(message!=null&&message !=undefined){
		return message;
	}else{
		return StpIP;
	}
}
function getStprcInfo(StprcIP){
	var stprcMap = new Map();
	stprcMap.put("10.130.68.152:20012","152STPRC");
	var message = stprcMap.get(StprcIP);
	if(message!=null&&message !=undefined){
		return message;
	}else{
		return StprcIP;
	}
}
function getRelayrcInfo(RelayrcIP){
	var relayrcMap = new Map();
	relayrcMap.put("10.130.68.152:10032","152RELAYRC");
	var message = relayrcMap.get(RelayrcIP);
	if(message!=null&&message !=undefined){
		return message;
	}else{
		return RelayrcIP;
	}
}
function getRelayIP(relayName){
	var relayMap = new Map();
	relayMap.put("北京联通","210.51.168.106:10026");
	relayMap.put("北京电信","114.112.74.10:10023");
	relayMap.put("上海联通","112.65.213.211:10026");
	relayMap.put("上海电信","180.153.194.179:10023");
	relayMap.put("广东联通","122.13.78.227:10026");
	relayMap.put("广东电信","125.88.254.160:10023");
	relayMap.put("哈尔滨联通","125.211.202.29:10026");
	relayMap.put("哈尔滨电信","222.171.242.143:10023");
	relayMap.put("西安联通","123.138.91.25:10026");
	relayMap.put("西安电信","124.116.176.118:10023");
	relayMap.put("武汉联通","220.249.119.218:10026");
	relayMap.put("武汉电信","61.183.245.141:10023");
    relayMap.put("重庆电信", "222.178.179.74:10023");
	var message = relayMap.get(relayName);
	if(message!=null&&message !=undefined){
		return message;
	}else{
		return relayName;
	}
}
function analysisUrlString(Url){
	var StringArray = Url.split('/');
	return StringArray[2];
}