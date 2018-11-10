/// <reference types="Cypress" />

context('Direction change', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200/#/examples/simple-split')
  })

  it('cy.viewport() - set the viewport size and dimension', () => {
    cy.viewport(800, 600);

    const W = 650;
    const H = 300;
    const GUTTER = 11;

    cy.get('as-split').should('have.css', 'flex-direction', 'row');
    cy.get('as-split-area[size="30"]').should('have.css', 'height', `${ H }px`);
    cy.get('as-split-area[size="30"]').should('have.css', 'flex', '0 0 calc(-3.3px + 30%)');
    cy.get('as-split-area[size="70"]').should('have.css', 'height', `${ H }px`);
    cy.get('as-split-area[size="70"]').should('have.css', 'flex', '0 0 calc(-7.7px + 70%)');

    cy.get('.btns > .btn').click();

    cy.get('as-split').should('have.css', 'flex-direction', 'column');
    cy.get('as-split-area[size="30"]').should('have.css', 'width', `${ W }px`);
    cy.get('as-split-area[size="30"]').should('have.css', 'flex', '0 0 calc(-3.3px + 30%)');
    cy.get('as-split-area[size="70"]').should('have.css', 'width', `${ W }px`);
    cy.get('as-split-area[size="70"]').should('have.css', 'flex', '0 0 calc(-7.7px + 70%)');
  })
})

