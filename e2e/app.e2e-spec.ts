import { AngularSplitPage } from './app.po';

describe('angular-split App', function() {
  let page: AngularSplitPage;

  beforeEach(() => {
    page = new AngularSplitPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
