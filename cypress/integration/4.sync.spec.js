/// <reference types="Cypress" />

import { moveGutter, checkSplitDirAndSizes } from '../support/splitUtils'

context('Sync splits example page tests', () => {
  const W = 1070
  const H = 300
  const GUTTER = 11

  beforeEach(() => {
    cy.visit('/examples/sync-split')
  })

  it('Display initial state', () => {
    checkSplitDirAndSizes('.split-example > as-split', 'vertical', W, H, GUTTER, [55.59375, 55.59375, 166.796875])
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [264.75, 794.25],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [264.75, 794.25],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [264.75, 794.25],
    )
  })

  it('Move gutter first split horizontally and check if others splits follow', () => {
    moveGutter('.split-example > as-split > .as-split-area:nth-child(1) > as-split > .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [544.75, 514.25],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [544.75, 514.25],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [544.75, 514.25],
    )

    moveGutter('.split-example > as-split > .as-split-area:nth-child(1) > as-split > .as-split-gutter', 0, 600, 0)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [1059, 0],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [1059, 0],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [1059, 0],
    )

    moveGutter('.split-example > as-split > .as-split-area:nth-child(1) > as-split > .as-split-gutter', 0, -1500, 0)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [0, 1059],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [0, 1059],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [0, 1059],
    )
  })

  it('Move gutter second split horizontally and check if others splits follow', () => {
    moveGutter('.split-example > as-split > .as-split-area:nth-child(2) > as-split > .as-split-gutter', 0, 280, 0)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [544.75, 514.25],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [544.75, 514.25],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [544.75, 514.25],
    )

    moveGutter('.split-example > as-split > .as-split-area:nth-child(2) > as-split > .as-split-gutter', 0, 600, 0)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [1059, 0],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [1059, 0],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [1059, 0],
    )

    moveGutter('.split-example > as-split > .as-split-area:nth-child(2) > as-split > .as-split-gutter', 0, -1500, 0)
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(1) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [0, 1059],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(2) > as-split',
      'horizontal',
      W,
      55.59375,
      GUTTER,
      [0, 1059],
    )
    checkSplitDirAndSizes(
      '.split-example > as-split > .as-split-area:nth-child(3) > as-split',
      'horizontal',
      W,
      166.796875,
      GUTTER,
      [0, 1059],
    )
  })
})
