let todosLosElementos = [];
let datos = [];
let paginaActual = 1;
const elementosPorPagina = 4;

//Parte de Paginación
function mostrarElementos() {

    const lista = document.getElementById('lista-elementos');
    lista.innerHTML = ''; // Limpiar lista previa

    // Calcular índices
    const inicio = (paginaActual - 1) * elementosPorPagina;
    const fin = inicio + elementosPorPagina;
    const elementosPagina = datos.slice(inicio, fin);

    // Mostrar elementos
    elementosPagina.forEach(el => {
        lista.appendChild(el);
    });

    renderizarBotones();
}

function renderizarBotones() {
    const contenedorBotones = document.getElementById('botones-paginacion');
    contenedorBotones.innerHTML = ''; // Limpiar botones previos

    const totalPaginas = Math.ceil(datos.length / elementosPorPagina);

    for (let i = 1; i <= totalPaginas; i++) {
        const btn = document.createElement('button');
        btn.textContent = i;
        btn.classList.add('btn-pagina');
        
        if (i === paginaActual) {
            btn.classList.add('activo');
        }

        btn.addEventListener('click', () => {
            paginaActual = i;
            mostrarElementos();
        });

        contenedorBotones.appendChild(btn);
    }
}

document.addEventListener("DOMContentLoaded", () => {

    todosLosElementos = Array.from(
        document.querySelectorAll("#lista-elementos > div")
    );

    // Ordenamos TODOS los juegos una única vez
    todosLosElementos.sort((a, b) => {

        const tituloA = a.querySelector("h4")
            .textContent
            .trim();

        const tituloB = b.querySelector("h4")
            .textContent
            .trim();

        return tituloA.localeCompare(tituloB, "es", {
            sensitivity: "base"
        });
    });

    datos = todosLosElementos.slice();

    mostrarElementos();
});

//Parte de Botones
function verTodas(){
    paginaActual = 1;
    datos = todosLosElementos.slice();
    activarBoton("todas");
    mostrarElementos();
}

function verBlogs(){
    paginaActual = 1;
    datos = todosLosElementos.filter(el => el.classList.contains("blogs"));
    activarBoton("blogs");
    mostrarElementos();
}

function verReview(){
    paginaActual = 1;
    datos = todosLosElementos.filter(el => el.classList.contains("reviews"));
    activarBoton("reviews");
    mostrarElementos();
}

function verResumenes(){
    paginaActual = 1;
    datos = todosLosElementos.filter(el => el.classList.contains("resumenes"));
    activarBoton("resumenes");
    mostrarElementos();
}

function activarBoton(id) {
    let botones = document.getElementsByClassName("opcion");
    for (let boton of botones) {
        boton.style.backgroundColor = "#b9a3e3";
    }
    document.getElementById(id).style.backgroundColor = "#6441a5";
}