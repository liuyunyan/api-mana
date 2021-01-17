import { makeAutoObservable, action } from "mobx";
import Config from "../config";
import axios from "./AxiosAjax";
import { message } from "antd";
export default class UserStore {
  constructor() {
    makeAutoObservable(this);
  }

  data = []; //
  columns = [
    { key: "username", label: "用户名", type: "String", validate: { required: true } },
    { key: "nickName", label: "昵称", type: "String", validate: { required: false } },
    { key: "password", label: "密码", type: "String", validate: { required: true } },
    {
      key: "remarks", label: "备注", type: "TextArea", validate: {
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
  ]; //
  values = {};
  validates = {}

  //获取表格的列模型
  queryList() {
    let reqconfig = {
      method: "GET",
      url: Config.user.query + `?pageNum={pageNum}&pageSize={pageSize}`,
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
      url: Config.user.queryDetail + (id || this.values.id),
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
        if (!value) {
          value = ""
        }
        let flag = validate.customer(value)
        if (!flag) {
          let validateMessage = { hasFeedback: true, validateStatus: "error", help: "请输入正确的格式" }
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
      url: Config.user.add,
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
      url: Config.user.update,
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
      url: Config.user.delete + (id || this.values.id),
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
  onCreat() {
    //
    message.info('apiKey')
  }
}
