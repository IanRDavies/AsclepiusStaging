import { AsclepiusTutoringPage } from './app.po';

describe('asclepius-tutoring App', () => {
  let page: AsclepiusTutoringPage;

  beforeEach(() => {
    page = new AsclepiusTutoringPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
