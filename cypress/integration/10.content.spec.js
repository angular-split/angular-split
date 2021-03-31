/// <reference types="Cypress" />

context('Custom split content example page tests', () => {
  beforeEach(() => {
    cy.visit('/examples/custom-gutter-content')
  })

  it('Verify gutter has custom label', () => {
    cy.wait(1000)
    cy.get('.custom-gutter-content').should('have.text', 'Custom label')
  })

  it('Verify gutter custom label is updated', () => {
    cy.wait(1000)

    cy.get('input:text').type(' updated')
    cy.get('.custom-gutter-content').should('have.text', 'Custom label updated')
  })

  it('Verify gutter button is clicked', () => {
    cy.wait(1000)

    const stub = cy.stub()
    cy.on('window:alert', stub)
    cy.get('.custom-gutter-content > input:button')
      .click()
      .then(() => {
        expect(stub.getCall(0)).to.be.calledWith('I was clicked')
      })
  })
})
