/**
 * Relay详细信息的JS
 */
var data_all_relay = null;
var RelayMeetingInfoList = null;
var chart_flag_relay = true;
function getRelayDetailData(ip,severType){
	//var severType = 1;
	var relayDetail = $.ajax({
		type : "post",
		url : "search.GetRelayDetailData.action",
		timeout : request_time_out,
		dataType : "json",
		data : "severIp=" + ip + "&SeverType=" + severType,
		beforeSend : function() {
			
		},
		complete : function() {
			if(status=='timeout'){//超时,status还有success,error等值的情况
			 　　　　relayDetail.abort();
			}
			setTimeout("getRelayDetailData('"+ip+"','"+severType+"')",Interval_time);
		},
		success : function(data) {
			console.info(data);
			if(data==null || data==undefined ||data.result!=0){
				console.info("Relay信息为空");
				//return;
			}else{
				/********************错误码区域************************/
				var ret_info = JSON.parse(data.ret_info);
				if(ret_info.result == 1){
					//$('#container').html("错误码(1)，Relay信息返回超时，请刷新重试");
					//alert("Relay:"+ip+"信息返回超时(1)")
					$('#'+GetSeverNameByIp(xml_all,"Relay",ip)+'Info').html("TimeOut(1)");
					//return;
				}
				if(ret_info.result == -2){
					//$('#container').html("错误码(-2),Relay信息不存在，请刷新重试");
					//alert("Relay"+ip+"信息不存在，请刷新重试(-2)");
					$('#'+GetSeverNameByIp(xml_all,"Relay",ip)+'Info').html("Null(-2)");
					//return;
				}
				if(ret_info.result == -3){
					//$('#container').html("错误码(-3),Relay信息返回过长，请刷新重试");
					//alert("Relay:"+ip+"信息返回过长(-3)");
					$('#'+GetSeverNameByIp(xml_all,"Relay",ip)+'Info').html("Data Too long(-3)");
					//return;
				}
				/********************错误码区域************************/
				data_all_relay = data;
				if(chart_flag_relay){
					CreatChart();
					chart_flag_relay = false;
				}
				ShowDetailDataForPaging_RELAY(data);
				//2016-11-16 修改BUG 避免Relay简要显示重复
				var html = "<td>"+getRelayDetailMeetingNum(data)+"</td>"+
						"<td>"+getRelayDetailMicNum(data)+"</td>"+
						"<td>"+getRelayDetailMeetingMemebersNum(data)+"</td>";
				$('#'+GetSeverNameByIp(xml_all,"Relay",ip)+'relay').html(html);
			}
			
		},
		error : function(request, textStatus, errorThrown) {
			if (request.status == 900) {
				window.location.href = "login.jsp";
			}
		}
	});
}
//在JSP中循环获取数据
function loopGetDetailData(){
	//setInterval("getRelayDetailData()",5000);
	//setTimeout("CreatChart()",2000);
}
//展示详细数据表格
function showRelayDetailData(data){
	var html ="";
	if(data == null || data == undefined){
		html = "<tr>" +
		"<td align='center' style='width:200px'>--</td>" +
		"<td align='center' style='width:200px'>--</td>" +
		"<td align='center' style='width:200px'>--</td>" +
		"<td align='center' style='width:200px'>--</td>" +
		"</tr>;"
		$("#dataTable2").prepend(html);
		return;
	}
		console.info(JSON.stringify(data));
		if(getMeetingIdList(data) == null){
			html = "<tr>" +
				"<td align='center' style='width:200px'>--</td>" +
				"<td align='center' style='width:200px'>--</td>" +
				"<td align='center' style='width:200px'>--</td>" +
				"<td align='center' style='width:200px'>--</td>" +
				"</tr>;"
				$("#dataTable2").prepend(html);
		}
		else{
			$.each(getMeetingIdList(data),function(i,val){
				html = "<tr>" +
					"<td align='center' style='width:200px'>"+FormatRelayTime(data)+"</td>" +
					"<td align='center' style='width:200px'>"+val+"</td>" +
					"<td align='center' style='width:200px'>"+getMicList(data,val)+"</td>" +
					"<td align='center' style='width:200px'>"+getMemberList(data,val)+"</td>" +
					"</tr>;"
				$("#dataTable2").prepend(html);
			});
		}	
}
/*******************************************表格分页***************************************/
function ShowDetailDataForPaging_RELAY(data){
	
	var ret_info = JSON.parse(data.ret_info);
	RelayMeetingInfoList = getMeetingIdList(data);
	//data_for_tablePage = data;
	showDataPaging_RELAY(data,RelayMeetingInfoList,1,100);
}

function showDataPaging_RELAY(data,list,currPage,pageSize){
	var flag = responsePagination_RELAY(list,currPage,pageSize);
	var table_html = "";
	var pages = "";
	var size;
	var page_html = "";
	table_html += "<tr>"+
	    			"<th scope='col' style='width:200px'>服务器当前时间</th>"+
	    			"<th scope='col' style='width:200px'>会议号</th>"+
	    			"<th scope='col' style='width:200px'>发言者列表</th>"+
	    			"<th scope='col' style='width:200px'>参会者列表</th>"+
	    			"</tr>";
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
		table_html += "<tr>" +
		"<td align='center' style='width:200px'>"+FormatRelayTime(data)+"</td>" +
		"<td align='center' style='width:200px'>"+list[i]+"</td>" +
		"<td align='center' style='width:200px'>"+getMicList(data,list[i])+"</td>" +
		"<td align='center' style='width:200px'>"+getMemberList(data,list[i])+"</td>" +
		"</tr>;"
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
	$("#dataTable").html(table_html);
	page_html += "&nbsp;&nbsp;" + pages + "&nbsp;&nbsp;第"
	+ currPage + "页";
	$("#Paging").html(page_html);
}
function aaa(currPage,pageSize){
	//console.info("aaaglist:"+glist);
	showDataPaging_RELAY(data_all_relay,RelayMeetingInfoList,currPage,pageSize);
}
function responsePagination_RELAY(list,currPage,pageSize){
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
//从data中解析获取会议数量
function getRelayDetailMeetingNum(data){
	if(data == null || data == undefined){
		return 0;
	}
	var ret_info = JSON.parse(data.ret_info);
	var relayInfoList = ret_info.rinfo;
	var meetingList = new Array();
	var meetingNum = 0;
	if(relayInfoList == null || relayInfoList == undefined){
		return meetingNum;
	}
	$.each(relayInfoList,function(i,val){
		if(meetingList.indexOf(val.met)==-1){
			meetingList.push(val.met);
		}
	});
	if(meetingList == null){
		return meetingNum;
	}
	$.each(meetingList,function(i,val){
			meetingNum++;
	});
	return meetingNum;
}
//从data中获取发言人数量
function getRelayDetailMicNum(data){
	if(data == null || data == undefined){
		return 0;
	}
	var ret_info = JSON.parse(data.ret_info);
	var relayInfoList = ret_info.rinfo;
	var micList = new Array();
	var micNum = 0;
	if(relayInfoList == null || relayInfoList == undefined){
		return micNum;
	}
	$.each(relayInfoList,function(i,val){
		if(micList.indexOf(val.mic)==-1){
			micList.push(val.mic);
		}
	});
	if(micList == null){
		return meetingNum;
	}
	$.each(micList,function(i,val){
		micNum++;
	});
	return micNum;
}
//从data中获取所有的参会人数
function getRelayDetailMeetingMemebersNum(data){
	if(data == null || data == undefined){
		return 0;
	}
	var ret_info = JSON.parse(data.ret_info);
	var relayInfoList = ret_info.rinfo;
	var memberList = new Array();
	var membersNum = 0;
	if(relayInfoList == null || relayInfoList == undefined){
		return membersNum;
	}
	$.each(relayInfoList,function(i,val){
		var userList = val.ul;
		if(userList == null){
			return 0;
		}
		$.each(userList,function(i,val){
			if(memberList.indexOf(val)==-1){
				memberList.push(val);
			}
		});
	});
	if(memberList == null){
		return membersNum;
	}
	$.each(memberList,function(i,val){
		membersNum++;
	});
	return membersNum;
}
//获取会议号列表
function getMeetingIdList(data){
	var ret_info = JSON.parse(data.ret_info);
	var relayInfoList = ret_info.rinfo;
	var meetingIdList = new Array();
	if(relayInfoList == null){
		meetingIdList.push(0);
		return meetingIdList;
	}
	$.each(relayInfoList,function(i,val){
		if(meetingIdList.indexOf(val.met)==-1){
			meetingIdList.push(val.met);
		}
	});
	return meetingIdList;
}
//获取发言者列表
function getMicList(data,MeetingId){
	var ret_info = JSON.parse(data.ret_info);
	var relayInfoList = ret_info.rinfo;
	var MicList = new Array();
	
	if(relayInfoList == null){
		MicList.push(0);
		return MicList;
	}
	$.each(relayInfoList,function(i,val){
		if(val.met == MeetingId){
			MicList.push(val.mic);
		}	
	});
	return MicList;
}
//获取参会者列表
function getMemberList(data,MeetingId){
	var ret_info = JSON.parse(data.ret_info);
	var relayInfoList = ret_info.rinfo;
	var MemeberList = new Array();
	
	if(relayInfoList == null){
		MemeberList.push(0);
		return MemeberList;
	}
	$.each(relayInfoList,function(i,val){
		if(val.met == MeetingId){
			if(val.ul == null){
				console.info("val.ul没有下行接收者");
				return;
			}
			$.each(val.ul,function(i,val){
				if(MemeberList.indexOf(val)==-1){
					MemeberList.push(val);
				}
			});
		}	
	});
	return MemeberList;
}
//从data中获取时间并将其格式化
function FormatRelayTime(data){
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
function getTime(data){
	var ret_info = JSON.parse(data.ret_info);
	console.info(ret_info);
	var newTime = new Date(ret_info.time*1000);
	
	return newTime;
}
//画折线图
function CreatChart(){
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
	                    var series_MeetingNum = this.series[0];
	                    var series_MicNum = this.series[1];
	                    var series_UserNum = this.series[2];
	                    setInterval(function () {
	                    	//2017-01-16 修改收不到数据的时候无法继续描点的BUG 同STP STPRC RELAYRC
	                    	if(JSON.parse(data_all_relay.ret_info).result == 1){
	                    		return;
	                    	}
	                        var x = getTime(data_all_relay).getTime(), // current time
	                           // y = Math.round(Math.random() * 100);
	                        	y_MeetingNum = getRelayDetailMeetingNum(data_all_relay),
	                        	y_MicNum = getRelayDetailMicNum(data_all_relay),
	                        	y_UserNum = getRelayDetailMeetingMemebersNum(data_all_relay);
	                        series_MeetingNum.addPoint([x, y_MeetingNum]);
	                        series_MicNum.addPoint([x,y_MicNum]);
	                        series_UserNum.addPoint([x,y_UserNum]);
	                    }, 5000);
	                    /*setInterval(function () {
	                        var x = (new Date()).getTime(), // current time
	                            //y = Math.round(Math.random() * 150);
	                        	y = getRelayDetailMicNum(data_all);
	                        series1.addPoint([x, y]);
	                    }, 5000);
	                    setInterval(function () {
	                        var x = (new Date()).getTime(), // current time
	                            //y = Math.round(Math.random() * 200);
	                        	y = getRelayDetailMeetingMemebersNum(data_all);
	                        series2.addPoint([x, y]);
	                    }, 5000);*/
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
	            text : 'Relay详细信息'
	        },
	        exporting: {
	            enabled: false
	        },
	        series : [{
	            name : '会议数量',
	            //color : "#0A0A0A",
	            data : (function () {
	                // generate an array of random data
	                var data = [], time = getTime(data_all_relay).getTime(), i;
	                    data.push([
	                        time,
	                        getRelayDetailMeetingNum(data_all_relay)
	                    ]);
	                return data;
	            }())
	        },
		      {
		          name : '发言人数',
		          //color : "#ff00ff",
		          data : (function () {
		              // generate an array of random data
		              var data = [], time = getTime(data_all_relay).getTime(), i;
		                  data.push([
		                      time,
		                      getRelayDetailMicNum(data_all_relay)
		                  ]);
		              return data;
		          }())
		      },
	          {
	              name : '参会人数',
	              //color : "#808080",
	              data : (function () {
	                  // generate an array of random data
	                  var data = [], time = getTime(data_all_relay).getTime(), i;
	                      data.push([
	                          time,
	                          getRelayDetailMeetingMemebersNum(data_all_relay)
	                      ]);
	                  return data;
	              }())
	          }]
	    });
	});
}