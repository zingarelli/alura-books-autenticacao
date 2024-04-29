import '../Carrinho.css';
import { AbInputQuantidade } from "ds-alurabooks";
import { IItemCarrinho } from "../../../interfaces/IItemCarrinho";
import { formataMoeda } from "../../../utils/formatadores";
import lixeira from "./assets/lixeira.png";
import { useCarrinhoContext } from '../../../context/carrinho';

interface ItemCarrinhoProps {
    item: IItemCarrinho
}

const ItemCarrinho = ({ item }: ItemCarrinhoProps) => {
    const { adicionarItemCarrinho, removerItemCarrinho } = useCarrinhoContext()

    const aoAlterarQuantidadeItem = (novaQuantidade: number) => {
        if (novaQuantidade === 0) {
            removerItemCarrinho(item)
            return
        }

        adicionarItemCarrinho({
            ...item,
            quantidade: novaQuantidade
        })
    }

    return <li className='carrinhoItem'>
        <div className='carrinhoItem__livro'>
            <img src={item.livro.imagemCapa} alt={item.livro.titulo} className='carrinhoItem__capa' />
            <div className='carrinhoItem__descricao'>
                <h2 className='carrinhoItem__titulo'>{item.livro.titulo}</h2>
                <p>{item.livro.descricao}</p>
                <p>Por: {item.livro.autor.nome}</p>
            </div>
        </div>
        <div className='carrinhoItem__acoes'>
            <div className='carrinhoItem__preco'>
                <p><strong>Preço:</strong></p>
                <p>{formataMoeda.format(item.opcaoCompra.preco)}</p>
            </div>
            <AbInputQuantidade
                value={item.quantidade}
                onChange={aoAlterarQuantidadeItem}
            />
            <button className='carrinhoItem__lixeira' onClick={() => removerItemCarrinho(item)}>
                <img src={lixeira} alt={`excluir livro ${item.livro.titulo}`} />
            </button>
        </div>
    </li>
}

export default ItemCarrinho;