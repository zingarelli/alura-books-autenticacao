import "./MiniCarrinho.css";
import { AbBotao } from "ds-alurabooks";
import { useNavigate } from "react-router-dom";
import { useCarrinhoContext } from "../../context/carrinho";

interface PropsMiniCarrinho {
    aberta: boolean;
    aoFechar: () => void;
}

const MiniCarrinho = ({ aberta, aoFechar }: PropsMiniCarrinho) => {
    const navigate = useNavigate();
    const { carrinho } = useCarrinhoContext()

    const aoClicar = () => {
        navigate('minha-sacola')
        aoFechar()
    }

    return <>
        {aberta && <section className="miniCarrinho__container">
            <h3 className="miniCarrinho__titulo">Resumo da compra</h3>
            <ul className="miniCarrinho__lista">
                {carrinho?.itens.map(item => (
                    <li key={item.livroId} className="miniCarrinho__item">
                        <div>
                            <h4 className="miniCarrinho__itemTitulo">{item.livro.titulo}</h4>
                            <p className="miniCarrinho__itemAutor">Autoria: {item.livro.autor.nome}</p>
                        </div>
                    </li>
                ))}
            </ul>
            <AbBotao texto="Ver sacola" onClick={aoClicar} />
        </section>}
    </>
}

export default MiniCarrinho;