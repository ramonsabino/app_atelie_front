import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input } from 'antd';

interface Cliente {
  nome: string;
  vezesAtendido: number;
}

const clientes: Cliente[] = [
  { nome: 'PIXILIM 1', vezesAtendido: 3 },
  { nome: 'PIXILIM 2', vezesAtendido: 5 },
  { nome: 'PIXILIM 3', vezesAtendido: 2 },
];

const Clientes: React.FC = () => {
  const [modalAdicionarClienteVisible, setModalAdicionarClienteVisible] = useState(false);
  const [modalHistoricoVisible, setModalHistoricoVisible] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState<Cliente | null>(null);
  const [novoClienteNome, setNovoClienteNome] = useState('');

  const handleAddCliente = () => {
    setModalAdicionarClienteVisible(true);
  };

  const handleCancelAddCliente = () => {
    setModalAdicionarClienteVisible(false);
    setNovoClienteNome('');
  };

  const handleNomeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNovoClienteNome(e.target.value);
  };

  const handleSubmitAddCliente = () => {
    console.log('Novo cliente:', novoClienteNome);
    setModalAdicionarClienteVisible(false);
    setNovoClienteNome('');
  };

  const handleHistorico = (cliente: Cliente) => {
    setClienteSelecionado(cliente);
    setModalHistoricoVisible(true);
  };

  const handleCancelHistorico = () => {
    setModalHistoricoVisible(false);
  };

  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: 16 }}>
        <Button type="primary" onClick={handleAddCliente}>Adicionar Cliente</Button>
      </div>
      {clientes.map((cliente, index) => (
        <Card key={index} title={cliente.nome} style={{ marginBottom: 16 }}>
          <p>Vezes Atendido: {cliente.vezesAtendido}</p>
          <Button type="primary" onClick={() => handleHistorico(cliente)}>Histórico</Button>
        </Card>
      ))}
      <Modal
        title="Adicionar Cliente"
        visible={modalAdicionarClienteVisible}
        onCancel={handleCancelAddCliente}
        onOk={handleSubmitAddCliente}
      >
        <Form>
          <Form.Item label="Nome do Cliente">
            <Input value={novoClienteNome} onChange={handleNomeChange} />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Histórico do Cliente"
        visible={modalHistoricoVisible}
        onCancel={handleCancelHistorico}
        footer={[
          <Button key="back" onClick={handleCancelHistorico}>
            Fechar
          </Button>,
        ]}
      >
        {clienteSelecionado && (
          <div>
            <p><strong>Nome do Cliente:</strong> {clienteSelecionado.nome}</p>
            <p><strong>Vezes Atendido:</strong> {clienteSelecionado.vezesAtendido}</p>
            <p><strong>Último Atendimento:</strong> xx/xx/xxxx</p>
            <p><strong>Procedimento Feito:</strong> Invente algo...</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default Clientes;
