let quiereNueva = false;
do {
  const monto = parseInt(prompt("Cual es el monto a solicitar"));
  const plazo = parseInt(prompt("Cual es el plazo (expresado en años)"));
  const interes = parseInt(prompt("Cual es el interes?"));

  function Cuota (_monto, _plazo){
    return _monto / (_plazo * 12);
  }

  function InteresMensual (_monto, _interes){
    return (_monto * (_interes / 100)) / 12;
  }

  function TotalPrimerCuota (_monto, _plazo, _interes){
    const cuotaCapital = Cuota(_monto,_plazo)
    const interesMensual = InteresMensual(_monto, _interes)
    return Math.ceil(cuotaCapital + interesMensual)
  }

  const totalPrimerCuota = TotalPrimerCuota(monto, plazo, interes);

  if(!Number.isNaN(monto) && !Number.isNaN(plazo) && !Number.isNaN(interes) ){
    alert(`Este es el monto que abonaras por mes = $${totalPrimerCuota}`)
    
  } else {
  	let errorMsj = ''
    if(Number.isNaN(monto)){
			errorMsj += ', Monto'
    }
    if(Number.isNaN(plazo)){
			errorMsj += ', Plazo'
    }
    if(Number.isNaN(interes)){
    	errorMsj += ', Interes'
    }
    alert(`Los siguientes valores son incorrectos ${errorMsj}. Por Favor ingrese un valor numerico `)
  }
  quiereNueva = confirm("Quiere volver a simular ?");
} while (quiereNueva === true) {
  alert("Muchas Gracias por utilizar nuestro servicio");
}