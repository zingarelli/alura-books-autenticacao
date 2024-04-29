import { AbBotao, AbCard } from "ds-alurabooks"
import { useEffect, useState } from "react"
import { ILivro } from "../../interfaces/ILivro"
import './LivrosDestaque.css'
import { precoMaisBarato } from "../../utils/preco"

interface LivrosDestaqueProps {
    livros: ILivro[]
}

const LivrosDestaque = ({ livros }: LivrosDestaqueProps) => {

    const [selecionado, selecionarLivro] = useState<ILivro>()

    // sempre que livros mudar, vamos selecionar o primeiro por padrão
    useEffect(() => {
        if (livros.length > 0) selecionarLivro(livros[0])
    }, [livros])

    return (<section className="LivrosDestaque">
        <div>
            <ul className="livros">
                {livros.map(livro => {
                    return (
                    <li 
                        key={livro.titulo}
                        onClick={() => selecionarLivro(livro)} 
                        className={selecionado?.titulo === livro.titulo ? 'selecionado' : ''}
                    >
                        <img src={livro.imagemCapa} alt={`Capa do livro ${livro.titulo} escrito por ${livro.autor}`} />
                    </li>)
                })}
            </ul>
        </div>
        {selecionado && <AbCard>
            <div className="selecionado-detalhes">
                <header>
                    <h5>Sobre o livro:</h5>
                </header>
                <h6>{selecionado.titulo}</h6>
                <p>{selecionado.descricao}</p>
                <p>Por: {selecionado.autor}</p>
                <footer>
                    <div className="preco">
                        <em>A partir de:</em>
                        <strong>{Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(precoMaisBarato(selecionado.opcoesCompra))}</strong>
                    </div>
                    <div>
                        <AbBotao texto="Ver mais" />
                    </div>
                </footer>
            </div>
        </AbCard>}
    </section>)

}

export default LivrosDestaque