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
        cy.get('.subData').click()
        cy.wait('@getAllSubs')
        cy.wait('@getOneSub')
    })

    it('is the correct URL', () => {
        cy.url().should('contain', 'http://localhost:5173/1/subscriber_data')
    });

    it('displays the Susbcriber Data title on page load', () => {
        cy.get('h1').should('have.text', 'Subscriber Data')
    })

    it('displays all the subscribed users along with their name, email, and status', () => {
        cy.get('.subsView').children().should('have.length', 6)
        cy.get('.subsView > :nth-child(1) > :nth-child(2)').should('be.visible')
        cy.get('.subsView > :nth-child(1) > :nth-child(2)').should('include.text', 'Name')
        cy.get('.subsView > :nth-child(1) > :nth-child(3)').should('be.visible')
        cy.get('.subsView > :nth-child(1) > :nth-child(3)').should('include.text', 'Email')
        cy.get('.subsView > :nth-child(1) > :nth-child(4)').should('be.visible')
        cy.get('.subsView > :nth-child(1) > :nth-child(4)').should('include.text', 'Status')
        cy.get(':nth-child(6) > :nth-child(2)').should('be.visible')
        cy.get(':nth-child(6) > :nth-child(2)').should('include.text', 'Name')
        cy.get(':nth-child(6) > :nth-child(3)').should('be.visible')
        cy.get(':nth-child(6) > :nth-child(3)').should('include.text', 'Email')
        cy.get(':nth-child(6) > :nth-child(4)').should('be.visible')
        cy.get(':nth-child(6) > :nth-child(4)').should('include.text', 'Status')
    })

    it('displays a subscribe or unsibscribe button depending on status', () => {
        cy.get('.subsView > :nth-child(1) > :nth-child(4)').should('have.text', 'Status: Subscribed')
        cy.get('.subsView > :nth-child(1) > button').should('include.text', 'Unsubscribe')
        cy.get(':nth-child(3) > :nth-child(4)').should('have.text', 'Status: Not Subscribed')
        cy.get(':nth-child(3) > button').should('include.text', 'Subscribe')
    })

    it('updates subscription status when you click the subscribe/unsubscribe button' , () => {
        cy.intercept('PATCH', '/api/v1/subscriptions/1/subscription_customers/52', {
            statusCode: 200,
            fixture: 'update_status.json'
        }).as('updateStatus');

        cy.intercept('GET', 'http://localhost:3000/api/v1/subscriptions/1', {
            statusCode: 200,
            fixture: 'updated_sub.json'
        }).as('getNewSub')

        cy.get('.subsView > :nth-child(1) > :nth-child(4)').should('have.text', 'Status: Subscribed')
        cy.get('.subsView > :nth-child(1) > button').click()
        cy.wait('@updateStatus')
        cy.wait('@getNewSub')
        cy.get('.subsView > :nth-child(1) > :nth-child(4)').should('have.text', 'Status: Not Subscribed')
    })

    it('displays back to home button on page load, and bring you back to Subscription view', () => {
        cy.get('.backButton').click({ force: true })
        cy.url().should('contain', 'http://localhost:5173/1')
    })
})