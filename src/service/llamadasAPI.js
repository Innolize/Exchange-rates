export function obtenerCambioDelDia() {
    return fetch("https://api.exchangeratesapi.io/latest")
        .then(respuesta => respuesta.json())
}

export function obtenerCambioConFecha(fecha,divisa) {
    return fetch(`https://api.exchangeratesapi.io/${fecha}?base=${divisa}`)
        .then(respuesta => respuesta.json())
}