export class Cantidad {
  private readonly valor: number;
  static UnidadMedida: any;

  constructor(valor: number) {
    if (valor < 0) {
      throw new Error('La cantidad no puede ser negativa');
    }
    this.valor = valor;
  }

  getValor(): number {
    return this.valor;
  }

  sumar(cantidad: Cantidad): Cantidad {
    return new Cantidad(this.valor + cantidad.getValor());
  }

  restar(cantidad: Cantidad): Cantidad {
    const resultado = this.valor - cantidad.getValor();
    if (resultado < 0) {
      throw new Error('La cantidad resultante no puede ser negativa');
    }
    return new Cantidad(resultado);
  }

  esMayorQue(cantidad: Cantidad): boolean {
    return this.valor > cantidad.getValor();
  }

  esIgualA(cantidad: Cantidad): boolean {
    return this.valor === cantidad.getValor();
  }
}