export function fechaHoy() {
    let hoy = new Date();
    let fechaActual = hoy.getFullYear() + `-` + ("0" + (hoy.getMonth() + 1)).slice(-2) + `-` + ("0" + (hoy.getDay())).slice(-2)
    console.log(fechaActual) 
    $("#fecha").val(fechaActual)
}