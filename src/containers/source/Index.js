import React from "react";
import { observer } from "mobx-react";
import { Table, Row, Col, Button } from "antd";
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
      isEdit:false,
    };
    this.store = new SourceStore();
    this.handleNew = this.handleNew.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.initColumn()
  }
  initColumn=()=>{
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
    <a key="link" onClick={this.handleEdit}>编辑</a>, <a key="link2"
    onClick={this.handleRemove}
    >删除</a>],
  },
];
  }
  componentDidMount() {
    this.store.queryList();
  }
  componentWillUnmount() {}
  handleNew(show) {
    this.setState({
      visible: true,
      isEdit:false
    });
  }
  handleEdit(show) {
    this.setState({
      visible: true,
      isEdit:true
    });
  }
  handleRemove(show) {
    
  }
  handleSave(show) {
    this.setState({
      visible: false,
    });
  }
  handleCancel(show) {
    this.setState({
      visible: false,
    });
  }
  render() {
    const data = this.store.data;
    console.log(data)
    return (
      <Row>
        <Col span={24}>
          <Button type="primary" onClick={this.handleNew}>
            新增
          </Button>
        </Col>
        <Row>
        <Col span={24}>
          <Table columns={this.columns} scroll={{x : '100v'}}
          rowKey ='id'
           dataSource={data} />
           </Col>
        </Row>
        <ModalBox
					modalTitle={this.state.isEdit ? "编辑" : "新增"}
					visible={this.state.visible}
					handleOk={this.handleSave}
					handleCancel={this.handleCancel}
				>
					<SourceEdit store={this.store} />
				</ModalBox>
      </Row>
    );
  }
}
export default Source;
