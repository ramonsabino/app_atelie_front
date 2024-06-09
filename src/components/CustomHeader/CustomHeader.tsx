import React from 'react';
import { Layout } from 'antd';
import logo_bg from '../../assets/logo_bg.png';
import './CustomHeader.css'; // Import the CSS file for additional styling

const { Header } = Layout;

const CustomHeader: React.FC = () => (
  <Header
    className="site-layout-background custom-header"
  >
    <img src={logo_bg} alt="Atelie Luana Ingrid" className="logo" />
  </Header>
);

export default CustomHeader;
