/// <reference types="Cypress" />

import { moveGutterByMouse, checkSplitDirAndSizes } from '../support/splitUtils'

function checkEventCount({ dragStartCount, dragEndCount, gutterClickCount, gutterDblClickCount, transitionEndCount }) {
  if (dragStartCount !== undefined) {
    cy.get('.logs ul li').filter('.dragStart').should('have.length', dragStartCount)
  }
  if (dragEndCount !== undefined) {
    cy.get('.logs ul li').filter('.dragEnd').should('have.length', dragEndCount)
  }
  if (gutterClickCount !== undefined) {
    cy.get('.logs ul li').filter('.gutterClick').should('have.length', gutterClickCount)
  }
  if (gutterDblClickCount !== undefined) {
    cy.get('.logs ul li').filter('.gutterDblClick').should('have.length', gutterDblClickCount)
  }
  if (transitionEndCount !== undefined) {
    cy.get('.logs ul li').filter('.transitionEnd').should('have.length', transitionEndCount)
  }
}

context('Gutter click example page tests', () => {
  const W = 1070
  const H = 300
  const GUTTER = 10

  beforeEach(() => {
    cy.visit('/examples/gutter-click-roll-unroll')
  })

  it('Display initial state', () => {
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [264, 528, 264])
  })

  it('Click gutters to switch area sizes between 0 and X', () => {
    cy.get('.as-split-gutter').eq(0).click()
    cy.wait(2000)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 792, 264])
    cy.wait(10)

    cy.get('.as-split-gutter').eq(0).click()
    cy.wait(2000)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [264, 528, 264])
    cy.wait(10)

    cy.get('.as-split-gutter').eq(0).click()
    cy.wait(2000)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 792, 264])
    cy.wait(10)

    cy.get('.as-split-gutter').eq(1).click()
    cy.wait(2000)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 1056, 0])
    cy.wait(10)

    cy.get('.as-split-gutter').eq(0).click()
    cy.wait(2000)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [264, 792, 0])
    cy.wait(10)

    cy.get('.as-split-gutter').eq(1).click()
    cy.wait(2000)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [264, 528, 264])
    cy.wait(10)

    cy.get('.logs ul li').filter('.gutterClick').should('have.length', 6)
    // cy.get('.logs ul li').filter('.transitionEnd').should('have.length', 6);
  })

  it('Mix gutter click and dragging', () => {
    // Try move gutter event if disabled
    moveGutterByMouse('.as-split-gutter', 0, -100, 0)
    // gutterClick should be fired same as normal click event since dragging is disabled.
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [264, 528, 264])

    // Enable gutters
    cy.get('.btns button').eq(1).click()

    // Move gutter1
    moveGutterByMouse('.as-split-gutter', 0, -100, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [164, 628, 264])
    cy.wait(10)

    checkEventCount({ dragStartCount: 1, dragEndCount: 1, gutterClickCount: 0, transitionEndCount: 0 })

    // Click gutter1 to close area1
    cy.get('.as-split-gutter').eq(0).click()
    cy.wait(2000)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 792, 264])
    cy.wait(10)

    checkEventCount({ dragStartCount: 1, dragEndCount: 1, gutterClickCount: 1, transitionEndCount: 1 })

    // Click gutter2 to close area3
    cy.get('.as-split-gutter').eq(1).click()
    cy.wait(2000)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 1056, 0])
    cy.wait(10)

    checkEventCount({ dragStartCount: 1, dragEndCount: 1, gutterClickCount: 2, transitionEndCount: 2 })

    // Move gutter2 to enlarge area3
    moveGutterByMouse('.as-split-gutter', 1, -20, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 1036, 20])

    checkEventCount({ dragStartCount: 2, dragEndCount: 2, gutterClickCount: 2, transitionEndCount: 2 })

    // Click gutter2 to close area3
    cy.get('.as-split-gutter').eq(1).click()
    cy.wait(2000)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [0, 1056, 0])
    cy.wait(10)

    checkEventCount({ dragStartCount: 2, dragEndCount: 2, gutterClickCount: 3, transitionEndCount: 3 })

    // Click gutter1 to display area1
    cy.get('.as-split-gutter').eq(0).click()
    cy.wait(2000)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [264, 792, 0])
    cy.wait(10)

    checkEventCount({ dragStartCount: 2, dragEndCount: 2, gutterClickCount: 4, transitionEndCount: 4 })

    // It should fire Click Event on mouseup if the mouse cursor is not moved.
    cy.get('.as-split-gutter').eq(0).trigger('mousedown', { which: 1, clientX: 0, clientY: 0, button: 0 })
    cy.get('.as-split-gutter').eq(0).trigger('mousemove', { which: 1, clientX: 0, clientY: 0 })
    cy.wait(10)
    checkEventCount({ dragStartCount: 2, dragEndCount: 2, gutterClickCount: 4, transitionEndCount: 4 })

    cy.get('.as-split-gutter').eq(0).trigger('mouseup', { which: 1, clientX: 0, clientY: 0 })
    cy.wait(2000)
    checkEventCount({ dragStartCount: 2, dragEndCount: 2, gutterClickCount: 5, transitionEndCount: 5 })

    // It should fire click only when moved inside delta (2 pixels)
    cy.get('.as-split-gutter').eq(0).trigger('mousedown', { which: 1, clientX: 0, clientY: 0, button: 0 })
    cy.get('.as-split-gutter').eq(0).trigger('mousemove', { which: 1, clientX: 1, clientY: 0 })
    cy.wait(10)
    checkEventCount({ dragStartCount: 2, dragEndCount: 2, gutterClickCount: 5, transitionEndCount: 5 })
    cy.get('.as-split-gutter').eq(0).trigger('mouseup', { which: 1, clientX: 0, clientY: 0 })
    cy.wait(20)
    checkEventCount({ dragStartCount: 2, dragEndCount: 2, gutterClickCount: 6, transitionEndCount: 6 })

    // It should fire drag start and end only when moved outside delta (2 pixels)
    cy.get('.as-split-gutter').eq(0).trigger('mousedown', { which: 1, clientX: 0, clientY: 0, button: 0 })
    cy.get('.as-split-gutter').eq(0).trigger('mousemove', { which: 1, clientX: 3, clientY: 0 })
    cy.wait(10)
    checkEventCount({ dragStartCount: 3, dragEndCount: 2, gutterClickCount: 6, transitionEndCount: 6 })
    cy.get('.as-split-gutter').eq(0).trigger('mouseup', { which: 1, clientX: 0, clientY: 0 })
    cy.wait(20)
    checkEventCount({ dragStartCount: 3, dragEndCount: 3, gutterClickCount: 6, transitionEndCount: 6 })
  })

  it('Test double click event', () => {
    // Click 2 times with 100ms delay => +2 CLICK
    cy.get('.as-split-gutter').eq(0).click()
    cy.wait(100)
    cy.get('.as-split-gutter').eq(0).click()

    cy.wait(550)
    cy.get('.logs ul li').filter('.gutterDblClick').should('have.length', 0)
    cy.get('.logs ul li').filter('.gutterClick').should('have.length', 2)

    // Set to 500ms
    cy.get('div.btn-group label').eq(1).click({ force: true })
    cy.wait(100)

    // Click 2 times with 100ms delay => +1 DBLCLICK
    cy.get('.as-split-gutter').eq(0).click()
    cy.wait(100)
    cy.get('.as-split-gutter').eq(0).click()

    cy.wait(550)
    cy.get('.logs ul li').filter('.gutterDblClick').should('have.length', 1)
    cy.get('.logs ul li').filter('.gutterClick').should('have.length', 2)

    // Click 2 times with 250ms delay => +1 DBLCLICK
    cy.get('.as-split-gutter').eq(0).click()
    cy.wait(250)
    cy.get('.as-split-gutter').eq(0).click()

    cy.wait(550)
    cy.get('.logs ul li').filter('.gutterDblClick').should('have.length', 2)
    cy.get('.logs ul li').filter('.gutterClick').should('have.length', 2)

    // Click 2 times with 600ms delay => +2 CLICK
    cy.get('.as-split-gutter').eq(0).click()
    cy.wait(600)
    cy.get('.as-split-gutter').eq(0).click()

    cy.wait(550)
    cy.get('.logs ul li').filter('.gutterDblClick').should('have.length', 2)
    cy.get('.logs ul li').filter('.gutterClick').should('have.length', 4)
  })
})
