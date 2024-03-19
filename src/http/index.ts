import axios from "axios";
import { useGetToken } from "../hooks/token";
import { ICategoria } from "../interfaces/ICategoria";
import { ILivro } from "../interfaces/ILivro";
import { IAutor } from "../interfaces/IAutor";

// cria uma instância do axios com algumas configurações comuns
const http = axios.create({
    baseURL: 'http://localhost:8000', // quem usar o http não precisa digitar essa parte da URL
    headers: {
        Accept: 'application/json', // na response será aceito somente dados em JSON
        Content: 'application/json' // no request, iremos sempre enviar dados em JSON
    }
})

// interceptador de requisições (requests)
http.interceptors.request.use(function (config) {
    // essa função será chamada antes do envio da request

    // envio do token pelo header da requisição
    const access_token = useGetToken();
    if (access_token && config.headers) {
        config.headers.Authorization = `Bearer ${access_token}`
    }
    return config;
}, function (error) {
    // essa função será chamada se a request der algum erro
    console.log('Ocorreu um erro no interceptor do axios!')
    return Promise.reject(error);
});

// interceptador de respostas
http.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response?.status === 401) console.log('Erro de autorização!')
    return Promise.reject(error);
});

export default http

// outras funções específicas de data fetching

// endpoint: /categorias/?slug=slug
export const obterCategoriaPorSlug = async (slug: string) => {
    const resp = await http.get<ICategoria[]>('categorias', {
        params: {
            slug
        }
    })
    // a API retorna os dados em um array. Como há somente 
    // uma categoria, retorno o primeiro dado.
    return resp.data[0];
}

// endpoint: /livros/?categoria=id
export const obterProdutosDaCategoria = async (categoria: ICategoria) => {
    const resp = await http.get<ILivro[]>('livros', {
        params: {
            categoria: categoria.id
        }
    })
    return resp.data;
}

// endpoint: /livros/?slug=slug
export const obterLivroPorSlug = async (slug: string) => {
    const resp = await http.get<ILivro[]>('livros', {
        params: {
            slug
        }
    })
    // programação defensiva para o caso de não encontrar o livro
    if (resp.data.length === 0) return null;
    return resp.data[0];
}

export const obterLancamentos = async () => {
    const resp = await http.get<ILivro[]>('public/lancamentos')
    return resp.data;
}

export const obterMaisVendidos = async () => {
    const resp = await http.get<ILivro[]>('public/mais-vendidos')
    return resp.data;
}

export const obterAutorPorId = async (id: number | '') => {
    try{
        const resp = await http.get<IAutor>(`autores/${id}`);
        return resp.data;
    } catch (err) {
        throw err;
    }
}