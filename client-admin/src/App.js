// client-admin/src/App.js
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
      setSistemaAtivo(true);
    });

    socket.on('sistema.encerrado', (data) => {
      setLabs(data.labs);
      setSistemaAtivo(data.sistemaAtivo);
    });
    
    return () => {
      socket.off('estado.inicial');
      socket.off('labs.atualizados');
      socket.off('sistema.encerrado');
    };
  }, []);

  const handleAdminStart = () => {
    socket.emit('sistema.iniciar');
  };

  const handleAdminEnd = () => {
    socket.emit('sistema.encerrar');
  };

  return (
    <div className="container">
      <header>
        <h1>Painel do Administrador</h1>
        <h2>Reservas de Laboratórios</h2>
      </header>

      <div className="admin-panel">
        <h3>Controle do Sistema</h3>
        {!sistemaAtivo ? (
          <button onClick={handleAdminStart}>
            ✅ Abrir Sistema de Reservas
          </button>
        ) : (
          <button onClick={handleAdminEnd} className="end-button">
            ❌ Encerrar Sistema
          </button>
        )}
        <p className={`status-message ${sistemaAtivo ? 'success' : ''}`}>
          Status do Sistema: {sistemaAtivo ? 'Aberto' : 'Fechado'}
        </p>
      </div>

      <main>
        <h2>Status dos Laboratórios em Tempo Real</h2>
        <div className="lab-list">
          {labs.map((lab) => (
            <div key={lab.id} className={`lab-item ${!lab.disponivel ? 'reservado' : ''}`}>
              <h3>{lab.name}</h3>
              <p>Status: <strong>{lab.disponivel ? 'Disponível' : 'Reservado'}</strong></p>
              {!lab.disponivel && (
                <small>Reservado por: {lab.reservadoPor}</small>
              )}
            </div>
          ))}
        </div>
      </main>
      <footer>
        <p>Interface Administrativa</p>
      </footer>
    </div>
  );
}

export default App;