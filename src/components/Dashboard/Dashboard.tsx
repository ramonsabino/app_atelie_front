import React from 'react';
import { Card } from 'antd';

const Dashboard: React.FC = () => (
  <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
    <Card title="Número de Atendimentos do Mês" style={{ marginBottom: 16 }}>
      100
    </Card>
    <Card title="Pessoas Agendadas do Mês" style={{ marginBottom: 16 }}>
      50
    </Card>
    <Card title="Rendimentos do Mês">
      R$ 5000
    </Card>
  </div>
);

export default Dashboard;
