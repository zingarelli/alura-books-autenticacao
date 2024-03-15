export interface IPedido {
    id: number;
    data: string; // a API retorna uma string, e não um Date
    entrega: string; // a API retorna uma string, e não um Date
    total: number;
}