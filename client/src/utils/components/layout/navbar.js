import { Layout, Menu } from 'antd';
const { Header } = Layout;

const NavBar = () => {
  return (
    <Header
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <div className="demo-logo" />
      <Menu theme="dark" mode="horizontal" />
    </Header>
  )
}

export default NavBar;
