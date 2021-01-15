/**
 * @file 弹出层组件 显示 有用
 */
import React from "react";
import { observer } from "mobx-react";
import { Form, Input, Select, InputNumber, Button, message } from "antd";
const { Option } = Select;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

@observer
class ThirdEdit extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = {
    };
    this.onCreat = this.onCreat.bind(this)
  }
  // formRef = React.createRef();

  componentDidMount() {
    // this.setState(this.props.values)
  }
  // componentWillReceiveProps(nextProps) {
  //   if(JSON.stringify(nextProps.values)!==JSON.stringify(this.props.values)){
  //     // this.setState(nextProps.values)
  //   }
  // }

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
  // handleTextChange = (col, event) => {
  //   let key = col.key
  //   let value = event.target.value.trim()
  //   this.setValue(value)
  // };
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
  onCreat() {
    this.store.onCreat()
  }
  render() {
    // const style = { color: '#f5222d', marginRight: "5px" }
    let { columns } = this.props;
    let { values, validates } = this.store;
    return (
      <Form {...layout} //name="control-hooks" //onFinish={this.onFinish}
        initialValues={{ "type": "MYSQL" }}
      >
        {columns.map((col, index) => {
          let value = values[col.key];
          let validate = validates[col.key]
          let required = col.validate && col.validate.required
          if (col.type === "String") {
            return (
              <Form.Item
                key={index}
                // name={col.key}
                label={(<span>{required ? (<span className="color-red mr5">*</span>) : null}{col.label}</span>)}
                {...validate}

              >
                <Input
                  onChange={this.handleInputChange.bind(this, col)}
                  value={value} placeholder={"请输入"} />
              </Form.Item>
            );
          }
          if (col.type === "Enum") {
            return (
              <Form.Item
                key={index}
                // name={col.key}
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
              </Form.Item>);
          }
          if (col.type === "TextArea") {
            return (
              <Form.Item
                key={index}
                // name={col.key}
                label={(<span>{required ? (<span className="color-red mr5">*</span>) : null}{col.label}</span>)}
                {...validate}
              >
                <Input.TextArea onChange={this.handleInputChange.bind(this, col)} value={value} placeholder={col.placeholder || "请输入"} />
              </Form.Item>);
          }
          if (col.type === "Number") {
            return (
              <Form.Item
                key={index}
                // name={col.key}
                label={(<span>{required ? (<span className="color-red mr5">*</span>) : null}{col.label}</span>)}
                {...validate}
              >
                <InputNumber onChange={this.handleNumberChange.bind(this, col)} value={value} placeholder={col.placeholder || "请输入"} />
              </Form.Item>);
          }
        })}
        <Form.Item {...tailLayout}>
          <Button type="link" htmlType="button" onClick={this.onCreat}>
          点击生成
          </Button>
        </Form.Item>
      </Form>

    );
  }
}

export default ThirdEdit;
