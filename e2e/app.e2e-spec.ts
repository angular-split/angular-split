import { TempWebsitePage } from './app.po';

describe('temp-website App', function() {
  let page: TempWebsitePage;

  beforeEach(() => {
    page = new TempWebsitePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
