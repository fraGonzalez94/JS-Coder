// Definir los servicios de la peluquería como objetos
const corte = {
  nombre: 'Corte de cabello',
  precio: 1000,
  duracion: 30,
};

const tinte = {
  nombre: 'Color y decoloracion',
  precio: 1500,
  duracion: 60,
};

const barba = {
  nombre: 'Arreglo de barba',
  precio: 500,
  duracion: 15,
};

const ninos = {
  nombre: 'Corte niños',
  precio: 800,
  duracion: 45,
};

// Crear un array para almacenar los servicios disponibles
const servicios = [corte, tinte, barba, ninos];

// Variable para almacenar los servicios seleccionados
let serviciosSeleccionados = [];

// Iniciar ciclo para seleccionar servicios
let continuar = true;
while (continuar) {

  // Pedir al usuario que seleccione un servicio
  let seleccion = prompt('Bienvenido a la peluquería. ¿Qué servicio te gustaría?\n1: Corte de cabello\n2: Color y decoloracion\n3: Arreglo de barba\n4: Corte niños');

  // Convertir la selección del usuario en un número entero
  seleccion = parseInt(seleccion);

  // Validar la selección del usuario y agregar el servicio al array de servicios seleccionados
  if (seleccion >= 1 && seleccion <= servicios.length) {
    const servicioSeleccionado = servicios[seleccion - 1];
    alert(`Has seleccionado el servicio de ${servicioSeleccionado.nombre}.\nEl precio del servicio es de ${servicioSeleccionado.precio} pesos y dura ${servicioSeleccionado.duracion} minutos.`);
    serviciosSeleccionados.push(servicioSeleccionado);
  } else {
    alert('Selección inválida. Por favor, selecciona un número entre 1 y 4.');
  }

  // Preguntar si el usuario desea agregar otro servicio
  continuar = confirm("¿Deseas agregar otro servicio?");
  
}

// Ordenar los servicios seleccionados por precio descendente
serviciosSeleccionados.sort((a, b) => b.precio - a.precio);

// Mostrar los servicios seleccionados y su precio ordenados por precio descendente
let detalleServicios = "";
for (let servicio of serviciosSeleccionados) {
  detalleServicios += `- ${servicio.nombre}: ${servicio.precio} pesos\n`;
}
alert(`Has seleccionado los siguientes servicios ordenados por precio descendente:\n${detalleServicios}`);

// Calcular el precio total de los servicios seleccionados
let precioTotal = 0;
for (let servicio of serviciosSeleccionados) {
  precioTotal += servicio.precio;
}

// Mostrar el precio total al usuario
alert(`El precio total de los servicios seleccionados es de ${precioTotal} pesos.`);
