 // Definimos una clase Cliente que tiene 2 atributos: nombre, apellido

class Cliente {
  constructor(nombre, apellido) {
    this.nombre = nombre;
    this.apellido = apellido;
    
}
}

//Vamos a crear un array vacío que almacene los datos de los
//clientes ingresados por medio de un push.

const arrayClientes= [];

//Vamos a vincular el formulario:
const form = document.getElementById("formulario");

//Vamos a trabajar con el formulario, tomar sus datos, crear un objeto y luego almacenamos esos datos en el array vacío

form.addEventListener("submit", (e)=>{
//evitamos el comportamiento por default del form
e.preventDefault();

const name = document.getElementById("nombre");
const lastname = document.getElementById("apellido");
const error = document.getElementById("error");

if (name.value === "" || lastname.value === "") {
  error.style.display = "block";
} else {
  //crear un objeto que sea el cliente:
  const cliente = new Cliente(name.value, lastname.value);
  arrayClientes.push(cliente);
  console.log(arrayClientes);

  //Reseteamo el form al mandar los datos
  formulario.reset();

  // Guardamos los datos en el localstorage
  localStorage.setItem("clientes", JSON.stringify(arrayClientes));

  // Permitir la reserva del servicio y ocultar el mensaje de error
  error.style.display = "none";
}
});


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
duracion: 15 ,
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

// Guardamos los datos en el localstorage
const contenedorServicios = document.getElementById("contenedorServicios");
let serviciosGuardados = JSON.parse(localStorage.getItem("serviciosSeleccionados")) || [];



// Aplico DOM con el metodo forEach para recorrer el array y generar los div con los servicios
servicios.forEach(servicio => {
const div= document.createElement ("div");
div.classList.add("servicio");
div.innerHTML=`<p> Nombre del servicio: ${servicio.nombre}<p>
              <p> Precio del servicio: ${servicio.precio} $<p>
              <p> Duracion del servicio: ${servicio.duracion} min<p>
              <button onclick="agregarServicio(${servicio.precio}, '${servicio.nombre}')">Reservar Servicio</button>`;
contenedorServicios.appendChild(div);
} )


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

function agregarServicio(precio, nombre) {
  const servicio = { nombre: nombre, precio: precio };

  // Verificar si hay un cliente registrado antes de reservar un servicio
  if (arrayClientes.length === 0) {
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
        `El servicio de ${servicio.nombre} ha sido reservado, con un precio de $`,
        'Para confirmar día y horario, enviar sus datos al siguiente WhatsApp: 11 6998-6557',
        'success'
      );
    })
    .catch((error) => {
      // Si la promesa es rechazada, mostrar un mensaje de error en la consola
      console.log(error);
    });
}
  // Función para descargar un objeto JSON como archivo
  function descargarJSON(data, filename) {
    const jsonData = JSON.stringify(data);
    const blob = new Blob([jsonData], { type: "application/json" });
    saveAs(blob, filename);
}

// Obtener la condición del clima en Buenos Aires
fetch('https://api.weatherapi.com/v1/current.json?key=8b053cb37d7e4b018d7212557231305&q=Buenos%20Aires')
.then(response => response.json())
.then(data => {
    const temperature = data.current.temp_c;
    const condition = data.current.condition.text;
    const symbol = data.current.condition.icon;

    const climaElement = document.getElementById("clima");
    climaElement.innerHTML = `Clima: ${condition}  <img src="${symbol}" alt="Weather Symbol"> , Temperatura: ${temperature}°C`;
})
    
    .catch(error => {
        console.log(error);
    });