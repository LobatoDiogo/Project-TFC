O Trybe Futebol Clube é um site informativo sobre partidas e uma tabela com a classificação dos times de futebol.

## O que foi desenvolvido

- API via sequelize e POO utilizando o método TDD e também integrei com o docker-compose as aplicações para que funcionem utilizando o banco de dados.
- Uma autenticação para o login utilizando JWT.

## Endpoints desenvolvidos

#### Teams:

- Endpoint `GET /teams` - Retorna todos os times
- Endpoint `GET /teams/:id` - Retorna dados de um determinado time

#### Login:

- Endpoint `POST /login` - Para o usuário fazer login dentro da aplicação
```
// exemplo de body que precisa ser enviado:
 {
   "email": "user@user.com",
   "password": "secret_user"
 }
```
- Endpoint `/login/role` - Para visualizar sua função, através de um token válido

#### Matches:

- Endpoint `GET /matches` - Retorna todas as partidas
- Endpoint `GET /matches?inProgress=true` - Utiliza a query inProgress para filtrar as partidas em andamento
- Endpoint `PATCH /matches/:id/finish` - Para finalizar uma partida, através de um token válido 
- Endpoint `PATCH /matches/:id` - Atualização de uma partida em andamento, necessário autorização de um token válido
```
// exemplo de body da requisição:
 {
  "homeTeamGoals": 3,
  "awayTeamGoals": 1
}
```
- Endpoint `POST /matches` - Para criar uma nova partida;
```
// exemplo de body da requisição:
 {
  "homeTeamId": 16, 
  "awayTeamId": 8, 
  "homeTeamGoals": 2,
  "awayTeamGoals": 2,
}
```
#### Leaderboard:
- Endpoint `GET /leaderboard/home` - Retorna informações de performance dos times que jogaram em casa
- Endpoint `GET /leaderboard/away` - Retorna informações de performance dos times visitantes
- Endpoint `GET /leaderboard` - Retorna a classificação geral dos times


## Principais tecnologias utilizadas

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-005C84?style=for-the-badge&logo=mysql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)

## Contribuição:

Desenvolvi todo backend do projeto e os Dockerfiles, o frontend e os demais arquivos forma feitos pela Trybe.
