/// <reference types="cypress"/>

const URL = "http://192.168.0.8:8080/"

context("Convertidor de moneda", () => {
    before(() => {
        cy.visit(URL);
    });

    describe("Comprueba funcionamieno correco", () => {
        it("Ingresa valores", () => {
            cy.get("#seleccionar-divisa").select("USD");
            cy.get("#fecha").type("2005-5-27")
            cy.get("#ingresar").click();
        });

    })


});