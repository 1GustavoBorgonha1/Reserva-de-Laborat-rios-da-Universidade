// client-user/src/App.js
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';

const socket = io.connect("http://localhost:4000");

function App() {
  const [labs, setLabs] = useState([]);
  const [sistemaAtivo, setSistemaAtivo] = useState(false);

  useEffect(() => {
    socket.on('estado.inicial', (data) => {
      setLabs(data.labs);
      setSistemaAtivo(data.sistemaAtivo);
    });

    socket.on('labs.atualizados', (updatedLabs) => {
      setLabs(updatedLabs);
      if (updatedLabs.length > 0 && !sistemaAtivo) {
        setSistemaAtivo(true);
      }
    });

    socket.on('sistema.encerrado', (data) => {
      setLabs(data.labs);
      setSistemaAtivo(data.sistemaAtivo);
      alert('O sistema de reservas foi encerrado pelo administrador!');
    });
    
    return () => {
      socket.off('estado.inicial');
      socket.off('labs.atualizados');
      socket.off('sistema.encerrado');
    };
  }, [sistemaAtivo]);

  const handleReserveLab = (labId) => {
    socket.emit('laboratorio.reservar', labId);
  };
  
  const handleCancelReservation = (labId) => {
    socket.emit('laboratorio.cancelar', labId);
  };

  return (
    <div className="container">
      <header>
        <h1>Sistema de Reserva de Laboratórios</h1>
        <h2>Portal do Aluno</h2>
      </header>

      <main>
        {!sistemaAtivo && <p className="status-message">O sistema de reservas está fechado no momento.</p>}
        {sistemaAtivo && <p className="status-message success">Sistema de reservas ABERTO!</p>}
        <div className="lab-list">
          {labs.map((lab) => {
            const isReservedByMe = lab.reservadoPor === socket.id;
            return (
              <div key={lab.id} className={`lab-item ${!lab.disponivel ? 'reservado' : ''} ${isReservedByMe ? 'my-reservation' : ''}`}>
                <h3>{lab.name}</h3>
                <p>Status: {lab.disponivel ? 'Disponível' : 'Reservado'}</p>
                {sistemaAtivo && (
                  <>
                    {lab.disponivel && (
                      <button onClick={() => handleReserveLab(lab.id)}>
                        Reservar
                      </button>
                    )}
                    {isReservedByMe && (
                      <div className="my-reservation-info">
                        <button onClick={() => handleCancelReservation(lab.id)} className="cancel-button">
                          Cancelar Reserva
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </main>
      <footer>
        <p>Desenvolvido por: Gustavo Borgonha e Vitor Hugo Tavares</p>
      </footer>
    </div>
  );
}

export default App;