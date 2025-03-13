describe('Home', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions', {
            statusCode: 200,
            fixture: 'all_subs.json'
        }).as('getAllSubs')

        cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions/1', {
            statusCode: 200,
            fixture: 'one_sub.json'
        }).as('getOneSub')
        
        cy.visit('http://localhost:5173')
        cy.get(':nth-child(9) > .subLink > img').click()
        cy.wait('@getAllSubs')
        cy.wait('@getOneSub')
    })

    it('is the correct URL', () => {
        cy.url().should('contain', 'http://localhost:5173/1')
    });

    it('displays the subscription title on page load', () => {
        cy.get('h1').should('have.text', 'Matcha Tea')
    })

    it('displays the 3 teas that you get in the subscription along with with their title and the subscription image', () => {
        cy.get('.teas').children().should('have.length', 3)
        cy.get(':nth-child(1) > h3').should('be.visible')
        cy.get(':nth-child(1) > img').should('be.visible')
        cy.get(':nth-child(3) > h3').should('be.visible')
        cy.get(':nth-child(3) > img').should('be.visible')
    })

    it('should display the tea detaisl for each one in the subscription', () => {
        cy.get('.teas > :nth-child(1) > :nth-child(3)').should('be.visible')
        cy.get('.teas > :nth-child(1) > :nth-child(3)').should('include.text', 'Description')
        cy.get('.teas > :nth-child(1) > :nth-child(4)').should('be.visible')
        cy.get('.teas > :nth-child(1) > :nth-child(4)').should('include.text', 'Recommended Temperature')
        cy.get('.teas > :nth-child(1) > :nth-child(5)').should('be.visible')
        cy.get('.teas > :nth-child(1) > :nth-child(5)').should('include.text', 'Recommended Brew Time')
        cy.get('.teas > :nth-child(3) > :nth-child(3)').should('be.visible')
        cy.get('.teas > :nth-child(3) > :nth-child(3)').should('include.text', 'Description')
        cy.get('.teas > :nth-child(3) > :nth-child(4)').should('be.visible')
        cy.get('.teas > :nth-child(3) > :nth-child(4)').should('include.text', 'Recommended Temperature')
        cy.get('.teas > :nth-child(3) > :nth-child(5)').should('be.visible')
        cy.get('.teas > :nth-child(3) > :nth-child(5)').should('include.text', 'Recommended Brew Time')
    })

    it('displays sub details at the bottom of the page', () => {
        cy.get('.subDetails').should('be.visible')
        cy.get('.subDetails > :nth-child(1)').should('be.visible')
        cy.get('.subDetails > :nth-child(1)').should('include.text', 'Description')
        cy.get('.subDetails > :nth-child(2)').should('be.visible')
        cy.get('.subDetails > :nth-child(2)').should('include.text', 'Price')
        cy.get('.subDetails > :nth-child(3)').should('be.visible')
        cy.get('.subDetails > :nth-child(3)').should('include.text', 'Users Subscribed')
    })

    it('displays back to home button on page load, and bring you back to home', () => {
        cy.get('.backButton').should('have.text', 'Back To Home')
        cy.get('.backButton').click({ force: true })
        cy.url().should('contain', 'http://localhost:5173')
    })
})