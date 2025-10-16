// server/server.js
const express = require('express');
const http = require('http'); // Make sure you require 'http'
const { Server } = require("socket.io");
const cors = require('cors');

const app = express();
app.use(cors());

// 1. First, create the HTTP server using your Express app
const server = http.createServer(app); 

// 2. THEN, pass that server to Socket.IO
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"], 
    methods: ["GET", "POST"]
  }
});
// REMOVIDO: A propriedade 'timerId' não é mais necessária
let labs = [
  { id: 1, name: "Lab de Redes I", disponivel: true, reservadoPor: null },
  { id: 2, name: "Lab de Programação I", disponivel: true, reservadoPor: null },
  { id: 3, name: "Lab de Hardware", disponivel: true, reservadoPor: null },
  { id: 4, name: "Lab de Redes II", disponivel: true, reservadoPor: null },
  { id: 5, name: "Lab de Programação II", disponivel: true, reservadoPor: null },
  { id: 6, name: "Lab de Design Gráfico", disponivel: true, reservadoPor: null },
];

let sistemaAtivo = false;

io.on('connection', (socket) => {
  console.log(`Usuário conectado: ${socket.id}`);
  socket.emit('estado.inicial', { labs, sistemaAtivo });

  socket.on('sistema.iniciar', () => {
    sistemaAtivo = true;
    io.emit('labs.atualizados', labs);
    console.log('Sistema de reservas iniciado.');
  });
  
  // ADICIONADO: Evento para o administrador encerrar o sistema
  socket.on('sistema.encerrar', () => {
    sistemaAtivo = false;
    // Limpa todas as reservas existentes
    labs.forEach(lab => {
        lab.disponivel = true;
        lab.reservadoPor = null;
    });
    // Notifica todos os clientes que o sistema foi encerrado e envia o estado limpo
    io.emit('sistema.encerrado', { labs, sistemaAtivo: false });
    console.log('Sistema de reservas encerrado pelo administrador.');
  });

  socket.on('laboratorio.reservar', (labId) => {
    if (!sistemaAtivo) return;

    const lab = labs.find(l => l.id === labId);
    if (lab && lab.disponivel) {
      lab.disponivel = false;
      lab.reservadoPor = socket.id;
      
      // REMOVIDO: A lógica de setTimeout foi retirada daqui

      io.emit('labs.atualizados', labs);
      console.log(`Laboratório ${lab.id} reservado por ${socket.id}`);
    }
  });

  socket.on('laboratorio.cancelar', (labId) => {
    if (!sistemaAtivo) return;

    const lab = labs.find(l => l.id === labId);
    if (lab && lab.reservadoPor === socket.id) {
      // REMOVIDO: A lógica de clearTimeout foi retirada daqui
      lab.disponivel = true;
      lab.reservadoPor = null;

      io.emit('labs.atualizados', labs);
      console.log(`Reserva do Lab ${lab.id} cancelada por ${socket.id}`);
    }
  });
  
  socket.on('disconnect', () => {
    console.log(`Usuário desconectado: ${socket.id}`);
  });
});

server.listen(4000, () => {
  console.log('Servidor rodando na porta 4000');
});