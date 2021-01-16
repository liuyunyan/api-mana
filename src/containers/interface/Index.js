import React from "react";
import { observer } from "mobx-react";
import { Table, Row, Col, Button, message, Modal, Space } from "antd";
import InterfaceStore from "../../stores/InterfaceStore";
import ModalBox from "../../components/ModalBox";
import InterfaceEdit from "./components/InterfaceEdit";

@observer
class Interface extends React.Component {
  constructor(props) {
    super(props);
    // this.columns = [];
    this.state = {
      visible: false,
      isEdit: 0,//0新增，1编辑，2浏览
    };
    this.store = new InterfaceStore();
    this.handleNew = this.handleNew.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleView = this.handleView.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handlePublish = this.handlePublish.bind(this);
    this.handleDown = this.handleDown.bind(this);
    this.initColumn()
  }
  initColumn = () => {
    this.columns = [
      {
        title: '序号',
        key: 'idx',
        dataIndex: 'idx',
        render: (idx) => (idx + 1),
      },
      {
        title: '接口名称',
        key: 'name',
        dataIndex: 'name',
        render: (_) => <a onClick={this.handleView}>{_}</a>,
      },
      {
        title: '接口编号',
        key: 'identifier',
        dataIndex: 'identifier',
      },
      {
        title: '状态',
        key: 'isPublish',
        dataIndex: 'isPublish',
        render: (text, record) => {
          console.log(record)
          let { isPublish, id } = record
          switch (isPublish) {
            case 0:
              text = (<span><span className="ant-badge-status-dot ant-badge-status-default"></span>未发布</span>);
              break;
            case 1:
              text = (<span><span className="ant-badge-status-dot ant-badge-status-success"></span>已生效</span>);
              break;
            case 2:
              text = (<span><span className="ant-badge-status-dot ant-badge-status-processing"></span>失效</span>);
              break;
            case 3:
              text = (<span><span className="ant-badge-status-dot ant-badge-status-error"></span>异常</span>);
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
        width: '264px',
        key: 'option',
        dataIndex: 'option',
        render: (text, record) => {
          console.log(record)
          let { isPublish, id } = record
          return (<Space size="left">
            {isPublish ? <span key="span1">发布</span> :
              <a key="link1" onClick={this.handlePublish.bind(this, id)}>发布</a>}
            {isPublish ?
              <a key="link2" onClick={this.handleDown.bind(this, id)} className="ml10">下线</a> :
              <span key="span1" className="ml10">下线</span>}
            {/* <span className="ml10">|</span> */}
            <div class="ant-divider ant-divider-vertical" role="separator"></div>
            <a key="link3" onClick={this.handleEdit}>编辑</a>
            <a key="link4" className="color-red ml10"
              onClick={this.handleRemove}
            >删除</a>
          </Space>)
        }
        // [
        //     <a key="link" onClick={this.handleEdit}>编辑</a>, <a key="link2" className="color-red ml10"
        //       onClick={this.handleRemove}
        //     >删除</a>],
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
      isEdit: 0,
    });
  }
  handleView() {
    this.setState({
      visible: true,
      isEdit: 2,
    });
  }
  handleEdit() {
    this.setState({
      visible: true,
      isEdit: 1,
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
  handlePublish(id) {
    this.store.onPublish(id)
  }
  handleDown(id) {
    const config = {
      title: '确认下线吗?',
      onOk: () => {
        this.store.onDown(id)
      }
    };
    Modal.confirm(config);
  }

  async handleSave() {
    let values = this.store.values
    //调用save接口
    let flag
    if (this.state.isEdit === 1) {
      flag = await this.store.onUpdate(values)
    } else if (this.state.isEdit === 0) {
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
    const { isEdit, visible } = this.state;
    if (visible) {
      return <InterfaceEdit
        isEdit={isEdit}
        values={this.store.values} validateStatus={this.store.validateStatus}
        visible={this.state.visible}
        handleOk={this.handleSave}
        handleCancel={this.handleCancel}
        store={this.store} columns={this.store.columns}
      />
    }
    return (
      <Row>
        <Col span={24} className="mb15">
          <Button type="primary" className="fr" onClick={this.handleNew}>
            新增
          </Button>
        </Col>
        <Row>
          <Col span={24}>
            <Table columns={this.columns} scroll={{ x: 'calc(100vw - 280px)' }}
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

      </Row>
    );
  }
}
export default Interface;