class Dato {
  //Clase Base o padre
  //Constructor
  constructor(descripcion, valor) {
    this._descripcion = descripcion;
    this._valor = valor;
  }
  //Getters and setters
  get descripcion() {
    return this._descripcion;
  }
  set descripcion(descripcion) {
    this._descripcion = descripcion;
  }
  get valor() {
    return this._valor;
  }
  set valor(valor) {
    this._valor = valor;
  }
}
