import { v4 as uuid } from 'uuid'


const name = uuid().slice(0, 5)
const url = 'http://localhost:3000/pizza'
const instructions = uuid().slice(0, 9)

describe('Test for MVP', () => {
    it('Can navigate to the site', () => {
        cy.visit(url)
        cy.url().should('include', 'localhost')
    })

    it('Can place an order', () => {
        cy.get('input[name="name"]')
            .type(name)
            .should('have.value', name)

        cy.get('input[name="toppings"]')
            .check().should('be.checked')
            
        cy.get('select')
            .select('medium').should('have.value', 'medium')

        cy.get('input[name="instructions"]')
            .type('make with love please')
            .should('have.value', 'make with love please')

        cy.get('button[name="order"]')
            .click()    
    })
})