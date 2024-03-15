import { AbBotao } from "ds-alurabooks";
import "./Pedidos.css"
import { useEffect, useState } from "react";
import { IPedido } from "../../interfaces/IPedido";
import http from "../../http";

const urlPedidos = 'pedidos';
const formataMoeda = Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });
const formataData = (data: Date) => {
    const timezoneOffset = data.getTimezoneOffset()
    data.setMinutes(data.getMinutes() + timezoneOffset)
    return data.toLocaleDateString()
}

const Pedidos = () => {
    const [pedidos, setPedidos] = useState<IPedido[]>([]);

    // receber pedidos do "backend"
    useEffect(() => {
        http.get<IPedido[]>(urlPedidos)
            .then(resp => setPedidos(resp.data))
            .catch(err => console.log(err))
    }, [])

    const excluirPedido = (id: number) => {
        http.delete(`${urlPedidos}/${id}`)
            .then(resp => {
                if (resp?.statusText === 'OK') setPedidos(oldState =>
                    oldState.filter(pedido =>
                        pedido.id !== id));
            })
            .catch(err => console.log(err))
    }

    return (
        <section className="pedidos__container">
            <h2 className="pedidos__titulo">Pedidos</h2>
            {pedidos.map(pedido => (
                <div className="pedidos__pedido" key={pedido.id}>
                    <ul>
                        <li>Pedido: <strong>{pedido.id}</strong></li>
                        <li>Data do pedido: <strong>{formataData(new Date(pedido.data))}</strong></li>
                        <li>Valor total: <strong>{formataMoeda.format(pedido.total)}</strong></li>
                        <li>Entrega realizada em: <strong>{formataData(new Date(pedido.entrega))}</strong></li>
                    </ul>
                    <AbBotao texto="Detalhes" />
                    <AbBotao texto="Excluir" tipo='secundario' onClick={() => excluirPedido(pedido.id)} />
                </div>
            ))}
        </section>
    )
}

export default Pedidos;