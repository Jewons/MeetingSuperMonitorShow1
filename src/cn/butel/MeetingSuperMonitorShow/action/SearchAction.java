package cn.butel.MeetingSuperMonitorShow.action;


import net.sf.json.JSONObject;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import cn.butel.MeetingSuperMonitorShow.common.CommStats;



public class SearchAction extends BaseAction{

	private static final long serialVersionUID = 2L;
	//private long time = 1477497600;
	
	//for check live status
	private String severIp;
	private String SeverType;
	private int logIndex = 0;
	/**
	 * 获取配置文件中定义的应该监控的STP和RELAY的数量以及版本号
	 */
	public String GetConfigStpAndRelayNum(){
		int stpNum = CommStats.STPNUM;
		int relayNum = CommStats.RELAYNUM;
		String version = CommStats.version;
		
		JSONObject returnJsonObject = new JSONObject();
		returnJsonObject.put("stpNum", stpNum);
		returnJsonObject.put("relayNum", relayNum);
		returnJsonObject.put("version", version);
		
		return renderJsonString(returnJsonObject.toString());
	}
	/**
	 * 获取NPS的运行状态
	 */
	public String GetNpsStatus(){
		logger.info("进入GetNpsStatus.action");
		
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
		form.add("ip", severIp+"");
		form.add("type", SeverType+"");
		
	/*	JSONObject testJson1 = new JSONObject();
		testJson1.put("result", -10);*/
		JSONObject jsonObject = null;
		//等待接收 json
		jsonObject = proxy.postFormWithReturnJSONObject("/MeetingMontior/getNpsServerStatus", form);
		logger.info("NPSjson："+jsonObject);
		//将json转化成字符串返回到前台
		if(jsonObject == null){
			logger.info("数据为空，前台置于等待状态");	
			jsonObject = new JSONObject();
			jsonObject.put("result", -5);
			logger.info("退出GetSeverStatus.action");
			return null;
		}
		System.out.println("NpsData:"+jsonObject.toString());
		if (isAjax(request)) {
			logger.info("得到数据，返回到前台");
			logger.info("NpsLive:"+jsonObject.toString());
			logger.info("退出GetNpsStatus.action");
			return renderJsonString(jsonObject.toString());
		}
		System.out.println("退出GetNpsStatus.action");
		return null;
	}
	
	/**
	 * 获取用户中心的运行状态
	 * @return
	 */
	public String GetUserCenterStatus(){
		logger.info("进入GetUserCenterStatus.action");
		
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
		form.add("ip", severIp+"");
		form.add("type", SeverType+"");
		
		JSONObject jsonObject = null;
		//等待接收 json
		jsonObject = proxy.postFormWithReturnJSONObject("/MeetingMontior/getECServerStatus", form);
		//logger.info("EECjson："+jsonObject);
		//将json转化成字符串返回到前台
		if(jsonObject == null){
			logger.info("数据为空，前台置于等待状态");	
			jsonObject = new JSONObject();
			jsonObject.put("result", -5);
			logger.info("退出GetSeverStatus.action");
			return null;
		}
		if (isAjax(request)) {
			logger.info("得到数据，返回到前台");
			logger.info("EUCLive:"+jsonObject.toString());
			logger.info("退出GetUserCenterStatus.action");
			return renderJsonString(jsonObject.toString());
		}
		System.out.println("退出GetUserCenterStatus.action");
		return null;
	}
	
	/**
	 * 获取接口服务器的运行状态
	 * @return
	 */
	public String GetInterfaceSeverStatus(){
		logger.info("进入GetInterfaceSeverStatus.action");

		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
		form.add("ip", severIp+"");
		form.add("type", SeverType+"");
		
	/*	JSONObject testJson1 = new JSONObject();
		testJson1.put("result", 0);*/
		JSONObject jsonObject = null;
		//等待接收 json
		jsonObject = proxy.postFormWithReturnJSONObject("/MeetingMontior/getBSServerStatus", form);
		if(jsonObject == null){
			logger.info("数据为空，前台置于等待状态");	
			jsonObject = new JSONObject();
			jsonObject.put("result", -5);
			logger.info("退出GetSeverStatus.action");
			return null;
		}
		if (isAjax(request)) {
			logger.info("得到数据，返回到前台");
			logger.info("BSLive："+jsonObject.toString());
			logger.info("退出GetInterfaceSeverStatus.action");
			return renderJsonString(jsonObject.toString());
		}
		System.out.println("退出GetInterfaceSeverStatus.action");
		return null;
	}
	/**
	 * 获取升级服务器的运行状态
	 * @return
	 */
	public String GetUpdateSeverStatus(){
		logger.info("进入GetUpdateSeverStatus.action");
		
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
		form.add("ip", severIp+"");
		form.add("type", SeverType+"");
		
		JSONObject jsonObject = null;
		//等待接收 json
		jsonObject = proxy.postFormWithReturnJSONObject("/MeetingMontior/getUpdateServerStatus", form);
		logger.info("UPDATEjson："+jsonObject);
		if(jsonObject == null){
			logger.info("数据为空，前台置于等待状态");	
			jsonObject = new JSONObject();
			jsonObject.put("result", -5);
			logger.info("退出GetSeverStatus.action");
			return null;
		}
		if (isAjax(request)) {
			logger.info("得到数据，返回到前台");
			logger.info("UpdateSeverLive:"+jsonObject.toString());
			logger.info("退出GetUpdateSeverStatus.action");
			return renderJsonString(jsonObject.toString());
		}
		logger.info("退出GetUpdateSeverStatus.action");
		return null;
	}
	/**
	 * 获得后台正在监控的服务器的信息(STP,STPRC,RELAY,RELAYRC)的IP和PORT
	 * @return
	 */
	public String GetAllMonitorSeverInfo(){
		logIndex++;
		logger.info("进入GetAllMonitorSeverInfo.action index:"+logIndex);
		int index = 1;
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
		form.add("index", index+"");
		
		JSONObject jsonObject = null;
		jsonObject = proxy.postFormWithReturnJSONObject("/MeetingMontior/getAllMonitorServerInfo", form);
		logger.info("获取所有监控服务器信息数据："+jsonObject);
		
		if(jsonObject == null){
			logger.info("获取不到监控服务器数据");
			logger.info("退出GetAllMonitorSeverInfo.action index:"+logIndex);
			return null;
		}
		
		if (isAjax(request)) {
			logger.info("得到数据，返回到前台 index:"+logIndex);
			logger.info("index:"+logIndex+"AllMonitorSeverInfo:"+jsonObject.toString());
			logger.info("退出GetAllMonitorSeverInfo.action"+"ip"+severIp);
			return renderJsonString(jsonObject.toString());
		}
		
		logger.info("退出GetAllMonitorSeverInfo.action");
		return null;
	}
	
	/**
	 * 获得后台正在监控的服务器的信息(STP,STPRC,RELAY,RELAYRC)的心跳
	 * @return
	 */
	public String GetServerLiveStatus(){
		logger.info("进入GetServerLiveStatus.action"+"ip"+severIp);
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
		form.add("ip", severIp+"");
		form.add("type", SeverType+"");
		
		JSONObject jsonObject = null;
		jsonObject = proxy.postFormWithReturnJSONObject("/MeetingMontior/getServerLiveStatus", form);
		
		if(jsonObject == null){
			logger.info("GetServerLiveStatus：返回的心跳数据为空 index:"+logIndex);
			jsonObject = new JSONObject();
			jsonObject.put("result", -5);
			logger.info("退出GetServerLiveStatus.action index:"+logIndex);
			return null;
		}
		if (isAjax(request)) {
			logger.info("得到数据，返回到前台"+"ip"+severIp);
			logger.info("index:"+logIndex+"MonitorSever心跳数据:"+severIp+",SeverType:"+SeverType+":"+jsonObject.toString());
			logger.info("退出GetServerLiveStatus.action"+"ip"+severIp);
			return renderJsonString(jsonObject.toString());
		}
		System.out.println("退出GetServerLiveStatus.action");
		return null;
	}
	/**
	 * 在二级界面中，获取Relay服务器的详细信息
	 * @return
	 */
	public String GetRelayDetailData(){
		logIndex++;
		logger.info("进入GetRelayDetailData.action"+"ip"+severIp);
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
		form.add("ip", severIp);
		form.add("type", SeverType);
		
/*		JSONObject testJson1 = new JSONObject();
		time = time+5;
		testJson1.put("time",time);
		testJson1.put("result", "0");
		testJson1.put("rid","123456789");
		JSONObject testJson2 = new JSONObject();
		JSONObject testJson3 = new JSONObject();
		testJson2.put("met","10023119");
		testJson2.put("mic","60000001");
		String[] userlist = {"60000001","60000002","60000003"};
		testJson2.put("ul", userlist);
		///////////////////////////////////
		testJson3.put("met","10023119");
		testJson3.put("mic","60000002");
		String[] userlist1 = {"60000001","60000002","60000003"};
		testJson3.put("ul", userlist1);
		JSONArray testJsonArray = new JSONArray();
		testJsonArray.add(testJson2);
		testJsonArray.add(testJson3);
		testJson1.put("rinfo",testJsonArray);
		logger.info("RelayJSON数据"+testJson1);*/
		
		JSONObject jsonObject = null;
		jsonObject = proxy.postFormWithReturnJSONObject("/MeetingMontior/getServerService", form);
		
		if(jsonObject == null){
			logger.info("GetRelayDetailData数据为空 index:"+logIndex);
			logger.info("退出GetRelayDetailData.action index:"+logIndex);
			return null;
		}		
		if (isAjax(request)) {
			logger.info("得到数据，返回到前台"+"ip"+severIp);
			logger.info("index:"+logIndex+severIp+"RelayJSON数据:"+jsonObject);
			String testString = renderJsonString(jsonObject.toString());
			logger.info("退出GetRelayDetailData.action"+"ip"+severIp);
			return testString;
		}
		logger.info("退出GetRelayDetailData.action");
		return null;
	}
	
	/**
	 * 在二级界面中，获取Stprc服务器的详细信息
	 * @return
	 */
	public String GetStpRcDetailData(){
		logIndex++;
		logger.info("进入GetStpRcDetailData.action"+"ip"+severIp);
/*		String ipPortString = "10.130.68.152:20012";
		int type = 2;*/
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
		form.add("ip", severIp);
		form.add("type", SeverType);
		JSONObject jsonObject = null;
		jsonObject = proxy.postFormWithReturnJSONObject("/MeetingMontior/getServerService", form);
		
		if(jsonObject == null){
			logger.info("GetStpRcDetailData数据为空，返回到前台 index:"+logIndex);
			logger.info("退出GetStpRcDetailData.action index:"+logIndex);
			return null;
		}
		if (isAjax(request)) {
			logger.info("得到数据，返回到前台"+"ip"+severIp);
			String testString = renderJsonString(jsonObject.toString());
			logger.info( "index:"+logIndex+severIp+"stprcJSON数据:"+jsonObject);
			logger.info("退出GetStpRcDetailData.action"+"ip"+severIp);
			return testString;
		}
		logger.info("退出GetStpRcDetailData.action");
		return null;
	}
	
	/**
	 * 在二级页面获取STP服务器详细信息
	 */
	public String GetStpDetailData(){
		logIndex++;
		logger.info("进入GetStpDetailData.action"+"ip"+severIp);
/*		String ipPortString = "10.130.68.152:20018";
		int type = 1;*/
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
		form.add("ip", severIp);
		form.add("type", SeverType);

		JSONObject jsonObject = null;
		jsonObject = proxy.postFormWithReturnJSONObject("/MeetingMontior/getServerService", form);
		if(jsonObject == null){
			logger.info("GetStpDetailData.action数据为空"+"ip"+severIp);
			logger.info("退出GetStpDetailData.action"+"ip"+severIp);
			return null;
		}
		if (isAjax(request)) {
			logger.info("得到数据，返回到前台"+"ip"+severIp);
			logger.info("index:"+logIndex + severIp+"StpJSON数据："+jsonObject);
			String testString = renderJsonString(jsonObject.toString());
			logger.info("退出GetStpDetailData.action"+"ip"+severIp);
			return testString;
		}
		logger.info("退出GetStpDetailData.action");
		return null;
	}
	
	/**
	 * 在二级页面获取RELAYRC服务器详细信息
	 */
	public String GetRelayrcDetailData(){
		logIndex++;
		logger.info("进入GetRelayrcDetailData.action"+"ip"+severIp);
		MultiValueMap<String, Object> form= new LinkedMultiValueMap<String, Object>();
		form.add("ip", severIp);
		form.add("type", SeverType);

		JSONObject jsonObject = null;
		jsonObject = proxy.postFormWithReturnJSONObject("/MeetingMontior/getServerService", form);
		
		if(jsonObject == null){
			logger.info("退出GetRelayrcDetailData.action index:"+logIndex);
			return null;
		}
		if (isAjax(request)) {
			logger.info("得到数据，返回到前台"+"ip"+severIp);
			String testString = renderJsonString(jsonObject.toString());
			logger.info("index:"+logIndex+severIp+"RelayrcJSON数据："+jsonObject);
			logger.info("退出GetRelayrcDetailData.action"+"ip"+severIp);
			return testString;
		}
		logger.info("退出GetRelayrcDetailData.action");
		return null;
	}
	public String getSeverType() {
		return SeverType;
	}

	public void setSeverType(String severType) {
		SeverType = severType;
	}
	public String getSeverIp() {
		return severIp;
	}
	public void setSeverIp(String severIp) {
		this.severIp = severIp;
	}
}
