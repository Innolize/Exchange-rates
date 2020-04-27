export function mostrarCambioActual(respuestaAPI) {
    $("h3").text(
        `Cambio del dia ${respuestaAPI.date} en base ${respuestaAPI.base}`
    );
}
export function crearTabla(respuestaAPI) {
    $("#cuerpo-tabla").html("");
    Object.keys(respuestaAPI.rates).forEach(moneda => {
        $("#cuerpo-tabla").append($(`<tr><td>${moneda}</td><td> ${respuestaAPI.rates[moneda]}</td></tr>)`));
    })
}

export function crearOptionMoneda(respuestaAPI) {
    Object.keys(respuestaAPI.rates).forEach(moneda => {
        $("#seleccionar-divisa").append($(`<option value="${moneda}">${moneda}</option>`))
    })
}