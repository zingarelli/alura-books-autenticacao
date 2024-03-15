import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import BotaoNavegacao from "../BotaoNavegacao"
import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css'
import ModalCadastroUsuario from "../ModalCadastroUsuario"
import ModalLogin from "../ModalLogin"
import { useGetToken, useLimparToken } from "../../hooks/token"

const BarraNavegacao = () => {
    const token = useGetToken();
    const [modalCadastroAberta, setModalCadastroAberta] = useState(false);
    const [modalLoginAberta, setModalLoginAberta] = useState(false);
    const [usuarioLogado, setUsuarioLogado] = useState(token !== null);
    const navigate = useNavigate()
    const removerToken = useLimparToken();

    const deslogar = () => {
        setUsuarioLogado(false);
        removerToken();
        // retorna à página principal após o logout
        navigate('/');
    }

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
                    <li>
                        <Link to="/">
                            Frontend
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Programação
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Infraestrutura
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Business
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Design e UX
                        </Link>
                    </li>
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