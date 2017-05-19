<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <title>RelayRc详细信息</title>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
	<link href="css/highcharts.css" rel="stylesheet">
	<link href="css/count.css" rel="stylesheet">
	<script src="js/jquery-1.11.2.min.js"></script>      <!-- jQuery -->
    <script src="js/jquery-migrate-1.2.1.min.js"></script> <!--  jQuery Migrate Plugin -->
    <script src="js/json2.js" type="text/javascript"></script>
	<script src="js/highstock/highstock.js" type="text/javascript"></script>
    <script src="js/highstock/exporting.js" type="text/javascript"></script>
     <script src="js/aboutXML/aboutXML.js" type="text/javascript"></script>
    <!-- <script src="js/highstock/linechart.js" type="text/javascript"></script> -->
    <script src="js/index.js" type="text/javascript"></script>
    <script src="js/viewModel.js" type="text/javascript"></script>
    <script src="js/DataAnalysis.js" type="text/javascript"></script>
    <script src="js/util.js" type="text/javascript"></script>
	<script src="js/RelayrcDetail.js" type="text/javascript"></script>
	<script type="text/javascript">
		$(document).ready(function(){
		var ipPort;
		var SeverType;
		ipPort = "${param.ipPort}";
		SeverType ="${param.SeverType}";
		
		chart_flag_relayrc = true;
		getRelayrcDetail(ipPort,SeverType,false);
		//setInterval("getRelayrcDetail('"+ipPort+"','"+SeverType+"')",5000);
		});
	</script>
  </head>
  
  <body onload="loopGetDetailData()">
    <div id="container" style="min-width:400px;max-width:1320px;height:400px"></div>
    <div id="dataSection">
    	<table id="dataTable" border="1" class="sortable">
    		<!-- <tr>
    			<th scope="col" style="width:200px">服务器当前时间</th>
    			<th scope="col" style="width:100px">RelayId</th>
    			<th scope="col" style="width:100px">是否过载</th>
    			<th scope="col" style="width:100px">当前连接数</th>
    			<th scope="col" style="width:100px">CPU占用率</th>
    			<th scope="col" style="width:100px">上行带宽</th>
    			<th scope="col" style="width:100px">下行带宽</th>
    			<th scope="col" style="width:100px">内存</th>
    			<th scope="col" style="width:100px">最大连接数</th>
    			<th scope="col" style="width:100px">最大上行带宽</th>
    			<th scope="col" style="width:100px">最大下行带宽</th>		
    		</tr> -->
    	</table>
<!--     	<table id="dataTable2" border="1" class="sortable">
    	</table> -->
    	<div id="Paging"></div>
    </div>
  </body>
</html>
