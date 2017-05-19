<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">  
    <title>监控主页</title>
    <meta name="description" content="">
    <meta name="author" content="templatemo">
    
<!--     <link href='http://fonts.useso.com/css?family=Open+Sans:400,300,400italic,700' rel='stylesheet' type='text/css'>
 -->    <link href="css/font-awesome.min.css" rel="stylesheet">
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/templatemo-style.css" rel="stylesheet">
    <script src="js/map.js" type="text/javascript"></script>
    <script src="js/util.js" type="text/javascript"></script>
    <script src="js/aboutXML/aboutXML.js" type="text/javascript"></script>
    <script src="js/index.js" type="text/javascript"></script>
<!--     <script src="js/aboutPage.js" type="text/javascript"></script> -->
    <script src="js/RelayDetail.js" type="text/javascript"></script>
    <script src="js/StpDetail.js" type="text/javascript"></script>
    <script src="js/RelayrcDetail.js" type="text/javascript"></script>
    <script src="js/StpRcDetail.js" type="text/javascript"></script>
    <script src="js/viewModel.js" type="text/javascript"></script>
    <script src="js/DataAnalysis.js" type="text/javascript"></script>
    <script src="js/InfoDictionary.js" type="text/javascript"></script>
    <style type="text/css">
        .testDiv {
            overflow: hidden;
            text-overflow:ellipsis; /* 用省略号代替 */
            width:200px;
            white-space: nowrap;
        }
    </style>
    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

  </head>
  <body onload="loopGetData()" >  
    <!-- Left column -->
<!--     <div class="templatemo-flex-row"> -->
   <!--    <div class="templatemo-sidebar">
        <header class="templatemo-site-header">
          <div class="square"></div>
          <h1>会议系统监控平台</h1>
        </header>
        <div class="profile-photo-container">
          <img src="images/just_1.jpg" alt="Profile Photo" class="img-responsive">  
          <div class="profile-photo-overlay"></div>
        </div>      
        添加服务器界面，第一版暂时不用
        <form class="templatemo-search-form" role="search">
          <div class="input-group">
              <button type="submit" class="fa fa-search"></button>
            	 服务器类型:<select id="sever-type">
             	<option value="NPS">NPS</option>
             	<option value="UserCenter">用户中心</option>
             	<option value="STP">STP</option>
             	<option value="STPRC">STPRC</option>
             	<option value="RELAY">RELAY</option>
             	<option value="RELAYRC">RELAYRC</option>
             </select>
              <input type="text" class="form-control" placeholder="服务器名称" name="srch-term" id="sever-name">  
              <input type="text" class="form-control" placeholder="IP地址" name="srch-term" id="sever-ip">  
              <input type="text" class="form-control" placeholder="端口号" name="srch-term" id="sever-port">
              <center>
              	<input type="button" value="添加监控列表" onclick="addMonitorSever()"/>        
              </center>     
          </div>
        </form>
        <div class="mobile-menu-icon">
            <i class="fa fa-bars"></i>
        </div>
        <br><br>
        <nav class="templatemo-left-nav">          
          <ul>
            <li><a href="#" class="active"><i class="fa fa-home fa-fw"></i>监控主页</a></li>

          </ul>  
        </nav>
      </div> -->
      <!-- Main content --> 
      <div class="templatemo-content col-1 light-gray-bg" style="overflow:hidden">
       <div id="connectStatus"></div>
        <div class="templatemo-content-container">
          
    <!--       <div class="templatemo-flex-row flex-content-row"> -->
            
            <div class="col-1" style="height:auto;">
              <div class="panel panel-default templatemo-content-widget white-bg no-padding templatemo-overflow-hidden" style="margin-top:-30px;height:auto;">
               <!--  <i class="fa fa-times"></i> -->
         <!--        <div class="panel-heading templatemo-position-relative"><h2 class="text-uppercase">服务器列表</h2></div> -->
  <!--               <div class="table-responsive" > -->
                  <!-- <table id="severTable" class="table table-striped table-bordered"> -->
                  <!-- <table id="severTable" class="table table-striped table-bordered">  -->
                  <table id="severTable" class="table table-striped table-condensed">
                    <thead>
                      <tr>
                        <td>服务器类型</td>
                        <td>服务器名称</td>
                        <td style="width:200px">IP&Port</td>
                        <td>心跳告警</td>
                        <td>上一次心跳告警时间</td>
                        <td>数量告警</td>
                        <td>详情</td>
                      </tr>
                  </table>    
          <!--       </div>   -->                      
              </div>
                <div id="versionDiv" style="font-size:20px"></div>  
            </div>           
<!--           </div> Second row ends    -->
      </div>
    </div>

    <!-- JS -->
    <script src="js/jquery-1.11.2.min.js"></script>      <!-- jQuery -->
    <script src="js/jquery-migrate-1.2.1.min.js"></script> <!--  jQuery Migrate Plugin -->
    <script type="text/javascript" src="js/templatemo-script.js"></script>      <!-- Templatemo Script -->
    <div id="soundList"></div>
  </body>
</html>
