export function mostrarCambioActual(respuestaAPI) {
    $("#cambio-del-dia").text(
        `Cambio del dia ${respuestaAPI.date} en base ${respuestaAPI.base}`
    );
}
export function crearTabla(respuestaAPI) {
    $("#cuerpo-tabla").html("");
    Object.keys(respuestaAPI.rates).forEach(moneda => {
        $("#cuerpo-tabla").append($(`<tr><td class="divisa">${moneda}</td><td class="valorDivisa">${respuestaAPI.rates[moneda]}</td></tr>)`));
    })
}

export function crearOptionMoneda(respuestaAPI) {
    Object.keys(respuestaAPI.rates).forEach(moneda => {
        $("#seleccionar-divisa").append($(`<option value="${moneda}">${moneda}</option>`))
    })
}