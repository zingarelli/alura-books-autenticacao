import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import BotaoNavegacao from "../BotaoNavegacao"
import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import sacola from './assets/sacola.png'
import './BarraNavegacao.css'
import ModalCadastroUsuario from "../ModalCadastroUsuario"
import ModalLogin from "../ModalLogin"
import { useGetToken, useLimparToken } from "../../hooks/token"
import { ICategoria } from "../../interfaces/ICategoria"
import http from "../../http"
import { useCategorias } from "../../graphql/categorias/hooks"
import MiniCarrinho from "../MiniCarrinho"

const BarraNavegacao = () => {
    const token = useGetToken();
    const [modalCadastroAberta, setModalCadastroAberta] = useState(false);
    const [modalLoginAberta, setModalLoginAberta] = useState(false);
    const [modalCarrinhoAberto, setModalCarrinhoAberto] = useState(false);
    const [usuarioLogado, setUsuarioLogado] = useState(token !== null);
    // const [categorias, setCategorias] = useState<ICategoria[]>([]); // caso for usar o Axios
    const navigate = useNavigate()
    const removerToken = useLimparToken();

    const deslogar = () => {
        setUsuarioLogado(false);
        removerToken();
        // retorna à página principal após o logout
        navigate('/');
    }

    // Solução com GRAPHQL encapsulado em um hook customizado
    const { data } = useCategorias();

    // solução com o Axios
    // useEffect(() => {
    //     http.get<ICategoria[]>('categorias')
    //         .then(res => {
    //             setCategorias(res.data)
    //         })
    //         .catch(err => console.log(err))
    // }, [])

    return (<nav className="ab-navbar">
        <h1 className="logo">
            <Link to="/">
                <img className="logo" src={logo} alt="Logo da AluraBooks" />
            </Link>
        </h1>
        <ul className="navegacao">
            <li>
                <a href="#!">Categorias</a>
                <ul className="submenu">
                    {data?.categorias.map(categoria => (
                        <li key={categoria.id}>
                            <Link to={`/categorias/${categoria.slug}`}>
                                {categoria.nome}
                            </Link>
                        </li>
                    ))}
                </ul>
            </li>
        </ul>
        <ul className="acoes">
            {!usuarioLogado && <>
                <li>
                    <BotaoNavegacao
                        texto="Login"
                        textoAltSrc="Icone representando um usuário"
                        imagemSrc={usuario}
                        onClick={() => setModalLoginAberta(true)}
                    />
                </li>
                <li>
                    <BotaoNavegacao
                        texto="Cadastrar-se"
                        textoAltSrc="Icone representando um usuário"
                        imagemSrc={usuario}
                        onClick={() => setModalCadastroAberta(true)}
                    />
                    <ModalLogin
                        aberta={modalLoginAberta}
                        aoFechar={() => {
                            setModalLoginAberta(false)
                            setUsuarioLogado(true)
                        }}
                        aoCadastrar={() => {
                            setModalLoginAberta(false)
                            setModalCadastroAberta(true)
                        }}
                    />
                    <ModalCadastroUsuario
                        aberta={modalCadastroAberta}
                        aoFechar={() => setModalCadastroAberta(false)}
                    />
                </li>
            </>}
            {usuarioLogado && <>
                <li>
                    <Link to='/minha-conta/pedidos'>Minha conta</Link>
                </li>
                <li>
                    <BotaoNavegacao
                        imagemSrc={sacola}
                        textoAltSrc="Ícone de uma sacola de compras"
                        // abre/fecha modal do carrinho
                        onClick={() => setModalCarrinhoAberto(prevState => !prevState)}
                    />
                    <MiniCarrinho
                        aberta={modalCarrinhoAberto}
                        aoFechar={() => setModalCarrinhoAberto(false)}
                    />
                </li>
                <li>
                    <BotaoNavegacao
                        imagemSrc={usuario}
                        textoAltSrc="Ícone representando um usuário"
                        texto="Sair"
                        onClick={deslogar}
                    />
                </li>
            </>}
        </ul>
    </nav>)
}

export default BarraNavegacao