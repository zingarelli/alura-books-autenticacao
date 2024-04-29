# Alura Books versão TypeScript

Neste projeto, temos algumas telas já implementadas para um e-commerce de livros chamado Alura Books. Nosso objetivo é evoluir a aplicação, fazendo requisições a uma API para criar novas telas, implementar políticas de autenticação/autorização, além fazer o fluxo de adicionar e remover itens ao carrinho de compras. Para isso, utilizamos inicialmente Axios, passamos pelo React Query e finalizamos com Apollo Client e GraphQL.

| :placard: Vitrine.Dev |     |
| -------------  | --- |
| :sparkles: Nome        | **Evolução Alura Books**
| :label: Tecnologias | GraphQL, ReactQuery, Apollo Client, Axios, JWT, TypeScript, React
| :rocket: URL         | 
| :fire: Curso     | https://cursos.alura.com.br/course/react-autenticando-usuarios


![](https://github.com/zingarelli/alura-books-autenticacao/assets/19349339/1da53376-fb45-43b7-ba02-b721e983b6b0#vitrinedev)

## Créditos

O projeto foi adaptado a partir deste [repositório da Alura](https://github.com/alura-cursos/curso-react-alurabooks/tree/aula-1), que já traz a páginas e componentes iniciais da Alura Books. 

A parte de autenticação e obtenção dos pedidos é feita por meio de consultas a uma API, que é mockada com o uso do json-server e JWT, ou seja, roda localmente. A API pode ser obtida [neste repositório](https://github.com/viniciosneves/api-alurabooks).

Uma segunda API mockada é utilizada nos cursos de Apollo Client e GraphQL. O projeto pode ser obtido neste [outro repositório](https://github.com/alura-cursos/alurabooks-gql). 

## Detalhes do projeto

Este é um projeto construído ao longo dos cursos da trilha de formação da Alura, chamada de ["React: consumindo APIs"](https://cursos.alura.com.br/formacao-react-consumindo-apis). Em cada curso, lidamos com um tópico diferente (autenticação, React Query e GraphQL). Detalhes sobre o projeto e cada tópico aprendido são dados nas seções a seguir.

*Observação:* a formação inicia com um curso sobre desenvolvimento de uma biblioteca de componentes, que incluiu a utilização do Storybook e publicação no NPM. O projeto está separado [neste outro repositório](https://github.com/zingarelli/alura-books-ds), pois houve problemas de incompatibilidade com o projeto inicial disponibilizado para acompanhamento dos outros cursos, então a biblioteca que eu desenvolvi não pôde ser reaproveitada.

O código foi desenvolvido em React com TypeScript. Há comunicação com uma API mockada rodando localmente. Por meio dela é possível fazer o login/cadastro da pessoa usuária, além de requisições para obter dados de pedidos, categorias, livros e autores. Utilizamos tanto o Axios e o [React Query](#react-query), quanto o [Apollo Client e GraphQL](#apollo-client-e-graphql) para fazer requisições e consultas à API. Na [Seção sobre Instalação](#instalação) há detalhes de como instalar e subir cada API.

### Páginas construídas:

#### Modal de Login

A autenticação é feita na API, que informa se foi ou não bem sucedida.

![tela de login](https://github.com/zingarelli/alura-books-typescript/assets/19349339/a4dbab4f-7fd1-4d06-b828-a1a8c521506a)

#### Modal de cadastro

Uma requisição POST é enviada à API para registro do usuário.

![tela de cadastro](https://github.com/zingarelli/alura-books-typescript/assets/19349339/83eee302-a750-438f-855c-5d2f7730a482)


#### Página de pedidos

Somente pode ser acessada após login. Internamente, é enviado um token de acesso à API para conseguir consultar os pedidos.

![tela da conta do usuário, exibindo os pedidos efetuados](https://github.com/zingarelli/alura-books-typescript/assets/19349339/f4e09b52-5dca-42b9-80e6-b8356902e579)

#### Livros por categoria

Ao selecionar uma categoria no menu superior do site, a página é carregada com os livros dessa categoria;

![gif mostrando a seleção de livros da categoria "Front End"](https://github.com/zingarelli/alura-books-typescript/assets/19349339/a4011c35-bc54-4d6b-a358-d7d476ebc8bb)

#### Detalhes de um livro

Ao clicar no botão "Ver detalhes" de um livro na galeria de livros, é carregada uma página com os detalhes desse livro, que traz ainda opções para escolher o formato (e-book, impresso, combo), a quantidade, e um botão para comprar. Quando clicado em "Comprar", o livro é adicionado ao carrinho, com a quantidade e formato selecionados;

![git fom a interação de selecionar formato e quantidade de um livro e adicioná-lo ao carrinho ao clickar no botão de comprar](https://github.com/zingarelli/alura-books-typescript/assets/19349339/fb4e8919-5166-4a73-aaef-d34336a10146)

#### Carrinho de compras

Página interativa que exibe todos os itens adicionados ao carrinho. Nela é possível alterar a quantidade e remover um item. O valor total da compra é atualizado em tempo real. Além da página, é possível também visualizar um "mini-carrinho", que é exibido ao clicar no ícone de sacola que fica no topo da aplicação. O mini-carrinho mostra o título e autor dos livros que estão no carrinho, bem como um botão para ver a página completa do carrinho.

![gif com a interação de alterar a quantidade de um livro do carrinho, bem como remover um livro](https://github.com/zingarelli/alura-books-typescript/assets/19349339/d79bb13e-9ce5-401b-8e29-a7c97f25599f)

## Lidando com autenticação

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

## Obtenção de dados (data fetching)

Existem alguns padrões que podem ser seguidos para o data fetching:

- standalone: o componente que precisa dos dados é o responsável por fazer a requisição para obtenção desses dados (via fetch, axios, etc.);

- Higher-Order Component (HOC): um "componente de alta ordem" nesse caso será o responsável pela obtenção e tratamento dos dados. Ele recebe um componente de entrada, faz o data fetching necessário e retorna novamente o componente recebido, mas enviando via props os dados obtidos. Assim, temos um HOC responsável pelo data fetching e outros componentes responsáveis somente pela UI;

- Hooks customizados: encapsulamos todo o processamento do data fetching em um hook customizado, que retorna esses dados quando utilizado.

### React Query

É uma biblioteca famosa que se oferece como alternativa ao data fetching e ao gerenciamento dos estados do servidor.

Necessário instalar. No curso, foi utilizada a versão 4.6.0.

    npm i @tanstack/react-query@4.6.0

**Observação:** a partir da versão 5, algumas funções foram alteradas (o `useQuery` é uma delas). Então as explicações deste README **valem para a versão 4** e podem não estar mais corretas para a versão 5.

De uma maneira semelhante a como estruturamos o código para uso da Context API, para que componentes possam usar o que o React Query oferece, eles devem ser descendentes de um componente chamado `<QueryClientProvider>`. Este componente requer uma instância da classe `QueryClient`. Exemplo de código:

```ts
// cliente para efetuar o data fetching
const queryClient = new QueryClient();

function App() {
  return (
    // componente que disponibiliza o React Query para seus componentes-filhos
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
```

#### Hook `useQuery`

Para obter dados da API, podemos usar o **hook `useQuery`**, passando dois parâmetros: uma `queryKey` e uma `queryFn`.

- a `queryKey` é um array que contém uma string que você passa para dar um nome único para a query. Caso a função em `queryFn` use variáveis que podem mudar de valor, você passa a variável como próximo elemento no array (é mais fácil entender no código de exemplo a seguir);

- a `queryFn` é uma função que você define para fazer de fato a obtenção dos dados (a "query"). Essa função deve retornar uma promise ou um erro.

A `useQuery` retorna uma série de propriedades. Dentre elas estão:

- `data`: retorna os dados da promise, caso tenha sido executada com sucesso;

- `isLoading`: um booleano que informa se a query já terminou;

- `error`: para caso alguma coisa dê errada.

Ambos `data` e `isLoading` são parecidos com variáveis de estado (que você não precisa se preocupar em declarar ou gerenciar), sendo atualizadas pelo próprio `useQuery` e **causam um re-render no componente** quando mudam.

Consulte a [documentação](https://tanstack.com/query/v4/docs/framework/react/reference/useQuery) para mais informação sobre outros parâmetros e propriedades.

Você pode tipar `data` e `error`. Para isso, use dois generics em `useQuery`, sendo que o primeiro irá tipar `data` e o segundo, `error`. Veja no exemplo:

Exemplo de código:

```ts
const { slug } = useParams();

// data fetching com React Query
// no destructuring, posso renomear uma propriedade passando o novo nome após ":"
const { data: categoria, isLoading, error } = useQuery<ICategoria, AxiosError>(
    // queryKey é o primeiro parâmetro e está passando a variável slug como dependência
    ['categoriaPorSlug', slug], 
    // queryFn é o segundo parâmetro e está chamando uma função definida em outro código
    () => obterCategoriaPorSlug(slug || '')
)

if (error) {
        console.log(error.message);
        return <h1>Que vergonha! Alguma coisa deu errado!</h1>
    }

// renderiza um ícone de loading enquanto os dados não foram carregados
if (isLoading) return <Loader />
```

## Apollo Client e GraphQL

Assim como o React Query, o [Apollo Client](https://www.apollographql.com/docs/react/get-started) é outra biblioteca que pode ser utilizada para o data fetching e para gerenciamento de estados de dados. Agora, diferente do React Query, o Apollo Client atua em **conjunto com o GraphQL**. 

O [**GraphQL**](https://graphql.com/learn/what-is-graphql/) é um tipo de "query language" desenvolvida pelo Facebook para interagir com APIs de forma flexível e eficiente. Flexível porque você pode fazer requisições a **diferentes "endpoints" e bases de dados** em uma única solicitação, e eficiente porque **você escolhe os dados que quer receber** do back-end, e não tudo de uma vez (ao invés de retornar um JSON completo da base de dados, o GraphQL retorna somente os campos que você pedir, reduzindo o tráfego de rede). Esse é somente um exemplo de algumas das vantagens.

- Ele acaba sendo uma camada intermediária de comunicação entre o Front e o Back-End. O Front diz para ele o que quer receber, e ele se encarrega de ir no Back obter esses dados e devolver somente o que foi pedido.

Instalação das dependências de ambas as tecnologias:

```bash
npm install @apollo/client graphql
```

Bem parecido com o visto na [Seção de React Query](#react-query), para fazer as consultas precisamos instanciar um cliente e adicionar um componente provedor para que subcomponentes possam utilizar o Apollo Client e consumir dados da API. Exemplo:

```ts
// cliente com algumas configurações necessárias
const client = new ApolloClient({
    // endereço para o servidor GraphQL
    uri: 'http://localhost:9000/graphql', 
    // configuração necessária para informar onde o resultado
    // das queries será cacheado (armazenado). A classe InMemoryCache 
    // é a comumente utilizada
    cache: new InMemoryCache(), 
})

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Rotas />
      </BrowserRouter>
    </ApolloProvider>
  );
}
```

### Playground

Ao subir o servidor do GraphQL, é disponibilizado na URL http://localhost:9000/graphql uma espécie de "playground" em que você pode fazer suas queries e ver o retorno na tela. Há inclusive um autocomplete de campos possíveis de serem pesquisados (comando CTRL + Espaço). Com isso, você pode fazer os testes necessários até chegar no resultado desejado e aí copiar a query para colá-la no código da aplicação de fato.

### Query

Uma query é feita solicitando os campos (fields) que você quer de um objeto que a API retorna (as propriedades do objeto). Quando um campo também é um objeto, você tem que informar novamente quais campos você quer desse outro objeto e assim por diante.

Por exemplo, suponha que a API retorne o seguinte no endpoint `/livros`:

```ts
[
  {
    "id": 1,
    "titulo": "Acessibilidade na Web",
    "opcoesCompra": [
      {
        "id": 1,
        "titulo": "E-book",
        "preco": 29.9,
      },
      {
        "id": 2,
        "titulo": "Impresso",
        "preco": 39.9
      },     
    ]
  },
  {
    "id": 2,
    // ...
  },
  //   ...
]
```

Uma query para obter as propriedades (campos) `id`, `titulo` e `preco` dos livros seria:

```graphql
livros {
  id
  titulo
  # opcoesCompra é um objeto, então preciso especificar qual campo eu quero desse objeto
  opcoesCompra {
    preco
  }
}
```

O retorno da query é um objeto com uma propriedade `data`. Essa propriedade contém outro objeto, este sim de fato com o conteúdo retornado pela API para os campos solicitados.

```json
{
  "data": {
    "livros": [
      {
        "id": 1,
        "titulo": "Acessibilidade na Web",
        "opcoesCompra": [
          {
            "preco": 29.9
          },
          {
            "preco": 39.9
          },
          {
            "preco": 59.9
          }
        ]
      },
      // ...
    ]
  }
}
```

### Mais um hook `useQuery` 

No código, as queries são feitas usando template literals com a função `gql` (essa junção de uma função e template literals é chamado de [tagged template](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals#tagged_templates)). Exemplo:

```ts
const OBTER_LIVROS = gql`
  query ObterLivros {
    livros {
      id,
      imagemCapa,
      slug,
      titulo,
      opcoesCompra {
        preco,
        id
      }
    }
  }
`
```

Para executar essa query e receber o resultado, usamos o hook `useQuery` (atenção na hora de importar, já que o React Query tem um hook de mesmo nome). Ele espera como parâmetro um tagged template. Exemplo:

```tsx
const ListaLivros = ({ categoria }: ListaLivrosProps) => {
    // solução com o React Query 
    // const { data: produtos, isLoading } = useQuery(
    //     ['buscaLivrosPorCategoria', categoria],
    //     () => obterProdutosDaCategoria(categoria)
    // )

    // solução com GraphQL
    // tipando o campo "livros" retornado pelo "data" do useQuery
    const { data } = useQuery<{ livros: ILivro[] }>(OBTER_LIVROS)

    return <section className="livros">
        {/* com o React Query */}
        {/* {produtos?.map(livro => <MiniCard livro={livro} key={livro.id} />)} */}

        {/* com GraphQL */}
        {data?.livros.map(livro => <MiniCard livro={livro} key={livro.id} />)}
    </section>
}
```

- Semelhante ao `useQuery` do React Query, a propriedade `data` causa um **re-render do componente** quando atualizada.

- Também semelhante ao `useQuery` do React Query, temos uma propriedade que retorna um booleano quando a query é finalizada, só que neste caso ela é chamada de `loading` (no hook do React Query é `isLoading`).

### Usando parâmetros

Com o GraphQL, podemos também **criar variáveis e usá-las como argumentos para os campos das queries**, desse modo filtrando quais resultados para um campo queremos que a query traga.

A variável é definida entre parênteses após o nome da query. O nome da variável deve iniciar com `$` e pode ser qualquer nome (ou seja, no exemplo abaixo `$categoriaId` podia ser `$catId` ou qualquer outra coisa). Ela precisa ter um tipo (o GraphQL tem seu próprio conjunto de tipos e também é possível definir novos tipos). Você passa a variável como argumento para algum campo (novamente entre parênteses), associando a variável ao campo que você quer filtrar.

Por exemplo, se queremos obter livros de uma categoria específica, podemos fazer: 

```ts
const OBTER_LIVROS = gql`
  query ObterLivros($categoriaId: Int) {
    livros(categoriaId: $categoriaId) {
      id,
      imagemCapa,
      slug,
      titulo,
      opcoesCompra {
        preco,
        id
      }
    }
  }
`
```

No `useQuery`, passamos o valor para a variável usando o segundo argumento do hook, por meio de um objeto que tem uma propriedade chamada `variables`:

```ts
const { data } = useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
    variables: {
        categoriaId: categoria.id
    }
})
```

- neste exemplo, o parâmetros é opcional. Quando não enviado à query, ela executa como se não houvesse um filtro. Ou seja, no exemplo acima, caso nenhum parâmetro fosse enviado, `data` retornaria os campos solicitados para os livros de todas as categorias.

- é possível criar parâmetros que sejam obrigatórios. Para isso, adicione `!` após o tipo. Ao tornar um parâmetro obrigatório, caso ele não seja enviado, será retornado um erro. Exemplo de query com parâmetro obrigatório:

```ts
const OBTER_LIVROS = gql`
  query ObterLivros($categoriaId: Int!) {
    livros(categoriaId: $categoriaId) {
      id,
      imagemCapa,
      slug,
      titulo,
      opcoesCompra {
        preco,
        id
      }
    }
  }
`
```

### `refetch`

O hook `useQuery` também retorna uma função `refetch`. Com ela, é possível reaproveitar a busca do useQuery e fazer uma nova requisição, passando outras variáveis à busca. O resultado da busca será retornado em `data` novamente (sobrescreve o que já tinha em `data`). 

Por exemplo, a busca por livros poderia ser por categoria ou por título:

```graphql
# query no graphQL
query ObterLivros($categoriaId: Int, $titulo: String) {
    livros(categoriaId: $categoriaId, titulo: $titulo) {
      # ...
    }
```

Podemos então usar o `useQuery` uma vez para obter os livros de uma categoria, e então em outro momento usar o `refetch` para filtrar esses livros também pelo título (pense numa busca por título de uma galeria de livros de uma categoria, por exemplo).

```ts
// busca por uma categoria
const { data, refetch } = useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
    variables: {
      categoriaId: categoria.id
    }
  })

// reaproveitando a consulta para buscar também pelo título 
const buscarLivros = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (textoDaBusca) {
    // o refetch recebe como parâmetro um objeto com variáveis para a query
    refetch({
      categoriaId: categoria.id,
      titulo: textoDaBusca
    })      
  }
}
```

### Variáveis reativas

É uma forma de **gerenciar estados locais**, disponibilizada pelo Apollo Client. Similar ao `useState`, quando um componente usa uma variável reativa (por meio do rook `useReactiveVar`), ele será **re-renderizado caso essa variável reativa seja atualizada**. No entanto, diferente do `useState`, que só pode ser utilizado em componentes, uma variável reativa pode ser utilizada em outras partes da aplicação, e não somente em componentes.

Para criar uma variável reativa, é utilizado o método `makevar`. Ele irá devolver uma **função**, que atua tanto como um getter quanto um setter da variável reativa. Ou seja, para obter o valor de uma variável reativa, você chama a função sem argumentos; já para modificar o valor da variável reativa, você chama a função e passa como argumento o novo valor que você quer atribuir à variável reativa.

- uma convenção é adicionar o sufixo -Var para o nome da  variável reativa.

```ts
// criando uma variável reativa 
export const livrosVar = makeVar<ILivro[]>([]);

// acessando o valor da variável reativa
console.log(livrosVar());

// setando um novo valor à variável reativa
livrosVar(data.livros)
```

No caso de componentes, é disponibilizado o hook `useReactiveVar`, com o qual você pode atribuir uma variável reativa a uma variável do componente. Desse modo, será possível tanto usar o valor da variável reativa, quanto fazer com que o componente re-renderize caso a variável reativa seja modificada.

```ts
const livros = useReactiveVar(livrosVar)
```

- se fosse usado `const livros = livrosVar()`, a variável `livros`somente receberia o *valor* de `livrosVar`, mas não se tornaria uma variável de estado (o componente não re-renderizaria caso `livrosVar` fosse modificado).

#### Unindo variáveis reativas com o `useQuery`

Podemos atualizar o valor de uma variável reativa usando outra opção disponível no segundo parâmetro do `useQuery`: a função callback `onCompleted`. Essa função é chamada quando a query é finalizada com sucesso.

```ts
export const useLivros = (categoria: ICategoria) => {
    // tipando o campo "livros" retornado pelo "data" do useQuery
    return useQuery<{ livros: ILivro[] }>(OBTER_LIVROS, {
        variables: {
            categoriaId: categoria.id
        },
        // atualizando a variável reativa com o resultado da query
        onCompleted(data) {
            if (data.livros) livrosVar(data.livros);
        }
    })
}
```

Com isso, podemos encapsular toda a parte de consulta em um código à parte, que chama a `useQuery` e atualiza o estado da variável reativa, e então usar somente a variável reativa no componente por meio do hook `useReactiveVar`, separando as responsabilidades.

### Mutations

Mutation é a forma de adicionar/atualizar dados no GraphQL. As mutations que estão disponíveis para uso são listadas na aba "DOCS" do playground (imagino que a pessoa responsável pelo back-end cria essas mutations). 

Para usar uma mutation no GraphQL, usamos a palavra-chave `mutation`, damos um nome a ela, e então adicionamos a mutation que queremos usar, passando os parâmetros se necessário.

```graphql
mutation MinhaMutation($id: Int!) {
  nomeDaMutation(id: $id)
}
```

#### `useMutation`

Este é o hook que utilizamos para executar uma mutation. Ele devolve uma tupla, sendo que o primeiro elemento é a função que executa a mutation no graphQL (podemos dar o nome que quisermos a essa função). O segundo elemento é um objeto com os resultados da execução da mutation; dentre eles, temos a propriedade booleana `loading`, que é true se a query ainda estão em execução. 

Basta então executar a função retornada pelo `useMutation` e, caso a mutation precise de algum parâmetro, enviamos à função em um objeto com a propriedade `variables`. 

```ts
const ADICIONAR_ITEM = gql`
mutation AdicionarItem($item: ItemCarrinhoInput!) {
  adicionarItem(item: $item)
}
`

const [nomeParaAFuncao, { loading }] = useMutation(ADICIONAR_ITEM);

const adicionarItemCarrinho = (item: IItemCarrinho) => {
    nomeParaAFuncao({
        variables: {
            item: {
                livroId: item.livroId,
                opcaoCompraId: item.opcaoCompra.id,
                quantidade: item.quantidade
            }
        }
    })
}
```

##### `refetchQueries`

O `useMutation` aceita um segundo parâmetro, que é um objeto com opções. Uma dessas opções é a propriedade chamada `refetchQueries`. Ela é um array em que você pode passar as queries que deseja que sejam executadas novamente após uma mutation. Por exemplo, após uma mutation que modifica a quantidade de um item do carrinho, você pode solicitar o refetch da query que obtém dados do carrinho, de modo a receber os itens e valores atualizados.

  - esse array aceita tanto uma string com o nome de uma query que já foi executada (query nomeada dentro de um gql) quanto uma variável que tenha a template literals com a função `gql` da query.

```ts
const adicionarAoCarrinho = useMutation(ADICIONAR_ITEM, {
    // faço novamente a query de obter carrinho toda vez que a função de mutation for 
    // chamada, de modo a atualizar o carrinho. OBTER_CARRINHO é uma variável que contém
    // a template literals com a função gql que executa uma query chamada obterCarrinho
    refetchQueries: [OBTER_CARRINHO]
});
```

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

- O site [Loading.io](https://loading.io/css) disponibiliza 12 ícones diferentes de loading feitos puramente com CSS. Você pode selecionar o que deseja e copiar o HTML/CSS para renderizá-lo em sua página. Esses ícones estão gratuitos, sob a [licença CC0](https://creativecommons.org/public-domain/cc0/).

## Instalação

O projeto foi criado com o Create React App, utilizando Node.js e npm. É necessário estar com ambos instalados em sua máquina para rodar a aplicação.

Após clonar/baixar o projeto, abra um terminal, navegue até a pasta do projeto e rode o seguinte comando para instalar todas as dependências necessárias:

    npm install

Após isso, você pode rodar a aplicação em modo de desenvolvimento com o seguinte comando:

    npm start

A aplicação irá rodar no endereço http://localhost:3000.

### Primeira API 

Para a parte de autenticação e autorização, bem como para recuperar dados de livros, é necessário instalar a API que irá rodar localmente. Após o download/clone do projeto [neste repositório](https://github.com/viniciosneves/api-alurabooks), rode os comandos abaixo:

    npm install
    npm run start-auth

A API irá rodar no endereço http://localhost:8000.

### Segunda API

O curso de GraphQL incluiu uma segunda API mockada, contando também com um Apollo Server. O projeto pode ser baixado/clonado [deste repositório](https://github.com/alura-cursos/alurabooks-gql). Para instalação o comando é o mesmo:

```bash
npm install
```

Nesta segunda API, precisaremos de dois terminais, pois iremos rodar dois serviços (a API e o GraphQL). No primeiro terminal, digite o seguinte comando para subir o servidor do GraphQL:

```bash
$ npm run start:dev
```

O GraphQL irá rodar no endereço: http://localhost:9000/graphql

No segundo terminal, execute o comando abaixo para subir a API mockada de fato (onde estão os dados):

```bash
$ npm run start:api
```

A API irá rodar no endereço http://localhost:8000. Observe que é o **mesmo endereço** da primeira API, ou seja, rode somente uma delas para fazer os testes. 

- ambas APIs mockadas têm a mesma estrutura de base de dados (a segunda contém mais dados). Tanto faz qual você subir, a aplicação irá funcionar. As únicas exceções são os usuários que você tenha cadastrado via modal de cadastro do site, ou livros que tenha deletado da página de pedidos. Nestes casos, essas mudanças serão refletidas somente na base de dados da API que estiver rodando no momento das suas ações.