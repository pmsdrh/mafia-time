import { Layout, Menu, theme } from 'antd';
const { Sider } = Layout;

const SideBar = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Sider
      style={{
        background: colorBgContainer,
      }}
      width={200}
      breakpoint="lg"
      collapsedWidth="0"
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{
          height: '100%',
        }}
      />
    </Sider>

  )
}
export default SideBar
