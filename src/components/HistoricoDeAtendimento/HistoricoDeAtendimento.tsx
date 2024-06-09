import React, { useState } from 'react';
import { Table, Button, Modal, Collapse } from 'antd';

interface Mes {
  mes: string;
  totalAtendimentos: number;
  totalRendimentos: number;
  clientesAtendidos: Cliente[];
}

interface Cliente {
  nome: string;
  procedimento: string;
  valor: number;
}

const { Panel } = Collapse;

const Historico: React.FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [clientesDoMes, setClientesDoMes] = useState<Cliente[]>([]);
  const [expandedRowKeys, setExpandedRowKeys] = useState<string[]>([]);

  const dataSource: Mes[] = [
    { mes: 'Janeiro', totalAtendimentos: 10, totalRendimentos: 500, clientesAtendidos: [{ nome: 'Cliente 1', procedimento: 'Procedimento X', valor: 100 }, { nome: 'Cliente 2', procedimento: 'Procedimento Y', valor: 150 }] },
    { mes: 'Fevereiro', totalAtendimentos: 15, totalRendimentos: 700, clientesAtendidos: [{ nome: 'Cliente 3', procedimento: 'Procedimento Z', valor: 200 }, { nome: 'Cliente 4', procedimento: 'Procedimento W', valor: 250 }] },
    { mes: 'Março', totalAtendimentos: 20, totalRendimentos: 900, clientesAtendidos: [{ nome: 'Cliente 5', procedimento: 'Procedimento A', valor: 300 }, { nome: 'Cliente 6', procedimento: 'Procedimento B', valor: 350 }] },
    // Adicione mais meses conforme necessário
  ];

  const handleVerHistorico = (clientes: Cliente[], rowIndex: number) => {
    setClientesDoMes(clientes);
    const key = `${rowIndex}`;
    setExpandedRowKeys((prevKeys) => (prevKeys.includes(key) ? prevKeys.filter((k) => k !== key) : [...prevKeys, key]));
    setModalVisible(true); // Abrir o modal ao clicar em "Ver Histórico"
  };

  const expandableRowRender = (record: Mes, rowIndex: number) => ({
    expandedRowKeys,
    onExpand: (_expanded: boolean, _record: Mes, _event: React.MouseEvent<HTMLElement>) => handleExpandRow(rowIndex),
    expandRowByClick: true,
    expandIconColumnIndex: -1,
  });

  const handleExpandRow = (rowIndex: number) => {
    const key = `${rowIndex}`;
    setExpandedRowKeys((prevKeys) => (prevKeys.includes(key) ? prevKeys.filter((k) => k !== key) : [...prevKeys, key]));
  };

  const expandable: any = {
    expandable: expandableRowRender,
  };

  const columns = [
    { title: 'Mês', dataIndex: 'mes', key: 'mes' },
    { title: 'Total de Atendimentos', dataIndex: 'totalAtendimentos', key: 'totalAtendimentos' },
    { title: 'Total de Rendimentos', dataIndex: 'totalRendimentos', key: 'totalRendimentos' },
    {
      title: 'Ações',
      dataIndex: 'actions',
      key: 'actions',
      render: (_text: any, record: Mes, rowIndex: number) => (
        <Button type="primary" onClick={() => handleVerHistorico(record.clientesAtendidos, rowIndex)}>Ver Histórico</Button>
      ),
    },
  ];

  return (
    <div>
      <Table
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ x: true }}
        {...expandable}
      />
      <Modal
        title="Clientes Atendidos no Mês"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)} // Fechar o modal ao clicar em "Cancelar"
        footer={null}
      >
        <Collapse accordion activeKey={expandedRowKeys}>
          {clientesDoMes.map((cliente, index) => (
            <Panel header={cliente.nome} key={index}>
              <p><strong>Procedimento:</strong> {cliente.procedimento}</p>
              <p><strong>Valor:</strong> R$ {cliente.valor.toFixed(2)}</p>
            </Panel>
          ))}
        </Collapse>
      </Modal>
    </div>
 );
};

export default Historico;