import { Link } from "react-router-dom";
import ItemCarrinho from "./ItemCarrinho";
import { AbBotao } from "ds-alurabooks";
import { formataMoeda } from "../../utils/formatadores";
import TituloPrincipal from "../../componentes/TituloPrincipal";
import { useCarrinhoContext } from "../../context/carrinho";
import Loader from "../../componentes/Loader";

const Carrinho = () => {
    const { carrinho, carregando } = useCarrinhoContext();

    return (<section className="carrinho__wrapper">
        <TituloPrincipal texto="Minha sacola" />
        <div className="carrinho__conteudo">
            <h3>Itens selecionados</h3>
            <ul>
                {carrinho?.itens.map(item => <ItemCarrinho key={item.livroId} item={item} />)}
            </ul>
            <Link to={'/'}>Continuar comprando</Link>
            <hr />
            <footer className="carrinho__footer">
                <p>Total da compra</p>
                <p><strong>{carrinho?.total && formataMoeda.format(carrinho?.total)}</strong></p>
                <AbBotao texto="Finalizar compra" />
            </footer>
        </div>
        {carregando && <div className="carrinho__overlay">
            <Loader />
        </div>}
    </section>)
}

export default Carrinho;