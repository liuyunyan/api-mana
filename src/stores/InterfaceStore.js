import { makeAutoObservable, action } from "mobx";
import Config from "../config";
import axios from "./AxiosAjax";
import { message } from "antd";
export default class InterfaceStore {
  constructor() {
    makeAutoObservable(this);
  }

  data = []; //
  sourceList = []; //
  dbList = []; //
  tableList = []; //
  fieldsList = []; //
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
  InterColumns = [
    {
      key: "type", label: "接口类型", type: "Enum", validate: { required: true }, defaultValue: "POST",
      EnumData: [{ title: "POST", value: "POST" },
      { title: "GET", value: "GET" },
      { title: "PUT", value: "PUT" },
      { title: "DELETE", value: "DELETE" }
      ]
    },
    { key: "URL", label: "URL", type: "String", validate: { required: true } ,readOnly:true},
    { key: "datasourceId", label: "数据源", type: "Refer", validate: { required: true } },
    { key: "dbName", label: "数据库", type: "Refer", validate: { required: true } },
  ];
  values = {};
  validates = {}
  inputList=[]
  outputList=[]

  //获取表格的列模型
  queryList() {
    let reqconfig = {
      method: "GET",
      url: Config.interface.query + `?pageNum=${1}&pageSize=${10}`,
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
                "isPublish": 0,
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
                "isPublish": 1,
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
          res.data.list = res.data.list.map((item, index) => {
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
      url: Config.interface.publish + `${id}?isPublish=true`,
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
      url: Config.interface.publish + `${id}?isPublish=false`,
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

  querySource() {
    let reqconfig = {
      method: "GET",
      url: Config.source.query,
    };
    return axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
          res.data.list = res.data.list.map((val, index) => {
            val.key = val.id;
            val.title = val.name;
            return val;
          })
          this.sourceList = Object.assign([], res.data.list);
          return true
        } else {
          message.error(res.errmsg)
        }
      })
      .catch((err) => {
        console.log(err)
        // message.error('数据请求失败')
      });
  }
  queryDBList(id) {
    let reqconfig = {
      method: "GET",
      url: Config.interface.queryDBs + id,
    };
    axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
          res.data = res.data.map((val, index) => {
            let vals = {key:val,title:val,id:id}
            // val.key = val;
            // val.title = val;
            // val.id = id;
            return vals;
          })
          this.dbList = Object.assign([], res.data);
        } else {
          message.error(res.errmsg)
        }
      })
      .catch((err) => {
        console.log(err)
        message.error('数据请求失败')
      });
  }
  queryDBTables(id,dbName) {
    let reqconfig = {
      method: "GET",
      url: Config.interface.queryDBTables + id+`?dbName=${dbName}`,
    };
    axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
          res.data = res.data.map((val, index) => {
            val.key = val.tableName;
            val.title = val.tableName;
            val.dbName = dbName;
            val.id = id;
            return val;
          })
          this.tableList = Object.assign([], res.data);
        } else {
          message.error(res.errmsg)
        }
      })
      .catch((err) => {
        console.log(err)
        message.error('数据请求失败')
      });
  }
  queryDBFileds(id, dbName,tableName) {
    let reqconfig = {
      method: "GET",
      url: Config.interface.queryDBFileds + id + `?dbName=${dbName}&tableName=${tableName}`,
    };
    axios(reqconfig)
      .then((res) => {
        if (res.errno === 200) {
          let fieldsList = res.data.fields;
          fieldsList = fieldsList.map((val,index)=>{
            val.tableName = tableName
            return val
          })
          this.fieldsList = Object.assign([], fieldsList);
        } else {
          message.error(res.errmsg)
        }
      })
      .catch((err) => {
        console.log(err)
        message.error('数据请求失败')
      });
  }

  setTables(key,row,addOrRemove) {
    let tableList = this[key]
    let currentIndex = -1;
    let oldRow = tableList.find((val,index)=>{
      if(val.columnName === row.columnName){
        currentIndex = index
        return true
      }
      return false
    })
    if(oldRow){
      if(addOrRemove==="add"){
        message.error(row.columnName+"已存在")
        return
      }else if(addOrRemove === 'remove'){
        tableList.splice(currentIndex,1)
      }else{
        oldRow = Object.assign(oldRow,row)
      }
    }else{
      tableList.push(row)
    }
    this[key]=Object.assign([],tableList)
  }


}
