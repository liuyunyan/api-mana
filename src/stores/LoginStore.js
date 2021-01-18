import { makeAutoObservable, action } from "mobx";
import Config from "../config";
import axios from "./AxiosAjax";
import { message } from "antd";
export default class LoginStore {
  constructor() {
    makeAutoObservable(this);
  }

  
  onLogin(data) {
    let reqconfig = {
      method: "POST",
      url: Config.user.login,
      data: data,
    };
    return axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
          console.log('Success:', data);

          let token = res.data.tokenStr
          sessionStorage.setItem("dbsys_token", token);

          return true
        } else {
          message.error(res.errmsg)
        }
      })
      .catch((err) => {
        console.log(err)
        message.error('数据请求失败')
      });
  }
}
