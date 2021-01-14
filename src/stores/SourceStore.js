import { makeAutoObservable } from "mobx";
import Config from "../config";
import axios from "./AxiosAjax";
import { message } from "antd";
export default class SourceStore {
  constructor() {
    makeAutoObservable(this);
  }

  data = []; //
  columns = [
    { key: "name", label: "数据源名称", type: "String", required: true },
    { key: "type", label: "数据库类型", type: "Enum", required: true, defaultValue: "MYSQL", EnumData: [{ title: "MYSQL", value: "MYSQL" }, { title: "pg", value: "pg" }] },
    { key: "mark", label: "备注", type: "TextArea", required: false, placeholder: "请输入至少5个字符" },
    { key: "ip", label: "ip地址", type: "string", required: true },
    { key: "port", label: "端口号", type: "Number", required: true },
    { key: "username", label: "用户名", type: "String", required: true },
    { key: "password", label: "密码", type: "String", required: true },
  ]; //
  values = {}

  //获取表格的列模型
  queryList() {
    let reqconfig = {
      method: "GET",
      url: Config.source.query,
    };
    return axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
          this.data = Object.assign([], res.data.list);
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
  queryByid(id) {
    let reqconfig = {
      method: "GET",
      url: Config.source.queryDetail + (id || this.values.id),
    };
    axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
          this.values = Object.assign({}, res.data);
        } else {
          message.error(res.errmsg)
        }
      })
      .catch((err) => {
        console.log(err)
        message.error('数据请求失败')
      });
  }
  onSave(data) {
    let reqconfig = {
      method: "POST",
      url: Config.source.add,
      data: data,
    };
    return axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
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
  onUpdate(data) {
    let reqconfig = {
      method: "PUT",
      url: Config.source.update,
      data: data,
    };
    return axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
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
  onDelete(id) {
    let reqconfig = {
      method: "DELETE",
      url: Config.source.delete + (id || this.values.id),
    };
    return axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
          message.success("删除成功")
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
  onTest(data) {
    let reqconfig = {
      method: "POST",
      url: Config.source.connection,
      data: data || this.values,
    };
    axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
          message.success("连接成功")
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
