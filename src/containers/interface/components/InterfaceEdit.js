/**
 * @file 弹出层组件 显示 有用
 */
import React from "react";
import { observer } from "mobx-react";
import { Form, Input, Select, InputNumber, Button, Row, Col, Card, Table } from "antd";
import AsyncTree from './AsyncTree';
import TableEdit from './TableEdit';
import CodeEdit from './CodeEdit';

const { Option } = Select;

const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

@observer
class InterfaceEdit extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = {
      sqlValue: '',
      sqlValuePaste: '',
      fieldsValues: {}
    };
    this.handleOk = this.handleOk.bind(this)
    this.addInput = this.addInput.bind(this)
    this.addOutput = this.addOutput.bind(this)
    this.queryDBFileds = this.queryDBFileds.bind(this)
    this.initColumn()
  }
  initColumn = () => {
    this.fieldsColumns = [
      // {
      //   title: '序号',
      //   key: 'idx',
      //   dataIndex: 'idx',
      //   render: (idx) => (idx + 1),
      // },
      {
        title: '字段名',
        key: 'name',
        dataIndex: 'name',
      },
      {
        title: '类型',
        key: 'type',
        dataIndex: 'type',
      },
      {
        title: '长度',
        key: 'size',
        dataIndex: 'size',
      },
      {
        title: '操作',
        width: '180px',
        key: 'option',
        dataIndex: 'option',
        render: (text,record) => [
          <a key="link" onClick={this.addInput.bind(this,record.name)}>+输入参数</a>,
          <a key="link2" className="color-red ml10"
            onClick={this.addOutput.bind(this,record.name)}
          >+返回值</a>],
      },
    ];
  }

  componentDidMount() {
    this.store.querySource()
    // this.setState(this.props.values)
  }

  handleInputChange = (col, event) => {
    let key = col.key
    let value = event.target.value.trim()
    let flag = this.validateValue(col, value)
    if (flag) {
      this.setValue(key, value)
    }
  }
  onSelectChange = (col, value) => {
    let key = col.key
    let flag = this.validateValue(col, value)
    if (flag) {
      this.setValue(key, value)
    }
  };
  onReferChange = (col, value) => {
    let key = col.key
    let flag = this.validateValue(col, value)
    if (flag) {
      this.setValue(key, value)
      if (key === "datasourceId") {
        this.store.queryDBList(value)
      } else if (key === "dbName") {
        this.store.queryDBTables(value)
      }

    }
  };

  handleNumberChange = (col, value) => {
    let key = col.key
    let flag = this.validateValue(col, value)
    if (flag) {
      this.setValue(key, value)
    }
  };
  setValue = (key, value) => {
    this.store.values[key] = value
  }
  validateValue = (col, value) => {
    let { validate, key, label } = col;
    if (validate.required) {
      if (!value && value !== 0) {
        let validateMessage = { hasFeedback: true, validateStatus: "error", help: label + "必输" }
        this.store.validates[key] = validateMessage
        return false
      }
    }
    if (validate.customer && typeof validate.customer === 'function') {
      let flag = validate.customer(value)
      if (!flag) {
        this.store.validates[key] = "error"
        let validateMessage = { hasFeedback: true, validateStatus: "error", help: "请输入正确的格式" }
        this.store.validates[key] = validateMessage
        return false
      }
    }

    let validateMessage = { hasFeedback: true, validateStatus: "success" }
    this.store.validates[key] = validateMessage
    return true
  }

  //tree
  queryDBFileds(...attr) {
    this.store.queryDBFileds(...attr)
  }

  //fieldsTable
  addInput(field) {

    // let field = this.state.fieldsValues.name;
    let datasourceId = this.store.values.datasourceId;
    let datasourceName = this.store.values.datasourceId;
    let dbName = this.store.values.dbName;
    console.log(field)
    // return
    let row = { columnName: field, datasourceId, dbName, datasourceName, alias: field }
    this.store.inputList.push(row)
  }
  addOutput(field) { 
    let datasourceId = this.store.values.datasourceId;
    let datasourceName = this.store.values.datasourceId;
    let dbName = this.store.values.dbName;
    console.log(field)
    // return
    let row = { columnName: field, datasourceId, dbName, datasourceName, alias: field }
    this.store.outputList.push(row)
  }


  //sql
  onCursorActivity = (cm) => {
    if (!cm.getSelection()) {
      console.log(cm.getSelection()); // 获取到选中部分内容，用来实现执行部分内容
    }
  };

  onInputRead = async (cm, change, editor) => {
    // const { text } = change;
    // const dechars = ['.'];
    // const autocomplete = dechars.includes(text[0]);
    // if (autocomplete) {
    //   const data = getTableList(); // 获取库表列表
    //   editor.setOption('hintOptions', {
    //     tables: data,
    //     completeSingle: false,
    //   });
    //   cm.execCommand('autocomplete');
    // } else {
    //   const tableName = getTableList(); // 获取表列表
    //   editor.setOption('hintOptions', {
    //     tables: tableName,
    //     completeSingle: false,
    //   });
    // }
    // cm.execCommand('autocomplete');
  };


  handleOk() {
    this.props.handleOk()
  }

  getFields = (columns, values, validates) => {
    const count = columns.length;
    let children = [];
    for (let index = 0; index < count; index++) {
      let item;
      let col = columns[index]

      let key = col.key;
      let value = values[key];
      let validate = validates[key]
      let required = col.validate && col.validate.required
      let readOnly = col.readOnly === true
      if (col.type === "Refer") {
        let dataSource = key === "datasourceId" ? this.store.sourceList : this.store.dbList
        item = (
          <Col span={12} key={index}>
            <Form.Item
              key={index}
              // name={key}
              label={(<span>{required ? (<span className="color-red mr5">*</span>) : null}{col.label}</span>)}
              {...validate}
            >
              <Select
                placeholder={col.placeholder || "请选择"}
                onChange={this.onReferChange.bind(this, col)}
                allowClear
                value={value}
              // defaultValue={col.defaultValue}
              >
                {dataSource.map((val, i) => {
                  return (
                    <Option key={i} value={val.key}>
                      {val.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        );
      }
      if (col.type === "String") {
        item = (
          <Col span={12} key={index}>
            <Form.Item
              key={index}
              // name={key}
              label={(<span>{required ? (<span className="color-red mr5">*</span>) : null}{col.label}</span>)}
              {...validate}

            >
              <Input
                readOnly={readOnly}
                onChange={this.handleInputChange.bind(this, col)}
                value={value} placeholder={"请输入"} />
            </Form.Item>
          </Col>

        );
      }
      if (col.type === "Enum") {
        item = (
          <Col span={12} key={index}>
            <Form.Item
              key={index}
              // name={key}
              label={(<span>{required ? (<span className="color-red mr5">*</span>) : null}{col.label}</span>)}
              {...validate}
            >
              <Select
                placeholder={col.placeholder || "请选择"}
                onChange={this.onSelectChange.bind(this, col)}
                allowClear
                value={value}
                defaultValue={col.defaultValue}
              >
                {col.EnumData.map((val, i) => {
                  return (
                    <Option key={i} value={val.value}>
                      {val.title}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        );
      }
      if (col.type === "TextArea") {

        item = (
          <Col span={24} key={index}>
            <Form.Item
              key={index}
              // name={key}
              label={(<span>{required ? (<span className="color-red mr5">*</span>) : null}{col.label}</span>)}
              {...validate}
            >
              <Input.TextArea onChange={this.handleInputChange.bind(this, col)} value={value} placeholder={col.placeholder || "请输入"} />
            </Form.Item>
          </Col>
        );
      }
      if (col.type === "Number") {
        item = (
          <Col span={12} key={index}>
            <Form.Item
              key={index}
              // name={key}
              label={(<span>{required ? (<span className="color-red mr5">*</span>) : null}{col.label}</span>)}
              {...validate}
            >
              <InputNumber onChange={this.handleNumberChange.bind(this, col)} value={value} placeholder={col.placeholder || "请输入"} />
            </Form.Item>
          </Col>
        );
      }

      children.push(
        item
      );
    }

    return children;
  }

  render() {
    let { columns, InterColumns } = this.props;
    let { values, validates, dbList, fieldsList, inputList, outputList } = this.store;
    let { sqlValue, sqlPaste } = this.state;
    return (
      <Form className="interface" // {...layout} name="control-hooks" //onFinish={this.onFinish}
      >
        <Card title="基本信息">
          <Row gutter={24}>{this.getFields(columns, values, validates)}</Row>
        </Card>

        <Card title="接口定义">
          <Row gutter={24}>{this.getFields(InterColumns, values, validates)}</Row>

          <Card type="inner" title="引用数据">
            <Row gutter={24}>
              <Col span={4} order={1} style={{ borderRight: "1px #ccc solid" }}>
                <AsyncTree treeData={dbList} queryDBFileds={this.queryDBFileds}
                />
              </Col>
              <Col span={20} order={2}>
                <Table columns={this.fieldsColumns} scroll={{ y: '300px' }}
                  onRow={(record) => {
                    return {
                      onClick: (...ev) => {
                        this.setState({ fieldsValues: record })
                      }
                    }
                  }}
                  rowKey='id'
                  dataSource={fieldsList} />
              </Col>

            </Row>
          </Card>
          <Card type="inner" title="输入参数">
            <TableEdit key={"inputList"} field={"inputList"} store={this.store} />
          </Card>
          <Card type="inner" title="返回值">
            <TableEdit key={"outputList"} field={"outputList"} store={this.store} />
          </Card>
          <Card type="inner" title="SQL 语句">
            {/* <CodeEdit
              // className="sql"
              value={sqlValue}
              paste={sqlPaste}
              options={{ readOnly: false }}
              onChange={(sql) => {
                console.log(sql)
                // this.onChange(sql);
              }}// sql变化事件
              onCursorActivity={(cm) => this.onCursorActivity(cm)} // 用来完善选中监听
              onInputRead={
                // 自动补全
                (cm, change, editor) => this.onInputRead(cm, change, editor)
              }
            /> */}
          </Card>
        </Card>

        <Form.Item {...tailLayout}>
          <Button htmlType="button" onClick={this.props.handleCancel}>
            取消
        </Button>
          <Button type="primary" htmlType="button" onClick={this.handleOk}>
            提交
        </Button>
        </Form.Item>
      </Form>

    );
  }
}

export default InterfaceEdit;
