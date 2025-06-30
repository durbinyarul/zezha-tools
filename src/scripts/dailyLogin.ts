import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome.js';
import chromedriver from 'chromedriver';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import os from 'os';

dotenv.config();

console.log("🚀 Starting dailyLoginAutomation...");
console.log("Username from .env:", process.env.VITE_GREYTHR_USERNAME);

async function dailyLoginAutomation(): Promise<void> {
    // Generate unique temp dir for Chrome profile
    const tmpProfileDir = fs.mkdtempSync(
        path.join(os.tmpdir(), 'chrome-profile-')
    );

    // const chromeOptions = new chrome.Options()
    //     .addArguments('--start-maximized')
    //     .addArguments(`--user-data-dir=${tmpProfileDir}`);


    const chromeOptions = new chrome.Options()
    .addArguments('--headless=new')
    .addArguments('--no-sandbox')
    .addArguments('--disable-dev-shm-usage')
    .addArguments('--window-size=1920,1080')
    .addArguments(`--user-data-dir=${tmpProfileDir}`);

    const serviceBuilder = new chrome.ServiceBuilder(chromedriver.path);

    console.log("🛠️ Building WebDriver...");

    const driver: WebDriver = await new Builder()
        .forBrowser('chrome')
        .setChromeService(serviceBuilder)
        .setChromeOptions(chromeOptions)
        .build();

    console.log("✅ WebDriver created.");

    try {
        const loginurl = process.env.VITE_GREYTHR_URL;
        const username = process.env.VITE_GREYTHR_USERNAME;
        const password = process.env.VITE_GREYTHR_PASSWORD;

        if (!loginurl || !username || !password) {
            throw new Error('Missing credentials in .env file');
        }

        await driver.get(loginurl);
        const usernameInput = await driver.wait(
            until.elementLocated(By.id('username')), 10000
        );
        await driver.wait(
            until.elementIsVisible(usernameInput),
            5000
        );
        await usernameInput.sendKeys(username);
        
        const passwordInput = await driver.wait(
            until.elementLocated(By.id('password')), 10000
        );
        await driver.wait(
            until.elementIsVisible(passwordInput),
            5000
        );
        await passwordInput.sendKeys(password);
        
        const loginButton = await driver.wait(
            until.elementLocated(By.css("button[type='submit']")),
            10000
        );
        await driver.wait(
            until.elementIsVisible(loginButton),
            5000
        );
        await loginButton.click();

        await driver.wait(until.elementLocated(By.css('.btn-container')), 10000);
        const btnContainer = await driver.findElement(By.css('.btn-container'));
        const gtButtons = await btnContainer.findElements(By.css('gt-button'));

        if (gtButtons.length === 0) {
            console.error("⚠️ Login Error: No gt-button found");
            return;
        }

        let dailyButton;
        for (const btn of gtButtons) {
            const shade = await btn.getAttribute("shade");
            if (shade && shade.toLowerCase() === "primary") {
                dailyButton = btn;
                break;
            }
        }

        if (!dailyButton) {
            dailyButton = gtButtons[0];
        }

        await driver.executeScript("arguments[0].scrollIntoView(true);", dailyButton);
        await driver.executeScript("arguments[0].click();", dailyButton);

        console.log("✅ Sign In clicked successfully");
        await driver.sleep(5000);
        console.log('✅ Successfully logged in and clicked Sign In at', new Date().toISOString());
    } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        console.error(`❌ Automation failed: ${message}`);

        try {
            const screenshot = await driver.takeScreenshot();
            fs.writeFileSync('error_screenshot.png', screenshot, 'base64');
        } catch (screenshotError) {
            console.error('Could not take screenshot:', screenshotError);
        }

        throw error;
    } finally {
        await driver.quit();
        console.log("✅ Driver quit.");
    }
}

(async () => {
    try {
        await dailyLoginAutomation();
    } catch (e) {
        console.error('Fatal error during automation:', e);
        process.exit(1);
    }
})();
