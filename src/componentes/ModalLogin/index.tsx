import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks"
import { useState } from "react"
import imgLogin from "./assets/login.png"
import "./ModalLogin.css"
import { usePersistirToken } from "../../hooks/token";
import { Link } from "react-router-dom";
import http from "../../http";

interface PropsModalLoginUsuario {
    aberta: boolean;
    aoFechar: () => void;
    aoCadastrar: () => void;
}

const ModalLogin = ({ aberta, aoFechar, aoCadastrar }: PropsModalLoginUsuario) => {
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const setToken = usePersistirToken();

    const aoLogar = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const usuario = {
            email,
            senha
        }
        http.post('public/login', usuario)
            .then(resp => {
                setEmail('')
                setSenha('')
                setToken(resp.data.access_token)
                aoFechar()
            })
            .catch(err => {
                if (err?.response?.data?.message) alert(err.response.data.message)
                else (console.log(err))
            })
    }

    return (
        <AbModal
            aberta={aberta}
            aoFechar={aoFechar}
            titulo="LOGIN"
        >
            <div className="corpoModalLogin">
                <img src={imgLogin} alt="Desenho de um monitor com uma fechadura e uma pessoa ao lado segurando uma chave" />
                <div>
                    <form onSubmit={aoLogar}>
                        <AbCampoTexto
                            onChange={setEmail}
                            value={email}
                            label="E-mail"
                            type="email"
                        />
                        <AbCampoTexto
                            onChange={setSenha}
                            value={senha}
                            label="Senha"
                            type="password"
                        />
                        <footer>
                            <Link to={'/resetar-senha'} className="esqueceuLink">Esqueci minha senha</Link>
                            <AbBotao texto="Fazer login" />
                        </footer>
                    </form>
                    <section>
                        <h2>Ainda não tem uma conta</h2>
                        <AbBotao texto="Criar conta" onClick={aoCadastrar} />
                    </section>
                </div>
            </div>
        </AbModal>
    )
}

export default ModalLogin