import { useState } from "react"
import { AbBotao, AbCampoTexto, AbModal } from "ds-alurabooks"
import imgLogin from './assets/login.png'
import './ModalCadastroUsuario.css'
import http from "../../http"

interface PropsModalCadastroUsuario {
    aberta: boolean;
    aoFechar: () => void;
}

const ModalCadastroUsuario = ({aberta, aoFechar}: PropsModalCadastroUsuario) => {
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [endereco, setEndereco] = useState('')
    const [complemento, setComplemento] = useState('')
    const [cep, setCep] = useState('')
    const [senha, setSenha] = useState('')
    const [senhaConfirmada, setSenhaConfirmada] = useState('')

    // chama API mockada rodando localmente
    const cadastraUsuario = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // propriedades que a API espera receber via POST
        const newUsuario = {
            nome,
            email,
            senha,
            endereco,
            complemento,
            cep,
        }
        http.post('public/registrar', newUsuario)
            .then(() => {
                alert('Usuário cadastrado com sucesso!');
                setNome('')
                setEmail('')
                setEndereco('')
                setComplemento('')
                setCep('')
                setSenha('')
                setSenhaConfirmada('')
                aoFechar();
            })
            .catch(() => alert('Ops, deu erro!'))
    }

    return (
        <AbModal
            titulo='Cadastrar'
            aberta={aberta}
            aoFechar={aoFechar}
        >
            <div className="corpoModalCadastro">
                <img src={imgLogin} alt="Desenho de um monitor com uma fechadura e uma pessoa ao lado segurando uma chave" />
                <form onSubmit={e => cadastraUsuario(e)}>
                    <AbCampoTexto
                        label="Nome"
                        value={nome}
                        onChange={setNome}
                    />
                    <AbCampoTexto
                        label="Email"
                        value={email}
                        onChange={setEmail}
                        type="email"
                    />
                    <AbCampoTexto
                        label="Endereço"
                        value={endereco}
                        onChange={setEndereco}
                    />
                    <div className="campoModalCompartilhado">
                        <AbCampoTexto
                            label="Complemento"
                            value={complemento}
                            onChange={setComplemento}
                        />
                        <AbCampoTexto
                            label="CEP"
                            value={cep}
                            onChange={setCep}
                        />
                    </div>
                    <AbCampoTexto
                        label="Senha"
                        value={senha}
                        onChange={setSenha}
                        type="password"
                    />
                    <AbCampoTexto
                        label="Confirmar Senha"
                        value={senhaConfirmada}
                        onChange={setSenhaConfirmada}
                        type="password"
                    />
                    <footer>
                        <AbBotao texto="Cadastrar" />
                    </footer>
                </form>
            </div>
        </AbModal>
    )
}

export default ModalCadastroUsuario