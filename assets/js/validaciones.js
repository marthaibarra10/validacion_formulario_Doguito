/*
ESTA SECCION SE ELIMINA YA NO SE UTILIZARÁ
LA SECCION QUE SE VA A UTLIZAR ES LA QUE ESTÁ ABAJO
//Por medio de dom seleccionamos el ID birth que es del input de nacimiento
const inputNacimiento = document.querySelector('#birth');

//A este input se le va a agregar el escuchador y su tipo de evento es Blur osea cuando el foco se quite del calendario
inputNacimiento.addEventListener('blur', (evento) => {
    validarNacimiento(evento.target);
});
*/

//AQUÍ ABAJO 
//Esta funcion valida cual es el tipo de input que está leyendo, puede ser de fecha de nacimiento
//numero de telefono, nombre etc
export function valida(input) {
    const tipoDeinput = input.dataset.tipo;
    if(validadores[tipoDeinput]){
        validadores[tipoDeinput](input);
    }

    //console.log(input.parentElement);
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    } else {
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeinput, input);
    }
}

//Arreglo de errores
const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
]


const mensajesDeError = {
    nombre: {
        valueMissing : "Este campo nombre no puede estar vacío"
    },
    email: {
        valueMissing: "Este campo correo no puede estar vacío",
        typeMismatch: "El correo no es válido"
    },
    password: {
        valueMissing: "Este campo contraseña no puede estar vacío",
        patternMismatch: "Al menos 6 caracteres, máximo 12, debe contener una letra minuscula, una letra mayúscula, un número y no puede contener caracteres especiales"
    },
    nacimiento: {
        valueMissing : "Este campo no puede estar vacío",
        customError: "Debes tener al menos 18 años de edad"
    },
    numero: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El formato requerido es 951-000-00-00 10 números"
    },
    direccion: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La dirección debe contener entre 10 y 40 caracteres"
    },
    ciudad: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "La ciudad debe contener entre 10 y 40 caracteres"
    },
    estado: {
        valueMissing: "Este campo no puede estar vacío",
        patternMismatch: "El estado debe contener entre 10 y 40 caracteres"
    },
};


const validadores = {
    nacimiento: input => validarNacimiento(input),
};


function mostrarMensajeDeError(tipoDeinput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoDeinput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeinput][error]);
            mensaje = mensajesDeError[tipoDeinput][error];
        }
    });
    return mensaje;
}


//Creamos una función para la fecha de nacimiento, esta funcion recibe el input 
function validarNacimiento(input){
    const fechaCliente = new Date(input.value); //Con value capturamos el valor que el usuario ingresa
    //console.log(fecha); Con el console.log mostramos la constante fecha en la consola del navegador
    //Declaramos la variable del mensaje, es vacío
    let mensaje = "";

    //Aquí negamos la condición, dice: si no es mayor de edad entonces le mostramos el mensaje
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Deber tener más de 18 años para completar tu registro"
    }

    //El setCustomValidity muestra el mensaje en el input
    input.setCustomValidity(mensaje);
}

//En esta funcion se obtiene la fecha actual del sistema y se le suman 18 años para saber si el cliente es mayor de edad
function mayorDeEdad(fecha){
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
        fecha.getUTCFullYear() + 18,
        fecha.getUTCMonth(),
        fecha.getUTCDate()
    );
    //console.log(diferenciaFechas);
    return diferenciaFechas <= fechaActual;
}