import axios from "axios";
import GlobalStore from "../stores/GlobalStore";

/**
 * 请求拦截器
 * 请求之前加上加载图和统一的头信息
 */

axios.defaults.withCredentials = true;
// axios.defaults.headers.Authorization = "Bearer " + token;

axios.interceptors.request.use(
  function (config) {
    // console.log(config);
    let token = "just-for-dev"; //sessionStorage.getItem("dbsys_token");
    if (!config.noShowGlobalShowWait) {
      GlobalStore.showWait();
    }
    config.headers = {
      contentType: "application/json",
      Authorization: "Bearer " + token,
    };
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

/**
 * 响应拦截器
 * 响应后去掉加载图
 */
axios.interceptors.response.use(
  function (response) {
    GlobalStore.hideWait();
    console.log(response.status);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      console.log(response);
      return Promise.reject(response);
    }
  },
  function (err) {
    console.log(err);
    GlobalStore.hideWait();
    return Promise.reject(err);
  }
);

export default axios;
