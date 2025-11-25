# Chatbot 4Blue (English)

## Requirements

### Backend Requirements

- **Python 3.8+** ([Python 3.13](https://www.python.org/downloads/) recommended)
- **pip** ([Python package manager](https://pip.pypa.io/en/stable/cli/pip_install/))

### Frontend Requirements

- **Node.js 24+** ([Node.js](https://www.nodejs.tech/pt-br/download) 24.11.1 recommended)
- **pnpm** ([Package manager](https://pnpm.io/installation#using-npm) - install with `npm install -g pnpm`)

---

## Setup Instructions

### Backend Setup

Open a new terminal

1. Create virtual environment:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

   > This will activate the virtual env for python

2. Install dependencies:

   ```bash
   pip install -r requirements.txt
   ```

   > Install Django

3. Navigate to backend:

   ```bash
   cd backend
   ```

4. Run migrations:

   ```bash
   python manage.py migrate
   python manage.py migrate chatbot
   ```

   > Creates the database tables for:
   >
   > - Django's built-in apps (sessions, auth, etc.)
   > - Chatbot app models (`Usuario` and `Mensagem`).\n

5. Seed database:

   ```bash
   python manage.py create_mock_users
   ```

   > Seeds the database with the test users

6. Start server:
   ```bash
   python manage.py runserver
   ```
   > Setup server
   > Access some server here: `http://localhost:5173`

### Frontend Setup

Open a new terminal

1. Navigate to frontend:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

   > Install dependencies

3. Create `.env` file

   - On Linux:

   ```bash
   cp .env.example .env
   ```

   > Copy .env configuration to a usable file

4. Start development server:
   ```bash
   pnpm run dev
   ```
   > Access the website here: `http://localhost:5173`
   >
   > > You can login in `Usuario A` using `a123`
   > > Or in `Usuario B` using `b123`

## Technical Decisions

### Django Model Structure

The database schema is designed with two main models that establish a clear relationship:

**`Usuario` Model:**

- Uses `AutoField` for the primary key instead of Django's default `BigAutoField` to maintain compatibility with existing database schemas
- Stores credentials (`nome`, `senha`) directly in the model for simplicity, though in production this would use Django's built-in authentication system with password hashing
- Includes `criado_em` timestamp using `auto_now_add=True` for audit trails
- Uses `db_table = 'usuario'` to explicitly set the table name, maintaining consistency with Portuguese naming conventions

**`Mensagem` Model:**

- Establishes a **ForeignKey relationship** to `Usuario` with `on_delete=models.CASCADE`, ensuring that when a user is deleted, all their messages are automatically removed (data integrity)
- Stores both `mensagem` (user input) and `resposta` (bot response) in the same model, creating a conversation pair that can be easily retrieved together
- The relationship structure (`Mensagem` → `Usuario`) enables efficient querying: `Mensagem.objects.filter(usuario=usuario)` retrieves all messages for a specific user in a single query

**Why this structure?** This design prioritizes simplicity and direct relationships. Each message is tied to a user, making it straightforward to retrieve conversation history. The one-to-many relationship (one user, many messages) is a common fit for a chatbot application where users have multiple conversation exchanges.

### React State Management

**Component-Level State:**

- Each page component (`Chat`, `Historico`, `Login`) manages its own state independently
- State variables are scoped to their specific use case:
  - `conversation`: Array of message objects for the current chat session
  - `loading`: Boolean to control loading indicators during API calls
  - `authenticated`: Boolean to track authentication status
  - `sending`: Boolean to prevent duplicate form submissions

**State Update Patterns:**

- Uses functional updates (`setConversation(prev => [...prev, newMessage])`) to ensure state updates are based on the previous state, avoiding race conditions
- Messages are added to the conversation array immediately, then rolled back if the API call fails (`prev.slice(0, -1)`)
- Loading states are managed with try/catch/finally blocks to ensure UI always reflects the current operation status

---

## Goals

This project demonstrates the implementation of a full-stack web application with the following key concepts and features:

1. **Django REST API Development** - RESTful API endpoints for authentication and chat functionality with proper error handling and HTTP status codes
2. **React Component Architecture** - Functional components with React Hooks, form handling, and real-time UI updates
3. **Frontend-Backend Integration** - CORS configuration, environment variables, Fetch API, and protected routes
4. **Modern UI with TailwindCSS and Shadcn** - Utility-first CSS framework for rapid, responsive UI development and Shadcn

---

# Chatbot 4Blue (Português)

## Requisitos

### Requisitos do Backend

- **Python 3.8+** ([Python 3.13](https://www.python.org/downloads/) recomendado)
- **pip** ([Gerenciador de pacotes Python](https://pip.pypa.io/en/stable/cli/pip_install/))

### Requisitos do Frontend

- **Node.js 24+** ([Node.js](https://www.nodejs.tech/pt-br/download) 24.11.1 recomendado)
- **pnpm** ([Gerenciador de pacotes](https://pnpm.io/installation#using-npm) - instale com `npm install -g pnpm`)

---

## Instruções de Configuração

### Configuração do Backend

1. Criar ambiente virtual:

   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```

   > Isso ativará o ambiente virtual do Python

2. Instalar dependências:

   ```bash
   pip install -r requirements.txt
   ```

   > Instala o Django

3. Navegar para o backend:

   ```bash
   cd backend
   ```

4. Executar migrações:

   ```bash
   python manage.py migrate
   python manage.py migrate chatbot
   ```

   > Cria as tabelas do banco de dados para:
   >
   > - Apps built-in do Django (sessions, auth, etc.)
   > - Modelos do app chatbot (`Usuario` e `Mensagem`).\n
   >   <br>

5. Popular o banco de dados:

   ```bash
   python manage.py create_mock_users
   ```

   > Popula o banco de dados com usuários de teste

6. Iniciar servidor:
   ```bash
   python manage.py runserver
   ```
   > Configura o servidor
   > Acesse o servidor em: `http://localhost:8000`

### Configuração do Frontend

1. Navegar para o frontend:

   ```bash
   cd frontend
   ```

2. Instalar dependências:

   ```bash
   pnpm install
   ```

   > Instala as dependências

3. Criar arquivo `.env`

   - No Linux:

   ```bash
   cp .env.example .env
   ```

   > Copia a configuração .env para um arquivo utilizável

4. Iniciar servidor de desenvolvimento:
   ```bash
   pnpm run dev
   ```
   > Acesse o website em: `http://localhost:5173`
   >
   > > Você pode logar no `Usuario A` usando `a123`
   > > Ou no `Usuario B` usando `b123`

## Decisões Técnicas

### Estrutura dos Modelos Django

O esquema do banco de dados é projetado com dois modelos principais que estabelecem uma relação clara:

**Modelo `Usuario`:**

- Usa `AutoField` para a chave primária em vez do `BigAutoField` padrão do Django para manter compatibilidade com esquemas de banco de dados existentes
- Armazena credenciais (`nome`, `senha`) diretamente no modelo por simplicidade, embora em produção isso usaria o sistema de autenticação built-in do Django com hash de senha
- Inclui timestamp `criado_em` usando `auto_now_add=True` para trilhas de auditoria
- Usa `db_table = 'usuario'` para definir explicitamente o nome da tabela, mantendo consistência com convenções de nomenclatura em português

**Modelo `Mensagem`:**

- Estabelece uma relação **ForeignKey** com `Usuario` usando `on_delete=models.CASCADE`, garantindo que quando um usuário é deletado, todas as suas mensagens são automaticamente removidas (integridade de dados)
- Armazena tanto `mensagem` (entrada do usuário) quanto `resposta` (resposta do bot) no mesmo modelo, criando um par de conversa que pode ser facilmente recuperado junto
- A estrutura de relacionamento (`Mensagem` → `Usuario`) permite consultas eficientes: `Mensagem.objects.filter(usuario=usuario)` recupera todas as mensagens de um usuário específico em uma única consulta

**Por que essa estrutura?** Este design prioriza simplicidade e relacionamentos diretos. Cada mensagem está vinculada a um usuário, tornando simples recuperar o histórico de conversas. O relacionamento um-para-muitos (um usuário, muitas mensagens) é uma escolha comum para aplicações de chatbot onde usuários têm múltiplas trocas de conversação.

### Gerenciamento de Estado no React

**Estado no Nível do Componente:**

- Cada componente de página (`Chat`, `Historico`, `Login`) gerencia seu próprio estado independentemente
- Variáveis de estado são escopadas para seu caso de uso específico:
  - `conversation`: Array de objetos de mensagem para a sessão de chat atual
  - `loading`: Boolean para controlar indicadores de carregamento durante chamadas de API
  - `authenticated`: Boolean para rastrear o status de autenticação
  - `sending`: Boolean para prevenir envios duplicados de formulário

**Padrões de Atualização de Estado:**

- Usa atualizações funcionais (`setConversation(prev => [...prev, newMessage])`) para garantir que as atualizações de estado sejam baseadas no estado anterior, evitando condições de corrida
- Mensagens são adicionadas ao array de conversa imediatamente, depois revertidas se a chamada da API falhar (`prev.slice(0, -1)`)
- Estados de carregamento são gerenciados com blocos try/catch/finally para garantir que a UI sempre reflita o status da operação atual

---

## Objetivos

Este projeto demonstra a implementação de uma aplicação web full-stack com os seguintes conceitos e funcionalidades principais:

1. **Desenvolvimento de API REST com Django** - Endpoints de API RESTful para autenticação e funcionalidade de chat com tratamento adequado de erros e códigos de status HTTP
2. **Arquitetura de Componentes React** - Componentes funcionais com React Hooks, manipulação de formulários e atualizações de UI em tempo real
3. **Integração Frontend-Backend** - Configuração CORS, variáveis de ambiente, Fetch API e rotas protegidas
4. **UI Moderna com TailwindCSS e Shadcn** - Framework CSS utility-first para desenvolvimento rápido e responsivo de UI e Shadcn
