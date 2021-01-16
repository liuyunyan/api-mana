import { makeAutoObservable, action } from "mobx";
import Config from "../config";
import axios from "./AxiosAjax";
import { message } from "antd";
export default class InterfaceStore {
  constructor() {
    makeAutoObservable(this);
  }

  data = []; //
  columns = [
    { key: "name", label: "接口名称", type: "String", validate: { required: true } },
    { key: "identifier", label: "接口编号", type: "String", validate: { required: true }, defaultValue: "MYSQL", EnumData: [{ title: "MYSQL", value: "MYSQL" }, { title: "pg", value: "pg" }] },
    // { key: "ip", label: "ip地址", type: "String", validate: { required: true } },
    // { key: "port", label: "端口号", type: "Number", validate: { required: true } },
    // { key: "username", label: "用户名", type: "String", validate: { required: true } },
    // { key: "password", label: "密码", type: "String", validate: { required: true } },
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
  ]; //
  values = {};
  validates = {}

  //获取表格的列模型
  queryList() {
    let reqconfig = {
      method: "GET",
      url: Config.interface.query+`?pageNum=${1}&pageSize=${10}`,
    };
    return axios(reqconfig)
      .then((res) => {
        res = {
          "errno": 200,
          "errmsg": "success",
          "data": {
            "pageNum": 1,
            "pageSize": 10,
            "size": 1,
            "startRow": 1,
            "endRow": 1,
            "total": 1,
            "pages": 1,
            "list": [
              {
                "id": 6,
                "datasourceId": 1,
                "name": "??1",
                "identifier": "itf1",
                "inputParameter": {
                  "parmDTOList": [
                    {
                      "datasourceName": "test1",
                      "dbName": "test1",
                      "tableName": "test1",
                      "columnName": "test1",
                      "alias": "test1",
                      "aliasDescribe": "test1"
                    },
                    {
                      "datasourceName": "test12",
                      "dbName": "test12",
                      "tableName": "test12",
                      "columnName": "test12",
                      "alias": "test12",
                      "aliasDescribe": "test12"
                    }
                  ]
                },
                "outputParameter": {
                  "parmDTOList": [
                    {
                      "datasourceName": "test1",
                      "dbName": "test1",
                      "tableName": "test1",
                      "columnName": "test1",
                      "alias": "test1",
                      "aliasDescribe": "test1"
                    },
                    {
                      "datasourceName": "test12",
                      "dbName": "test12",
                      "tableName": "test12",
                      "columnName": "test12",
                      "alias": "test12",
                      "aliasDescribe": "test12"
                    }
                  ]
                },
                "sql": "select * from table1",
                "isPublish":0,
                "remarks": "??1",
                "createTime": 1610612718000,
                "updateTime": 1610612718000
              },
              {
                "id": 7,
                "datasourceId": 1,
                "name": "??2",
                "identifier": "itf2",
                "inputParameter": {
                  "parmDTOList": [
                    {
                      "datasourceName": "test1",
                      "dbName": "test1",
                      "tableName": "test1",
                      "columnName": "test1",
                      "alias": "test1",
                      "aliasDescribe": "test1"
                    },
                    {
                      "datasourceName": "test12",
                      "dbName": "test12",
                      "tableName": "test12",
                      "columnName": "test12",
                      "alias": "test12",
                      "aliasDescribe": "test12"
                    }
                  ]
                },
                "outputParameter": {
                  "parmDTOList": [
                    {
                      "datasourceName": "test1",
                      "dbName": "test1",
                      "tableName": "test1",
                      "columnName": "test1",
                      "alias": "test1",
                      "aliasDescribe": "test1"
                    },
                    {
                      "datasourceName": "test12",
                      "dbName": "test12",
                      "tableName": "test12",
                      "columnName": "test12",
                      "alias": "test12",
                      "aliasDescribe": "test12"
                    }
                  ]
                },
                "sql": "select * from table1",
                "isPublish":1,
                "remarks": "??1",
                "createTime": 1610612718000,
                "updateTime": 1610612718000
              },
            ],
            "prePage": 0,
            "nextPage": 0,
            "isFirstPage": true,
            "isLastPage": true,
            "hasPreviousPage": false,
            "hasNextPage": false,
            "navigatePages": 8,
            "navigatepageNums": [
              1
            ],
            "navigateFirstPage": 1,
            "navigateLastPage": 1,
            "lastPage": 1,
            "firstPage": 1
          },
          "request": null,
          "debug": null
        }
        if (res.errno === 200) {
          res.data.list = res.data.list.map((item,index)=>{
            item.idx = index
            return item;
          })
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
      url: Config.interface.queryDetail + (id || this.values.id),
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
      url: Config.interface.add,
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
      url: Config.interface.update,
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
      url: Config.interface.delete + (id || this.values.id),
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
  onPublish(id) {
    let reqconfig = {
      method: "GET",
      url: Config.interface.publish+`${id}?isPublish=true`,
    };
    axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
          message.success("发布成功")
        } else {
          message.error(res.errmsg)
        }
      })
      .catch((err) => {
        console.log(err)
        message.error('数据请求失败')
      });
  }
  onDown(id) {
    let reqconfig = {
      method: "GET",
      url: Config.interface.publish+`${id}?isPublish=false`,
    };
    axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
          message.success("下线成功")
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
