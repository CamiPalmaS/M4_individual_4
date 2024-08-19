//importar informacion de los pokemon
import { data } from "./pokemon.js";

//funcion para obtener datos del pokemon desde data
const extaerInfo = (data, identificador, callback) => {
    setTimeout(() =>{
        let info;
        //typeof devuelve tipo de dato string/number/boleano?
        if (typeof identificador === "number"){
            info = data.find(pokemon => pokemon.id === identificador);
        } else {
            info = data.find(pokemon => pokemon.name.toLowerCase() === identificador.toLowerCase());
        }

        if (info){
            callback(`ID: ${info.id}, Nombre: ${info.name}, Tipo: ${info.types.join(", ")}`);
        } else {
            callback("No se encontró el Pokemon");
        }
    }, 500);
};

//funcion para buscar pokemon
document.getElementById("search").addEventListener("submit", (event) =>{
    event.preventDefault();//evitar envio por default
    //obtener input usuario
    const input = document.getElementById("pokeID").value.trim();
    //llamar a la funcion que obtiene los datos
    extaerInfo(data, isNaN(input) ? input : parseInt(input), (resultado) => {
        document.getElementById("resultado").textContent = resultado ? JSON.stringify(resultado) : "No se encontró el pokemon";
    });
    document.getElementById("search").reset();
});

