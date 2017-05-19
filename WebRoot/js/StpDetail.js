var data_all_stp = null;
var MeetingInfoList = null;
var chart_flag_stp = true;
function getStpDetail(ip,severType){
	//var severType = 1;
	var html = " ";
	var StpDetail = $.ajax({
		type : "post",
		url : "search.GetStpDetailData.action",
		timeout : request_time_out,
		dataType : "json",
		data : "severIp=" + ip + "&SeverType=" + severType,
		beforeSend : function() {
			
		},
		complete : function() {
			if(status=='timeout'){//超时,status还有success,error等值的情况
			 　　　　StpDetail.abort();
			}
			setTimeout("getStpDetail('"+ip+"','"+severType+"')",Interval_time);
		},
		success : function(data) {
			console.info(data);
			if(data == null || data == undefined){
				return;
			}
			if(data.result == 0){
				data_all_stp = data;
				if(chart_flag_stp){
					CreateChar();
					chart_flag_stp = false;
				}
				//showStpDetailData(data,html);
				ShowDetailDataForPaging_STP(data);
				var html = "<td>"+getMeetingNum(data)+"</td>"+
							"<td>"+getSpeakerNum(data)+"</td>"+
							"<td>"+getMemberNum(data)+"</td>";
				$('#'+GetSeverNameByIp(xml_all,"Stp",ip)+'Info').html(html);
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
/*	getStpDetail();
	setInterval("getStpDetail()",15000);*/
	//setTimeout("CreateChar()",2000);
}
function FormatStpTime(data){
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
		//console.info(newTime);
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
function getStpTime(data){
	var ret_info = JSON.parse(data.ret_info);
	console.info(ret_info);
	var newTime = new Date(ret_info.time*1000);
	
	return newTime;
}
/**
 * 获取各种数量
 * @param data
 * @returns {Number}
 */
function getMeetingNum(data){
	if(data == null || data == undefined){
		return 0;
	}
	var ret_info = JSON.parse(data.ret_info);
	var MeetingInfoList = ret_info.info;
	console.info(MeetingInfoList);
	var MeetingNum = 0;
	if(MeetingInfoList == null || MeetingInfoList == undefined){
		return MeetingNum;
	}
	$.each(MeetingInfoList,function(i,val){
		MeetingNum++;
	});
	console.info("会议数量："+MeetingNum);
	return MeetingNum;
}
function getMemberNum(data){
	if(data == null || data == undefined){
		return 0;
	}
	var ret_info = JSON.parse(data.ret_info);
	var MeetingInfoList = ret_info.info;
	//console.info(MeetingInfoList);
	var MemberNum = 0;
	if(MeetingInfoList == null || MeetingInfoList == undefined){
		return MemberNum;
	}
	$.each(MeetingInfoList,function(i,val){
		var MemberList = val.paticipators;
		if(MemberList == null){
			return MemberNum;
		}
		$.each(MemberList,function(i,val){
			MemberNum++;
		});
	});
	console.info("参会人数:"+MemberNum)
	return MemberNum;
}
function getSpeakerNum(data){
	if(data == null || data == undefined){
		return 0;
	}
	var ret_info = JSON.parse(data.ret_info);
	var MeetingInfoList = ret_info.info;
	console.info(MeetingInfoList);
	var SpeakerNum = 0;
	if(MeetingInfoList == null || MeetingInfoList == undefined){
		return SpeakerNum;
	}
	$.each(MeetingInfoList,function(i,val){
		var SpeakerList = val.speakers;
		if(SpeakerList == null){
			return SpeakerNum;
		}
		$.each(SpeakerList,function(i,val){
			SpeakerNum++;
		});
	});
	console.info("发言人数："+SpeakerNum);
	return SpeakerNum;
}
/**
 * 获取各种列表
 * @param data
 * @returns {Array}
 */
/*function getMeetingIDList(data){
	var MeetingInfoList = data.info;
	var MeetingIdList = new Array();
	$.each(MeetingInfoList,function(i,val){
		MeetingIdList.add(val.meetingId);
	});
	return MeetingIdList;
}*/
function getMemberList(MeetingInfo){
	var MeetingPaticipatorsList = MeetingInfo.paticipators;
	var MemberList = new Array();
	if(MeetingPaticipatorsList == null){
		return 0;
	}
	$.each(MeetingPaticipatorsList,function(i,val){
		MemberList.push(val.acountId);
	});
	return MemberList;
}
function getSpeakerList(MeetingInfo){
	var MeetingSpeakersList = MeetingInfo.speakers;
	var SpeakerList = new Array();
	if(MeetingSpeakersList == null){
		return 0;
	}
	$.each(MeetingSpeakersList,function(i,val){
		SpeakerList.push(val.userId);
	});
	return SpeakerList;
}
/**********************暂时不用**************************/
function showStpDetailData(data,html){
	var theRowNumberOftable = 0;
	if(data==null || data==undefined){
		console.info("StpRc为空");
		data="This is null";
	}
	var ret_info = JSON.parse(data.ret_info);
	var MeetingInfoList = ret_info.info;
	if(MeetingInfoList == null || MeetingInfoList == undefined){
		return;
	}
	$.each(MeetingInfoList,function(i,val){
		html += "<tr><td align='center' style='width:200px'>"+FormatStpTime(data)+"</td>" +
				"<td align='center' style='width:200px'>"+val.meetingId+"</td>" +
				"<td align='center' style='width:200px'>"+getSpeakerList(val)+"</td>" +
				"<td align='center' style='width:200px'>"+getMemberList(val)+"</td>" +
				"</tr>;"
		theRowNumberOftable++;
	});
	$("#stpTable2").prepend(html);
	
}
/*******************************************************/
/*******************************************表格分页***************************************/
function ShowDetailDataForPaging_STP(data){
	
	var ret_info = JSON.parse(data.ret_info);
	MeetingInfoList = ret_info.info;
	//data_for_tablePage = data;
	if(MeetingInfoList == null || MeetingInfoList == undefined){
		return;
	}
	showDataPaging_STP(data,MeetingInfoList,1,100);
}

function showDataPaging_STP(data,list,currPage,pageSize){
	var flag = responsePagination_STP(list,currPage,pageSize);
	var table_html = "";
	var pages = "";
	var size;
	var page_html = "";
	//添加表头
	table_html += "<tr>"+
	    			"<th scope='col' style='width:200px'>服务器当前时间</th>"+
					"<th scope='col' style='width:200px'>会议ID</th>"+
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
		table_html += "<tr><td align='center' style='width:200px'>"+FormatStpTime(data)+"</td>" +
						"<td align='center' style='width:200px'>"+list[i].meetingId+"</td>" +
						"<td align='center' style='width:200px'>"+getSpeakerList(list[i])+"</td>" +
						"<td align='center' style='width:200px'>"+getMemberList(list[i])+"</td>" +
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
	$("#stpTable").html(table_html);
	page_html += "&nbsp;&nbsp;" + pages + "&nbsp;&nbsp;第"
	+ currPage + "页";
	$("#stpPaging").html(page_html);
}
function aaa(currPage,pageSize){
	//console.info("aaaglist:"+glist);
	showDataPaging_STP(data_all_stp,MeetingInfoList,currPage,pageSize);
}
function responsePagination_STP(list,currPage,pageSize){
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
function CreateChar(){
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
	                    var series_MemebersNum = this.series[1];
	                    var series_Speaker = this.series[2];
	                    setInterval(function () {
	                    	if(JSON.parse(data_all_stp.ret_info).result == 1){
	                    		return;
	                    	}
	                        var x = getStpTime(data_all_stp).getTime(), // current time
	                            //y_MeetingNum = Math.round(Math.random() * 100),
	                            y_MeetingNum = getMeetingNum(data_all_stp),
	                            //y_MemebersNum = Math.round(Math.random() * 100),
	                        	y_MemebersNum = getMemberNum(data_all_stp),
	                        	//y_Speaker = Math.round(Math.random() * 100);
	                        	y_Speaker = getSpeakerNum(data_all_stp);
	                        series_MeetingNum.addPoint([x, y_MeetingNum]);
	                        series_MemebersNum.addPoint([x, y_MemebersNum]);
	                        series_Speaker.addPoint([x, y_Speaker]);
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
	            },{
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
	            }, {
	                type: 'all',
	                text: 'All'
	            }],
	            inputEnabled: false,
	            selected: 0
	        },
	        title : {
	            text : 'STP详细信息'
	        },
	        exporting: {
	            enabled: false
	        },
	        series : [{
	            name : '会议数',
	           // color : "#0A0A0A",
	            data : (function () {
	                // generate an array of random data
	                var data = [], time = getStpTime(data_all_stp).getTime(), i;
	                    data.push([
	                        time,
	                        getMeetingNum(data_all_stp)
	                    ]);
	                return data;
	            }())
	        },
		      {
		          name : '参会人数',
		         // color : "#ff00ff",
		          data : (function () {
		              // generate an array of random data
		              var data = [], time = getStpTime(data_all_stp).getTime(), i;
		                  data.push([
		                      time,
		                      getMemberNum(data_all_stp)
		                  ]);
		              return data;
		          }())
		      },
		      {
		          name : '发言人数',
		         // color : "#ff00ff",
		          data : (function () {
		              // generate an array of random data
		              var data = [], time = getStpTime(data_all_stp).getTime(), i;
		                  data.push([
		                      time,
		                      getSpeakerNum(data_all_stp)
		                  ]);
		              return data;
		          }())
		      }
	        ]
	    });
	});
}