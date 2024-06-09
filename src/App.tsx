import React, { useState, useRef, useEffect } from 'react';
import { Layout } from 'antd';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CustomHeader from './components/CustomHeader/CustomHeader';
import CustomMenu from './components/CustomMenu/CustomMenu';
import CustomFooter from './components/CustomFooter/CustomFooter';
import Dashboard from './components/Dashboard/Dashboard';
import RegistroAtendimento from './components/RegistroAtendimento/RegistroAtendimento';
import Clientes from './components/Clientes/Clientes';
import Agenda from './components/Agenda/Agenda';
import Rendimentos from './components/Rendimentos/Rendimentos';
import Historico from './components/HistoricoDeAtendimento/HistoricoDeAtendimento';

const { Content } = Layout;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const siderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (siderRef.current && !siderRef.current.contains(event.target as Node)) {
        setCollapsed(true);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Router>
      <Layout style={{ minHeight: '100vh' }}>
        <CustomMenu collapsed={collapsed} toggleCollapsed={toggleCollapsed} siderRef={siderRef} />
        <Layout className="site-layout">
          <CustomHeader />
          <Content style={{ margin: '16px 16px 0' }}>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/registro-atendimento" element={<RegistroAtendimento />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/agenda" element={<Agenda />} /> 
              <Route path="/rendimentos" element={<Rendimentos />} />
              <Route path="/historico-atendimentos" element={<Historico />} />

            </Routes>
          </Content>
          <CustomFooter />
        </Layout>
      </Layout>
    </Router>
  );
};

export default App;
