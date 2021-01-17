import React from "react";
import { observer } from "mobx-react";
import { Table, Row, Col, Button, message, Modal } from "antd";
import UserStore from "../../stores/UserStore";
import ModalBox from "../../components/ModalBox";
import UserEdit from "./components/UserEdit";

@observer
class User extends React.Component {
  constructor(props) {
    super(props);
    // this.columns = [];
    this.state = {
      visible: false,
      isEdit: false,
    };
    this.store = new UserStore();
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
        title: '用户名',
        key: 'username',
        dataIndex: 'username',
      },
      {
        title: '昵称',
        key: 'nickName',
        dataIndex: 'nickName',
      },
      {
        title: '状态',
        key: 'isActive',
        dataIndex: 'isActive',
        render: (text, record) => {
          let { isActive } = record
          switch (isActive) {
            case 0:
              text = (<span><span className="ant-badge-status-dot ant-badge-status-default"></span>0</span>);
              break;
            case 1:
              text = (<span><span className="ant-badge-status-dot ant-badge-status-success"></span>1</span>);
              break;
            default: text = '';
              break
          }
          return text;
        },
      },
      {
        title: '备注',
        key: 'remarks',
        dataIndex: 'remarks',
      },
      {
        title: '操作',
        width: '164px',
        key: 'option',
        dataIndex: 'option',
        render: () => [
          <a key="link" onClick={this.handleEdit}>编辑</a>, <a key="link2" className="color-red ml10"
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
    });
  }
  handleEdit() {
    this.setState({
      visible: true,
      isEdit: true,
    });
  }
  handleRemove() {

    const config = {
      title: '确认删除吗?',
      onOk: () => {
        this.store.onDelete()
      }
    };

    Modal.confirm(config);

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
      this.store.validates = {}
    } else {
      // message.error("保存失败")
    }


  }
  handleCancel() {
    this.setState({
      visible: false,
    });
    this.store.validates = {};
  }
  render() {
    const data = this.store.data;
    return (
      <Row>
        <Col span={24} className="mb15">
          <Button type="primary" className="fr" onClick={this.handleNew}>
            新增
          </Button>
        </Col>
        <Row>
          <Col span={24}>
            <Table columns={this.columns}  scroll={{ x: 'calc(100vw - 280px)' }}
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
          <UserEdit store={this.store} columns={this.store.columns} onSave={this.handleSave} onCancel={this.handleCancel} values={this.store.values} validateStatus={this.store.validateStatus} />
        </ModalBox>
      </Row>
    );
  }
}
export default User;