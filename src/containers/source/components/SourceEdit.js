/**
 * @file 弹出层组件 显示 有用
 */
import React from "react";
import { observer } from "mobx-react";
import { Form, Input, Select,InputNumber,Button } from "antd";
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
class SourceEdit extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.store;
  }
  formRef = React.createRef();
  onGenderChange = (value) => {
    // switch (value) {
    //   case "MYSQL":
    //     this.formRef.current.setFieldsValue({
    //       note: "MYSQL",
    //     });
    //     return;
    // }
  };
  onFinish = (values) => {
    console.log(values);
  };
  onReset = () => {
    this.formRef.current.resetFields();
  }
  onTest = () => {
    console.log("test");
    // this.formRef.current.resetFields();
  }
  render() {
    let { columns } = this.store;
    console.log(columns)
    return (
      <Form {...layout} name="control-hooks" onFinish={this.onFinish}>
        {columns.map((col, index) => {
          if (col.type === "String") {
            return (
              <Form.Item
                key={index}
                name={col.key}
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
                <Input placeholder={col.placeholder || "请输入"} />
              </Form.Item>
            );
          }
          if (col.type === "Enum") {
            return(
            <Form.Item
              key={index}
              name={col.key}
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
                onChange={this.onGenderChange}
                allowClear
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
            return(
            <Form.Item
              key={index}
              name={col.key}
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
              <Input.TextArea placeholder={col.placeholder || "请输入"} />
            </Form.Item>);
          } 
          if (col.type === "Number") {
            return(
            <Form.Item
              key={index}
              name={col.key}
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
              <InputNumber  placeholder={col.placeholder || "请输入"} />
            </Form.Item>);
          }
        })}
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
          <Button htmlType="button" onClick={this.onReset}>
            重置
          </Button>
          <Button type="link" htmlType="button" onClick={this.onTest}>
            测试连接
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default SourceEdit;
