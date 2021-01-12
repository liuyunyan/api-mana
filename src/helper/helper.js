export function isRealNum(val){
    if(val === "" || val == null){
        return false;
    }
    if(!isNaN(val)){
        return true;
    }else{
        return false;
    }
  }

export function transferDate(dateString){
    if(!dateString){
        return ''
    }
    var year = new Date(dateString).getFullYear();
    var month = new Date(dateString).getMonth()+1;
    var day = new Date(dateString).getDate();
    var hour = new Date(dateString).getHours();
    var minute = new Date(dateString).getMinutes();
    var second = new Date(dateString).getSeconds();
    if(isNaN(year)||isNaN(month)||isNaN(day)||isNaN(hour)||isNaN(minute)||isNaN(second)){
        return cb.lang.template("P_YS_PF_GZTPRE_0000071075") /* "未知日期" */
    }
    return `${year}${cb.lang.template("P_YS_FED_FW_0000022328") /* "年" */}${month}${cb.lang.template("P_YS_FED_FW_0000022392") /* "月" */}${day}${cb.lang.template("P_YS_FED_FW_0000021022") /* "日" */}${hour}${cb.lang.template("P_YS_OA_app_xtywlj_0000037899") /* "时" */}${minute}${cb.lang.template("P_YS_FED_FW_0000021814") /* "分" */}${second}${cb.lang.template("P_YS_FED_FW_0000021789") /* "秒" */}`
}


export function transferDevice(device){
    var tempDevice = 'WEB'
    switch(device){
        case 0:
            tempDevice = 'Web';
            break;
        case 1:
            tempDevice = 'Mobile';
            break;
        case 2 : 
            tempDevice = 'PC Client';
            break;
        default:
            tempDevice = 'Web';
    }
    return tempDevice;
}

export function transferOperationCode(code){
    var codeName = cb.lang.template("P_YS_PF_GZTPRE_0000071088") /* "待定义操作名称" */
    switch(code){
        case 0:
            codeName = cb.lang.template("P_YS_FED_FW_0000021020") /* "新增" */;
            break;
        case 1:
            codeName = cb.lang.template("P_YS_FED_EXAMP_0000019871") /* "删除" */;
            break;
        case 2 : 
            codeName = cb.lang.template("P_YS_FED_FW_0000022188") /* "更新" */;
            break;        
        case 3:
            codeName = cb.lang.template("P_YS_PF_GZTSYS_0000015787") /* "查询" */;
            break;
        case 4:
            codeName = cb.lang.template("P_YS_FED_FW_0000021014") /* "启用" */;
            break;
        case 5 : 
            codeName = cb.lang.template("P_YS_FED_FW_0000020955") /* "停用" */;
            break;
        default:
            codeName = cb.lang.template("P_YS_PF_GZTPRE_0000071094") /* "未知操作" */;
    }
    return codeName;
}
import 'url-search-params-polyfill'
var projectName = window.projectName;
export function requestGet(url,option={}){
    var data = option
    // var url = `${projectName}${url}`
    var paramArr = []
    for(let k in data){
      paramArr.push([k,data[k]]);
    }
    var param = new URLSearchParams(paramArr).toString();
    if(param.length>0){
        if(url.indexOf('?')>=0){
            url = url +'&' + param
        }else{
            url = url + '?' + param
        }
    }
    var option = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'content-type': 'application/json'
      },
      mode: 'cors', // no-cors, cors, *same-origin
    }
    return fetch(url,option) 
            .then((response) => {
                if(response.ok){
                    return response.json()
                }else{
                    return Promise.reject('Get Network Response Was Wrong.')
                }
            })   
            .then(data => {
            // console.log(data);
                return data
            })
            .catch(error => console.error(error))
}

export function requestGetWithoutCatch(url,option={}){
    var data = option
    var url = `${projectName}${url}`
    var paramArr = []
    for(let k in data){
      paramArr.push([k,data[k]]);
    }
    var param = new URLSearchParams(paramArr).toString();
    if(param.length>0){
        if(url.indexOf('?')>=0){
            url = url +'&' + param
        }else{
            url = url + '?' + param
        }
    }
    var option = {
      method: 'GET', // *GET, POST, PUT, DELETE, etc.
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'content-type': 'application/json'
      },
      mode: 'cors', // no-cors, cors, *same-origin
    }
    return fetch(url,option) 
            .then((response) => {
                if(response.ok){
                    return response.json()
                }else{
                    return Promise.reject('Get Network Response Was Wrong.')
                }
            })   
            .then(data => {
            // console.log(data);
                return data
            })
            // .catch(error => console.error(error))
}

  export function requestPost(url,data={}){
    var option = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'content-type': 'application/json'
      },
      body:JSON.stringify(data),
      mode: 'cors', // no-cors, cors, *same-origin
    }
    // var url = `${projectName}${url}`
    return fetch(url,option) 
          .then((response) => {
              if(response.ok){
                  return response.json()
              }else{
                  return Promise.reject('Network response was not ok.')
              }
            })
          .then(data => {
            // console.log(data);
            return data
          })
        //   .catch(error => console.error(error))
  }

  export function requestPostWithFormType(url,data={}){
    var bodyData = `data:${JSON.stringify(data)}`
    var option = {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      headers: {
        'content-type': 'application/x-www-form-urlencode'
      },
      body:bodyData,
      mode: 'cors', // no-cors, cors, *same-origin
    }
    var url = `${projectName}${url}`
    return fetch(url,option) 
          .then((response) => {
              if(response.ok){
                  return response.json()
              }else{
                  return Promise.reject('Network response was not ok.')
              }
            })
          .then(data => {
            // console.log(data);
            return data
          })
        //   .catch(error => console.error(error))
  }


export function requestGetCors(url,option={}){
	return jsonp({url,data:option})
}
function jsonp(options){
	return new Promise((resolve,reject)=>{
		let callbackID=`jsonp_${Date.now()}`,
		container=document.getElementsByTagName('head')[0],
		scriptNode = document.createElement("script"),
		data = options.data || {},
		url = options.url,
		params = [];
		data["callback"]=callbackID
		for (let key in data) {
			params.push(key+"="+data[key]);
		}
		
		url+= (/\?/.test(url))?'&':'?'; 
		url+=params.join('&');
		scriptNode.id=callbackID;
		scriptNode.src = url;
		function removeNode(){
			window[callbackID] = undefined;
			let script=document.getElementById(callbackID)
			container.removeChild(script)
		}
		// scriptNode.onload = scriptNode.onreadystatechange = function(){
		// 	if( -[1,] || /loaded|complete/i.test(this.readyState)){
		// 		self.removeScript(this,errback,jsonpname);
		// 	}
		// }
		scriptNode.onerror = function(){
			reject();
			removeNode()
		}
		window[callbackID]=function(response){
			resolve(response);
			removeNode()
		}
		scriptNode.type = "text/javascript";
		try {
			container.appendChild(scriptNode)
		} catch ( err ){
			reject( err )
		}
	})
	
}
