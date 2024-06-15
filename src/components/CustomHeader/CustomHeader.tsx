import React, { useState } from 'react';
import { Layout, Menu, Button, Drawer } from 'antd';
import { DesktopOutlined, FileOutlined, HomeFilled, HomeOutlined, MenuOutlined, PieChartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';
import logo_bg from '../../assets/logo_bg.png';
import './CustomHeader.css'; // Import the CSS file for additional styling
import { Link, useLocation } from 'react-router-dom';
import { useSpring, animated } from 'react-spring'; // Import the necessary functions from react-spring

const { Header } = Layout;

interface CustomMenuProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
  siderRef: React.RefObject<HTMLDivElement>;
}

const CustomHeader: React.FC<CustomMenuProps> = ({collapsed, toggleCollapsed, siderRef}) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const location = useLocation();

  const handleClick = () => {
    if (!collapsed) {
      toggleCollapsed();
    }
    onClose(); // Adicione esta linha para fechar o menu
  };

  // Add this line to create an animation
  const animation = useSpring({ opacity: visible ? 1 : 0, transform: visible ? 'translateX(0%)' : 'translateX(-100%)' });

  return (
    <Header className="site-layout-background custom-header">
      <Button type="primary" onClick={showDrawer} style={{ marginRight: '16px' }} className='menu-icon'>
        <MenuOutlined />
      </Button>
      <img src={logo_bg} alt="Atelie Luana Ingrid" className="logo" />
      <Drawer
        title="Menu"
        placement="left"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={250} // Define a largura do Drawer aqui
      >
        {/* Wrap the Drawer content in an animated component */}
        <animated.div style={animation}>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            style={{ padding: -5 }} // Remove o padding padrão do Menu
          >
            <Menu.Item key="1" icon={<HomeOutlined />} onClick={handleClick} style={{ padding: 0 }}>
              <Link to="/">Página Inicial</Link>
            </Menu.Item>
            <Menu.Item key="2" icon={<PieChartOutlined />} onClick={handleClick} style={{ padding: 0 }}>
              <Link to="/registro-atendimento">Registro de Atendimento</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<DesktopOutlined />} onClick={handleClick} style={{ padding: 0 }}>
              <Link to="/clientes">Clientes</Link>
            </Menu.Item>
            <Menu.Item key="4" icon={<TeamOutlined />} onClick={handleClick} style={{ padding: 0 }}>
              <Link to="/agenda">Agenda</Link>
            </Menu.Item>
            <Menu.Item key="5" icon={<FileOutlined />} onClick={handleClick} style={{ padding: 0 }}>
              <Link to="/rendimentos">Rendimentos</Link>
            </Menu.Item>
            <Menu.Item key="6" icon={<UserOutlined />} onClick={handleClick} style={{ padding: 0 }}>
              <Link to="/historico-atendimentos">Histórico de Atendimentos</Link>
            </Menu.Item>
          </Menu>
        </animated.div>
      </Drawer>
    </Header>
  );
};

export default CustomHeader;
