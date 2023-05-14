# Teste Backend FIEMG
## Sobre o projeto
Esse repositório se trata de um projeto teste para a FIEMG, onde o objetivo era criar um Cronjob para consumir uma API que lista Universidades de vários países. Nesse projeto utilizei o NodeJS com Typescript, e as bibliotecas JWT, bcryptjs, express-validator e cron, para fazer as queries no banco utilizei o prisma ORM utilizando o provider para banco mysql.
# Instalação

* Instale as dependências utilizando o seu gerenciador de dependências preferido.

* Crie uma banco no mysql para ser utilizado na aplicação.

* Copiar o arquivo .env-example e renomea-lo para .env

* Dentro do .env na chave DATABASE_URL preencher as informações com as da configuração do seu banco (usuário, porta e nome do banco de dados).

* Na pasta onde o projeto foi clonado, abrir um terminal e digitar `node`, e apertar enter. Logo após, digitar o seguinte comando:<br> `require('crypto').randomBytes(64).toString('hex')`<br> e então copiar a string que foi criada no console e colar na chave JWT_SECRET do .env .

* Agora, para migrar o schema da aplicação para o banco, rode o comando prisma migrate dev.

* Para o cronjob que popula a tabela de universidade ser executado pela primeira vez, sugiro setar a chave `CRON_TIME_VALUE` com o valor `"* * * * *"`, para o cron ser rodado pela primeira vez. E após ter sido executado pela primeira vez, voltar para a string default `"0 0 * * *"` que indica que o cronjob será executado todo dia as meia noite.

* Para começar a utilizar basta rodar o servidor com `npm run dev` ou `yarn dev`.

# Utilização

* Para começar a utilizar registre um usuário no endpoint `/auth/register`.<br>
Exemplo de payload:<br> `{
	"name": "teste",
	"email": "teste@outlook.com",
	"emailConfirmation": "teste@outlook.com",
	"password": "eoq123",
	"passwordConfirmation": "eoq123"
}`

<br>

* Ao se cadastrar com sucesso, insira o e-mail e senha para login no endpoint `/auth/login`.<br>
Exemplo de payload:<br> `{
	"email": "teste@outlook.com",
	"password": "eoq123"
}`
<br>
E então copie o Bearer token que será utilizado para fazer requisições a endpoints protegidos.<br>

Apartir daqui já está tudo pronto para se utilizar a aplicação, espero que gostem!<br>
Abaixo deixei os endpoints existentes e o payload para utilização com Postman ou outro client HTTP.<br><br>
# Endpoints

### Registrar usuário<br>
método: POST<BR>
endpoint : `/auth/register`<br>
payload :<br> `{
"name": "teste",
"email": "teste@outlook.com",
"emailConfirmation": "teste@outlook.com",
"password": "eoq123",
"passwordConfirmation": "eoq123"
}`<br> <br>

### Login<br>
método: POST<BR>
endpoint : `/auth/login`<br>
payload :<br> `
{
"email": "teste@outlook.com",
"password": "eoq123"
}
`<br> <br>

### Trocar senha<br>
método: PUT<BR>
endpoint : `/user/change-password`<br>
payload :<br> `
{
"currentPassword": "eoq1234",
"newPassword": "eoq123"
}
`<br> <br>

### Listar Universidades<br>
método: GET<BR>
endpoint : `/universities`<br>
params : `
country, page
`<br> <br>

### Detalhes de uma Universidade<br>
método: GET<BR>
endpoint : `/universities/:id`<br>
<br> <br>

### Cadastrar Universidade<br>
método: POST<BR>
endpoint : `/universities/create`<br>
payload :<br> `
{
"name": "John Doe University",
"country": "Brazil",
"alphaTwoCode": "BR",
"webPages": [
    "https://www.doejohn.com.br"
],
"domains": [
    "doejohn.br"
],
"stateProvince": "Belo Horizonte"
}
`<br> <br>

### Atualizar Universidade<br>
método: PUT<BR>
endpoint : `/universities/:id`<br>
payload :<br> `
{
"name": "Mike College",
"webPages": [
        "https://www.mikefella.com.br",
        "https://www.fellamike.com.br"
],
"domains": [
    "mikefella.br"
]
}
`<br> <br>

### Remover Universidade<br>
método: DELETE<BR>
endpoint : `/universities/:id`<br>
<br> <br>










