import React, { useState } from 'react';
import { Card, Button, Modal, Form, Input, Select } from 'antd';

const { Option } = Select;

interface EntradaValor {
  categoria: string;
  descricao: string;
  valor: number;
}

const Rendimentos = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [categoria, setCategoria] = useState<string>('');
  const [descricao, setDescricao] = useState<string>('');
  const [valor, setValor] = useState<number | undefined>(undefined);
  const [entradasValores, setEntradasValores] = useState<EntradaValor[]>([
    { categoria: 'Pagamento de clientes', descricao: 'Maquiagem noiva', valor: 200 },
    { categoria: 'Gasto com Salão', descricao: 'Manutenção do ar condicionado', valor: -100 },
  ]);

  const handleAddEntrada = () => {
    setModalVisible(true);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setCategoria('');
    setDescricao('');
    setValor(undefined);
  };

  const handleCategoriaChange = (value: string) => {
    setCategoria(value);
  };

  const handleSubmit = () => {
    // Verifica se o valor é negativo para determinar a cor
    const isNegative = valor && valor < 0;

    // Adiciona a nova entrada de valor ao estado
    const newEntrada: EntradaValor = {
      categoria,
      descricao,
      valor: valor || 0, // Valor padrão é 0 se não for definido
    };

    setEntradasValores([...entradasValores, newEntrada]);

    // Limpa os campos do formulário
    handleCancel();
  };

  return (
    <div>
      <div style={{ marginBottom: 16, textAlign: 'right' }}>
        <Button type="primary" onClick={handleAddEntrada}>Adicionar Entrada de Valor</Button>
      </div>
      {/* Exemplo de cartões com os valores */}
      {entradasValores.map((entrada, index) => (
        <Card
          key={index}
          title={entrada.descricao}
          style={{ marginBottom: 16, backgroundColor: entrada.valor < 0 ? '#FFCCCC' : 'inherit' }}
        >
          <p><strong>Categoria:</strong> {entrada.categoria}</p>
          <p><strong>Valor:</strong> R$ {entrada.valor}</p>
        </Card>
      ))}
      <Modal
        title="Adicionar Entrada de Valor"
        visible={modalVisible}
        onCancel={handleCancel}
        onOk={handleSubmit}
      >
        <Form>
          <Form.Item label="Categoria">
            <Select value={categoria} onChange={handleCategoriaChange}>
              <Option value="reposicao_material">Reposição de Material</Option>
              <Option value="gasto_salao">Gasto com Salão</Option>
              <Option value="gasto_geral">Gasto Geral</Option>
              {/* Adicione outras categorias conforme necessário */}
            </Select>
          </Form.Item>
          <Form.Item label="Descrição">
            <Input value={descricao} onChange={(e) => setDescricao(e.target.value)} />
          </Form.Item>
          <Form.Item label="Valor">
            {/* Alteramos para colorir de vermelho se o valor for negativo */}
            <Input
              type="number"
              value={valor}
              onChange={(e) => setValor(parseFloat(e.target.value))}
              style={{ borderColor: valor && valor < 0 ? '#FFCCCC' : undefined }}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Rendimentos;
