import { AbBotao } from "ds-alurabooks";
import { useNavigate } from "react-router-dom";
import './MiniCard.css';
import { formataMoeda } from "../../utils/formatadores";
import { ILivro } from "../../interfaces/ILivro";
import { precoMaisBarato } from "../../utils/preco";

interface MiniCardProps {
    livro: ILivro
}

const MiniCard = ({ livro }: MiniCardProps) => {
    const navigate = useNavigate()
    
    return (<section className="minicard__wrapper">
        <img src={livro.imagemCapa} alt={`capa do livro ${livro.titulo}`} className="minicard__capa" />
        <h4 className="minicard__titulo">{livro.titulo}</h4>
        <p className="minicard__texto">A partir de: <strong>{formataMoeda.format(precoMaisBarato(livro.opcoesCompra))}</strong></p>
        <AbBotao texto="Comprar" onClick={() => navigate(`/livro/${livro.slug}`)} />
    </section>)
}

export default MiniCard;