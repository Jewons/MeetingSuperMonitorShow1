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
	    <title>会议服务监控平台 - Login</title>
        <meta name="description" content="">
        <meta name="author" content="templatemo">
        
	   <!--  <link href='http://fonts.useso.com/css?family=Open+Sans:400,300,400italic,700' rel='stylesheet' type='text/css'> -->
	    <link href="css/font-awesome.min.css" rel="stylesheet">
	    <link href="css/bootstrap.min.css" rel="stylesheet">
	    <link href="css/templatemo-style.css" rel="stylesheet">
	    <script src="js/jquery-1.11.2.min.js"></script>      <!-- jQuery -->
    	<script src="js/jquery-migrate-1.2.1.min.js"></script> <!--  jQuery Migrate Plugin -->
<!-- 	    <script src="js/jquery-1.6.1.min.js" type="text/javascript"></script> -->
		<script src="js/util.js?<%=new Date().getTime()%>" type="text/javascript"></script>
		<script src="js/login.js?<%=new Date().getTime()%>" type="text/javascript"></script>
	    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
	    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
	    <!--[if lt IE 9]>
	      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
	      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
	    <![endif]-->
	</head>
	<body class="light-gray-bg">
		<div class="templatemo-content-widget templatemo-login-widget white-bg" style="margin-top:110px;">
			<header class="text-center">
	          <div class="square"></div>
	          <h1>会议服务监控平台</h1>
	        </header>
	        <form action="index.jsp" class="templatemo-login-form">
	        	<div class="form-group">
	        		<div class="input-group">
		        		<div class="input-group-addon"><i class="fa fa-user fa-fw"></i></div>	        		
		              	<input id="username" type="text" class="form-control" placeholder="用户名" value="admin">           
		          	</div>	
	        	</div>
	        	<div class="form-group">
	        		<div class="input-group">
		        		<div class="input-group-addon"><i class="fa fa-key fa-fw"></i></div>	        		
		              	<input id="userpwd" type="password" class="form-control" placeholder="密码" value="654321">           
		          	</div>	
	        	</div>	          	
<!-- 	          	<div class="form-group">
				    <div class="checkbox squaredTwo">
				        <input type="checkbox" id="c1" name="cc" />
						<label for="c1"><span></span>Remember me</label>
				    </div>				    
				</div> -->
				<div class="form-group">
					<!-- <button type="submit" id="btlogin" class="templatemo-blue-button width-100">Login</button> -->
					<input type="button" id="btlogin" class="templatemo-blue-button width-100" value="Login"/>
				</div>
	        </form>
		</div>
	</body>
</html>
