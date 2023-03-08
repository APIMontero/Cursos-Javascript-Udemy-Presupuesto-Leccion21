/**
 * hereda de clase base Dato
 */
class Ingreso extends Dato {
  //Usado para configurar una clave autonumerica
  static contadorIngresos = 0;

  //Constructor para clase base y atributo _id
  constructor(descripcion, valor) {
    super(descripcion, valor);
    this._id = ++Ingreso.contadorIngresos;
  }
  //No se justifica un setter para un id de solo lectura
  get id() {
    return this._id;
  }
}
