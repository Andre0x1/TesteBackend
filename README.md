# Backend de Delivery - Documentação

Este é um projeto de backend para um sistema de delivery, desenvolvido utilizando Node.js e MongoDB. O objetivo deste sistema é gerenciar os pedidos de entrega, incluindo informações sobre endereço, produtos, usuários, formas de pagamento, pedidos, sacolas e relacionamentos entre eles.

## Requisitos

- Node.js (versão 12 ou superior)
- MongoDB (instância local ou remota)

## Instalação

1. Clone o repositório em sua máquina local:

   git clone https://github.com/Andre0x1/TesteBackend


2. Acesse o diretório do projeto:


   cd backend

3. Instale as dependências do projeto:

   npm install

4. Inicie o servidor:
   npm start


   O servidor será executado na porta definida na variável de ambiente `PORT` (padrão: 3000).

## Rotas

A seguir, estão descritas as principais rotas disponíveis no sistema de delivery:

### Módulo de Endereço

- **GET /endereco/:id** - Retorna os detalhes de um endereço específico com base no ID fornecido.
- **GET /endereco/usuario/:id** - Retorna os detalhes dos endereços cadastrados de um usuario específico com base no ID fornecido.
- **GET /endereco/** - Retorna os detalhes de todos os endereçoscadastrados.
- **POST /endereco** - Cria um novo endereço com base nos dados fornecidos no corpo da solicitação.
- **PUT /endereco/:id** - Atualiza os dados de um endereço específico com base no ID fornecido.
- **DELETE /endereco/:id** - Exclui um endereço específico com base no ID fornecido.

### Módulo de Produto

- **GET /produto/:id** - Retorna os detalhes de um produto específico com base no ID fornecido.
- **POST /produto** - Cria um novo produto com base nos dados fornecidos no corpo da solicitação.
- **PUT /produto/:id** - Atualiza os dados de um produto específico com base no ID fornecido.
- **DELETE /produto/:id** - Exclui um produto específico com base no ID fornecido.

### Módulo de Usuário

- **GET /usuario/:id** - Retorna os detalhes de um usuário específico com base no ID fornecido.
- **POST /usuario** - Cria um novo usuário com base nos dados fornecidos no corpo da solicitação.
- **PUT /usuario/:id** - Atualiza os dados de um usuário específico com base no ID fornecido.
- **DELETE /usuario/:id** - Exclui um usuário específico com base no ID fornecido.

### Módulo de Forma de Pagamento

- **GET /forma-pagamento/:id** - Retorna os detalhes de uma forma de pagamento específica com base no ID fornecido.
- **POST /forma-pagamento** - Cria uma nova forma de pagamento com base nos dados fornecidos no corpo da solicitação.
- **PUT /forma-pagamento/:id** - Atualiza os dados de uma forma de

 pagamento específica com base no ID fornecido.
- **DELETE /forma-pagamento/:id** - Exclui uma forma de pagamento específica com base no ID fornecido.

### Módulo de Pedido

- **GET /pedido/:id** - Retorna os detalhes de um pedido específico com base no ID fornecido.
- **POST /pedido** - Cria um novo pedido com base nos dados fornecidos no corpo da solicitação.
- **PUT /pedido/:id** - Atualiza os dados de um pedido específico com base no ID fornecido.
- **DELETE /pedido/:id** - Exclui um pedido específico com base no ID fornecido.

### Módulo de Sacola

- **GET /sacola/:id** - Retorna os detalhes de uma sacola específica com base no ID fornecido.
- **POST /sacola** - Cria uma nova sacola com base nos dados fornecidos no corpo da solicitação.
- **PUT /sacola/:id** - Atualiza os dados de uma sacola específica com base no ID fornecido.
- **DELETE /sacola/:id** - Exclui uma sacola específica com base no ID fornecido.

### Módulo de Pedidos-Produtos

- **GET /pedidos-produtos/:id** - Retorna os detalhes de um relacionamento entre um pedido e um produto específicos, com base nos IDs fornecidos.
- **POST /pedidos-produtos** - Cria um novo relacionamento entre um pedido e um produto, com base nos dados fornecidos no corpo da solicitação.
- **PUT /pedidos-produtos/:id** - Atualiza os dados de um relacionamento entre um pedido e um produto específicos, com base no ID fornecido.
- **DELETE /pedidos-produtos/:id** - Exclui um relacionamento entre um pedido e um produto específicos, com base no ID fornecido.

### Módulo de Sacola-Produtos

- **GET /sacola-produtos/:id** - Retorna os detalhes de um relacionamento entre uma sacola e um produto específicos, com base nos IDs fornecidos.
- **POST /sacola-produtos** - Cria um novo relacionamento entre uma sacola e um produto, com base nos dados fornecidos no corpo da solicitação.
- **PUT /sacola-produtos/:id** - Atualiza os dados de um relacionamento entre uma sacola e um produto específicos, com base no ID fornecido.
- **DELETE /sacola-produtos/:id** - Exclui um relacionamento entre uma sacola e um produto específicos, com base no ID fornecido.

### Módulo de Forma de Pagamento-Usuários

- **GET /formapagamento-usuarios/:id** - Retorna os detalhes de um relacionamento entre uma forma de pagamento e um usuário específicos, com base nos IDs fornecidos.
- **POST /formapagamento-usuarios** - Cria um novo relacionamento entre uma forma de pagamento e um usuário, com base nos dados fornecidos no corpo da solicitação.
- **PUT /formapagamento-usuarios/:id** - Atualiza os dados de um relacionamento entre uma forma de pagamento e um usuário específicos, com base no ID fornecido.
- **DELETE /formapagamento-usuarios/:id** - Exclui um relacionamento entre uma forma de pagamento

 e um usuário específicos, com base no ID fornecido.

## Considerações Finais

Este projeto foi desenvolvido utilizando Node.js e MongoDB para criar um backend para um sistema de delivery. As rotas descritas acima permitem a gestão de endereços, produtos, usuários, formas de pagamento, pedidos, sacolas e os relacionamentos entre eles. Certifique-se de ter as dependências instaladas e as variáveis de ambiente configuradas corretamente antes de iniciar o servidor.

Se tiver alguma dúvida ou problema, sinta-se à vontade para entrar em contato com a equipe de desenvolvimento.

Aproveite o sistema de delivery!