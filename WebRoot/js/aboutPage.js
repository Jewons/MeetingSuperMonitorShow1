var MeetingInfoList; 
var data_for_tablePage_STP;

function ShowDetailDataForPaging(data){
	
	var ret_info = JSON.parse(data.ret_info);
	MeetingInfoList = ret_info.info;
	data_for_tablePage = data;
	showDataPaging(data,MeetingInfoList,1,10);
}

function showDataPaging(data,list,currPage,pageSize){
	var flag = responsePagination(list,currPage,pageSize);
	var table_html = "";
	var pages = "";
	var size;
	var page_html = "";
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
	$("#stpTable2").html(table_html);
	page_html += "&nbsp;&nbsp;" + pages + "&nbsp;&nbsp;第"
	+ currPage + "页";
	$("#stpPaging").html(page_html);
}
function aaa(currPage,pageSize){
	//console.info("aaaglist:"+glist);
	showDataPaging(data_for_tablePage,MeetingInfoList,currPage,pageSize);
}
function responsePagination(list,currPage,pageSize){
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
function floatToint(data){
	if(isNaN(data) == true){
		return "非数字类型，无法处理";
	}else{
		if((data+"").indexOf(".")==-1){//当是整数时直接返回
			return data;
		}else{
			return parseInt((data+"").split(".")[0]);
		}
	}
}