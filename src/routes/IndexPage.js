import React from 'react';
import { connect } from 'dva';
import styles from './IndexPage.css';
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import IndexStyle from './IndexPage.css';
import CoinCardPage from '../components/coincard/CoinCard';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

function IndexPage() {
  return (
    <Layout style={{ minHeight: '100vh' }}>
    <Header className="header">
      <div className={IndexStyle.logo}>MovingBricks!!</div>
    </Header>
    <Layout>
      <Sider width={200} style={{ background: '#fff' }}>
        <Menu
          mode="inline"
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          style={{ height: '100%', borderRight: 0 }}
        >
          <Menu.Item key="1">
            <Icon type="area-chart" />
            <span>总览</span>
          </Menu.Item>

          <Menu.Item key="2">
            <Icon type="laptop" />
            <span>Bittrex</span>
          </Menu.Item>

          <Menu.Item key="3">
            <Icon type="notification" />
            <span>Bitfinex</span>
          </Menu.Item>

          <Menu.Item key="4">
            <Icon type="tags" />
            <span>Poloniex</span>
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ padding: '6px' }}>
        <Content className="first-content" style={{ background: '#fff',padding: 12}}>
          <CoinCardPage />
        </Content>
      </Layout>
    </Layout>
  </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
