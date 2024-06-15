import React from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Button, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useAtendimentoContext } from '../../context/AtendimentoContext';
import moment from 'moment';
import 'moment/locale/pt-br';
import 'moment-timezone';
import './styles.css'

const { Option } = Select;

const RegistroAtendimento: React.FC = () => {
  const { criarNovoAtendimento } = useAtendimentoContext();
  const history = useNavigate();
  const onFinish = async (values: any) => {
    try {
      const { nome, procedimento, data, hora, forma_pagamento, pagamento } = values;

      // Verificar se data e hora estão definidos
      if (!data || !hora) {
        console.error('Data ou hora não foram fornecidas corretamente');
        return;
      }

      const dataFormatada = data.format('YYYY-MM-DD');
      const horaFormatada = hora.format('HH:mm:ss');
      const dataHoraAgendada = moment.utc(`${dataFormatada}T${horaFormatada}`).subtract(0, 'hours').toISOString();
      const dataHoraRegistro = moment.tz('America/Sao_Paulo').subtract(3, 'hours').toISOString();

      // Criar novo atendimento
      await criarNovoAtendimento({
        nomeCliente: nome,
        procedimento,
        dataHoraAgendada,
        dataHoraRegistro,
        formaPagamento: forma_pagamento,
        pagamento: parseFloat(pagamento) // Converte para número
      });

      // Exibir mensagem de sucesso
      message.success('Agendado com Sucesso');

      // Redirecionar para '/agenda'
      history('/agenda');

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
        <DatePicker format="DD/MM/YYYY" placeholder='Selecione a Data'/>
      </Form.Item>

      <Form.Item
        name="hora"
        label="Hora"
        rules={[{ required: true, message: 'Por favor, insira a hora' }]}
      >
        <TimePicker format="HH:mm" placeholder='Selecione a Hora'/>
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
        <Button type="primary" htmlType="submit" className="btn-registrar">
          Registrar Atendimento
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegistroAtendimento;
