<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    
    <title>Relay详细信息</title>
	<link href="css/highcharts.css" rel="stylesheet">
	<link href="css/count.css" rel="stylesheet">
	<script src="js/jquery-1.11.2.min.js"></script>      <!-- jQuery -->
    <script src="js/jquery-migrate-1.2.1.min.js"></script> <!--  jQuery Migrate Plugin -->
    <script src="js/json2.js" type="text/javascript"></script>
	<script src="js/highstock/highstock.js" type="text/javascript"></script>
    <script src="js/highstock/exporting.js" type="text/javascript"></script>
     <script src="js/aboutXML/aboutXML.js" type="text/javascript"></script>
    <!-- <script src="js/highstock/linechart.js" type="text/javascript"></script> -->
    <script src="js/map.js" type="text/javascript"></script>
    <script src="js/index.js" type="text/javascript"></script>
    <script src="js/viewModel.js" type="text/javascript"></script>
    <script src="js/InfoDictionary.js" type="text/javascript"></script>
    <script src="js/util.js" type="text/javascript"></script>
	<script src="js/RelayDetail.js" type="text/javascript"></script>
	<script type="text/javascript">
		$(document).ready(function(){
			var ipPort;
			var SeverType;
			ipPort = "${param.ipPort}";
			SeverType ="${param.SeverType}";
			
			chart_flag_relay = true;
			getRelayDetailData(ipPort,SeverType);
			//setInterval("getRelayDetailData('"+ipPort+"','"+SeverType+"')",5000);
			});
	</script>
  </head>
  
  <body onload="loopGetDetailData()">
    <div id="container" style="min-width:400px;max-width:1320px;height:400px"></div>
    <div id="dataSection">
    	<table id="dataTable" border="1" class="sortable" >
    		<!-- <tr>
    			<th scope="col" style="width:200px">服务器当前时间</th>
    			<th scope="col" style="width:200px">会议号</th>
    			<th scope="col" style="width:200px">发言者列表</th>
    			<th scope="col" style="width:200px">参会者列表</th>
    		</tr> -->
    	</table>
  <!--   	<table id="dataTable2" border="1" class="sortable">
    	</table> -->
    	<div id="Paging"></div>
    </div>
  </body>
</html>
