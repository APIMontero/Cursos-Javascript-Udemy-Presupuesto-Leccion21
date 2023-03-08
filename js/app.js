//Data a usar:
//Ingresos(id,{dato(descripcion, valor)})
const ingresos = [
  new Ingreso("Salario", 510000.0),
  new Ingreso("Bono Estado", 28340.0),
];
//Egresos(id,{dato(descripcion, valor)})
const egresos = [
  new Egreso("Donativos", 53900.0),
  new Egreso("Deudas Varias", 210000.0),
];

//Para elaborar las cadenas JSON
let jsonEgresos = "";
let jsonIngresos = "";

/**
 * Cargar la aplicación:
 *  Cabecera
 *  Ingresos y egresos
 */
let cargarApp = () => {
  cargarCabecero();
  cargarIngresos();
  cargarEgresos();
};

/**
 * Sumatoria actualizada de la data de ingresos
 * @returns {Double} Suma de los ingreso
 */
let totalIngresos = () => {
  let totalIngreso = 0;
  for (let ingreso of ingresos) {
    totalIngreso += ingreso.valor;
  }
  return totalIngreso;
};

/**
 * Sumatoria actualizada de la data de Egresos
 * @returns {Double} Suma de los Egresos
 */
let totalEgresos = () => {
  let totalEgreso = 0;
  for (let egreso of egresos) {
    totalEgreso += egreso.valor;
  }
  return totalEgreso;
};

/**
 * Cargar la cabecera de resumenes
 */
let cargarCabecero = () => {
  let presupuesto = totalIngresos() - totalEgresos();
  let porcentajeEgreso = totalEgresos() / totalIngresos();
  document.getElementById("presupuesto").innerHTML = formatoMoneda(presupuesto);
  document.getElementById("porcentaje").innerHTML =
    formatoPorcentaje(porcentajeEgreso);
  document.getElementById("ingresos").innerHTML = formatoMoneda(
    totalIngresos()
  );
  document.getElementById("egresos").innerHTML = formatoMoneda(totalEgresos());
};

/**
 * Formatea los valores Moneda segun Internacionalización
 * Esta debe detallar la norma por idioma_pais y codigo país
 * @param {Double} valor
 * @returns {String} valor local obtenido
 */
const formatoMoneda = (valor) => {
  return valor.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 2,
  });
};

/**
 * Formatea los valores segun Internacionalización.
 * Esta debe detallar la norma por idioma_pais el estilo, y el numero de decimales a usar
 * @param {Double} valor
 * @returns {String} valor local obtenido
 */
const formatoPorcentaje = (valor) => {
  return valor.toLocaleString("es-CL", {
    style: "percent",
    minimumFractionDigits: 2,
  });
};

/**
 * Carga la data de ingresos
 */
const cargarIngresos = () => {
  let ingresosHTML = "";
  for (let ingreso of ingresos) {
    ingresosHTML += crearIngresoHTML(ingreso);
  }
  document.getElementById("lista-ingresos").innerHTML = ingresosHTML;
};

/** Crea los itemes de ingresos en HTML */
const crearIngresoHTML = (ingreso) => {
  let ingresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${ingreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">+ ${formatoMoneda(ingreso.valor)}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarIngreso(${ingreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
  return ingresoHTML;
};

/**
 * Eliminar un ingreso por Identificador Ingreso
 * @param {Integer} id Identificador del elemento Ingreso
 */
const eliminarIngreso = (id) => {
  let indiceEliminar = ingresos.findIndex((ingreso) => ingreso.id === id);
  ingresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarIngresos();
};

/**
 * Carga la data de egresos
 */
const cargarEgresos = () => {
  let egresosHTML = "";
  for (let egreso of egresos) {
    egresosHTML += crearEgresoHTML(egreso);
  }
  document.getElementById("lista-egresos").innerHTML = egresosHTML;
};

/** Crea los itemes de egresos en HTML */
const crearEgresoHTML = (egreso) => {
  let egresoHTML = `
    <div class="elemento limpiarEstilos">
    <div class="elemento_descripcion">${egreso.descripcion}</div>
    <div class="derecha limpiarEstilos">
        <div class="elemento_valor">- ${formatoMoneda(egreso.valor)}</div>
        <div class="elemento_porcentaje">${formatoPorcentaje(
          egreso.valor / totalEgresos()
        )}</div>
        <div class="elemento_eliminar">
            <button class='elemento_eliminar--btn'>
                <ion-icon name="close-circle-outline"
                onclick='eliminarEgreso(${egreso.id})'></ion-icon>
            </button>
        </div>
    </div>
</div>
    `;
  return egresoHTML;
};

/**
 * Eliminar un egreso por Identificador Egreso
 * @param {Integer} id Identificador del elemento Egreso
 */
let eliminarEgreso = (id) => {
  let indiceEliminar = egresos.findIndex((egreso) => egreso.id === id);
  egresos.splice(indiceEliminar, 1);
  cargarCabecero();
  cargarEgresos();
};

/**
 * Agrega datos
 */
let agregarDato = () => {
  //Obtener la data desde la forma
  let forma = document.forms["forma"];
  let tipo = forma["tipo"];
  let descripcion = forma["descripcion"];
  let valor = forma["valor"];

  //Dependiendo si hay datos
  if (descripcion.value !== "" && valor.value !== "") {
    //Y si es un ingreso
    if (tipo.value === "ingreso") {
      //agregamos al array de ingreso la data
      ingresos.push(new Ingreso(descripcion.value, +valor.value));
      //cargamos la cabecera de resumen
      cargarCabecero();
      //Cargamos los ingresos
      cargarIngresos();
      //Activamos el evento click para guardar y descargar el JSON de los ingresos
      btnIngresos.addEventListener("click", () =>
        //save to exact file JSON
        guardarJSON(ingresos, "ingreso")
      );
    } else if (tipo.value === "egreso") {
      //Un egreso
      egresos.push(new Egreso(descripcion.value, +valor.value)); //Agregar al array
      cargarCabecero(); //Cabecera de resumen
      cargarEgresos(); //Listado de egresos
      //Activamos el evento click y esperamos para descargar los egresos
      btnEgresos.addEventListener("click", () =>
        //save to exact file JSON
        guardarJSON(egresos, "egreso")
      );
    }
  }
};
/**
 * Guarda la data en un archivo JSON
 * @param {Object} arreglo Array de objetos
 * @param {String} tipOperacion Tipo de operacion = {Egreso || Ingreso}
 */
let guardarJSON = (arreglo, tipOperacion) => {
  tipoMimeJson = "application/json";
  if (tipOperacion === "ingreso") {
    jsonIngresos = JSON.stringify(arreglo);
    //Guardar el string en un archivo: ./ingresos.json
    downloadFiles(jsonIngresos, "ingresos.json", tipoMimeJson);
  }
  if (tipOperacion === "egreso") {
    jsonEgresos = JSON.stringify(arreglo);
    //Guardar el string en un archivo: ./egresos.json
    downloadFiles(jsonEgresos, "egresos.json", tipoMimeJson);
  }
};

/**
 * Download a file
 * Thanks to https://www.delftstack.com/es/howto/javascript/javascript-create-and-save-files/
 * @param {*} data Object to save
 * @param {*} file_name name and extension for file to save
 * @param {*} file_type Type MIME for blob object(API BLOB)
 */
function downloadFiles(data, file_name, file_type) {
  //Un archivo blob con la data y el type mime adecuado
  var file = new Blob([data], { type: file_type });
  //Obtener la manera en que el navegador obtiene los BLOB
  if (window.navigator.msSaveOrOpenBlob)
    //Modo apertura
    window.navigator.msSaveOrOpenBlob(file, file_name);
  else {
    //Modo ancla
    var a = document.createElement("a"),
      url = URL.createObjectURL(file);
    a.href = url;
    //Permitir descargar
    a.download = file_name;
    document.body.appendChild(a);
    a.click();
    //Y revocar el objeto
    setTimeout(function () {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  }
}
