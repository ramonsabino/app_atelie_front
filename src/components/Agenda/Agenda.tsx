import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal } from 'antd';
require('moment/locale/pt-br.js')

const localizer = momentLocalizer(moment);

interface Evento {
  title: string;
  start: Date;
  end: Date;
}

const eventos: Evento[] = [
  {
    title: 'Cliente 1 - Procedimento: Corte de Cabelo',
    start: new Date('2024-06-10T10:00:00'),
    end: new Date('2024-06-10T12:00:00'),
  },
  {
    title: 'Cliente 2 - Procedimento: Manicure',
    start: new Date('2024-06-12T14:00:00'),
    end: new Date('2024-06-12T16:00:00'),
  },
];

const Agenda = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [eventoSelecionado, setEventoSelecionado] = useState<Evento | null>(null);

  const handleEventoClick = (evento: Evento) => {
    setEventoSelecionado(evento);
    setModalVisible(true);
  };

  return (
    <div style={{ height: '500px' }}>
      <Calendar
        localizer={localizer}
        events={eventos}
        startAccessor="start"
        endAccessor="end"
        defaultView="week"
        onSelectEvent={handleEventoClick}
        messages={{
            next: "Proximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia"
          }}
      />

      <Modal
        title="Detalhes do Atendimento"
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
      >
        {eventoSelecionado && (
          <div>
            <p><strong>Cliente:</strong> {eventoSelecionado.title.split(' - ')[0]}</p>
            <p><strong>Procedimento:</strong> {eventoSelecionado.title.split(' - ')[1]}</p>
            <p><strong>Hora do Atendimento:</strong> {moment(eventoSelecionado.start).format('HH:mm')} - {moment(eventoSelecionado.end).format('HH:mm')}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Agenda;
