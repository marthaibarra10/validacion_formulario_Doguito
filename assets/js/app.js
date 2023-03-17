import { valida } from './validaciones.js';

//Aquí seleccionamos todos los inputs que tenemos en el formulario
const inputs = document.querySelectorAll("input");

//A cada uno de los inputs les va agregar los addEventListener que tiene blur
inputs.forEach((input) => {
    input.addEventListener("blur", (input) => {
        valida(input.target);//La funcion valida vive en validaciones.js
    });
});