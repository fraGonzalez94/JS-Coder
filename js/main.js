// Definimos una clase Cliente que tiene 2 atributos: nombre, apellido

class Cliente {
  constructor(nombre, apellido) {
    this.nombre = nombre.toLowerCase();
    this.apellido = apellido.toLowerCase();
  }
}


//Vamos a vincular el formulario:
const form = document.getElementById("formulario");
const serviciosContainer = document.getElementsByClassName("servicios")[0];


//Vamos a trabajar con el formulario, tomar sus datos, crear un objeto y luego almacenamos esos datos en el array vacío

form.addEventListener("submit", (e) => {
//evitamos el comportamiento por default del form
  e.preventDefault();
  //Vamos a crear un array vacío que almacene los datos de los
  //clientes ingresados por medio de un push.
  const arrayClientes = [];
  const name = document.getElementById("nombre");
  const lastname = document.getElementById("apellido");
  const error = document.getElementById("error");

  if (name.value === "" || lastname.value === "") {
    error.style.display = "block";
    serviciosContainer.classList.add("visually-hidden");
  } else {
    //crear un objeto que sea el cliente:
    const cliente = new Cliente(name.value, lastname.value);
    arrayClientes.push(cliente);

    // Guardamos los datos en el localstorage
    localStorage.setItem("clientes", JSON.stringify(arrayClientes));

    // Permitir la reserva del servicio y ocultar el mensaje de error
    error.style.display = "none";

    serviciosContainer.classList.remove("visually-hidden");
    showReservas();
  }
});


// Obtener los servicios de la peluquería de servicios.json
async function getServices() {
  return await fetch('js/servicios.json').then(response => response.json())
}


// Aplico DOM con el metodo forEach para recorrer el array y generar los div con los servicios
const contenedorServicios = document.getElementById("contenedorServicios");
getServices().then((_servicios) => {
  _servicios.forEach(servicio => {
    const div = document.createElement("div");
    div.classList.add("servicio");
    div.innerHTML = `<p> Nombre del servicio: ${servicio.nombre}<p>
              <p> Precio del servicio: ${servicio.precio} $<p>
              <p> Duracion del servicio: ${servicio.duracion} min<p>
              <button onclick="agregarServicio(${servicio.precio}, '${servicio.nombre}', ${servicio.duracion})">Reservar Servicio</button>`;
    contenedorServicios.appendChild(div);
  })
})

// Guardamos los datos en el localstorage
let serviciosGuardados = JSON.parse(localStorage.getItem("serviciosSeleccionados")) || [];

function reservarServicio(servicio) {
  return new Promise((resolve, reject) => {
    // Mostrar el diálogo de confirmación utilizando SweetAlert
    Swal.fire({
      title: '¿Está seguro que desea reservar el servicio seleccionado?',
      text: 'Su reserva quedará confirmada luego de aceptar',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    }).then((result) => {
      // Comprobar si el usuario confirmó la reserva
      if (result.isConfirmed) {
        // Resolver la promesa con el servicio reservado
        resolve(servicio);
      } else {
        // Rechazar la promesa con un mensaje de cancelación
        reject('Reserva cancelada');
      }
    });
  });
}

function agregarServicio(precio, nombre, duracion) {
  const cliente = JSON.parse(localStorage.getItem('clientes')) || [];
  const servicio = {nombre: nombre, precio: precio, duracion: duracion, cliente: cliente[0], id: new Date().valueOf()};
  // Verificar si hay un cliente registrado antes de reservar un servicio
  if (cliente.length === 0) {
    const mensaje = document.getElementById('mensaje');
    mensaje.textContent =
      'Debe ingresar su nombre y apellido antes de reservar un servicio.';
    return;
  }

  // Llamar a la función de reserva y manejar la promesa resultante
  reservarServicio(servicio)
    .then(() => {
      // Si la promesa se resuelve, agregar el servicio original al array de servicios guardados
      serviciosGuardados.push(servicio);
      localStorage.setItem(
        'serviciosSeleccionados',
        JSON.stringify(serviciosGuardados)
      );

      // Mostrar un mensaje de confirmación
      Swal.fire(
        `El servicio de ${servicio.nombre} ha sido reservado, con un precio de $${servicio.precio}`,
        'Para confirmar día y horario, enviar sus datos al siguiente WhatsApp: 11 6998-6557',
        'success'
      );

      showReservas();
    })
    .catch((error) => {
      // Si la promesa es rechazada, mostrar un mensaje de error en la consola
      console.log(error);
    });
}

// Muestro las reservas y en el caso que ya tuviera reservas las traigo del localstorage filtrando por cliente
function showReservas() {
  const containerReservas = document.getElementById('contendorReservas');
  containerReservas.innerHTML = '';
  const reservas = JSON.parse(localStorage.getItem("serviciosSeleccionados")) || [];
  const cliente = JSON.parse(localStorage.getItem("clientes"))[0] || [];
  const reservasFiltered = reservas.filter((reserva) => reserva.cliente.nombre == cliente.nombre);
  reservasFiltered.forEach((servicio) => {
    const div = document.createElement("div");
    div.classList.add("reserva");
    div.innerHTML = `<p> Nombre del cliente: ${cliente.nombre} ${cliente.apellido}<p>
              <p> Nombre del servicio: ${servicio.nombre}
              <p> Precio del servicio: ${servicio.precio} $<p>
              <p> Duracion del servicio: ${servicio.duracion} min<p>
              <button onclick="eliminarReserva(${servicio.id})">Eliminar Servicio</button>`;
    containerReservas.appendChild(div);
  })
}

//busco y elimino la reserva del servicio
function eliminarReserva(id) {
  let reservas = JSON.parse(localStorage.getItem("serviciosSeleccionados")) || [];

  reservas = reservas.filter((reserva) => {
    return parseInt(reserva.id) !== parseInt(id);
  });
  serviciosGuardados = reservas;
  localStorage.setItem(
    'serviciosSeleccionados',
    JSON.stringify(reservas)
  );
  showReservas();
}


// Obtener la condición del clima en Buenos Aires
fetch('https://api.weatherapi.com/v1/current.json?key=8b053cb37d7e4b018d7212557231305&q=Buenos%20Aires')
  .then(response => response.json())
  .then(data => {
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const symbol = data.current.condition.icon;
    const place = data.location.name;

    const climaElement = document.getElementById("clima");
    climaElement.innerHTML = `Clima: ${condition}  <img src="${symbol}" alt="Weather Symbol"> , Temperatura: ${temperature}°C, ${place}`;
  })

  .catch(error => {
    console.log(error);
  });