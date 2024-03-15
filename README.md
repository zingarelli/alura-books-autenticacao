# Lidando com autenticação do usuário

Neste projeto temos algumas telas já implementadas para um e-commerce de livros chamado Alura Books. Nosso objetivo é possibilitar que uma pessoa usuária possa fazer login na aplicação e ter autorização para acessar uma página de pedidos. Para isso, utilizamos tecnologias como o Axios e JWT para autenticação e autorização via token.

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **React: autenticação com Axios e JWT**
| :label: Tecnologias | Axios, JWT, TypeScript, React
| :rocket: URL         | 
| :fire: Curso     | https://cursos.alura.com.br/course/react-autenticando-usuarios


![](https://github.com/zingarelli/codechella/assets/19349339/cb246c60-c549-4775-8045-0b4f31e8c00a#vitrinedev)

## Créditos

O projeto foi adaptado a partir deste [repositório da Alura](https://github.com/alura-cursos/curso-react-alurabooks/tree/aula-1), que já traz a páginas e componentes iniciais da Alura Books. 

A parte de autenticação e obtenção dos pedidos é feita por meio de consultas a uma API, que é mockada com o uso do json-server e JWT, ou seja, roda localmente. A API pode ser obtida [neste repositório](https://github.com/viniciosneves/api-alurabooks).

## Detalhes do projeto

Foram desenvolvidas novas telas para a aplicação, com o objetivo de lidar com autenticação e autorização da pessoa usuária. Na parte de autenticação, é feito o login da pessoa por meio de e-mail e senha, e um token é salvo na sessionStorage do navegador. Na parte de autorização, a pessoa pode acessar uma página de pedidos e ver seus pedidos, mas para isso é necessário recuperar esses dados via API, passando o token recebido durante a autenticação. 

### Autenticação

Uma tela de cadastro foi desenvolvida, de modo a cadastrar nova pessoa usuária. Ao clicar para envio do cadastro, é feita uma chamada POST à API na URL http://localhost:8000/public/registrar. Para o post, são enviadas as seguintes propriedades que a API espera no corpo da requisição: email, senha, nome, endereco, complemento, cep.

O login também é feito via POST, com a URL http://localhost:8000/public/login. A API espera receber um objeto com email e senha. Caso o login seja feito com sucesso, a API retorna na propriedade `data` de um response outras duas propriedades: `access_token` e `user`. É por meio desse `access_token` que lidamos com a autorização da pessoa usuária para recuperar seus pedidos.

Exemplo de POST via Axios para fazer o login e salvar o token em um sessionStorage no navegador:

```typescript
const usuario = {
    email,
    senha
}
axios.post('http://localhost:8000/public/login', usuario)
    .then(resp => {
        sessionStorage.setItem('token', resp.data.access_token)
        aoFechar()
    })
    .catch(err => {
        if (err?.response?.data?.message) alert(err.response.data.message)
        else (console.log(err))
    })
```

- `sessionStorage`: diferente da `localStorage`, a `sessionStorage` armazena dados no navegador, porém esses dados são **removidos** quando o navegador é fechado ou quando a aba em que a aplicação está rodando é fechada. Caso seja feito um refresh da página, os dados na sessionStorage são **mantidos**.

- atenção: a sessão é relativa e única para cada aba/janela aberta. Ou seja, se a aplicação estiver rodando em **duas (ou mais) abas** diferentes, cada uma terá **sua própria sessão** (tokens distintos). 

### Token e autorização

A API libera acesso ao endpoint `/pedidos` somente mediante o **envio do token** que foi entregue após o login bem-sucedido. Essa informação pode ser enviada por meio de uma chamada GET via Axios, passando como segundo parâmetro um objeto com uma propriedade `headers`, a qual também possui um objeto e este possui uma propriedade `Authorization`. Conforme a especificação da API mockada, ela espera receber no `Authorization` o seguinte valor: `Bearer <access_token>`. Veja o exemplo:

```typescript
const urlPedidos = 'http://localhost:8000/pedidos';
const access_token = sessionStorage.getItem('token');
axios.get(urlPedidos, {
    headers: {
        'Authorization': `Bearer ${access_token}`
    }
})
    .then(resp => console.log(resp.data))
    .catch(err => console.log(err))
```

A tela de pedidos permite também a exclusão de um item. Isso é feito por meio de uma chamada DELETE, que também exige um token para que a ação seja feita. O código é semelhante ao do GET:

```ts
const excluirPedido = (id: number) => {
    axios.delete(`${urlPedidos}/${id}`, {
        headers: {
            'Authorization': `Bearer ${access_token}`
        }
    })
        .then(resp => {
            if (resp?.statusText === 'OK') setPedidos(oldState =>
                oldState.filter(pedido =>
                    pedido.id !== id));
        })
        .catch(err => console.log(err))
}
```

### Encapsulamento e interceptors

Podemos encapsular o Axios em uma constante, de modo a ter como fazer uma chamada com configurações padrões e também criar interceptadores de chamada para envio de dados adicionais.

```ts
// http/index.ts
// cria uma instância do axios com algumas configurações comuns
const http = axios.create({
    baseURL: 'http://localhost:8000', // quem usar o http não precisa digitar essa parte da URL
    headers: {
        Accept: 'application/json', // na response será aceito somente dados em JSON
        Content: 'application/json' // no request, iremos sempre enviar dados em JSON
    }
})

// agora o post para login pode ser assim
import http from "../../http";
http.post('public/login', usuario) // não preciso informar a URL completa
    .then(resp => {
        sessionStorage.setItem('token', resp.data.access_token)
        aoFechar()
    })
    .catch(err => {
        if (err?.response?.data?.message) alert(err.response.data.message)
        else (console.log(err))
    })
```

O Axios disponibiliza [interceptadores (interceptors)](https://github.com/axios/axios?tab=readme-ov-file#interceptors), que podem ser adicionados à instância criada, para lidar com as requests e responses antes de elas serem enviadas/devolvidas. Por exemplo, na chamada GET para recuperar os pedidos, podemos usar um interceptador de request para passar o token de autenticação e aí então prosseguir com o envio da request. Assim, encapsulamos o token na instância do Axios e ele não precisa mais ser obtido em diferentes lugares do código.

```ts
// http/index.ts
// interceptador de requisições (requests)
http.interceptors.request.use(function (config) {
    // essa função será chamada antes do envio da request
    // envio do token pelo header da requisição
    const access_token = sessionStorage.getItem('token');
    if (access_token && config.headers) {
        config.headers.Authorization = `Bearer ${access_token}`
    }
    return config;
}, function (error) {
    // essa função será chamada se a request der algum erro
    console.log('Ocorreu um erro no interceptor do axios!')
    return Promise.reject(error);
});

// agora o get de pedidos fica simples e não precisa saber do token:
const urlPedidos = 'pedidos';
axios.get(urlPedidos)
    .then(resp => console.log(resp.data))
    .catch(err => console.log(err))
```

### Para saber mais

- Diferença entre autenticação e autorização: https://www.alura.com.br/artigos/autenticacao-autorizacao-seguranca-no-front-end

- Explicação (com códigos) sobre autenticação usando o padrão JWT (JSON Web Tokens): https://www.alura.com.br/artigos/o-que-e-json-web-tokens

    - Vídeo com explicação e parte prática: https://cursos.alura.com.br/extra/alura-mais/o-que-e-json-web-token-jwt--c203

- Modelo de arquitetura REST, alguns de seus princípios e como ele é usado em aplicações Web, aliado com o protocolo HTTP: https://www.alura.com.br/artigos/rest-principios-e-boas-praticas

## Dicas extras

- O React possui a biblioteca `Intl` que auxilia na internacionalização de alguns dados, devolvendo-os formatado adequadamente à localização da pessoa usuária. Por exemplo, para devolver um número no formato da moeda brasileira, podemos criar uma função formatadora:

```ts
const formataMoeda = Intl.NumberFormat('pt-br', { style: 'currency', currency:'BRL' });
console.log(formataMoeda.format(126.9)); // R$ 126,90
```

- Imprimir datas usando o `Date` do JavaScript às vezes pode causar efeitos inesperados como a data do dia anterior sendo impressa (devido a questões de fuso horário). Uma forma de imprimir a data correta é fazer uma função formatadora que leve em conta o fuso do computador em que a aplicação estiver rodando:

```ts
const formataData = (data: Date) => {
    const timezoneOffset = data.getTimezoneOffset()
    data.setMinutes(data.getMinutes() + timezoneOffset) // ajuste do tempo para a máquina rodando o app
    return data.toLocaleDateString()
}
console.log(formataData(new Date("2022-08-01"))) // 01/08/2022
console.log(new Date("2022-08-01").toLocaleDateString()) // 31/07/2022
```

## Instalação

O projeto foi criado com o Create React App, utilizando Node.js e npm. É necessário estar com ambos instalados em sua máquina para rodar a aplicação.

Após clonar/baixar o projeto, abra um terminal, navegue até a pasta do projeto e rode o seguinte comando para instalar todas as dependências necessárias:

    npm install

Após isso, você pode rodar a aplicação em modo de desenvolvimento com o seguinte comando:

    npm start

A aplicação irá rodar no endereço http://localhost:3000.

Para a parte de autenticação e autorização, também é necessário instalar a API que irá rodar localmente. Após o download/clone do projeto [neste repositório](https://github.com/viniciosneves/api-alurabooks), rode os comandos abaixo:

    npm install
    npm run start-auth

A API irá rodar no endereço http://localhost:8000.