/// <reference types="Cypress" />

import { moveGutter, checkSplitDirAndSizes } from '../support/splitUtils'


context('Custom split style example page tests', () => {
    const W = 1070;
    const H = 300;
    const GUTTER = 35;
    const COLOR = 'rgb(255, 255, 0)';
    const IMGH = `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABsAAAAjCAYAAABl/XGVAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANkSURBVEiJrddfaJdlFAfwzztda6tdZNo/pZstWlmhSy8siiwhGfQP3IWRIGUEJRgFQXTbZRBeFBhlBv25iFD6s4zCqI0GaWXEhNK5tTCUsJGUWQtOF++zeH7vfnO/3/JcPef7nOd8z3ne5znPeWlCgi3BeHAieDoomlnfDNGy4HBwabAoGAieOReOW4Lu4IIMuyd4LdMXBceCJY36bamXAb7C2/g+eC5YgFPonLYr+DXZ3J/WtQZ9wfrgvEazejHYmsbtwa7g1eDC4OegPbNdGXwdtAXDwVvBm8Fg0DpnZliMsRT9n9iCbmzAPtybZfeNMutnMVawsSgz/QmbGsnsoeD1CrYs+DHYFuytzD0RTAWPZtiGYGcjZK3BgaC/gvcFI+nYL60EEsGTGbYq+CRYF7wQPBWcPxthV8qkq4K/FJwJNmdYWyLbnmGXBKeD74L7gpeDV86WYX+wP2jLsDuS460V26lgT6YXiWxV0tuDk/UOCCjKYz2OuzN4EL+ho2L+Oy6qXe54wYGkT1H/NOayG32Zh7/xkez4JzmN/Zl+PX7J9CsxMRfZXtwZtUG9X4fsD3yW6bfgaKZ3YfSsZKlKjEp7n2RA9h2TnMJQpt+sNtPuOcky5+uzAE5ipGIzVjCZ6V3YQXlY8DDea4RsBFdVsOHpQdriLzL9Guwqyq2lvK/HC4YEPcGHwQdR7nWNBL3BpxWsJRsvqLwOj0/XxTR3KOidnvw42BTcFoxWCYOlwaEGdmDaviMbb47yCv0HTGaRrA2+rCy+Lvi2UbJs3ZJgLOipIasYHQmuyPT+4I15kO0OtlXBo8HFFaPbg4XBAym6m+ZBdiTK56oG3BusyfTH0kcdD3YGy5slSn5ORPXFDrbnVTxhq/Ns50HUGeUDWiML8QOuzsGi9vbPR1aoc4JblIV1Y6TG5RzJGtnFr5H02g4HO2bs8zwk2BOsO5tBWyIbCi7/H0RFlP1kZyPGD6brMKN0NUjWE2Xf2fCCG1N0i+e2nrH2keD5enN1q35RRvYu7mqWDLfi84bJkgxi9TzIenGwWbIJWX/YhFyGY82SjeHaqNOzzybBSkymxqg5SaXsYJQt+fIo+/p8viNYkd6td4KJYO1s/ub8c0wVvx83KJ/8FuXF/wdncFhZmgawr+Cv2Xz9Cy1ParntgE8FAAAAAElFTkSuQmCC")`;
    const IMGV = `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAdCAYAAAAgqdWEAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAOxAAADsQBlSsOGwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOxSURBVEiJtddtzNdTGAfwz7+6y91qKpaGF0UjY8JmrIw1sdj0YFMeMzYLJWaUmac1bfQiw0hkkjErTy+whrARm0zztHmYp3mayjyFkny9+J3bfv7uf3e3/p03v3Od872u8z3Xua7rnB9tamFQmB1eDhvC7+G7sCZcHw5u11o9ETkmPBBODgeGjtBZ+qeEZWFjeCKM2Z1ExodN4eKwPBzdAtc/XB6+DbPbsfCwcEI5jqXhvfBLeCacFfrvhI2R4f1wW2jU5xotFPrhMIwt38PLd198ibexHi9hbYM/ermp4ViD1Q2ubgU6LjwafgwJH4cHw5XhxDCsN4v2QGifEuDTmic6wpJC4KewIBzSwkiPR9ELQqeH7/+1ybCoEFka9qqNd4ZTwx0lZW8Pg9tFpqzxdLilSzggbA831gATwqrC+vkwP4xuJ4naWhPD5jBIuDG8HfqGGaW/KkwJA5sURxV822pFaISPwpmNsBq/YgS2YVaDD+tgnIQ5GIXzG7y1iwQGNNhak+9Dp/BpiZcVoW8NMDjMDR+UenJuSfldbs0ZFC4K65XsWd+1UBgabi3p/UqYXC9O4YhwXbghdPxPMvPCkTV5fPhFqaCTyuBp4ZvwQji2ycDk8E54N8xpjqdekrkszKrJR4Ytwlep7o1zwp+p7o+6J4aEx8I9qarwLrfimcU1eVL4vB9+wBDcjXkNbq+B9sMjuKJRlf92tYH4syaPwzrhs+KNN5o8MrSk+fFtJNFle3mYX/qdJYlmCJ8UQjObFFaEle0mUmx/HMaFPqneQe+GDiVYE/avgSeEv8IRO2m8IxwVLgn3hyk7wB4Tfk715Fib6lV4aNfkveHzJoVnw3M9LD41LA6vht/Khr4MN4XOFnqN2ua/CHemepb8A7gmrK3JI4pXprYwODJV+V4TFtZInB36tNpA0V0YtpQC+t+3VJge3qzJ0wrrvt1gO8K6cs57hNfDi6nd9C1IDC0xuK3VJruAo4snpoc9w5Ph2hbY21JdDQPCXeWI9tiB7WHF8xtSVfTWRGpKTxV3p7hxeDeYS0tsjC1BuDHs08LeQYXs5lTPkEWtsN0pd4bVhczD3cxflao6n1fkh8KCbnBjUv2ObE91r81sFcw9Edq7kJlaGxseVoat4cLa+DvN6ZvqV2VLOcaJvSbQDaGvS0BOS3UrbyqZM74J91q4uSZfUDby+I5iqLdkJqSqyNtTPSvmhgHd4OaWzFiWqtZsLTVjh6m9W1qqMr6kBPRH4Yx22P0bNcolauCjiTYAAAAASUVORK5CYII=")`
    
    beforeEach(() => {
        cy.visit('/#/examples/custom-gutter-style')
    })

    it('Veriy gutter size color and horizontal image', () => {
        checkSplitDirAndSizes('as-split', 'horizontal', W, H, GUTTER, [311, 724]);

        cy.get('as-split > .as-split-gutter').should('have.css', 'background-color', COLOR);
        cy.get('as-split > .as-split-gutter > .as-split-gutter-icon').should('have.css', 'background-image', IMGH);
    })

    it('Change direction', () => {
        cy.get('.btns > .btn').click();
        checkSplitDirAndSizes('as-split', 'vertical', W, H, GUTTER, [80, 185]);

        cy.get('as-split > .as-split-gutter').should('have.css', 'background-color', COLOR);
        cy.get('as-split > .as-split-gutter > .as-split-gutter-icon').should('have.css', 'background-image', IMGV);
    })
    
})
