package cn.butel.MeetingSuperMonitorShow.ws.proxy;


import net.sf.json.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import cn.butel.MeetingSuperMonitorShow.common.HttpPostMethod;


/**
 * spring类
 * 
 * @Author 刘艳伟
 * @date 2014-2-17上午10:54:41
 * @类功能　
 */

@Component
public class RestTemplateProxy implements InitializingBean {

	protected Logger logger = Logger.getLogger(RestTemplateProxy.class);

	@Autowired
	private RestTemplate restTemplate;

	private String baseUrl;
	public String getBaseUrl() {
		return baseUrl;
	}

	public void setBaseUrl(String baseUrl) {
		if (baseUrl.endsWith("/")) {
			baseUrl = StringUtils.substringBeforeLast(baseUrl, "/");
		}
		this.baseUrl = baseUrl;
	}

	public void afterPropertiesSet() throws Exception {
		if (StringUtils.isEmpty(baseUrl)) {
			throw new RuntimeException("baseUrl not set");
		}
	}

	public Result postJson(String url, String json) {
		String jsonResult = null;
		try {
			jsonResult = restTemplate.exchange(baseUrl + url, HttpMethod.POST, createHttpEntity(json), String.class).getBody();
		} catch (Exception e) {
			logger.error("调用接口:" + baseUrl + url + "失败");
			return null;
		}
		return handleResult(jsonResult);
	}

	public JSONObject postJsonWithReturnJSONObject(String url, String json) {
		String jsonResult = null;
		try {
			jsonResult = restTemplate.postForObject(baseUrl + url, createHttpEntity(json), String.class);
		} catch (Exception e) {
			logger.error("调用接口:" + baseUrl + url + "失败");
			return null;
		}
		return getJSONObject(jsonResult);
	}

	/**
	 * url 访问网盘服务的完整url
	 * 
	 * @param url
	 * @param json
	 * @return
	 */
	public JSONObject postJsonToCloudStore(String url, String json) {
		String jsonResult = null;
		try {
			jsonResult = restTemplate.postForObject(url, createHttpEntity(json), String.class);
		} catch (Exception e) {
			logger.error("调用接口:" + baseUrl + url + "失败");
			return null;
		}

		return getJSONObject(jsonResult);
	}

	/**
	 * 从网盘下载文件
	 * 
	 * @param url
	 * @param json
	 * @return
	 */
	public ByteArrayResource downloadFromCloudStore(String url, String json) {
		try {
			return restTemplate.postForObject(url, createHttpEntity(json), ByteArrayResource.class);
		} catch (Exception e) {
			logger.error("调用接口:" + url + "失败" + "(" + e.getMessage() + ")");
		}
		return null;
	}

	public JSONObject postFormToCloudStore(String url, MultiValueMap<String, Object> form) {
		String json = null;
		try {
			json = restTemplate.postForObject(url, form, String.class);
		} catch (Exception e) {
			logger.error("调用接口:" + url + "失败" + "(" + e.getMessage() + ")");
			return null;
		}
		return getJSONObject(json);
	}

	public Result postForm(String url, MultiValueMap<String, Object> form) {
		String json = null;
		try {
			json = restTemplate.postForObject(baseUrl + url, form, String.class);
		} catch (Exception e) {
			logger.error("调用接口:" + baseUrl + url + "失败" + "(" + e.getMessage() + ")");
			return null;
		}
		return handleResult(json);
	}

	// TODO spring中被用到的
	public JSONObject postFormWithReturnJSONObject(String url, MultiValueMap<String, Object> form) {
		String json = null;
		try {
			json = restTemplate.postForObject(baseUrl + url, form, String.class);
		} catch (Exception e) {
			logger.error("调用接口:" + baseUrl + url + "失败" + "(" + e.getMessage() + ")");
			return null;
		}
		return getJSONObject(json);
	}
	
	//TODO spring中被用到的
	public HttpPostMethod httpPostMothed(String url) {
			return new HttpPostMethod(baseUrl + url);
	}
	
	public HttpPostMethod httpPostToOutSide(String url){
		return new HttpPostMethod(url);
	}

	public static HttpEntity<String> createHttpEntity(String json) {
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.set("Accept", "application/json");
		requestHeaders.set("Accept-Charset", "utf-8");
		requestHeaders.set("Content-Type", "application/json;charset=utf-8");
		HttpEntity<String> httpEntity = new HttpEntity<String>(json, requestHeaders);
		return httpEntity;
	}

	private Result handleResult(String json) {
		if (StringUtils.isEmpty(json)) {
			logger.error("数据访问层返回空字符串:" + json);
			return null;
		}
		try {
			JSONObject fromObject = JSONObject.fromObject(json);
			Result result = new Result(fromObject.getInt("result"), json);
			return result;
		} catch (Exception e) {
			logger.error("解析返回JSON出错");
			logger.error(e.getMessage(), e);
			return null;
		}

	}

	private JSONObject getJSONObject(String json) {
		if (StringUtils.isEmpty(json)) {
			logger.error("数据访问层返回空字符串:" + json);
			return null;
		}
		try {
			JSONObject fromObject = JSONObject.fromObject(json);
			return fromObject;
		} catch (Exception e) {
			logger.error("解析返回JSON出错!");
			logger.error(e.getMessage(), e);
			return null;
		}

	}

}

