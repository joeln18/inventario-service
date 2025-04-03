import { Cantidad } from "../valueobjects/Cantidad";
import { UnidadMedida } from "../valueobjects/UnidadMedida";

export class Ingrediente {
    constructor(
      public id: number,
      public nombre: string,
      public cantidad: Cantidad,
      public unidadMedida: UnidadMedida
    ) {}

    getId(): number {
      return this.id;
    }
    getNombre(): string {
      return this.nombre;
    }
    getCantidad(): Cantidad {
      return this.cantidad;
    }
    getUnidadMedida(): UnidadMedida {
      return this.unidadMedida;
    }
    actualizarCantidad(nuevaCantidad: Cantidad): void {
      this.cantidad = nuevaCantidad;
    }
    agregarCantidad(cantidad: Cantidad): void {
      this.cantidad = this.cantidad.sumar(cantidad);
    }
    removerCantidad(cantidad: Cantidad): void {
      this.cantidad = this.cantidad.restar(cantidad);
    }
    haySuficiente(cantidadRequerida: Cantidad): boolean {
      return this.cantidad.esMayorQue(cantidadRequerida) || this.cantidad.esIgualA(cantidadRequerida);
    }
}