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
            agregarBusqueda(info);
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

//se crea arreglo para añadir las busquedas realizadas
let busqueda = [];

//para agregar resultados exitosos a la lista de búsquedas
function agregarBusqueda(info) {
    //agregar pokemon al arreglo busqueda
    busqueda.push(info);
    //ordenar la lista por ID
    busqueda.sort((a, b) => a.id - b.id);
    //mostrar la lista actualizada
    mostrarBusqueda();
}

//para mostrar la lista de búsquedas en el div #sortPokemon
function mostrarBusqueda() {
    const sortPokemonDiv = document.getElementById("sortPokemon");
    sortPokemonDiv.innerHTML = ""; //limpiar el contenido anterior

    busqueda.forEach(pokemon => {
        const pokemonInfo = document.createElement("ul");
        pokemonInfo.classList.add("list-group")
        pokemonInfo.innerHTML = `
        <li class="list-group-item">
        <p class="text-muted">
        ID: ${pokemon.id}, Nombre: ${pokemon.name}, Tipo: ${pokemon.types.join(", ")}
        </p>
        </li>`;
        sortPokemonDiv.appendChild(pokemonInfo);
    });
}