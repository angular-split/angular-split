/// <reference types="Cypress" />

import { moveGutter, checkSplitDirAndSizes } from '../support/splitUtils'

context('Min & max splits example page tests', () => {
  const W = 1070
  const H = 300
  const GUTTER = 30

  beforeEach(() => {
    cy.visit('/examples/min-max-split')
  })

  it('Display initial state', () => {
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [304.796875, 406.390625, 304.796875])

    checkAreasClasses('.ex-percent > as-split > .as-split-area', [
      { haveTo: ['as-max'], notHaveTo: ['as-min'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
    ])

    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [200, 386, 150, 250])

    checkAreasClasses('.ex-pixel > as-split > .as-split-area', [
      { haveTo: ['as-max'], notHaveTo: ['as-min'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: ['as-min', 'as-max'], notHaveTo: [] },
      { haveTo: ['as-min'], notHaveTo: ['as-max'] },
    ])
  })

  it('Move gutters having restrictMove off [PERCENT MODE]', () => {
    moveGutter('.ex-percent > as-split > .as-split-gutter', 0, 200, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [304.796875, 406.390625, 304.796875])

    checkAreasClasses('.ex-percent > as-split > .as-split-area', [
      { haveTo: ['as-max'], notHaveTo: ['as-min'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
    ])

    moveGutter('.ex-percent > as-split > .as-split-gutter', 0, -100, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [204.796875, 506.390625, 304.796875])

    checkAreasClasses('.ex-percent > as-split > .as-split-area', [
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
    ])

    moveGutter('.ex-percent > as-split > .as-split-gutter', 0, -100, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [203.1875, 508, 304.796875])

    checkAreasClasses('.ex-percent > as-split > .as-split-area', [
      { haveTo: ['as-min'], notHaveTo: ['as-max'] },
      { haveTo: ['as-max'], notHaveTo: ['as-min'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
    ])

    moveGutter('.ex-percent > as-split > .as-split-gutter', 1, 100, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [303.203125, 508, 204.796875])

    checkAreasClasses('.ex-percent > as-split > .as-split-area', [
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: ['as-max'], notHaveTo: ['as-min'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
    ])

    moveGutter('.ex-percent > as-split > .as-split-gutter', 1, -100, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [303.203125, 408, 304.796875])

    checkAreasClasses('.ex-percent > as-split > .as-split-area', [
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
    ])

    moveGutter('.ex-percent > as-split > .as-split-gutter', 1, -100, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [303.203125, 308, 404.796875])

    checkAreasClasses('.ex-percent > as-split > .as-split-area', [
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
    ])

    moveGutter('.ex-percent > as-split > .as-split-gutter', 1, -100, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [206.390625, 304.796875, 504.796875])

    checkAreasClasses('.ex-percent > as-split > .as-split-area', [
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: ['as-min'], notHaveTo: ['as-max'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
    ])

    moveGutter('.ex-percent > as-split > .as-split-gutter', 1, -100, 0)
    checkSplitDirAndSizes('.ex-percent > as-split', 'horizontal', W, H, GUTTER, [203.1875, 304.796875, 508])

    checkAreasClasses('.ex-percent > as-split > .as-split-area', [
      { haveTo: ['as-min'], notHaveTo: ['as-max'] },
      { haveTo: ['as-min'], notHaveTo: ['as-max'] },
      { haveTo: ['as-max'], notHaveTo: ['as-min'] },
    ])
  })

  it('Move gutters having restrictMove off [PIXEL MODE]', () => {
    moveGutter('.ex-pixel > as-split > .as-split-gutter', 0, 200, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [200, 386, 150, 250])

    checkAreasClasses('.ex-pixel > as-split > .as-split-area', [
      { haveTo: ['as-max'], notHaveTo: ['as-min'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: ['as-min', 'as-max'], notHaveTo: [] },
      { haveTo: ['as-min'], notHaveTo: ['as-max'] },
    ])

    moveGutter('.ex-pixel > as-split > .as-split-gutter', 0, -100, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [100, 486, 150, 250])

    checkAreasClasses('.ex-pixel > as-split > .as-split-area', [
      { haveTo: ['as-min'], notHaveTo: ['as-max'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: ['as-min', 'as-max'], notHaveTo: [] },
      { haveTo: ['as-min'], notHaveTo: ['as-max'] },
    ])

    moveGutter('.ex-pixel > as-split > .as-split-gutter', 1, 100, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [100, 486, 150, 250])

    checkAreasClasses('.ex-pixel > as-split > .as-split-area', [
      { haveTo: ['as-min'], notHaveTo: ['as-max'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: ['as-min', 'as-max'], notHaveTo: [] },
      { haveTo: ['as-min'], notHaveTo: ['as-max'] },
    ])

    moveGutter('.ex-pixel > as-split > .as-split-gutter', 1, -100, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [100, 386, 150, 350])

    checkAreasClasses('.ex-pixel > as-split > .as-split-area', [
      { haveTo: ['as-min'], notHaveTo: ['as-max'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: ['as-min', 'as-max'], notHaveTo: [] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
    ])

    moveGutter('.ex-pixel > as-split > .as-split-gutter', 2, -100, 0)
    checkSplitDirAndSizes('.ex-pixel > as-split', 'horizontal', W, H, GUTTER, [100, 336, 150, 400])

    checkAreasClasses('.ex-pixel > as-split > .as-split-area', [
      { haveTo: ['as-min'], notHaveTo: ['as-max'] },
      { haveTo: [], notHaveTo: ['as-min', 'as-max'] },
      { haveTo: ['as-min', 'as-max'], notHaveTo: [] },
      { haveTo: ['as-max'], notHaveTo: ['as-min'] },
    ])
  })

  it('Move gutters having restrictMove on [PERCENT MODE]', () => {})

  it('Move gutters having restrictMove on [PIXEL MODE]', () => {})
})

function checkAreasClasses(sel, all) {
  cy.get(sel).then(($areas) => {
    all.forEach((item, index) => {
      checkAreaClasses($areas.eq(index), item.haveTo, item.notHaveTo)
    })
  })
}

function checkAreaClasses($area, haveTo, notHaveTo) {
  console.log('$area, haveTo, notHaveTo', $area, haveTo, notHaveTo)
  haveTo.forEach((cl) => cy.wrap($area).should('have.class', cl))
  notHaveTo.forEach((cl) => cy.wrap($area).should('not.have.class', cl))
}
