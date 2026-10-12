import { test, expect } from "@playwright/test";
import { AppPage } from "./app.po";

test.describe("Main Application End-to-End Tests", () => {
    let appPage: AppPage;

    test.beforeEach(async ({ page }) => {
        appPage = new AppPage(page);

        // Inject localStorage language token BEFORE any page hits the browser
        await appPage.initLanguage();
    });

    test("should display login page and login into app", async ({ page }) => {
        await appPage.navigateTo();

        // Safe auto-retrying check for redirect. Replaces browser.getCurrentUrl()
        await expect(page).toHaveURL(/.*\/user\/login/);

        // Execute sequential login interaction steps
        await appPage.login();
    });

    test("should display hello message", async () => {
        await appPage.navigateTo();

        // Extract runtime heading value
        const headingText = await appPage.getParagraphText();

        // Perform explicit comparison
        expect(headingText).toEqual("Hello world !");
    });
});
