import React from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Button } from 'antd';
import { useAtendimentoContext } from '../../context/AtendimentoContext';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'moment-timezone';

const { Option } = Select;

const RegistroAtendimento: React.FC = () => {
  const { criarNovoAtendimento } = useAtendimentoContext();

  const onFinish = async (values: any) => {
    try {
      const { nome, procedimento, data, hora, forma_pagamento, pagamento } = values;

      // Verificar se data e hora estão definidos
      if (!data || !hora) {
        console.error('Data ou hora não foram fornecidas corretamente');
        return;
      }

      const dataFormatada = data.format('YYYY-MM-DD'); // Formata a data para o formato ISO
      const horaFormatada = hora.format('HH:mm:ss'); // Formata a hora para o formato ISO
  
      const dataHoraAgendada = moment(`${dataFormatada}T${horaFormatada}`).utcOffset('-03:00').toISOString();
      const dataHoraRegistro = moment().utcOffset('-03:00').toISOString();

      // Criar novo atendimento
      await criarNovoAtendimento({
        nomeCliente: nome,
        procedimento,
        dataHoraAgendada,
        dataHoraRegistro,
        formaPagamento: forma_pagamento,
        pagamento: parseFloat(pagamento) // Converte para número
      });

      console.log('Atendimento criado com sucesso!');
    } catch (error) {
      console.error('Erro ao criar atendimento:', error);
    }
  };

  return (
    <Form
      name="registro_atendimento"
      layout="vertical"
      onFinish={onFinish}
      style={{ maxWidth: 600, margin: '0 auto' }}
    >
      <Form.Item
        name="nome"
        label="Nome do cliente"
        rules={[{ required: true, message: 'Por favor, insira o nome do cliente' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="procedimento"
        label="Procedimento"
        rules={[{ required: true, message: 'Por favor, insira o procedimento' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="data"
        label="Data"
        rules={[{ required: true, message: 'Por favor, insira a data' }]}
      >
        <DatePicker format="DD/MM/YYYY" />
      </Form.Item>

      <Form.Item
        name="hora"
        label="Hora"
        rules={[{ required: true, message: 'Por favor, insira a hora' }]}
      >
        <TimePicker format="HH:mm" />
      </Form.Item>

      <Form.Item
        name="forma_pagamento"
        label="Forma de pagamento"
        rules={[{ required: true, message: 'Por favor, selecione a forma de pagamento' }]}
      >
        <Select>
          <Option value="Cartão">Cartão</Option>
          <Option value="Dinheiro">Dinheiro</Option>
          <Option value="Pix">Pix</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="pagamento"
        label="Pagamento"
        rules={[{ required: true, message: 'Por favor, insira o valor do pagamento' }]}
      >
        <Input type="number" min="0" step="0.01" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Registrar Atendimento
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistroAtendimento;
