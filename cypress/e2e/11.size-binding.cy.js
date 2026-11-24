/// <reference types="Cypress" />

import { moveGutterByMouse, moveGutterByKeyboard } from '../support/splitUtils'

context('Area size two-way binding', () => {
  beforeEach(() => {
    cy.visit('/examples/simple-split')
  })

  it('updates the parent size while dragging, before dragEnd', () => {
    cy.get('.ex-percent .as-split-gutter')
      .trigger('mousedown', { button: 0, clientX: 0, clientY: 0 })
      .trigger('mousemove', { clientX: 20, clientY: 0 })
      .trigger('mousemove', { clientX: 120, clientY: 0 })

    cy.get('.ex-percent as-split-area').first().find('h5').eq(1).should('not.contain.text', '30%')
    cy.document().trigger('mouseup', { force: true })
  })

  it('keeps parent sizes and layout in sync over consecutive drags', () => {
    moveGutterByMouse('.ex-percent .as-split-gutter', 0, 120, 0)
    moveGutterByMouse('.ex-percent .as-split-gutter', 0, -60, 0)

    cy.get('.ex-percent as-split-area').then(($areas) => {
      const widths = [...$areas].map((area) => area.getBoundingClientRect().width)
      const total = widths[0] + widths[1]
      $areas.each((index, area) => {
        const value = parseFloat(area.querySelectorAll('h5 b')[1].textContent)
        expect(value).to.be.closeTo((widths[index] / total) * 100, 0.1)
      })
    })
  })

  it('updates bound sizes with keyboard resizing in both directions', () => {
    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'rightarrow')
    cy.get('.ex-percent as-split-area').first().find('h5').eq(1).should('not.contain.text', '30%')
    cy.get('.btns > .btn').click()
    moveGutterByKeyboard('.ex-percent .as-split-gutter', 0, 1, 'downarrow')
    cy.get('.ex-percent as-split-area').first().find('h5 b').eq(1).invoke('text').then(parseFloat).should('be.gt', 30)
  })

  it('preserves wildcard sizes and reports pixel sizes', () => {
    moveGutterByMouse('.ex-pixel .as-split-gutter', 0, 80, 0)
    cy.get('.ex-pixel as-split-area').eq(0).find('h5').eq(1).should('contain.text', '200px')
    cy.get('.ex-pixel as-split-area').eq(1).find('h5').eq(1).should('contain.text', '*')
  })

  it('updates sizes during a touch gesture', () => {
    cy.get('.ex-percent .as-split-gutter').then(($gutter) => {
      const gutter = $gutter[0]
      const win = gutter.ownerDocument.defaultView
      const rect = gutter.getBoundingClientRect()
      const sendTouch = (type, offset) => {
        const touch = new win.Touch({
          identifier: 1,
          target: gutter,
          clientX: rect.x + rect.width / 2 + offset,
          clientY: rect.y + rect.height / 2,
        })
        gutter.dispatchEvent(
          new win.TouchEvent(type, {
            bubbles: true,
            cancelable: true,
            touches: type === 'touchend' ? [] : [touch],
            changedTouches: [touch],
          }),
        )
      }
      sendTouch('touchstart', 0)
      sendTouch('touchmove', 20)
      sendTouch('touchmove', 100)
      sendTouch('touchend', 100)
    })
    cy.get('.ex-percent as-split-area').first().find('h5 b').eq(1).invoke('text').then(parseFloat).should('be.gt', 30)
  })
})

context('Partial and signal size bindings', () => {
  beforeEach(() => {
    cy.visit('/examples/size-binding')
  })

  function checkPartialWidths(expected) {
    cy.get('.binding-partial as-split-area').should(($areas) => {
      const widths = [...$areas].map((area) => area.getBoundingClientRect().width)
      const total = widths.reduce((sum, width) => sum + width, 0)
      widths.forEach((width, index) => expect((width / total) * 100).to.be.closeTo(expected[index], 0.1))
    })
  }

  it('keeps unbound neighbors stable when a signal receives size changes', () => {
    checkPartialWidths([20, 30, 50])
    moveGutterByMouse('.binding-partial .as-split-gutter', 0, 100, 0)
    cy.get('.partial-value').invoke('text').then(parseFloat).should('be.gt', 20)
    cy.get('.partial-value')
      .invoke('text')
      .then((value) => {
        const size = parseFloat(value)
        checkPartialWidths([size, 50 - size, 50])
      })
    moveGutterByMouse('.binding-partial .as-split-gutter', 0, -50, 0)
    cy.get('.partial-value')
      .invoke('text')
      .then((value) => {
        const size = parseFloat(value)
        checkPartialWidths([size, 50 - size, 50])
      })
  })

  it('allows a parent reset after resizing without emitting another change', () => {
    moveGutterByMouse('.binding-partial .as-split-gutter', 0, 100, 0)
    cy.get('.change-count')
      .invoke('text')
      .then((count) => {
        cy.get('.reset-sizes').click()
        cy.get('.partial-value').should('have.text', '20')
        cy.get('.change-count').should('have.text', count)
        checkPartialWidths([20, 30, 50])
      })
  })

  it('preserves the derived neighbor and its parent property', () => {
    moveGutterByMouse('.binding-derived .as-split-gutter', 0, 100, 0)
    cy.get('.binding-derived as-split-area').should(($areas) => {
      const left = $areas[0].getBoundingClientRect().width
      const right = $areas[1].getBoundingClientRect().width
      const size = parseFloat(Cypress.$('.derived-value').text())
      expect(size).to.be.closeTo((left / (left + right)) * 100, 0.1)
    })
    cy.get('.reset-sizes').click()
    cy.get('.derived-value').should('have.text', '30')
  })

  it('respects size constraints and does not emit for a blocked movement', () => {
    moveGutterByMouse('.binding-partial .as-split-gutter', 0, -1000, 0)
    cy.get('.partial-value').should('have.text', '10')
    checkPartialWidths([10, 40, 50])
    cy.get('.change-count')
      .invoke('text')
      .then((count) => {
        moveGutterByMouse('.binding-partial .as-split-gutter', 0, -100, 0)
        cy.get('.change-count').should('have.text', count)
      })
  })

  it('recomputes layout when an area is hidden and restored', () => {
    moveGutterByMouse('.binding-partial .as-split-gutter', 0, 100, 0)
    cy.get('.change-count')
      .invoke('text')
      .then((count) => {
        cy.get('.toggle-last').click()
        cy.get('.binding-partial as-split-area').eq(2).should('have.class', 'as-hidden')
        cy.get('.toggle-last').click()
        cy.get('.reset-sizes').click()
        cy.get('.change-count').should('have.text', count)
        checkPartialWidths([20, 30, 50])
      })
  })
})
