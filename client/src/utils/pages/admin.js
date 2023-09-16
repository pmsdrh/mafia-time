import React from 'react';
import NavBar from '../components/admin/layout/navbar';
import Footer from '../components/admin/layout/footer';
import SideBar from '../components/admin/layout/sider';
import RolesCounter from '../components/admin/settings/roles-counter';
import { Routes, Route, useParams } from "react-router-dom";
import { Breadcrumb, Layout, theme } from 'antd';

const { Content } = Layout;

const AdminPage = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const {gameId, creator} = useParams()
  return (
    <Layout>
      <NavBar />
      <Content
        style={{
          padding: '0 50px',
        }}
      >
        <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
          <Breadcrumb.Item>Game ID: {gameId}</Breadcrumb.Item>
          <Breadcrumb.Item>Creator: {creator}</Breadcrumb.Item>
          <Breadcrumb.Item>{window.location.pathname.split("/").pop()}</Breadcrumb.Item>
        </Breadcrumb>
        <Layout
          style={{
            padding: '24px 0',
            background: colorBgContainer,
          }}
        >
          <SideBar />
          <Content
            style={{
              padding: '0 24px',
              minHeight: 280,
            }}
          >
            <Routes>
              <Route path="roles" element={<RolesCounter />} />
            </Routes>
          </Content>
        </Layout>
      </Content>
      <Footer/>
    </Layout>
  )
}
export default AdminPage;
