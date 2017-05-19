var xml_all = null;
var unKnownSeverNum = 0;
function LoadXml()
{ 	
    $.ajax({
        url: "SeverList.xml",
        dataType: 'xml',
        type: 'post',
        timeout: 2000,
        error: function(xml)
        {
            alert("加载XML 文件出错！");
        },
        success: function(xml)
        {
        	xml_all = xml;
        	//alert("加载XML 成功!");
        	//GetXml(xml,"STPRC","10.130.66.21:20012");
        }
    });
}
function GetXml(xml,index,ip){
	var id;
	$(xml).find(index).each(function(i) {     //查找所有student节点并遍历  
	        if(ip == $(this).attr("ip")){//获取节点的属性  
	        	id = $(this).children("name").text();  //获得子节点  
	        }
	        else{
	        	id = ip;
	        }
	    });
	xml_all = xml;
	alert(id);
}
function GetSeverNameByIp(xml,index,ip){
	var id = "unKnownSever";
	$(xml).find(index).each(function(i) {     //查找所有student节点并遍历  
	        if(ip == $(this).attr("ipPort")){//获取节点的属性    
	        	//return id;
	        	id = $(this).children("name").text(); //获得子节点
	        }
	    }); 
	//alert(id);
	return id;
}