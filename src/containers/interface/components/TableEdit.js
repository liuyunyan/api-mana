import React from "react";
import { observer } from "mobx-react";
import { Table, Input, Form,Typography,Space } from "antd";

@observer
class TableEdit extends React.Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.store = this.props.store;
    this.state = {
      editingKey:''
    };
    this.initColumn()
  }
  initColumn=()=>{
    this.EditableCell = ({
      editing,
      dataIndex,
      title,
      record,
      index,
      children,
      ...restProps
    }) => {
      const inputNode = <Input />;
      return (
        <td {...restProps}>
          {editing ? (
            <Form.Item
              name={dataIndex}
              style={{
                margin: 0,
              }}
              rules={[
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ]}
            >
              {inputNode}
            </Form.Item>
          ) : (
            children
          )}
        </td>
      );
    };
    this.columns = [
      {
        title: '数据源',
        dataIndex: 'datasourceName',
        editable: false,
      },
      {
        title: '数据库',
        dataIndex: 'dbName',
        editable: false,
      },
      {
        title: '引用表',
        dataIndex: 'tableName',
        editable: false,
      },
      {
        title: '引用字段',
        dataIndex: 'columnName',
        // width: '40%',
        editable: false,
      },
      {
        title: '统一KEY',
        dataIndex: 'alias',
        width: '10%',
        editable: true,
      },
      {
        title: '统一KEY名称',
        dataIndex: 'aliasDescribe',
        width: '15%',
        editable: true,
      },
      {
        title: '操作',
        dataIndex: 'operation',
        render: (_, record) => {
          const editable = this.isEditing(record);
          return editable ? (
            <Space size="middle">
              <a
                href="javascript:;"
                onClick={() => this.save(record.columnName)}
              >
                保存
              </a>
              <a
                href="javascript:;"
                onClick={() => this.cancel(record.columnName)}
              >
                取消
              </a>
              </Space>
          ) : (<Space size="middle">
            <Typography.Link disabled={this.state.editingKey !== ''} onClick={() => this.edit(record)}>
              编辑
            </Typography.Link>
            <Typography.Link disabled={this.state.editingKey !== ''} onClick={() => this.remove(record)}>
              删除
            </Typography.Link>
            </Space>
            
          );
        },
      },
    ];
    this.mergedColumns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
    
      return {
        ...col,
        onCell: (record) => ({
          record,
          // inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
  }
  componentDidMount() {
  }
  componentWillUnmount() { }

  handleCancel() {
    
  }

  edit = (record) => {
  this.formRef.current.setFieldsValue({...record});
    this.setState({editingKey:record.key})
  };
  cancel = () => {
    this.setState({editingKey:''})
  };
  remove=(values)=> {
    this.store.setTables("inputList",values,'remove')
  }
 
  save = () => {
    let values = this.formRef.current.getFieldValue()
    this.store.setTables("inputList",values)
    this.setState({editingKey:''})
  };
  isEditing = (record) => record.key === this.state.editingKey;

  render() {
    const key = this.props.key;
    const data = this.store.inputList//[key]
    return (
      <Form component={false} ref={this.formRef} name="table-ref" 
      >
      <Table
        components={{
          body: {
            cell: this.EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={this.mergedColumns}
        rowClassName="editable-row"
        // pagination={{
        //   onChange: cancel,
        // }}
      />
    </Form>
    );
  }
}
export default TableEdit;