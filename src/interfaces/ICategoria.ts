// o slug é um nome mais "simples" (sem acentos ou caracteres especiais) que pode 
// ser usado para ser incluído, por exemplo, na URL (exemplo: '/categorias/frontend')
export interface ICategoria {
    id: number;
    nome: string;
    slug: string; 
}