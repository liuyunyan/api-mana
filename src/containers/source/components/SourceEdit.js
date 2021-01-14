/**
 * @file 弹出层组件 显示 有用
 */
import React from "react";
// import { observer } from "mobx-react";
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

// @observer
class SourceEdit extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = {
    };
    this.onTest=this.onTest.bind(this)
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

  onFinish = (values) => {
    console.log(values);
    this.props.onSave(values)
  };
  handleChange = (key, event) => {
    // console.log(key,);
    let value = event.target.value.trim()
        this.store.values[key] = value
  }
  onSelectChange = (key, value) => {
    this.store.values[key] = value
  };
  handleTextChange = (key, event) => {
    // console.log(key,value);
    let value = event.target.value.trim()
    this.store.values[key] = value
  };
  handleNumberChange = (key, value) => {
    this.store.values[key] = value
  };
  onReset = () => {
  }
  onTest() {
    this.store.onTest()
  }
  render() {
    let { columns } = this.props;
    let values = this.store.values;
    return (
      <Form {...layout} //name="control-hooks" //onFinish={this.onFinish}
        initialValues={{ "type": "MYSQL" }}
      >
        {columns.map((col, index) => {
          let value = values[col.key]
          if (col.type === "String") {
            return (
              <Form.Item
                key={index}
                // name={col.key}
                label={col.label}
                rules={
                  col.required
                    ? [
                      {
                        required: true,
                      },
                    ]
                    : null
                }
              >
                <Input 
                onChange={this.handleChange.bind(this, col.key)}
                 value={value} placeholder={ "请输入"} />
              </Form.Item>
            );
          }
          if (col.type === "Enum") {
            return (
              <Form.Item
                key={index}
                // name={col.key}
                label={col.label}
                rules={
                  col.required
                    ? [
                      {
                        required: true,
                      },
                    ]
                    : null
                }
              >
                <Select
                  placeholder={col.placeholder || "请选择"}
                  onChange={this.onSelectChange.bind(this, col.key)}
                  allowClear
                  value={value}
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
                label={col.label}
                rules={
                  col.required
                    ? [
                      {
                        required: true,
                      },
                    ]
                    : null
                }
              >
                <Input.TextArea onChange={this.handleTextChange.bind(this, col.key)} value={value} placeholder={col.placeholder || "请输入"} />
              </Form.Item>);
          }
          if (col.type === "Number") {
            return (
              <Form.Item
                key={index}
                // name={col.key}
                label={col.label}
                rules={
                  col.required
                    ? [
                      {
                        required: true,
                      },
                    ]
                    : null
                }
              >
                <InputNumber onChange={this.handleNumberChange.bind(this, col.key)} value={value} placeholder={col.placeholder || "请输入"} />
              </Form.Item>);
          }
        })}
        <Form.Item {...tailLayout}>
          <Button type="link" htmlType="button" onClick={this.onTest}>
            测试连接
          </Button>
        </Form.Item>
        </Form>
        
    );
  }
}

export default SourceEdit;
