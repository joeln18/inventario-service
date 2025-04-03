export class UnidadMedida {
  constructor(
    private readonly id: number,
    private readonly nombre: string
  ) {
    if (!nombre) {
      throw new Error('El nombre de la unidad de medida no puede estar vacío');
    }
  }

  getId(): number {
    return this.id;
  }

  getNombre(): string {
    return this.nombre;
  }

  equals(other: UnidadMedida): boolean {
    return this.id === other.id;
  }
}