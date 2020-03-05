/// <reference types="jquery" />

// Estaba por crear una funcion para colocar la fecha actual en el input fecha pero
// creo que no es necesario
//
// const hoy = new Date();
// const fechaActual = hoy.getFullYear()+`-`+hoy.getMonth()+`-`+hoy.getDay()
// $("#fecha").text(fechaActual)

fetch("https://api.exchangeratesapi.io/latest")
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => {
        $("h3").text(
            `Cambion del dia ${respuestaJSON.date} en base ${respuestaJSON.base}`
        );

        $("#datos-api").html("");
        Object.keys(respuestaJSON.rates).forEach(moneda => {
            $("#datos-api").append($(`<li>${moneda}: ${respuestaJSON.rates[moneda]}</li>)`));
        })
        Object.keys(respuestaJSON.rates).forEach(moneda => {
            $("#seleccionar-divisa").append($(`<option value="${moneda}">${moneda}</option>`))
        })

    })


$("#ingresar").click(() => {
    const divisa = $("#seleccionar-divisa :selected").val();
    fetch(`https://api.exchangeratesapi.io/${($("#fecha").val())}?base=${divisa}`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            $("h3").text(
                `Cambio del dia ${respuestaJSON.date} en base ${respuestaJSON.base}`
            );
            $("#datos-api").html("");
            Object.keys(respuestaJSON.rates).forEach(moneda => {
                $("#datos-api").append($(`<li>${moneda}: ${respuestaJSON.rates[moneda]}</li>`))
            })
        })
})