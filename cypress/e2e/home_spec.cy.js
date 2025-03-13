describe('Home', () => {
    beforeEach(() => {
        cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions', {
            statusCode: 200,
            fixture: 'all_subs.json'
        }).as('getAllSubs')

        // cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions/1', {
        //     statusCode: 200,
        //     fixture: 'one_sub.json'
        // }).as('getOneSub')
        
        cy.visit('http://localhost:5173')
        cy.wait('@getAllSubs')
        // cy.wait('@getOneSub')
    });

    it('is the correct URL', () => {
        cy.url().should('contain', 'http://localhost:5173/')
    });

    it('displays Tea Time on page load', () => {
        cy.get('h1').should('have.text', 'TEA TIME')
    });

    it('displays the customer data button, and tea data buttons', () => {
        cy.get('header').contains('button', 'Customer Data')
        cy.get('header').contains('button', 'Tea Data')
    })

    it('should display all of the subscription posters with their title and image', () => {
        cy.get('.subs').children().should('have.length', 9)
        cy.get(':nth-child(1) > h3').should('be.visible')
        cy.get(':nth-child(1) > .subLink > img').should('be.visible')
        cy.get(':nth-child(9) > h3').should('be.visible')
        cy.get(':nth-child(9) > .subLink > img').should('be.visible')
    })

    it('should bring you to Customer Data view when clicking Customer Data button', () => {
        cy.get('.custData').click()
        cy.url().should('contain', 'http://localhost:5173/customers')
    })

    it('should bring you to Tea Data view when clicking Tea Data button', () => {
        cy.get('.teaData').click()
        cy.url().should('contain', 'http://localhost:5173/teas')
    })
});
