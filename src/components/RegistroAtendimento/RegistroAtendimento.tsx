import React from 'react';
import { Form, Input, DatePicker, TimePicker, Select, Button } from 'antd';

const { Option } = Select;

const RegistroAtendimento: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Received values of form: ', values);
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
        <DatePicker />
      </Form.Item>

      <Form.Item
        name="hora"
        label="Hora"
        rules={[{ required: true, message: 'Por favor, insira a hora' }]}
      >
        <TimePicker />
      </Form.Item>

      <Form.Item
        name="forma_pagamento"
        label="Forma de pagamento"
        rules={[{ required: true, message: 'Por favor, selecione a forma de pagamento' }]}
      >
        <Select>
          <Option value="cartao">Cartão</Option>
          <Option value="dinheiro">Dinheiro</Option>
          <Option value="pix">Pix</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="pagamento"
        label="Pagamento"
        rules={[{ required: true, message: 'Por favor, insira o valor do pagamento' }]}
      >
        <Input />
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
