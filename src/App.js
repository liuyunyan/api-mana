import React, { Component } from "react";
import { observer } from "mobx-react";
import { Layout, Menu, message,ConfigProvider,Row,Col } from "antd";
import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import en_US from 'antd/lib/locale-provider/en_US';
import {
  HashRouter as Router,
  Link
} from "react-router-dom";

import {
  ConsoleSqlOutlined,
  FormOutlined,
  TableOutlined,
} from "@ant-design/icons";
import Spinner from './components/spinner/spinner'

import "./App.css";
import HomeApp from './containers'

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
  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };
  render() {
    const { collapsed } = this.state;
    return (
      <ConfigProvider locale={zh_CN}>

        <Layout style={{ minHeight: "100vh" }}>
          <Spinner />
          <Sider
            //   style={{
            //   overflow: 'auto',
            //   height: '100vh',
            //   position: 'fixed',
            //   left: 0,
            // }}
            collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Router>
              <Menu theme="dark" defaultSelectedKeys={["3"]} mode="inline">
                <Menu.Item key="1" icon={<ConsoleSqlOutlined />}>
                  Option 1
            </Menu.Item>
                <Menu.Item key="2" icon={<ConsoleSqlOutlined />}>
                  Option 2
            </Menu.Item>
                <Menu.Item key="3" icon={<FormOutlined />}>
                  <Link to="/source">数据源管理</Link>
                  {/* 数据源管理 */}
                </Menu.Item>
                <SubMenu key="sub2" icon={<TableOutlined />} title="系统管理">
                  <Menu.Item key="6">
                    <Link to="/third">三方管理</Link>
                  </Menu.Item>
                  <Menu.Item key="8">
                    <Link to="/user">用户管理</Link>
              </Menu.Item>
                </SubMenu>
              </Menu>
            </Router>
          </Sider>

          <Layout
            className="site-layout"
          // style={{ marginLeft: 200 }}
          >
            <Header
              className="site-layout-background"
              style={{
                padding: 0,
                //   width: '100%',
                // position: 'fixed',
                // top: 0,
              }}
            />
            <Content
              style={{
                // margin: '76px 16px 0',
                margin: "16px 16px 0",
                overflow: "initial",
              }}
            >
              {/* <Breadcrumb style={{ margin: '10px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>Bill</Breadcrumb.Item>
            </Breadcrumb> */}
              <div
                className="site-layout-background"
                style={{ padding: 24, minHeight: 360 }}
              >
                <Row>
                  <Col  span={24}><HomeApp />
                  </Col>
                </Row>
                
              </div>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
          </Footer>
          </Layout>
        </Layout>
      </ConfigProvider>
    );
  }
}
export default App;
