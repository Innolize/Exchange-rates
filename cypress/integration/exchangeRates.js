/// <reference types="cypress"/>

const URL = "http://192.168.0.8:8080/"

context("Convertidor de moneda", () => {
    let fetchPolyfill;
    before(() => {
        const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

        cy.request(polyfillUrl)
            .then((response) => {
                fetchPolyfill = response.body;
            });


        cy.visit('http://127.0.0.1:8080', {
            onBeforeLoad(contentWindow) {
                // eslint-disable-next-line no-param-reassign
                delete contentWindow.fetch;
                contentWindow.eval(fetchPolyfill);
                // eslint-disable-next-line no-param-reassign
                contentWindow.fetch = contentWindow.unfetch;
            },
        });
    });


    describe("Comprueba que los elementos esten creados al iniciar la pagina", () => {
        it("Comprueba que esten los componentes del menu", () => {
            cy.get("#seleccionar-divisa").as("seleccionadorDivisa").should("exist")
            cy.get("#fecha").as("fechaInput").should("exist")
            cy.get("#ingresar").as("botonIngresar").should("exist")
        })
        it("Comprueba que la tabla este completa", () => {
            cy.get("th").as("encabezadosDeTabla").should("have.length", "2")
            cy.get(".divisa").as("divisaEnTabla").should("have.length", "32")
            cy.get(".valorDivisa").as("valorDivisaEnTabla").should("have.length", "32")
            cy.get("#cambio-del-dia").should("exist")
        })
    })

    describe("Comprueba funcionamieno correcto ingresando nuevos valores", () => {
        it("testea que el titulo sobre tabla corresponda a primerTestAPI", () => {
            cy.server();
            cy.route("https://api.exchangeratesapi.io/2010-01-12?base=USD", "fixture:2010-01-12-USD")
                .as("primerTestAPI");

            cy.get("#seleccionar-divisa").select("USD");
            cy.get("#fecha").clear()
            cy.get("#fecha").type("2010-01-12")
            cy.get("#ingresar").click();
            cy.get("#cambio-del-dia").should("contain.text", "Cambio del dia 2010-01-12 en base USD")
        })
        it("Verifica que los resultados entregados por primerTestAPI fueran los correctos", () => {
            cy.get(".divisa").first().should("have.text", "CAD")
            cy.get(".valorDivisa").first().should("have.text", "1.0330087701")
        })

        it("testea que el titulo sobre la tabla corresponda a segundoTestAPI", () => {
            cy.server();
            cy.route("https://api.exchangeratesapi.io/2015-05-11?base=EUR", "fixture:2015-05-11-EUR")
                .as("segundoTestAPI");

            cy.get("#seleccionar-divisa").select("EUR");
            cy.get("#fecha").clear()
            cy.get("#fecha").type("2015-05-11")
            cy.get("#ingresar").click();
            cy.get("#cambio-del-dia").should("contain.text", "Cambio del dia 2015-05-11 en base EUR")
        })
        it("Verifica que los resultados entregados por segundoTestAPI fueran los correctos", () => {
            cy.get(".divisa").first().should("have.text", "CAD")
            cy.get(".valorDivisa").first().should("have.text", "1.3497")
        })

    })

});