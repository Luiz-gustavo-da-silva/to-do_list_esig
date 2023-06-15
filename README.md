# Desafio gerenciador de tarefas ESIG

## Luiz Gustavoda Silva

### Resumo
Projeto criado para a resolução do desafio de estágio front-end da empresa ESIG. O objetivo desse projeto é desenvolver um gerenciador de tarefas simples. A aplicação permitirá aos usuários criar,  atualizar, remover e listar uma tarefa.

### Link do Mockup

https://www.figma.com/file/YVYKpDQRHYHGOP617lMXiD/Mockup-Esig?type=design&node-id=0-1&t=wFxXGqAue5a5QRDT-0


### instruções para uso da aplicação/descrição do que foi feito

Ao acessar a aplicação, os usuários serão recebidos por uma tela de login, onde poderão autenticar-se e entrar na aplicação. Utilize o seguinte email: luiz@gmail.com e senha: 1234 para realizar a autenticação.

Após o login bem-sucedido, os usuários serão redirecionados para um painel de controle (dashboard), onde poderão visualizar uma tabela com as tarefas em andamento. Além disso, haverá uma barra lateral com um botão para adicionar uma nova tarefa e um elemento de "accordion" contendo opções de filtro.

Os usuários poderão filtrar as informações da tabela usando o filtro, que permite combinar ou pesquisar separadamente por número, situação, título/descrição e responsável.

Na coluna "Action" da tabela, os usuários terão opções para editar, excluir e concluir uma tarefa. Ao excluir uma tarefa, ela será removida do banco de dados e não poderá mais ser acessada. Ao concluir uma tarefa, ela será removida da lista inicial, mas poderá ser encontrada utilizando o filtro de "situação".

Ao lado da coluna "Action", há uma coluna "Detalhes", que permite ao usuário visualizar todas as informações relacionadas a uma determinada tarefa.
  

### itens feitos

- a) Criei uma aplicação SPA utilizando Angular na versão mais recente.

- b) Usei o In Memory BD para simulação do back-end da aplicação.

- c) Fiz um pseudo controle de autenticação (Não fiz geração de token), o usuário pode acessar o sistema com o login: luiz@gmail.com e senha: 1234. 

- d) Criei algumas telas/modais extras, sendo elas o modal detalhes e a tela de login.

- f) Publiquei o projeto no Herukou. 

### Acessibilidade

![Texto Alternativo](./src/assets/acessibilidade%20avalia%C3%A7%C3%A3o.png)


Sendo a acessibilidade um recurso extremamente importante, considerei a inclusão de todos os usuários ao desenvolver esta aplicação. A imagem acima é um exemplo de um teste automatizado realizado com a ferramenta Accessibility Insights, que avalia recursos de acessibilidade. Como demonstrado, não foram encontradas falhas que comprometam a inclusão de pessoas com deficiência. Os testes manuais também não apresentaram erros.


### Passo a passo para rodar o programa localmente

Este guia fornece um passo a passo para clonar e executar um projeto Angular a partir de um repositório Github.

### Pré-requisitos

- Node.js instalado no sistema
- Angular CLI instalado globalmente

### Passos

1. **Clonar o repositório**: Abra o terminal ou prompt de comando e navegue até o diretório onde você deseja clonar o projeto. Execute o seguinte comando para clonar o repositório:

git clone <URL_do_repositório>

Substitua `<URL_do_repositório>` pela URL do repositório Git que contém o projeto Angular.

2. **Instalar as dependências**: Navegue até o diretório do projeto clonado e execute o comando abaixo para instalar as dependências do projeto:

cd <diretório_do_projeto>
npm install


3. **Iniciar o servidor de desenvolvimento**: Após a conclusão da instalação das dependências, execute o seguinte comando para iniciar o servidor de desenvolvimento do Angular:

ng serve


Isso iniciará o servidor de desenvolvimento e irá compilar e servir o projeto Angular localmente.

4. **Acessar o projeto**: Abra um navegador da web e acesse o seguinte URL (Por padrão o projeto abri na porta 4200, mas pode abrir em outra porta):

http://localhost:4200


O projeto Angular será carregado e você poderá visualizá-lo e interagir com ele no navegador.

