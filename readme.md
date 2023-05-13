# Teste Backend FIEMG
## Sobre o projeto
Esse repositório se trata de um projeto teste para a FIEMG, onde o objetivo era criar um Cronjob para consumir uma API que lista Universidades de vários países. Nesse projeto utilizei o NodeJS com Typescript, e as bibliotecas JWT, bcryptjs, express-validator e cron, para fazer as queries no banco utilizei o prisma ORM utilizando o provider para banco mysql.
## Instruções para utilização

* Instalar as dependências utilizando o seu gerenciador de dependências preferido.

* Crie uma banco no mysql para ser utilizado na aplicação.

* Copiar o arquivo .env-example e renomea-lo para .env

* Dentro do .env na chave DATABASE_URL preencher as informações com as da configuração do seu banco (porta e nome do banco de dados).

* Na pasta onde o projeto foi clonado, abrir um terminal e digitar o seguinte comando:<br> `node require('crypto').randomBytes(64).toString('hex')`<br> e então copiar a string que foi criada no console e colar na chave JWT_SECRET do .env



