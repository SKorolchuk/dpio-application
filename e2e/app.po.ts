import { Page, Locator } from "@playwright/test";

export class AppPage {
    private readonly page: Page;
    private readonly usernameField: Locator;
    private readonly passwordField: Locator;
    private readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;

        this.usernameField = page.locator('input[formControlName="username"]');
        this.passwordField = page.locator('input[formControlName="password"]');
        this.loginButton = page.locator('button[type="submit"]');
    }

    /**
     * Initializes local storage and forces the default language before navigation
     */
    async initLanguage(): Promise<void> {
        await this.page.context().addInitScript(() => {
            window.localStorage.setItem("language", "en-US");
        });
    }

    /**
     * Navigates to the root application URL
     */
    async navigateTo(): Promise<void> {
        await this.page.goto("/");
    }

    /**
     * Performs full user authentication flow
     */
    async login(): Promise<void> {
        await this.usernameField.fill("test");
        await this.passwordField.fill("123");
        await this.loginButton.click();
    }

    /**
     * Extracts text from the primary material card title
     */
    async getParagraphText(): Promise<string> {
        return this.page.locator("app-root mat-card-title").innerText();
    }
}
