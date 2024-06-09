import React from 'react';
import { Layout, Menu } from 'antd';
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Sider } = Layout;

interface CustomMenuProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  siderRef: React.RefObject<HTMLDivElement>;
}

const CustomMenu: React.FC<CustomMenuProps> = ({ collapsed, toggleCollapsed, siderRef }) => (
  <Sider
    collapsible
    collapsed={collapsed}
    onCollapse={toggleCollapsed}
    collapsedWidth={0}
    style={{
      background: '#f5f5f5', // Define a cor de fundo do Sider
      height: '100%',
    }}
    ref={siderRef}
  >
    <Menu
      theme="light"
      defaultSelectedKeys={['1']}
      mode="inline"
      style={{ background: '#f5f5f5', display: collapsed ? 'none' : 'block' }}
    >
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        <Link to="/registro-atendimento">Registro de Atendimento</Link>
      </Menu.Item>
      <Menu.Item key="2" icon={<DesktopOutlined />}>
        <Link to="/clientes">Clientes</Link>
      </Menu.Item>
      <Menu.Item key="3" icon={<TeamOutlined />}>
        <Link to="/agenda">Agenda</Link>
      </Menu.Item>
      <Menu.Item key="4" icon={<FileOutlined />}>
        <Link to="/rendimentos">Rendimentos</Link>
      </Menu.Item>
      <Menu.Item key="5" icon={<UserOutlined />}>
        <Link to="/historico-atendimentos">Histórico de Atendimentos</Link>
      </Menu.Item>
    </Menu>
  </Sider>
);

export default CustomMenu;
