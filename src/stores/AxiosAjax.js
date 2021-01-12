import axios from 'axios'
import GlobalStore from "../stores/GlobalStore";

/**
 * 请求拦截器
 * 请求之前加上加载图和统一的头信息
 */
axios.defaults.withCredentials=true;

axios.interceptors.request.use(function (config) {
  if (!config.noShowGlobalShowWait) {
    GlobalStore.showWait();
  }
  return {
    // dataType: 'json',
    headers: {
      contentType: 'application/json'
    },
    withCredentials:true,
    ...config
   };
}, function (err) {
  return Promise.reject(err);
});

/**
 * 响应拦截器
 * 响应后去掉加载图
 */
axios.interceptors.response.use(function (response) {
  GlobalStore.hideWait();
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }else{
    console.log(response)
    return Promise.reject(response);
  }
}, function (err) {
  console.log(err)
  GlobalStore.hideWait();
  return Promise.reject(err);
});

export default axios