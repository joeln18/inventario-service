export interface IOrderAvailability {
    idPedido: number; 
    itemPedidos: Array<{ idReceta: number; cantidad: number }>
};

export interface IResponseOrderAvailability {
    idPedido: number;
    availability: boolean;
    items: Array<{ idReceta: number; cantidad: number; availability: boolean; }>
}