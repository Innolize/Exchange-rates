/// <reference types="jquery" />

import {
    obtenerCambioDelDia,
    obtenerCambioConFecha
} from "./service/llamadasAPI.js"

import {
    mostrarCambioActual,
    crearOptionMoneda,
    crearTabla
} from "./ui/interfaz.js"

import {
    fechaHoy
} from "./utilities/utilidades.js"




async function obtenerNuevosValores(fecha, divisa) {
    const nuevaRespuesta = await obtenerCambioConFecha(fecha, divisa)
    mostrarCambioActual(nuevaRespuesta)
    crearTabla(nuevaRespuesta)
    crearOptionMoneda(nuevaRespuesta)
}


async function inicializar() {
    const respuesta = await obtenerCambioDelDia();
    fechaHoy()
    mostrarCambioActual(respuesta)
    crearTabla(respuesta)
    crearOptionMoneda(respuesta)
    actualizarCambio(obtenerNuevosValores)
}

inicializar();


function actualizarCambio(obtenerNuevosValores) {
    $("#ingresar").click(() => {
        const fecha = $("#fecha").val();
        const divisa = $("#seleccionar-divisa :selected").val();
        obtenerNuevosValores(fecha, divisa)
    })
}