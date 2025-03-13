describe('Customer Data View', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3000/api/v1/teas', {
            statusCode: 200,
            fixture: 'all_teas.json'
        }).as('getAllTeas')

        cy.visit('http://localhost:5173')
        cy.get('.teaData').click()
        cy.wait('@getAllTeas')
    })

    it('is the correct URL', () => {
        cy.url().should('contain', 'http://localhost:5173/teas')
    })

    it('displays Tea data title on page load', () => {
        cy.get('h1').should('have.text', 'Tea Data')
    })

    it('displays Tea data blocks on page load', () => {
        cy.get(':nth-child(1)').should('be.visible')
        cy.get(':nth-child(27)').should('be.visible')
        cy.get('.teaView').children().should('have.length', 27)
    })

    it('displays the customer details on page load' , () => {
        cy.get('.teaView > :nth-child(1) > :nth-child(1)').should('be.visible')
        cy.get('.teaView > :nth-child(1) > :nth-child(1)').should('include.text', 'Name')
        cy.get('.teaView > :nth-child(1) > :nth-child(2)').should('be.visible')
        cy.get('.teaView > :nth-child(1) > :nth-child(2)').should('include.text', 'Description')
        cy.get('.teaView > :nth-child(1) > :nth-child(3)').should('be.visible')
        cy.get('.teaView > :nth-child(1) > :nth-child(3)').should('include.text', 'Reccomended Temperature')
        cy.get('.teaView > :nth-child(1) > :nth-child(4)').should('be.visible')
        cy.get('.teaView > :nth-child(1) > :nth-child(4)').should('include.text', 'Reccomended Brew Time')
        cy.get(':nth-child(27) > :nth-child(1)').should('be.visible')
        cy.get(':nth-child(27) > :nth-child(1)').should('include.text', 'Name')
        cy.get(':nth-child(27) > :nth-child(2)').should('be.visible')
        cy.get(':nth-child(27) > :nth-child(2)').should('include.text', 'Description')
        cy.get(':nth-child(27) > :nth-child(3)').should('be.visible')
        cy.get(':nth-child(27) > :nth-child(3)').should('include.text', 'Reccomended Temperature')
        cy.get(':nth-child(27) > :nth-child(4)').should('be.visible')
        cy.get(':nth-child(27) > :nth-child(4)').should('include.text', 'Reccomended Brew Time')
    })

    it('displays back to home button on page load, and bring you back to home', () => {
        cy.get('.backButton').should('have.text', 'Back To Home')
        cy.get('.backButton').click({ force: true })
        cy.url().should('contain', 'http://localhost:5173')
    })
})