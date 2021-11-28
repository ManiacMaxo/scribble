describe('Create Lobby', () => {
    it('Opens create lobby page', () => {
        cy.visit('http://localhost:3000/')
        cy.get('input').type('Test name')

        cy.contains('Create lobby').click()
        cy.url().should('include', '/create')

        cy.get('#time').click()
        cy.get('#time').within(() => {
            cy.contains('45').click()
        })

        cy.get('#rounds').click()
        cy.get('#rounds').within(() => {
            cy.contains('2 rounds').click()
        })

        cy.get('input[type=number]').type('{backspace}3')
        cy.get('input[type=checkbox]').click({ force: true })

        cy.get('button[type=submit]').click()

        cy.get('input').should(($input) => {
            const val = $input.val()

            expect(val).to.match(
                /^(?:https?\:\/\/)?(?:[\w|\.]+)(?:\:\d+)?(?:\/play\/)(?:\w{0,5})/
            ) // match link with /play/{five characters}
        })
    })
})
