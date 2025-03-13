describe('Customer Data View', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3000/api/v1/customers', {
            statusCode: 200,
            fixture: 'all_custs.json'
        }).as('getAllCusts')

        cy.visit('http://localhost:5173')
        cy.get('.custData').click()
        cy.wait('@getAllCusts')
    })

    it('is the correct URL', () => {
        cy.url().should('contain', 'http://localhost:5173/customers')
    })

    it('displays Customer data title on page load', () => {
        cy.get('h1').should('have.text', 'Customer Data')
    })

    it('displays Customer data blocks on page load', () => {
        cy.get(':nth-child(1)').should('be.visible')
        cy.get(':nth-child(20)').should('be.visible')
        cy.get('.custView').children().should('have.length', 20)
    })

    it('displays the customer details on page load' , () => {
        cy.get('.custView > :nth-child(1) > :nth-child(1)').should('be.visible')
        cy.get('.custView > :nth-child(1) > :nth-child(1)').should('include.text', 'First Name')
        cy.get('.custView > :nth-child(1) > :nth-child(2)').should('be.visible')
        cy.get('.custView > :nth-child(1) > :nth-child(2)').should('include.text', 'Last Name')
        cy.get('.custView > :nth-child(1) > :nth-child(3)').should('be.visible')
        cy.get('.custView > :nth-child(1) > :nth-child(3)').should('include.text', 'Email')
        cy.get('.custView > :nth-child(1) > :nth-child(4)').should('be.visible')
        cy.get('.custView > :nth-child(1) > :nth-child(4)').should('include.text', 'Address')
        cy.get('.custView > :nth-child(1) > :nth-child(5)').should('be.visible')
        cy.get('.custView > :nth-child(1) > :nth-child(5)').should('include.text', 'Subscription(s)')
        cy.get('.custView > :nth-child(20) > :nth-child(1)').should('be.visible')
        cy.get('.custView > :nth-child(20) > :nth-child(1)').should('include.text', 'First Name')
        cy.get('.custView > :nth-child(20) > :nth-child(2)').should('be.visible')
        cy.get('.custView > :nth-child(20) > :nth-child(2)').should('include.text', 'Last Name')
        cy.get('.custView > :nth-child(20) > :nth-child(3)').should('be.visible')
        cy.get('.custView > :nth-child(20) > :nth-child(3)').should('include.text', 'Email')
        cy.get('.custView > :nth-child(20) > :nth-child(4)').should('be.visible')
        cy.get('.custView > :nth-child(20) > :nth-child(4)').should('include.text', 'Address')
        cy.get('.custView > :nth-child(20) > :nth-child(5)').should('be.visible')
        cy.get('.custView > :nth-child(20) > :nth-child(5)').should('include.text', 'Subscription(s)')
    })

    it('allows workeres to search through customers by email', () => {
        cy.get('.searchBar').type('jordan')
        cy.get('.custView').children().should('have.length', 1)
        cy.get('.custViewContainer > :nth-child(3)').should('include.text', 'jordan')
    })

    it('displays back to home button on page load, and bring you back to home', () => {
        cy.get('.backButton').should('have.text', 'Back To Home')
        cy.get('.backButton').click({ force: true })
        cy.url().should('contain', 'http://localhost:5173')
    })
})