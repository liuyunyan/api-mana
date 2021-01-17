import React, { Component } from "react";
import { observer } from "mobx-react";
import { Layout, Menu, message, ConfigProvider } from "antd";
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
      selectedKeys: ["1"]
    };
  }
  componentDidMount() {
    // console.log(window.location.hash.replace("#/",''))
    let hash = window.location.hash.replace("#/", '')
    let key = "1"
    switch (hash) {
      case 'interface':
        key = "1";
        break;
      case 'source':
        key = "2";
        break;
      case 'third':
        key = "3";
        break;
      case 'user':
        key = "4";
        break;
      default: key = "1"; break
    }
    this.setState({selectedKeys:[key]})
  }
  onCollapse = (collapsed) => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };
  onSelect = (option ) => {
    this.setState({ selectedKeys: [option.key]});
  };
  render() {
    const { collapsed, selectedKeys } = this.state;
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
            // collapsible
            collapsed={collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo">logo</div>
            <Router>
              <Menu theme="dark" mode="inline"
              defaultOpenKeys={["sub1"]} 
              selectedKeys={selectedKeys}
              onSelect={this.onSelect}
              >
                <Menu.Item key="1" icon={<ConsoleSqlOutlined />}>
                  <Link to="/interface">接口管理</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<FormOutlined />}>
                  <Link to="/source">数据源管理</Link>
                  {/* 数据源管理 */}
                </Menu.Item>
                <SubMenu key="sub1" icon={<TableOutlined />} title="系统管理">
                  <Menu.Item key="3">
                    <Link to="/third">三方管理</Link>
                  </Menu.Item>
                  <Menu.Item key="4">
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
                <HomeApp />
              </div>
            </Content>
            {/* <Footer style={{ textAlign: "center" }}>
              Ant Design ©2018 Created by Ant UED
          </Footer> */}
          </Layout>
        </Layout>
      </ConfigProvider>
    );
  }
}
export default App;
