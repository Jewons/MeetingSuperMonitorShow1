var data_all_relayrc;
var RelayInfoList;
var chart_flag_relayrc = true;
var overLoad_flag_relayrc = true;

function getRelayrcDetail(ip,severType,isFirstPage){
	//var severType = 1;
	var html = "";
	var RelayrcDetail = $.ajax({
		type : "post",
		url : "search.GetRelayrcDetailData.action",
		timeout : request_time_out,
		dataType : "json",
		data : "severIp=" + ip + "&SeverType=" + severType,
		beforeSend : function() {
			
		},
		complete : function() {
			if(status=='timeout'){//超时,status还有success,error等值的情况
			 　　　　RelayrcDetail.abort();
			}
			setTimeout("getRelayrcDetail('"+ip+"','"+severType+"',"+isFirstPage+")",Interval_time);
		},
		success : function(data) {
			console.info(data);
			if(data == null || data == undefined){
				return;
			}
			if(data.result == 0){
				console.info(data);
				var ret_info = JSON.parse(data.ret_info);
				console.info(ret_info);
				data_all_relayrc = data;
				if(ret_info.result == 0){
					if(chart_flag_relayrc){
						CreateChar();
						chart_flag_relayrc = false;
					}
					//showDetailRelayrcData(data,html);
					ShowDetailDataForPaging_RELAYRC(data);
					if(isFirstPage){
						var html = "<td>"+getRelayTotalNum(data)+"</td>"+
						"<td>"+getOverLoadRelayNum(data,ip,overLoad_flag_relayrc)+"</td>";
						$('#'+GetSeverNameByIp(xml_all,"Relayrc",ip)+'Info').html(html);
						if(getRelayTotalNum(data_all_relayrc) == RelayNum){
							document.getElementById(ip+"Relayrc"+"NumState").src = "images/green.jpg";
						}else{
							document.getElementById(ip+"Relayrc"+"NumState").src = "images/red.jpg";
						}
					}
				}else if(ret_info.result === -1){
					//alert("Relayrc:"+ip+"数据过长，无法获取(-1)");
					$('#'+GetSeverNameByIp(xml_all,"Relayrc",ip)+'Info').html("Data Too long(-1)");
					//return;
				}
				else if(ret_info.result == -2){
					//alert("Relayrc:"+ip+"无法从服务器上获取业务数据(-2)");
					$('#'+GetSeverNameByIp(xml_all,"Relayrc",ip)+'Info').html("Null(-2)");
					//return;
				}
				else if(ret_info.result == -3){
					//alert("Relayrc:"+ip+"数据过长，无法获取(-3)");
					$('#'+GetSeverNameByIp(xml_all,"Relayrc",ip)+'Info').html("Data Too long(-3)");
					//return;
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
	//setInterval("getRelayrcDetail()",15000);
/*	if(data_all_relayrc.result == 0){
		var html =  "";
		showDetailRelayrcData(data_all_relayrc,html);
	}*/
	//setTimeout("CreateChar()",2000);
}
function FormatRelayrcTime(data){
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
/**
 * 获取各种数量
 * @param data
 * @returns {Number}
 */
function getRelayTotalNum(data){
	if(data == null || data == undefined){
		return 0;
	}
	var ret_info = JSON.parse(data.ret_info);
	var RelayInfoList = ret_info.relay_items;
	var RelayTotalNum = 0;
	if(RelayInfoList == null || RelayInfoList == undefined){
		return RelayTotalNum;
	}
	$.each(RelayInfoList,function(i,val){
		RelayTotalNum++;
	});
	return RelayTotalNum;
}
function getOverLoadRelayNum(data,severIp,flag){
	if(data == null || data == undefined){
		return 0;
	}
	var ret_info = JSON.parse(data.ret_info);
	var RelayInfoList = ret_info.relay_items;
	var overLoadRelayNum = 0;
	if(RelayInfoList == null || RelayInfoList == undefined){
		return overLoadRelayNum;
	}
	console.info(RelayInfoList);
	$.each(RelayInfoList,function(i,val){
		//console.info(val.isoverload);
		if(val.isoverload == true){
			overLoadRelayNum++;
			if(flag){
				document.getElementById(GetSeverNameByIp(xml_all,"Relayrc",severIp)+"sound").src = "sound/"+GetSeverNameByIp(xml_all,"Relay",(val.relayInfo.iperf_ip))+"error.wav";
			}
		}
	});
	return overLoadRelayNum;
}
function getEnableRelayNum(data){
	return getRelayTotalNum(data)-getOverLoadRelayNum(data);
}
/**
 * 获取各种列表
 * @param data
 * @returns {Array}
 */
/**
 * 展示信息
 */
function showDetailRelayrcData(data,html){
	if(data==null || data==undefined){
		console.info("RELAYRC为空");
		data="This is null";
	}
	var ret_info = JSON.parse(data.ret_info);
	var RelayInfoList = ret_info.relay_items;
	console.info(RelayInfoList);
	if(RelayInfoList == null || RelayInfoList == undefined){
		return;
	}
	$.each(RelayInfoList,function(i,val){
		console.info("html:"+html);
		var isOverLoad = null;
		if(val.isoverload == true){
			isOverLoad = "是";
		}
		else{
			isOverLoad = "否";
		}
		html += "<tr>" +
				"<td align='center' style='width:200px'>"+FormatRelayrcTime(data)+"</td>" +
				"<td align='center' style='width:100px'>"+val.relayInfo.relayID+"</td>" +
				"<td align='center' style='width:100px'>"+isOverLoad+"</td>" +
				"<td align='center' style='width:100px'>"+val.payLoadInfo.connect_num+"</td>" +
				"<td align='center' style='width:100px'>"+val.payLoadInfo.cpu+"%</td>" +
				"<td align='center' style='width:100px'>"+val.payLoadInfo.inbound+"</td>" +
				"<td align='center' style='width:100px'>"+val.payLoadInfo.outbound+"</td>" +
				"<td align='center' style='width:100px'>"+val.payLoadInfo.mem+"</td>" +
				"<td align='center' style='width:100px'>"+val.relayInfo.max_connet_num+"</td>" +
				"<td align='center' style='width:100px'>"+val.relayInfo.max_inbound+"</td>" +
				"<td align='center' style='width:100px'>"+val.relayInfo.max_outbound+"</td>" +
				"</tr>";
	});
	$("#dataTable2").prepend(html);
}
/*******************************************表格分页***************************************/
function ShowDetailDataForPaging_RELAYRC(data){
	
	var ret_info = JSON.parse(data.ret_info);
	RelayInfoList = ret_info.relay_items;
	//data_for_tablePage = data;
	showDataPaging_RELAYRC(data,RelayInfoList,1,100);
}

function showDataPaging_RELAYRC(data,list,currPage,pageSize){
	var flag = responsePagination_RELAYRC(list,currPage,pageSize);
	var table_html = "";
	var pages = "";
	var size;
	var page_html = "";
	table_html += "<tr>"+
    			"<th scope='col' style='width:200px'>服务器当前时间</th>"+
    			"<th scope='col' style='width:100px'>RelayID</th>"+
    			"<th scope='col' style='width:100px'>是否过载</th>"+
    			"<th scope='col' style='width:100px'>当前连接数</th>"+
    			"<th scope='col' style='width:100px'>CPU占用率</th>"+
    			"<th scope='col' style='width:100px'>上行带宽</th>"+
    			"<th scope='col' style='width:100px'>下行带宽</th>"+
    			"<th scope='col' style='width:100px'>内存</th>"+
    			"<th scope='col' style='width:100px'>最大连接数</th>"+
    			"<th scope='col' style='width:100px'>最大上行带宽</th>"+
    			"<th scope='col' style='width:100px'>最大下行带宽</th>"+	
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
		var isOverLoad = null;
		if(list[i].isoverload == true){
			isOverLoad = "是";
		}
		else{
			isOverLoad = "否";
		}
		table_html += "<tr>" +
					"<td align='center' style='width:200px'>"+FormatRelayrcTime(data)+"</td>" +
					"<td align='center' style='width:100px'>"+list[i].relayInfo.relayID+"</td>" +
					"<td align='center' style='width:100px'>"+isOverLoad+"</td>" +
					"<td align='center' style='width:100px'>"+list[i].payLoadInfo.connect_num+"</td>" +
					"<td align='center' style='width:100px'>"+list[i].payLoadInfo.cpu+"%</td>" +
					"<td align='center' style='width:100px'>"+list[i].payLoadInfo.inbound+"</td>" +
					"<td align='center' style='width:100px'>"+list[i].payLoadInfo.outbound+"</td>" +
					"<td align='center' style='width:100px'>"+list[i].payLoadInfo.mem+"</td>" +
					"<td align='center' style='width:100px'>"+list[i].relayInfo.max_connet_num+"</td>" +
					"<td align='center' style='width:100px'>"+list[i].relayInfo.max_inbound+"</td>" +
					"<td align='center' style='width:100px'>"+list[i].relayInfo.max_outbound+"</td>" +
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
	$("#dataTable").html(table_html);
	page_html += "&nbsp;&nbsp;" + pages + "&nbsp;&nbsp;第"
	+ currPage + "页";
	$("#Paging").html(page_html);
}
function aaa(currPage,pageSize){
	//console.info("aaaglist:"+glist);
	showDataPaging_RELAYRC(data_all_relayrc,RelayInfoList,currPage,pageSize);
}
function responsePagination_RELAYRC(list,currPage,pageSize){
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
	                    var series_TotalRelay = this.series[0];
	                    var series_EnableRelay = this.series[1];
	                    var series_OverLoadRelay = this.series[2];
	                    setInterval(function () {
	                    	if(JSON.parse(data_all_relayrc.ret_info).result == 1){
	                    		return;
	                    	}
	                        var x = getTime(data_all_relayrc).getTime(), // current time
	                            //y_TotalRelay = Math.round(Math.random() * 100),
	                            y_TotalRelay = getRelayTotalNum(data_all_relayrc),
	                            //y_OverLoadRelay = Math.round(Math.random() * 100),
	                        	y_OverLoadRelay = getOverLoadRelayNum(data_all_relayrc),
	                        	//y_EnableRelay = Math.round(Math.random() * 100);
	                        	y_EnableRelay = getEnableRelayNum(data_all_relayrc);
	                        	series_TotalRelay.addPoint([x, y_TotalRelay]);
	                        	series_EnableRelay.addPoint([x, y_EnableRelay]);
	                        	series_OverLoadRelay.addPoint([x, y_OverLoadRelay]);
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
	            text : 'RELAYRC详细信息'
	        },
	        exporting: {
	            enabled: false
	        },
	        series : [{
	            name : '当前Relay总数',
	           // color : "#0A0A0A",
	            data : (function () {
	                // generate an array of random data
	                var data = [], time = getTime(data_all_relayrc).getTime(), i;
	                    data.push([
	                        time,
	                        getRelayTotalNum(data_all_relayrc)
	                    ]);
	                return data;
	            }())
	        },
		      {
		          name : '可用Relay数量',
		         // color : "#ff00ff",
		          data : (function () {
		              // generate an array of random data
		              var data = [], time = getTime(data_all_relayrc).getTime(), i;
		                  data.push([
		                      time,
		                      getEnableRelayNum(data_all_relayrc)
		                  ]);
		              return data;
		          }())
		      },
		      {
		          name : '过载Relay数量',
		         // color : "#ff00ff",
		          data : (function () {
		              // generate an array of random data
		              var data = [], time = getTime(data_all_relayrc).getTime(), i;
		                  data.push([
		                      time,
		                      getOverLoadRelayNum(data_all_relayrc)
		                  ]);
		              return data;
		          }())
		      }
	        ]
	    });
	});
}
