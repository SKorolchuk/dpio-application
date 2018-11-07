import { AppPage } from './app.po';
import { browser } from 'protractor';

describe('app', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();
    });

    it('should display login page and login into app', () => {
        page.navigateTo();
        expect(browser.getCurrentUrl()).toContain('/login');
        page.login();
    });

    it('should display hello message', () => {
        page.navigateTo();
        expect(page.getParagraphText()).toEqual('Hello world !');
    });
});
