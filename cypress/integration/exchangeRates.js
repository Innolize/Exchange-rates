/// <reference types="cypress"/>

const URL = "http://192.168.0.8:8080/"

context("Convertidor de moneda", () => {
    before(() => {
        cy.visit(URL);
    });

    describe("Comprueba que los elementos esten creados", () => {
        let hoy = new Date
        let fecha = hoy.getFullYear() + `-` + ("0" + (hoy.getMonth() + 1)).slice(-2) + `-` + ("0" + (hoy.getDay())).slice(-2)
        console.log(fecha)
        it("Comprueba que esten los datos default", () => {
            cy.get("#fecha").should("contain.value", fecha)
        })
        // 
        // it("Comprueba que info de fecha y divisa default sea correcto", () => {
        //     cy.get("h3").should("contain.text", `Cambio del dia ${fecha} en base EUR`)
        // })
        // it("Comprueba que tenga")
    })


    describe("Comprueba funcionamieno correcto ingresando nuevos valores", () => {
        it("Ingresa valores", () => {
            cy.get("#seleccionar-divisa").select("USD");
            cy.get("#fecha").clear()
            cy.get("#fecha").type("2005-05-27")
            cy.get("#ingresar").click();
            cy.get("h3").should("contain.text", "Cambio del dia 2005-05-27 en base USD")
        });

    })


});