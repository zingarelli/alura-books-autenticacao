import axios from "axios";
import { useGetToken } from "../hooks/token";

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