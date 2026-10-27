export type SplitDirection = 'horizontal' | 'vertical'

type RectSize = 'width' | 'height'

function isGutterArray(value: number | readonly number[]): value is readonly number[] {
  return Array.isArray(value)
}

export function moveGutterByMouse(gutters: string, num: number, x: number, y: number): void {
  cy.get(gutters)
    .eq(num)
    .trigger('mousedown', { which: 1, clientX: 0, clientY: 0, button: 0 })
    .trigger('mousemove', { clientX: x * 0.25, clientY: y * 0.25 })
    .trigger('mousemove', { clientX: x * 0.5, clientY: y * 0.5 })
    .trigger('mousemove', { clientX: x * 0.75, clientY: y * 0.75 })
    .trigger('mousemove', { clientX: x, clientY: y })
    .trigger('mouseup')

  cy.document().trigger('mouseup', { force: true })
  cy.document().trigger('click', { force: true })
  cy.wait(10)
}

export function moveGutterByKeyboard(gutters: string, num: number, numKeyPresses: number, keySequence: string): void {
  for (let i = 0; i < numKeyPresses; i++) {
    cy.get(gutters).eq(num).focus().type(`{${keySequence}}`)
    cy.wait(10)
  }
}

export function checkGutterAriaLabel(gutters: string, num: number, ariaLabel: string): void {
  cy.get(gutters).eq(num).should('have.attr', 'aria-label').and('equal', ariaLabel)
}

export function checkGuttersAriaValueTexts(gutters: string, ariaValueTexts: ReadonlyArray<string | null>): void {
  cy.get(gutters).each(($gutter, index) => {
    const ariaValueText = ariaValueTexts[index]
    if (ariaValueText === null) {
      cy.wrap($gutter).should('not.have.attr', 'aria-valuetext')
    } else {
      cy.wrap($gutter).should('have.attr', 'aria-valuetext').and('equal', ariaValueText)
    }
  })
}

//////////////////////////////////////////

export function checkSplitDirAndCalcSizes(
  el: string,
  dir: SplitDirection,
  w: number,
  h: number,
  gutter: number,
  sizes: ReadonlyArray<number | string>,
): void {
  const propFlexDir = dir === 'horizontal' ? 'row' : 'column'
  cy.get(el).should('have.css', 'flex-direction', propFlexDir)

  const propSize: RectSize = dir === 'horizontal' ? 'width' : 'height'
  cy.get(`${el} > .as-split-gutter`).should('have.css', propSize, `${gutter}px`)

  const propSize2: RectSize = propSize === 'width' ? 'height' : 'width'
  const propValue2 = propSize === 'width' ? h : w

  cy.get(`${el} > as-split-area`)
    .should('have.length', sizes.length)
    .each(($li, index) => {
      cy.wrap($li).should('have.css', 'flex', `0 0 ${sizes[index]}`)
      cy.wrap($li).should('have.css', propSize2, `${propValue2}px`)
    })
}

//////////////////////////////////////////

export function checkSplitDirAndSizes(
  el: string,
  dir: SplitDirection,
  w: number,
  h: number,
  gutterOrGutters: number | readonly number[],
  sizes: readonly number[],
): void {
  const gutters = isGutterArray(gutterOrGutters)
    ? gutterOrGutters
    : new Array<number>(sizes.length - 1).fill(gutterOrGutters)

  cy.log(`-- NEW SPLIT CHECK (${dir},${w},${h},[${gutters.join(',')}],[${sizes.join(',')}])`)

  const propGridDir = dir === 'vertical' ? 'grid-template-rows' : 'grid-template-columns'
  cy.get(el).should('have.css', propGridDir).should('include', ' ')

  const propSize: RectSize = dir === 'horizontal' ? 'width' : 'height'
  const propSize2: RectSize = propSize === 'width' ? 'height' : 'width'
  const propValue2 = propSize === 'width' ? h : w

  const round = (value: number): number => Math.round(value * 10) / 10

  cy.get(`${el} > .as-split-gutter`).should('have.length', sizes.length - 1)

  cy.get(`${el} > .as-split-gutter`).each(($el: JQuery<HTMLElement>, index) => {
    const rect = $el[0].getBoundingClientRect()

    expect(rect[propSize]).to.be.eq(gutters[index])
    expect(round(rect[propSize2])).to.be.eq(round(propValue2))
  })

  cy.get(`${el} > .as-split-area`)
    .should('have.length', sizes.length)
    .each(($li: JQuery<HTMLElement>, index) => {
      const rect = $li[0].getBoundingClientRect()

      expect(round(rect[propSize])).to.be.eq(round(sizes[index]))
      expect(round(rect[propSize2])).to.be.eq(round(propValue2))
    })
}
