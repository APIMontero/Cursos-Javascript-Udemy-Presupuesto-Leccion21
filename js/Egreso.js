class Egreso extends Dato {
  //Hereda de Egreso
  //Atributo para contar los _id
  static contadorEgresos = 0;
  //constructor de la clase usando herencia
  constructor(descripcion, valor) {
    super(descripcion, valor);
    this._id = ++Egreso.contadorEgresos;
  }
  //No se justifica un setter para el id, se hará sólo lectura
  get id() {
    return this._id;
  }
}
