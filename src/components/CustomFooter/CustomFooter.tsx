import React from 'react';
import { Layout } from 'antd';

const { Footer } = Layout;

const CustomFooter: React.FC = () => (
  <Footer
    className="site-layout-background"
    style={{
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(239,175,166,255)',
    }}
  >
    <p>&copy; Atelie Luana Ingrid</p>
  </Footer>
);

export default CustomFooter;
