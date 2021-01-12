import { observable, computed, action } from "mobx";
import GlobalStore from "./GlobalStore";
import Config from "../config";
import axios from "./AxiosAjax";
export default class SourceStore {
  @observable data = []; //
  //获取表格的列模型
  @action queryList() {
    let reqconfig = {
      method: "GET",
      url: Config.source.query,
    };
    axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
          this.data = Object.assign([],res.data.list);
        }
      })
      .catch((err) => {
        // GlobalStore.showInfo("数据请求失败,错误信息:");
      });
  }
}
