/// <reference types="Cypress" />

import { moveGutterByMouse, checkSplitDirAndSizes } from '../support/splitUtils'

context('Geek demo example page tests', () => {
  const W = 1076
  const H = 300
  const GUTTER = 11

  beforeEach(() => {
    cy.visit('/examples/geek-demo')
  })

  it('Display initial state', () => {
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [263.5, 527, 263.5])
    cy.get('.opts-area div[draggable="true"]').should('have.length', 3)
  })

  it('Change direction / width / height / gutter size', () => {
    cy.get('.opts-prop .btn').contains('vertical').click()
    checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, H, GUTTER, [69.5, 139, 69.5])

    cy.get('.opts-prop .btn').contains('400').click()
    checkSplitDirAndSizes('.split-example > as-split', 'vertical', 400, H, GUTTER, [69.5, 139, 69.5])

    cy.get('.opts-prop .btn').contains('horizontal').click()
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', 400, H, GUTTER, [94.5, 189, 94.5])

    cy.get('.opts-prop .btn').contains('600').click()
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', 600, H, GUTTER, [144.5, 289, 144.5])

    cy.get('.opts-prop .btn').contains('200').click()
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', 600, 200, GUTTER, [144.5, 289, 144.5])

    cy.get('.opts-prop .btn').contains('vertical').click()
    checkSplitDirAndSizes('.split-example > as-split', 'vertical', 600, 200, GUTTER, [44.5, 89, 44.5])

    cy.get('.opts-prop .btn').contains('350').click()
    checkSplitDirAndSizes('.split-example > as-split', 'vertical', 600, 350, GUTTER, [82, 164, 82])

    cy.get('.opts-prop .btn').contains('7').click()
    cy.wait(1000)
    checkSplitDirAndSizes('.split-example > as-split', 'vertical', 600, 350, 7, [84, 168, 84])

    cy.get('.opts-prop .btn').contains('horizontal').click()
    cy.get('.opts-prop .btn').contains('22').click()
    cy.wait(1000)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', 600, 350, 22, [139, 278, 139])

    cy.get('.opts-prop').contains('Width:').parent().contains('null').click()
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, 350, 22, [258, 516, 258])
  })

  it('Add areas, move all to limit and change direction / gutter size', () => {
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.wait(1000)

    checkSplitDirAndSizes(
      '.split-example > as-split',
      'horizontal',
      W,
      H,
      GUTTER,
      [124.875, 124.875, 124.875, 124.875, 124.875, 124.875, 124.875, 124.875],
    )
    cy.get('.opts-area div[draggable="true"]').should('have.length', 8)

    cy.get('.opts-prop .btn').contains('vertical').click()
    checkSplitDirAndSizes(
      '.split-example > as-split',
      'vertical',
      W,
      H,
      GUTTER,
      [27.875, 27.875, 27.875, 27.875, 27.875, 27.875, 27.875, 27.875],
    )

    moveGutterByMouse('.as-split-gutter', 0, 0, -200)
    moveGutterByMouse('.as-split-gutter', 1, 0, -200)
    moveGutterByMouse('.as-split-gutter', 2, 0, -200)
    moveGutterByMouse('.as-split-gutter', 3, 0, -200)
    moveGutterByMouse('.as-split-gutter', 4, 0, -200)
    moveGutterByMouse('.as-split-gutter', 5, 0, -200)
    moveGutterByMouse('.as-split-gutter', 6, 0, -200)
    checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, H, GUTTER, [0, 0, 0, 0, 0, 0, 0, 223])

    moveGutterByMouse('.as-split-gutter', 0, 0, 100)
    moveGutterByMouse('.as-split-gutter', 1, 0, 100)
    moveGutterByMouse('.as-split-gutter', 2, 0, 100)
    moveGutterByMouse('.as-split-gutter', 3, 0, 100)
    moveGutterByMouse('.as-split-gutter', 4, 0, 100)
    moveGutterByMouse('.as-split-gutter', 5, 0, 100)
    moveGutterByMouse('.as-split-gutter', 6, 0, 100)
    checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, H, GUTTER, [0, 0, 0, 0, 0, 0, 100, 123])

    moveGutterByMouse('.as-split-gutter', 5, 0, 150)
    moveGutterByMouse('.as-split-gutter', 4, 0, 150)
    moveGutterByMouse('.as-split-gutter', 3, 0, 150)
    moveGutterByMouse('.as-split-gutter', 2, 0, 150)
    moveGutterByMouse('.as-split-gutter', 1, 0, 150)
    moveGutterByMouse('.as-split-gutter', 0, 0, 150)
    checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, H, GUTTER, [100, 0, 0, 0, 0, 0, 0, 123])

    cy.get('.opts-prop .btn').contains('horizontal').click()
    cy.get('.opts-prop .btn').contains('200').click()
    checkSplitDirAndSizes(
      '.split-example > as-split',
      'horizontal',
      W,
      200,
      GUTTER,
      [447.96875, 0, 0, 0, 0, 0, 0, 551.015625],
    )

    cy.get('.opts-area .btn').contains('Add area').click()
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.wait(1000)

    checkSplitDirAndSizes(
      '.split-example > as-split',
      'horizontal',
      W,
      200,
      GUTTER,
      [87.8125, 87.8125, 87.8125, 87.8125, 87.8125, 87.8125, 87.8125, 87.8125, 87.8125, 87.8125, 87.8125],
    )
    cy.get('.opts-area div[draggable="true"]').should('have.length', 11)

    cy.get('.opts-prop .btn').contains('22').click()
    cy.wait(1000)
    checkSplitDirAndSizes(
      '.split-example > as-split',
      'horizontal',
      W,
      200,
      22,
      [77.8125, 77.8125, 77.8125, 77.8125, 77.8125, 77.8125, 77.8125, 77.8125, 77.8125, 77.8125, 77.8125],
    )

    cy.get('.opts-prop .btn').contains('vertical').click()
    checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, 200, 22, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    cy.get('.opts-prop .btn').contains('horizontal').click()
    checkSplitDirAndSizes(
      '.split-example > as-split',
      'horizontal',
      W,
      200,
      22,
      [77.8125, 77.8125, 77.8125, 77.8125, 77.8125, 77.8125, 77.8125, 77.8125, 77.8125, 77.8125, 77.8125],
    )
  })

  it('Add areas, check order, move them and check order', () => {
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.wait(1000)

    checkSplitDirAndSizes(
      '.split-example > as-split',
      'horizontal',
      W,
      H,
      GUTTER,
      [124.875, 124.875, 124.875, 124.875, 124.875, 124.875, 124.875, 124.875],
    )
    cy.get('.opts-area div[draggable="true"]').should('have.length', 8)
    checkAreaOrder()

    moveArea(0, 2)
    checkAreaOrder()

    moveArea(7, -5)
    checkAreaOrder()

    moveArea(7, -7)
    checkAreaOrder()

    moveArea(2, -2)
    checkAreaOrder()

    moveArea(0, 7)
    checkAreaOrder()
  })

  it('Add areas, move them, hide/remove and move again', () => {
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.get('.opts-area .btn').contains('Add area').click()
    cy.wait(1000)

    checkSplitDirAndSizes(
      '.split-example > as-split',
      'horizontal',
      W,
      H,
      GUTTER,
      [170.15625, 170.15625, 170.15625, 170.15625, 170.15625, 170.15625],
    )
    cy.get('.opts-area div[draggable="true"]').should('have.length', 6)
    checkAreaOrder()

    moveArea(4, -3)
    checkAreaOrder()

    cy.get('.opts-area div[draggable="true"]').eq(3).find('button').contains('[visible]').click()
    checkAreaOrder()

    moveArea(3, -2)
    checkAreaOrder()

    cy.get('.opts-area div[draggable="true"]').eq(1).find('button').contains('[visible]').click()
    checkAreaOrder()

    cy.wait(1000)
    checkSplitDirAndSizes(
      '.split-example > as-split',
      'horizontal',
      W,
      H,
      GUTTER,
      [170.15625, 170.15625, 170.15625, 170.15625, 170.15625, 170.15625],
    )
  })

  it('Use gutterStep null / 10 / 50', () => {
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [263.5, 527, 263.5])

    // Move gutter 5px > move 5px
    moveGutterByMouse('.split-example .as-split-gutter', 0, 5, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [268.484375, 522, 263.5])

    ///////////////////////////////////
    // SET gutterStep to 10px
    cy.get('.opts-prop').contains('Gutter step:').parent().contains('10').click()

    // Move gutter 5px > no move
    moveGutterByMouse('.split-example .as-split-gutter', 0, 5, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [268.484375, 522, 263.5])

    // Move gutter 6px > move 10px
    moveGutterByMouse('.split-example .as-split-gutter', 0, 6, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [278.5, 511.984375, 263.5])

    // Move gutter 15px > move 10px
    moveGutterByMouse('.split-example .as-split-gutter', 0, 15, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [288.515625, 501.984375, 263.5])

    // Move gutter 16px > move 20px
    moveGutterByMouse('.split-example .as-split-gutter', 0, 16, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [308.515625, 481.984375, 263.5])

    ///////////////////////////////////
    // SET gutterStep to 50px
    cy.get('.opts-prop').contains('Gutter step:').parent().contains('50').click()

    // Move gutter 20px > nomove
    moveGutterByMouse('.split-example .as-split-gutter', 0, 20, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [308.515625, 481.984375, 263.5])

    // Move gutter 25px > nomove
    moveGutterByMouse('.split-example .as-split-gutter', 0, 25, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [308.515625, 481.984375, 263.5])

    // Move gutter 26px > move 50px
    moveGutterByMouse('.split-example .as-split-gutter', 0, 26, 0)
    checkSplitDirAndSizes('.split-example > as-split', 'horizontal', W, H, GUTTER, [358.515625, 431.96875, 263.5])
  })
})

function checkAreaOrder() {
  // Retrieve all as-split-area displayed in order
  cy.get('.as-split-area').then(($splitAreas) => {
    const splitAreasNum = $splitAreas.map((i, $el) => $el.textContent)

    // Retrieve all listed areas displayed in order
    cy.get('.opts-area div[draggable="true"] .num').then(($controlAreas) => {
      const controlAreasNum = $controlAreas.map((i, $el) => $el.textContent)

      // Compare 2 lists > should be the same
      expect(splitAreasNum.get()).to.deep.eq(controlAreasNum.get())
    })
  })
}

function moveArea(numArea, gap) {
  cy.get('.opts-area div[draggable="true"]')
    .eq(numArea)
    .as('movedItem')
    .get('.opts-area div[draggable="true"]')
    .eq(numArea + gap)
    .as('destItem')
    .get('@movedItem')
    .trigger('dragstart', { dataTransfer: new DataTransfer() })
    .get('@destItem')
    .trigger('dragover', { dataTransfer: new DataTransfer() })
}
