import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../axiosConfig';
import moment from 'moment';

export interface Atendimento {
    _id: string;
    nomeCliente: string;
    procedimento: string;
    dataHoraAgendada: string;
    dataHoraRegistro: string;
    formaPagamento: string;
    pagamento: number;
}

export interface Cliente {
    _id: string;
    nome: string;
    dataCadastro: string;
}

interface AtendimentoContextData {
    atendimentos: Atendimento[];
    carregarAtendimentos: () => void;
    criarNovoAtendimento: (novoAtendimento: Omit<Atendimento, '_id'>) => Promise<void>;
    numeroAtendimentosMes: () => number;
    pessoasAgendadasMes: () => number;
    rendimentosMes: () => number;
}

const AtendimentoContext = createContext<AtendimentoContextData>({} as AtendimentoContextData);

export const AtendimentoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);

    useEffect(() => {
        carregarAtendimentos();
    }, []);

    const carregarAtendimentos = async () => {
        try {
            const response = await api.get<Atendimento[]>('/atendimentos');
            setAtendimentos(response.data);
        } catch (error) {
            console.error('Erro ao buscar atendimentos:', error);
        }
    };

    const criarNovoAtendimento = async (novoAtendimento: Omit<Atendimento, '_id'>) => {
        try {
            // Formatar dataHoraRegistro para enviar ao backend
            const dataHoraRegistro = moment().format('YYYY-MM-DD HH:mm:ss');

            // Formatar dataHoraAgendada para enviar ao backend
            const dataHoraAgendada = moment.utc(`${moment(novoAtendimento.dataHoraAgendada).format('YYYY-MM-DD')} ${moment(novoAtendimento.dataHoraAgendada).format('HH:mm:ss')}`).format('YYYY-MM-DD HH:mm:ss');

            const atendimentoComDatas = {
                ...novoAtendimento,
                dataHoraRegistro,
                dataHoraAgendada,
            };
    
            // Primeiro, criar o novo atendimento
            const responseAtendimento = await api.post<Atendimento>('/atendimentos', atendimentoComDatas);
            const atendimentoCriado = responseAtendimento.data;

            // Atualizar estado local com o novo atendimento criado
            setAtendimentos([...atendimentos, atendimentoCriado]);
    
            // Restante do código continua igual...
        } catch (error) {
            console.error('Erro ao criar novo atendimento:', error);
            throw error;
        }
    };
    
    const numeroAtendimentosMes = () => {
        // Lógica para contar o número de atendimentos no mês atual
        const dataAtual = new Date();
        return atendimentos.filter(atendimento => {
            const dataAtendimento = new Date(atendimento.dataHoraAgendada);
            return dataAtendimento.getMonth() === dataAtual.getMonth() && dataAtendimento.getFullYear() === dataAtual.getFullYear();
        }).length;
    };

    const pessoasAgendadasMes = () => {
        // Lógica para contar o número de pessoas agendadas no mês atual
        const dataAtual = new Date();
        return atendimentos.filter(atendimento => {
            const dataAtendimento = new Date(atendimento.dataHoraAgendada);
            return dataAtendimento.getMonth() === dataAtual.getMonth() && dataAtendimento.getFullYear() === dataAtual.getFullYear();
        }).reduce((total, atendimento) => {
            // Utilize um Set para contar apenas uma vez cada cliente
            return total + (new Set(atendimento.nomeCliente)).size;
        }, 0);
    };

    const rendimentosMes = () => {
        // Lógica para calcular os rendimentos do mês atual
        const dataAtual = new Date();
        return atendimentos.filter(atendimento => {
            const dataAtendimento = new Date(atendimento.dataHoraAgendada);
            return dataAtendimento.getMonth() === dataAtual.getMonth() && dataAtendimento.getFullYear() === dataAtual.getFullYear();
        }).reduce((total, atendimento) => {
            return total + atendimento.pagamento;
        }, 0);
    };

    return (
        <AtendimentoContext.Provider value={{ atendimentos, carregarAtendimentos, criarNovoAtendimento, numeroAtendimentosMes, pessoasAgendadasMes, rendimentosMes  }}>
            {children}
        </AtendimentoContext.Provider>
    );
};

export const useAtendimentoContext = () => useContext(AtendimentoContext);

// Função auxiliar para extrair o mês da data
export const extrairMesDaData = (data: string): string => {
    const date = new Date(data);
    const month = date.toLocaleString('default', { month: 'long' });
    return month.charAt(0).toUpperCase() + month.slice(1); // Primeira letra em maiúsculo
};
