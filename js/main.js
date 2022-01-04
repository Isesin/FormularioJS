function cargarProductos() {
    $.ajax({
        method: "GET",
        url:  "js/productos.json",
        success: function(respuesta) {
    let contenido = "";
    let i = 1;


    for (let datos of respuesta) {
        contenido += "<div class='col-lg-3 col-md-6 col-sm-12 p-3'>";
        contenido += "<div class='card'>"
        contenido += "<img class='w-100 h-100' id='producto_imagen" + i + "' src='imagenes/" + datos.imagen + "' class='card-img-top' alt='Productos'" + datos.nombre + "';>";
        contenido += "</div>";
        contenido += "</div>";

        i++;
    }

    $("#nuestrosProductos").html(contenido);
},
error: function(respuesta) {
    $("#nuestrosProductos").prepend(`<div><strong>Error!</strong> No se pudo enviar los datos!</div>`);
}
});
};


cargarProductos();







$("#form").prepend(`<form id="myForm" class=" col align-self-center ">
                    <div id="ocultar">
                        <div class="mb-3">
                          <label for="nombre" class="form-label">Nombre y apellido</label>
                          <input type="text" class="form-control " id="nombre" title="Ingrese su nombre y apellido">
                        </div>
                        <div class="mb-3">
                          <label for="telefono" class="form-label">Teléfono de contacto</label>
                          <input type="tel" class="form-control" id="telefono" title="Ingrese su teléfono">
                        </div>
                        <div class="mb-3">
                            <label for="email" class="form-label">Email</label>
                            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" title="Ingrese su email">
                        </div>
                        <div class="mb-3">
                              <label for="modelo" class="form-label">Seleccione el Sistema sobre el que necesita asistencia:</label>
                              <select class="form-control" id="modelo">
                                  <option value="">Elija una opción.</option>
                                  <option value="alarma">Sistema de Alarma.</option>
                                  <option value="camaras">Cámaras de Seguridad.</option>
                                  <option value="cercoE">Cerco Eléctrico Perimetral.</option>
                        
                              </select>
                              <button id="btn2" class="btn btn-primary mt-3">Elegir servicio</button>
                              <button id="btn3" class="btn btn-primary mt-3">Esconder servicios</button>
                              </div>
                              <div id="select">
                        </div>
                        <div class="mb-3">
                            <label for="falla" class="form-label"><strong>Deje sus comentarios:</strong></label>
                            <textarea required name="falla" id="falla" cols="30" rows="10"class="form-control" title="Describa la falla."></textarea>
                            
                        

                        </div>
                        
                        

                        <div id="infoService"></div>
                        
                        <button type="button" id="btnPrincipal" class="btn btn-primary">Enviar Datos</button>
                        
                    </div>
                    <div id="datosContacto"></div>
                    <div id="respuesta">
                    <p class='text-white bg-black p-3 m-3' style="display:none" id="textoRespuesta">Su consulta ha sido enviada. Gracias por elegirnos.</p>
                    </div>

                    
                
</form>`);


// Evento submit


$("#btnPrincipal").click(function enviarDatos() {




    const infoCliente = {
        nombre: $("#nombre").val(),
        telefono: $("#telefono").val(),
        email: $("#email").val(),
        modelo: $("#modelo").val(),
        falla: $("#falla").val(),
        consulta: $("#consulta").val()
    }


    if ((infoCliente.nombre == "") || (infoCliente.nombre.length <3 )){
        alert("Revise el Campo Nombre!");
        return false;
    }
    if ((infoCliente.telefono == "") || (infoCliente.telefono.length <10 )) {
        alert("Revise el teléfono de contacto");
        return false;
    }

    if ((infoCliente.email == "") || (!infoCliente.email.includes("@"))) {
        alert("Revise que el email esté escrito correctamente");
        return false;
    }
    if (infoCliente.modelo == "") {
        alert("Elija una opción");
        return false;
    }
    if ((infoCliente.falla == "") || (infoCliente.falla.length <10 )) {
        alert("Haga una breve descripción de la falla");
        return false;
    }

    localStorage.setItem("datosForm", JSON.stringify([nombre, telefono, email, modelo, falla, consulta]));

    console.log("Nombre del cliente: " + infoCliente.nombre);
    console.log("Teléfono de contacto: " + infoCliente.telefono);
    console.log("Email de confirmación: " + infoCliente.email);
    console.log("Descripción de la falla: " + infoCliente.falla);
    console.log("Descripción de la falla: " + infoCliente.consulta);
    console.log(infoCliente)
    $("#ocultar").fadeOut(1500);
    $("#textoRespuesta").fadeIn(1500);
})



$("#btn2").click(() => {
    $.ajax({
        method: "GET",
        url:  "js/datos.json",
        success: function(respuesta) {
        let contenido = "";
        let i = 1;
            contenido += "<select id='consulta' class='dropdown'> "
            
            for (const datos of respuesta) {
                contenido += "<option id='asistencia' value='" + datos.nombre +"'>" + datos.nombre + "</option>";
                i++;
            }
            contenido += "</select> ";
            $("#select").html(contenido);
    }


})
});
$("#btn3").click(() => {
    $("#select").hide()
});