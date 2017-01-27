import { AngularSplitDemoWebsitePage } from './app.po';

describe('angular-split-demo-website App', function() {
  let page: AngularSplitDemoWebsitePage;

  beforeEach(() => {
    page = new AngularSplitDemoWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
