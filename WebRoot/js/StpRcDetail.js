var data_all_stprc;
var StpInfoList = null;
var chart_flag_stprc = true;
var overLoad_flag_stprc = true;
function getStpRcDetail(ip,severType,isFirstPage){
	//var severType = 1;
	var html;
	var StprcDetail = $.ajax({
		type : "post",
		url : "search.GetStpRcDetailData.action",
		timeout : request_time_out,
		dataType : "json",
		data : "severIp=" + ip + "&SeverType=" + severType,
		beforeSend : function() {
			
		},
		complete : function() {
			if(status=='timeout'){//超时,status还有success,error等值的情况
			 　　　　StprcDetail.abort();
			}
			setTimeout("getStpRcDetail('"+ip+"','"+severType+"',"+isFirstPage+")",Interval_time);
		},
		success : function(data) {
			if(data!=null){
				data_all_stprc = data;
				if(data.result == 0){
					//showDetailStprcData(data,html);
					if(chart_flag_stprc){
						CreatChart();
						chart_flag_stprc = false;
					}
					ShowDetailDataForPaging_STPRC(data);
					if(isFirstPage){
						var html = "<td>"+getStpSeverNum(data)+"</td>"+
									"<td>"+getOverLoadStpNum(data,ip,overLoad_flag_stprc)+"</td>";
						$('#'+GetSeverNameByIp(xml_all,"Stprc",ip)+'Info').html(html);
						if(getStpSeverNum(data) == StpNum){
							document.getElementById(ip+"Stprc"+"NumState").src = "images/green.jpg";
						}else{
							document.getElementById(ip+"Stprc"+"NumState").src = "images/red.jpg";
						}
					}
				}
			}
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}
function loopGetDetailData(){
/*	getStpRcDetail();
	setTimeout("CreatChar()",2000);
	setInterval("getStpRcDetail()",10000);*/
	//setTimeout("CreatChart()",2000);
}
/************************暂时不用********************************/
function showDetailStprcData(data,html){
	if(data==null || data==undefined){
		console.info("StpRc为空");
		data="This is null";
	}
	var ret_info = JSON.parse(data.ret_info);
	if(ret_info.info == null){
		return;
	}
	var StpInfoList = ret_info.info.stpInfo;
	if(StpInfoList == null){
		return;
	}
	$.each(StpInfoList,function(i,val){
		var isOverLoad = null;
		if(val.isOverLoad == 1){
			isOverLoad = "是";
		}
		else{
			isOverLoad = "否";
		}
		html = 	"<tr>" +
				"<td align='center' style='width:200px'>"+FormatStprcTime(data)+"</td>" +
				"<td align='center' style='width:200px'>"+val.ip+"</td>" +
				"<td align='center' style='width:50px'>"+val.cpu+"</td>" +
				"<td align='center' style='width:50px'>"+isOverLoad+"</td>" +
				"<td align='center' style='width:70px'>"+val.upReal+"</td>" +
				"<td align='center' style='width:70px'>"+val.downReal+"</td>" +
				"<td align='center' style='width:50px'>"+val.connNumReal+"</td>" +
				"<td align='center' style='width:100px'>"+getStpRcQueryCount(data)+"</td>" +
				"<td align='center' style='width:200px'>"+getQueryBeginTime(data)+"</td>" +
				"<td align='center' style='width:200px'>"+getQueryEndTime (data)+"</td>" +
				"</tr>;"
		$("#stprcTable2").prepend(html);
	});
/*	html = "<tr><td align='center' style='width:200px'>"+FormatStprcTime(data)+"</td>" +
			"<td align='center' style='width:200px'>"+getStpSeverNum(data)+"</td>" +
			"<td align='center' style='width:200px'>"+getStpRcQueryCount(data)+"</td>" +
			"<td align='center' style='width:200px'>"+getQueryBeginTime(data)+"</td>" +
			"<td align='center' style='width:200px'>"+getQueryEndTime (data)+"</td>" +
			"</tr>;"
	$("#stprcTable2").prepend(html);*/
}
/********************************************************/
/*******************************************表格分页***************************************/
function ShowDetailDataForPaging_STPRC(data){
	
	var ret_info = JSON.parse(data.ret_info);
	if(ret_info.info == null){
		return;
	}
	StpInfoList = ret_info.info.stpInfo;
	if(StpInfoList == null){
		return;
	}
	//data_for_tablePage = data;
	showDataPaging_STPRC(data,StpInfoList,1,100);
}

function showDataPaging_STPRC(data,list,currPage,pageSize){
	var flag = responsePagination_STPRC(list,currPage,pageSize);
	var table_html = "";
	var pages = "";
	var size;
	var page_html = "";
	table_html += "<tr>"+
					"<th scope='col' style='width:200px'>服务器当前时间</th>"+
					"<th scope='col' style='width:200px'>服务器IP</th>"+
					"<th scope='col' style='width:50px'>CPU</th>"+
					"<th scope='col' style='width:50px'>过载</th>"+
					"<th scope='col' style='width:70px'>上行带宽</th>"+
					"<th scope='col' style='width:70px'>下行带宽</th>"+
					"<th scope='col' style='width:50px'>连接数</th>"+
					"<th scope='col' style='width:100px'>客户端请求量</th>"+
					"<th scope='col' style='width:200px'>请求开始时间</th>"+
					"<th scope='col' style='width:200px'>请求结束时间</th>"+
					"</tr>"
	if(flag){
		size = currPage * pageSize;
		if(list.length % pageSize == 0){
			//结果集的长度是每页条目的整数倍，最后一页不加1
			lastPage = floatToint(list.length/pageSize);
		}else{
			lastPage = floatToint(list.length/pageSize) + 1;
		}
		
	}else{
		size = list.length;
	}
	for(var i = (currPage-1)*pageSize;i < size; i++){
		var isOverLoad = null;
		if(list[i].isOverLoad == 1){
			isOverLoad = "是";
		}
		else{
			isOverLoad = "否";
		}
		table_html += 	"<tr>" +
			"<td align='center' style='width:200px'>"+FormatStprcTime(data)+"</td>" +
			"<td align='center' style='width:200px'>"+list[i].ip+"</td>" +
			"<td align='center' style='width:50px'>"+list[i].cpu+"</td>" +
			"<td align='center' style='width:50px'>"+isOverLoad+"</td>" +
			"<td align='center' style='width:70px'>"+list[i].upReal+"</td>" +
			"<td align='center' style='width:70px'>"+list[i].downReal+"</td>" +
			"<td align='center' style='width:50px'>"+list[i].connNumReal+"</td>" +
			"<td align='center' style='width:100px'>"+getStpRcQueryCount(data)+"</td>" +
			"<td align='center' style='width:200px'>"+getQueryBeginTime(data)+"</td>" +
			"<td align='center' style='width:200px'>"+getQueryEndTime (data)+"</td>" +
			"</tr>";
	}
	//console.info("当前页："+currPage);
	if(flag){
		//继续分页
		if(currPage ==1){
			//第一页
			pages += "&nbsp;<a onclick=aaa("+(currPage+1)+","+pageSize+")>下一页</a>";
			pages +="&nbsp;<a onclick=aaa("+lastPage+","+pageSize+")>尾页</a>";
		}else{
			pages +="<a onclick=aaa(1,"+pageSize+")>首页</a>";
			pages +="&nbsp;<a onclick=aaa("+(currPage-1)+","+pageSize+")>上一页</a>";
			pages +="&nbsp;<a onclick=aaa("+(currPage+1)+","+pageSize+")>下一页</a>";
			pages +="&nbsp;<a onclick=aaa("+lastPage+","+pageSize+")>尾页</a>";
		}
	}else{
		//处于最后一页
		if(currPage == 1){
			//只有一页
			pages += "共1页";
		}
		else{
			//有多页的最后一页
			pages +="<a onclick=aaa(1,"+pageSize+")>首页</a>";
			pages +="&nbsp;<a onclick=aaa("+(currPage-1)+","+pageSize+")>上一页</a>";
			pages +="&nbsp;尾页";
		}
	}
	$("#stprcTable").html(table_html);
	page_html += "&nbsp;&nbsp;" + pages + "&nbsp;&nbsp;第"
	+ currPage + "页";
	$("#Paging").html(page_html);
}
function aaa(currPage,pageSize){
	//console.info("aaaglist:"+glist);
	showDataPaging_STP(data_all_stp,StpInfoList,currPage,pageSize);
}
function responsePagination_STPRC(list,currPage,pageSize){
	var length;
	var page;
	var itemNum;
	if(list!=null&&list!=undefined){
		length = list.length;
		page = (length - (currPage-1)*pageSize)/pageSize;
		item = (length - (currPage-1)*pageSize)%pageSize;
		if(page > 1){
			return true;
		}else if(page == 1){
			if(item > 0){
				return true;
			}
			else{
				return false;
			}
		}else if(page < 1){
			return false;
		}
	}
}
/******************************************************************************************/
function FormatStprcTime(data){
	if(data == null || data == undefined || JSON.parse(data.ret_info).time == null || JSON.parse(data.ret_info).time == undefined){
		var newTime = new Date();
		var year = newTime.getFullYear();
		var month = newTime.getMonth()+1;
		var day = newTime.getDate();
		var hour = newTime.getHours();
		var min = newTime.getMinutes();
		var sec = newTime.getSeconds();
	}
	else{
		var ret_info = JSON.parse(data.ret_info);
		var newTime = new Date(ret_info.time*1000);
		console.info(newTime);
		var year = newTime.getFullYear();
		var month = newTime.getMonth()+1;
		var day = newTime.getDate();
		var hour = newTime.getHours();
		var min = newTime.getMinutes();
		var sec = newTime.getSeconds();
	}
	var theTime = year+"-"+month+"-"+day+" "+hour+":"+min+":"+sec;
	return theTime;
}
function getQueryBeginTime(data){
	var ret_info = JSON.parse(data.ret_info);
	return ret_info.info.beginTime;
}
function getQueryEndTime(data){
	var ret_info = JSON.parse(data.ret_info);
	return ret_info.info.endTime;
}
function getTime(data){
	var ret_info = JSON.parse(data.ret_info);
	console.info(ret_info);
	var newTime = new Date(ret_info.time*1000);
	
	return newTime;
}
function getEnableStpNum(data){
	if(data == null || data == undefined){
		return 0;
	}
	var ret_info = JSON.parse(data.ret_info);
	var StpInfoList = ret_info.info.stpInfo;
	var EnableStpNum = 0;
	if(StpInfoList == null){
		return EnableStpNum;
	}
	$.each(StpInfoList,function(i,val){
		if(val.isOverLoad == 0){
			EnableStpNum++;
		}
	});
	return EnableStpNum;
}
function getOverLoadStpNum(data,severIp,flag){
	if(data == null || data == undefined){
		return 0;
	}
	var ret_info = JSON.parse(data.ret_info);
	if(ret_info.info == null){
		return 0;
	}
	var StpInfoList = ret_info.info.stpInfo;
	var OverLoadStpNum = 0;
	if(StpInfoList == null){
		return OverLoadStpNum;
	}
	$.each(StpInfoList,function(i,val){
		if(val.isOverLoad == 1){
			OverLoadStpNum++;
			if(flag){
				var ip = splitIPandPort_SPTRC(val.ip);
				document.getElementById(GetSeverNameByIp(xml_all,"Stprc",severIp)+"sound").src = "sound/"+GetSeverNameByIp(xml_all,"Stp",ip)+"error.wav";
			}
		}
	});
	return OverLoadStpNum;
}
function getStpRcQueryCount(data){
	var stprc_info = JSON.parse(data.ret_info);
	if(stprc_info.info == null || stprc_info.info == undefined){
		return 0;
	}
	return stprc_info.info.queryCount;
}
function getStpSeverNum(data){
	if(data == null || data == undefined){
		return 0;
	}
	var stprc_info = JSON.parse(data.ret_info);
	if(stprc_info.info == null){
		return 0;
	}
	var SeverList = stprc_info.info.stpInfo;
	var StpSeverNum = 0;
	if(SeverList == null){
		return StpSeverNum;
	}
	$.each(SeverList,function(i,val){
		StpSeverNum++;
	});
	return StpSeverNum;
}
function splitIPandPort_SPTRC(ipPort){
	var ip = ipPort.split(":");
	console.info(ip[0]);
	return ip[0];
}
function CreatChart() {
	$(function () {
	    Highcharts.setOptions({
	        global : {
	            useUTC : false
	        }
	    });
	    // Create the chart
	    $('#container').highcharts('StockChart', {
	        chart : {
	            events : {
	                load : function () {
	                    // set up the updating of the chart each second
	                	var series_stpNum = this.series[0];
	                    var series_qureyCount = this.series[1];
	                    var series_overLoadNum = this.series[2];           
	                    setInterval(function () {
	                    	if(JSON.parse(data_all_stprc.ret_info).result == 1){
	                    		return;
	                    	}
	                        //var x = (new Date()).getTime(), // current time
	                        //console.info(getTime(data_all_stprc).getTime());
	                        var x = getTime(data_all_stprc).getTime(), 
	                        //var x = (new Date()).getTime(), 
	                            //y_qureyCount = Math.round(Math.random() * 100),
	                            y_qureyCount = getStpRcQueryCount(data_all_stprc),
	                            //y_stpNum = Math.round(Math.random() * 100);
	                            y_overLoadNum = getOverLoadStpNum(data_all_stprc),
	                        	y_stpNum = getStpSeverNum(data_all_stprc);
	                        	series_stpNum.addPoint([x, y_stpNum]);
	                        	series_qureyCount.addPoint([x, y_qureyCount]);
	                        	series_overLoadNum.addPoint([x, y_overLoadNum])
	                    }, 5000);
	                }
	            }
	        },
	        rangeSelector: {
	            buttons: [{
	                count: 1,
	                type: 'minute',
	                text: '1M'
	            }, {
	                count: 5,
	                type: 'minute',
	                text: '5M'
	            }, {
	                count: 10,
	                type: 'minute',
	                text: '10M'
	            }, {
	                count: 20,
	                type: 'minute',
	                text: '20M'
	            }, {
	                count: 30,
	                type: 'minute',
	                text: '30M'
	            }, {
	                count: 1,
	                type: 'hour',
	                text: '1H'
	            }, {
	                count: 3,
	                type: 'hour',
	                text: '3H'
	            }, {
	                count: 6,
	                type: 'hour',
	                text: '5H'
	            },{
	                count: 12,
	                type: 'hour',
	                text: '12H'
	            },{
	                count: 24,
	                type: 'hour',
	                text: '24H'
	            },{
	                type: 'all',
	                text: 'All'
	            }],
	            inputEnabled: false,
	            selected: 0
	        },
	        title : {
	            text : 'STPRC详细信息'
	        },
	        exporting: {
	            enabled: false
	        },
	        series : [{
	            name : 'STP数量',
	            color : "#0A0A0A",
	            data : (function () {
	                // generate an array of random data
	            	//console.info(data_all_stprc);
	                var data = [], time, i;
	                	time = getTime(data_all_stprc).getTime();
	                    data.push([
	                       // time + i * 1000,
	                       //TODO:时间后续有待处理
	                       time,
	                       getStpSeverNum(data_all_stprc)
	                        //Math.round(Math.random() * 100)
	                    ]);
	                return data;
	            }())
	        },
		      {
		          name : '客户端请求量',
		          color : "#ff00ff",
		          data : (function () {
		              // generate an array of random data
		        	  //console.info(data_all_stprc);
		              var data = [], time, i;
		                	time = getTime(data_all_stprc).getTime();
		                  data.push([
		                     // time + i * 1000,
		                     time,
		                     getStpRcQueryCount(data_all_stprc)
		                      //Math.round(Math.random() * 150)
		                  ]);
		              return data;
		          }())
		      },
		      {
		          name : '过载STP数量',
		          color : "#8A2BE2",
		          data : (function () {
		              // generate an array of random data
		        	  //console.info(data_all_stprc);
		              var data = [], time, i;
		              if(data_all_stprc == null){
		            		time = (new Date()).getTime();
		            	}
		              else{
		                	time = getTime(data_all_stprc).getTime();
		                }
		                  data.push([
		                     // time + i * 1000,
		                     time,
		                     getOverLoadStpNum(data_all_stprc)
		                      //Math.round(Math.random() * 150)
		                  ]);
		              return data;
		          }())
		      }]
	    });
	});
}
