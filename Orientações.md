# Sobre
A aplicação consiste de um sistema simples de lista de afazeres, onde é possível registrar novos afazeres, lista-los e marca-los como concluídos e arquivá-los.

A aplicação consiste de três partes, o back end, o front end e uma aplicação mobile.

O back end consiste de uma API Restful e foi desenvolvido utilizando as tecnologias:
* Java 8
* Framework Spring Boot MVC
* Hibernate e JPA
* PostgreSQL

O front end consiste de um single page app e foi desenvolvido com:
* React e Reactstrap
* Bootstrap 4

E a aplicação mobile foi toda desenvolvida em `Flutter`

# Orientações
Primeiramente é necessário que se tenha instalado na máquina, além do java na sua versão 8, a ferramenta `maven`, a `sdk` do `flutter` e as ferramentas de desenvolvimento `android`.

## Back End
Para inicializar o back end é preciso alterar as variaveis referentes as conexões de banco de dados, elas podem ser modificadas editando o arquivo `application.yml` que se encontra na pasta `src/resources`, os valores das váriaveis significam:
* `JDBC_DATABASE_URL` é o endereço do banco de dados no formato `jdbc:postgresql://<usuario>:<senha>@<host>:<porta>/<nome_banco_dados>`
* `JDBC_DATABASE_USERNAME` é o nome de usuário utilizado para realizar a conexão e `JDBC_DATABASE_PASSWORD` a sua senha.

Feitas as alterações basta executar o comando no terminal `mvn spring-boot:run` e ele irá buildar o servidor back end como também o front end, ao terminar basta acessar a url `http://localhost:8080` para visualizar a aplicação em execução.

## Front End
O front end é construído junto ao back end, como dito anteriormente, mas caso se deseje rodá-la em separado para fins de juntamente ao `npm`, feito isso acesse a pasta `app` e execute:
* `npm install` para instalar as depêndencias do projeto
* `npm start` para fazer com que o projeto seja executado, o mesmo será levantado em um servidor no endereço `http://localhost:3000`.

Se você estiver rodando o back end em um endereço diferente do citado anteriormente é necessário editar a propriedade `proxy` no arquivo `app/package.json` para que a aplicação aponte para o endereço correto da api.

## Mobile
Como dito anteriormente é preciso que se tenha as ferramentas de desenvolvimento `android` e a `flutter sdk` para executar este projeto, também é preciso que os plugins para desenvolvimento `flutter` estejam instalados no seu Android Studio.

Com o ambiente pronto, basta alterar a propriedade `apiUrl` no arquivo `todo_flutter/services/todo.service.dart` para que o app aponte para a url correta do servidor e possa fazer uso da api.

# Demo
Uma pequena demo da aplicação pode ser vista no endereço: https://rvalente-todo.herokuapp.com/