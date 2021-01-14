import React from "react";
import { observer } from "mobx-react";
import { Table, Row, Col, Button, message } from "antd";
import SourceStore from "../../stores/SourceStore";
import ModalBox from "./components/ModalBox";
import SourceEdit from "./components/SourceEdit";

@observer
class Source extends React.Component {
  constructor(props) {
    super(props);
    // this.columns = [];
    this.state = {
      visible: false,
      isEdit: false,
      values: {}
    };
    this.store = new SourceStore();
    this.handleNew = this.handleNew.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.initColumn()
  }
  initColumn = () => {
    this.columns = [
      {
        title: '数据源名称',
        key: 'name',
        dataIndex: 'name',
        // render: (_) => <a>{_}</a>,
      },
      {
        title: '数据库类型',
        key: 'type',
        dataIndex: 'type',
      },
      {
        title: '地址',
        key: 'ip',
        dataIndex: 'ip',
      },
      {
        title: '端口',
        key: 'port',
        dataIndex: 'port',
      },
      {
        title: '登录账号',
        dataIndex: 'username',
        dataIndex: 'username',
      },
      {
        title: '备注',
        key: 'mark',
        dataIndex: 'mark',
      },
      {
        title: '操作',
        width: '164px',
        key: 'option',
        dataIndex: 'option',
        render: () => [
          <a key="link" onClick={this.handleEdit} style={{marginRight:"10px"}}>编辑</a>, <a key="link2"
            onClick={this.handleRemove}
          >删除</a>],
      },
    ];
  }
  componentDidMount() {
    this.store.queryList();
  }
  componentWillUnmount() { }
  handleNew() {
    this.store.values = {};
    this.setState({
      visible: true,
      isEdit: false,
      values: {}
    });
  }
  handleEdit(values) {
    // console.log(this.store.values)
    this.setState({
      visible: true,
      isEdit: true,
    });
  }
  handleRemove() {
    this.store.onDelete()
  }
  async handleSave() {
    let values = this.store.values
    //调用save接口
    let flag
    if (this.state.isEdit) {
      flag = await this.store.onUpdate(values)
    } else {
      flag = await this.store.onSave(values)
    }
    if (flag) {
      message.success("保存成功")
      this.store.queryList()
      this.setState({
        visible: false,
      });
    } else {
      // message.error("保存失败")
    }


  }
  handleCancel(show) {
    this.setState({
      visible: false,
    });
  }
  render() {
    const data = this.store.data;
    return (
      <Row>
        <Col span={24}>
          <Button type="primary" onClick={this.handleNew}>
            新增
          </Button>
        </Col>
        <Row>
          <Col span={24}>
            <Table columns={this.columns} //scroll={{ x: '100v' }}
              // onRow={(record) => {
              //       // this.store.values = JSON.parse(JSON.stringify(record))
              //       this.setState({values:record})
              // }}
              onRow={(record) => {
                return {
                  onClick: (...ev) => {
                    this.setState({ values: record })
                    this.store.values = JSON.parse(JSON.stringify(record))
                  }
                }
              }}
              rowKey='id'
              dataSource={data} />
          </Col>
        </Row>
        <ModalBox
          modalTitle={this.state.isEdit ? "编辑" : "新增"}
          visible={this.state.visible}
          handleOk={this.handleSave}
          handleCancel={this.handleCancel}
        >
          <SourceEdit store={this.store} columns={this.store.columns} onSave={this.handleSave} onCancel={this.handleCancel} values={this.store.values} />
        </ModalBox>
      </Row>
    );
  }
}
export default Source;