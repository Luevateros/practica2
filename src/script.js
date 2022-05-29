// Evento para agregar notas a la Local Storage
let agregarBtn = document.getElementById("guardar-btn");
agregarBtn.addEventListener("click", function(e) {

    let titulo = document.getElementById("titulo-nota");
    let cuerpo = document.getElementById("cuerpo-nota");

    if (titulo.value == "" || cuerpo.value == "") {
        return alert("La nota debe tener título y descripción.");
    }

    // JSON.parse change color object
    let notas = localStorage.getItem("notas");
    let notasObj = notas == null ? [] : JSON.parse(notas);
    let myObj = {
        titulo_texto: titulo.value,
        titulo_color: titulo.style.color,
        cuerpo_texto: cuerpo.value,
        cuerpo_color: cuerpo.style.color
    }
    notasObj.push(myObj);
    localStorage.setItem("notas", JSON.stringify(notasObj));
    cuerpo.value = "";
    titulo.value = "";
    mostrarNotas();

});

// Función para mostrar las notas guadados en Local Storage
function mostrarNotas() {
    let notas = localStorage.getItem("notas");
    let notasObj = notas == null ? [] : JSON.parse(notas);
    let html = "";
    notasObj.forEach(function(elemento, index) {
        html += `
                <div class="nota">
                    <div class="franja">
                        <h3 class="titulo-nota"
                            style="color: ${elemento.titulo_color}">
                            ${elemento.titulo_texto}</h3>
                        <div>
                            <a  
                                id="${index}"
                                onclick="editarNota(this.id)" 
                                title="Editar nota">
                                <i class="fas fa-marker fa-2x"></i>
                            </a> 
                            &nbsp;
                            &nbsp;
                            <a  
                                id="${index}" 
                                onclick="eliminarNota(this.id)"
                                title="Eliminar nota">
                                <i class="fas fa-trash fa-2x"></i>
                            </a> 
                        </div>
                    </div>
                    <p  class="cuerpo-nota"
                        style="color: ${elemento.cuerpo_color}">
                        ${elemento.cuerpo_texto}</p>
                </div>
                `;
    });
    let notasElm = document.getElementById("notas");
    notasElm.innerHTML = notasObj.length != 0 ? html : "No tienes notas.";
}

// Función para eliminar una nota
function eliminarNota(index) {
    let confirmacion = confirm("¿Quieres borrar está nota?");
    if (confirmacion == true) {
        let notas = localStorage.getItem("notas");
        let notasObj = notas == null ? [] : JSON.parse(notas);
        notasObj.splice(index, 1);
        localStorage.setItem("notas", JSON.stringify(notasObj));
        mostrarNotas();
    }
}

// Funcion para editar una nota
function editarNota(index) {
    let notas = localStorage.getItem("notas");
    let titulo = document.getElementById("titulo-nota");
    let cuerpo = document.getElementById("cuerpo-nota");

    if (titulo.value !== "" || cuerpo.value !== "") {
        return alert("La forma debe estár limpia antes de agregar una nota.")
    } 
    let notasObj = notas == null ? [] : JSON.parse(notas);
    console.log("editarNota > titulo -> titulo_color = ", notasObj[index].titulo_color);
    console.log("editarNota > titulo -> cuerpo_color = ", notasObj[index].cuerpo_color);
    titulo.value        = notasObj[index].titulo_texto;
    titulo.style.color  = notasObj[index].titulo_color;
    cuerpo.value        = notasObj[index].cuerpo_texto;
    cuerpo.style.color  = notasObj[index].cuerpo_color;
    notasObj.splice(index, 1);
    localStorage.setItem("notas", JSON.stringify(notasObj));
    mostrarNotas();
}


mostrarNotas();