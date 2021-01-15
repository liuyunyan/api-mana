import { makeAutoObservable, action } from "mobx";
import Config from "../config";
import axios from "./AxiosAjax";
import { message } from "antd";
export default class SourceStore {
  constructor() {
    makeAutoObservable(this);
  }

  data = []; //
  columns = [
    { key: "name", label: "数据源名称", type: "String", validate: { required: true } },
    { key: "type", label: "数据库类型", type: "Enum", validate: { required: true }, defaultValue: "MYSQL", EnumData: [{ title: "MYSQL", value: "MYSQL" }, { title: "pg", value: "pg" }] },
    {
      key: "mark", label: "备注", type: "TextArea", validate: {
        required: false, 
        customer: (value) => {
          if (value.length >= 5) {
            return true
          } else {
            return false
          }
        },
      }, placeholder: "请输入至少5个字符"
    },
    { key: "ip", label: "ip地址", type: "string", validate: { required: true } },
    { key: "port", label: "端口号", type: "Number", validate: { required: true } },
    { key: "username", label: "用户名", type: "String", validate: { required: true } },
    { key: "password", label: "密码", type: "String", validate: { required: true } },
  ]; //
  values = {};
  validates = {}

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

  validateValue(value) {
    let columns = this.columns;
    let length = columns.length;
    for (let i = 0; i < length; i++) {
      let col = columns[i]
      let { validate, key, label } = col;
      let value = this.values[key];
      if (validate.required) {
        if (!value && value !== 0) {
          let validateMessage = { hasFeedback: true, validateStatus: "error", help: label + "必输" }
          this.validates[key] = validateMessage
          break;
        }
      }
      if (validate.customer && typeof validate.customer === 'function') {
        if(!value){
          value = ""
        }
        let flag = validate.customer(value)
        if (!flag) {
          let validateMessage = { hasFeedback: true, validateStatus: "error", help: label + "必输" }
          this.validates[key] = validateMessage
          break;
        }
      }
      let validateMessage = { hasFeedback: true, validateStatus: "success" }
      this.validates[key] = validateMessage
    }
  }
  beforeSave() {
    this.validateValue()
    let arr = Object.values(this.validates)
    let flag = arr.find((val) => {
      if (val.validateStatus === "error") {
        return true
      }
      return false
    })
    return flag
  }

  onSave(data) {
    this.validateValue()
    let flag = this.beforeSave()
    if (flag) {
      message.error("校验失败")
      return false
    }
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
    this.validateValue()
    let flag = this.beforeSave()
    if (flag) {
      message.error("校验失败")
      return false
    }
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
