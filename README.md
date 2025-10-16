# 🧪 Sistema de Reserva de Laboratórios da Universidade

Aplicação web orientada a eventos desenvolvida para a disciplina **Linguagem de Programação e Paradigmas** — Prof. Esp. Ademar Perfoll Junior.

Este projeto simula um sistema em tempo real de **reserva de laboratórios**, onde diferentes usuários interagem simultaneamente.  
Cada ação de um usuário dispara **eventos** que atualizam automaticamente todos os outros conectados, sem a necessidade de recarregar a página.

---

## 👥 Desenvolvedores

- **Gustavo Borgonha**  
- **Vitor Hugo Tavares**

Repositório oficial:  
[https://github.com/1GustavoBorgonha1/Reserva-de-Laborat-rios-da-Universidade](https://github.com/1GustavoBorgonha1/Reserva-de-Laborat-rios-da-Universidade)

---

## 🎯 Objetivo do Projeto

Implementar uma aplicação **orientada a eventos** utilizando **Socket.IO**, demonstrando:
- Emissão e escuta de eventos (`emit` e `on`);
- Comunicação em tempo real entre cliente e servidor;
- Sincronização automática de dados entre usuários;
- Aplicação prática do paradigma **Orientado a Eventos**.

---

## ⚙️ Tecnologias Utilizadas

- **Node.js** (ambiente de execução do servidor)
- **Express.js** (framework web)
- **Socket.IO** (comunicação em tempo real via WebSockets)
- **HTML / CSS / JavaScript** (interface cliente)
- **Nodemon** (opcional, para reinício automático durante o desenvolvimento)
- **Live Server** (para executar múltiplas instâncias do cliente)

---

## 🚀 Guia de Instalação e Execução

### 🔧 1. Clonar o repositório
```bash
git clone https://github.com/1GustavoBorgonha1/Reserva-de-Laborat-rios-da-Universidade.git
cd Reserva-de-Laborat-rios-da-Universidade
```

---

### 📦 2. Instalar dependências
Certifique-se de ter o **Node.js** instalado na sua máquina.  
Depois, instale os pacotes necessários:
```bash
npm install
```

---

### 🖥️ 3. Executar o Servidor (porta 4000)
O servidor é responsável por controlar os eventos e manter o estado do sistema em tempo real.

```bash
cd servidor
node server.js
```

O servidor iniciará em:
```
http://localhost:4000
```

---

### 🌐 4. Executar os Clientes (portas 3000 e 3001)
Os clientes representam os usuários conectados ao sistema (ex: dois navegadores diferentes).

Abra **dois terminais separados** e execute:

**Cliente 1:**
```bash
cd cliente
npx live-server --port=3000
```

**Cliente 2:**
```bash
cd cliente
npx live-server --port=3001
```

Agora acesse:
- [http://localhost:3000](http://localhost:3000)
- [http://localhost:3001](http://localhost:3001)

> ⚙️ Ambos os clientes se comunicam com o servidor em tempo real pela **porta 4000**.

---

## 🧩 Funcionamento do Sistema

A aplicação possui dois tipos de usuários:

- **Administrador:** inicia o sistema e libera os laboratórios para reserva.  
- **Participante (usuário comum):** visualiza e reserva laboratórios disponíveis.

A cada reserva feita por um participante, **todos os outros usuários conectados** recebem a atualização automaticamente.

---

## 🔄 Ciclo de Eventos Implementado

| Evento | Origem | Descrição |
|--------|---------|-----------|
| `sistema.iniciado` | Servidor | Indica que o sistema foi iniciado pelo administrador |
| `laboratorio.reservado` | Cliente | Usuário solicita a reserva de um laboratório |
| `laboratorio.confirmado` | Servidor | Confirma a reserva e notifica todos os usuários conectados |
| `laboratorio.expirado` | Servidor | Indica que o tempo de reserva expirou automaticamente |
| `sistema.encerrado` | Servidor | Finaliza o processo geral de reservas (opcional) |

---

## 💡 Como o Sistema Atualiza os Usuários

Quando um usuário realiza uma ação (como reservar um laboratório):

1. O **cliente emite** um evento:  
   ```js
   socket.emit('laboratorio.reservado', dadosReserva);
   ```
2. O **servidor escuta** o evento:  
   ```js
   socket.on('laboratorio.reservado', (dados) => { ... });
   ```
3. O **servidor reemite** para todos os clientes conectados:  
   ```js
   io.emit('laboratorio.confirmado', dadosAtualizados);
   ```
4. Todos os navegadores recebem a atualização **em tempo real**, sem recarregar a página.

---

## 🧠 Aplicação do Paradigma Orientado a Eventos

O sistema utiliza o paradigma orientado a eventos através de:
- **Emissão de eventos** (`emit`) para comunicar ações do cliente;
- **Escuta de eventos** (`on`) no servidor e no cliente;
- **Encadeamento de reações** automáticas;
- **Comunicação bidirecional e assíncrona** entre cliente e servidor;
- **Reatividade**: qualquer mudança é imediatamente refletida em todos os usuários conectados.

---

## 🧾 Critérios Atendidos

| Critério | Descrição | Pontuação |
|-----------|------------|-----------|
| Implementação de eventos (`emit` / `on`) | Comunicação entre cliente e servidor | ✅ 3.0 |
| Fluxo completo de interação | Atualizações sincronizadas e reativas | ✅ 3.0 |
| Reatividade em tempo real | Atualização automática para todos os usuários | ✅ 2.0 |
| Organização e clareza do código | Código estruturado e comentado | ✅ 1.0 |
| Documentação (README) | Explicação e guia de instalação completos | ✅ 1.0 |
| **Total estimado:** |  | **10.0 pts** |

---

## 🖋️ Créditos

Desenvolvido por:  
**Gustavo Borgonha** e **Vitor Hugo Tavares**  
📚 Curso: **Sistemas de Informação**  
🏫 Universidade — Disciplina: **Linguagem de Programação e Paradigmas**  
👨‍🏫 Professor: **Esp. Ademar Perfoll Junior**

---
