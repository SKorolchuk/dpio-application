import { browser, by, element } from "protractor";

export class AppPage {
    usernameField = element(by.css('input[formControlName="username"]'));
    passwordField = element(by.css('input[formControlName="password"]'));
    loginButton = element(by.css('button[type="submit"]'));

    constructor() {
        // Forces default language
        this.navigateTo();
        if (!localStorage) {
            return;
        }
        browser.executeScript(() => localStorage.setItem("language", "en-US"));
    }

    navigateTo() {
        return browser.get("/");
    }

    login() {
        this.usernameField.sendKeys("test");
        this.passwordField.sendKeys("123");
        this.loginButton.click();
    }

    getParagraphText() {
        return element(by.css("app-root mat-card-title")).getText();
    }
}
