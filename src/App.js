import React, { Component } from "react";
import { observer } from "mobx-react";
import { Layout, Menu, Breadcrumb } from 'antd';
import {
  ConsoleSqlOutlined,
  FormOutlined,
  tableOutlined,
} from '@ant-design/icons';
import "./App.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

@observer
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }
  // componentWillMount {}
  // componentDidMount {}
   onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
        const { collapsed } = this.state;
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
      //   style={{
      //   overflow: 'auto',
      //   height: '100vh',
      //   position: 'fixed',
      //   left: 0,
      // }} 
      collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1" icon={<ConsoleSqlOutlined />}>
              Option 1
            </Menu.Item>
            <Menu.Item key="2" icon={<ConsoleSqlOutlined />}>
              Option 2
            </Menu.Item>
             <Menu.Item key="3" icon={<FormOutlined />}>
              数据源管理
            </Menu.Item>
            <SubMenu key="sub2" icon={<tableOutlined />} title="系统管理">
              <Menu.Item key="6">三方系统管理</Menu.Item>
              <Menu.Item key="8">用户管理</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout className="site-layout" 
        // style={{ marginLeft: 200 }}
        >
          <Header className="site-layout-background" style={{ padding: 0 ,
        //   width: '100%',
        // position: 'fixed',
        // top: 0,
        }} />
          <Content style={{ 
            // margin: '76px 16px 0', 
            margin: '16px 16px 0', 
            overflow: 'initial' }}>
            {/* <Breadcrumb style={{ margin: '10px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              Bill is a cat.
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    );
  }
}
export default App;
