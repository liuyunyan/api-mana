import { observable, computed, action } from "mobx";
import GlobalStore from "./GlobalStore";
import Config from "../config";
import axios from "./AxiosAjax";
export default class SourceStore {
  @observable data = []; //
  @observable columns = [
    {key:"name",label:"数据源名称",type:"String",required:true},
    {key:"type",label:"数据库类型",type:"Enum",required:true,EnumData:[{title:"MYSQL",value:"MYSQL"}]},
    {key:"mark",label:"备注",type:"TextArea",required:false,placeholder:"请输入至少5个字符"},
    {key:"ip",label:"ip地址",type:"string",required:true},
    {key:"port",label:"端口号",type:"Number",required:true},
    {key:"username",label:"用户名",type:"String",required:true},
    {key:"password",label:"密码",type:"String",required:true},
  ]; //

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
