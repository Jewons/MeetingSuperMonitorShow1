package cn.butel.MeetingSuperMonitorShow.common;

import java.util.ResourceBundle;


/**
 * 配置文件读取
 * @author Belie
 */
public class CommStats {
	  
	public static final String version;
	public static final Integer STPNUM;
	public static final Integer RELAYNUM;
//	public static final String Logkeyword;
	static
	   {  
		   version = ResourceBundle.getBundle("config").getString("version");
//		   Logkeyword = ResourceBundle.getBundle("config").getString("keyword");
		   STPNUM = Integer.parseInt(ResourceBundle.getBundle("config").getString("STPNUM")); 
		   RELAYNUM = Integer.parseInt(ResourceBundle.getBundle("config").getString("RELAYNUM")); 
	   }
}
