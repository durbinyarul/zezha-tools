import { Builder, By, until, WebDriver } from 'selenium-webdriver';
import * as chrome from 'selenium-webdriver/chrome.js';
import * as fs from 'fs/promises';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Enhanced configuration
const config = {
    headless: false,
    implicitWait: 10000,
    pageLoadTimeout: 30000,
    scriptTimeout: 15000,
    screenshotPath: 'error_screenshot.png'
};

// Utility functions
async function takeScreenshot(driver: WebDriver, path: string): Promise<void> {
    try {
        const screenshot = await driver.takeScreenshot();
        await fs.writeFile(path, screenshot, 'base64');
        console.log(`📸 Screenshot saved to ${path}`);
    } catch (error) {
        console.error('⚠️ Failed to take screenshot:', error);
    }
}

async function createDriver(): Promise<WebDriver> {
    console.log("🛠️ Building WebDriver...");
    
    const options = new chrome.Options()
        .addArguments(
            '--start-maximized',
            '--no-sandbox',
            '--disable-dev-shm-usage',
            '--disable-blink-features=AutomationControlled'
        )
        .excludeSwitches('enable-automation');

    if (config.headless) {
        options.addArguments('--headless=new');
    }

    const driver = await new Builder()
        .forBrowser('chrome')
        .setChromeOptions(options)
        .build();

    // Configure timeouts
    await driver.manage().setTimeouts({
        implicit: config.implicitWait,
        pageLoad: config.pageLoadTimeout,
        script: config.scriptTimeout
    });

    console.log("✅ WebDriver created successfully");
    return driver;
}

async function getCredentials(): Promise<{ username: string; password: string }> {
    const username = process.env.REACT_APP_GREYTHR_USERNAME;
    const password = process.env.REACT_APP_GREYTHR_PASSWORD;

    if (!username || !password) {
        throw new Error('Missing credentials in .env file');
    }

    return { username, password };
}

async function login(driver: WebDriver, credentials: { username: string; password: string }): Promise<void> {
    console.log("🌐 Navigating to login page...");
    await driver.get('https://kuwy.greythr.com');

    console.log("🔑 Entering credentials...");
    const usernameInput = await driver.wait(
        until.elementLocated(By.id('username')), 
        config.implicitWait
    );
    await usernameInput.sendKeys(credentials.username);

    const passwordInput = await driver.wait(
        until.elementLocated(By.id('password')),
        config.implicitWait
    );
    await passwordInput.sendKeys(credentials.password);

    console.log("🖱️ Clicking login button...");
    const loginButton = await driver.wait(
        until.elementLocated(By.xpath("//button[@type='submit' and contains(., 'Log in')]")),
        config.implicitWait
    );
    await loginButton.click();
}

async function clickSignIn(driver: WebDriver): Promise<void> {
    console.log("🔄 Waiting for dashboard to load...");
    await driver.wait(
        until.elementLocated(By.css('.btn-container')),
        config.pageLoadTimeout
    );

    console.log("🔍 Locating sign-in button...");
    const btnContainer = await driver.findElement(By.css('.btn-container'));
    const gtButtons = await btnContainer.findElements(By.css('gt-button'));

    if (gtButtons.length === 0) {
        throw new Error('No gt-button elements found');
    }

    // Find primary button or use first available
    let signInButton = gtButtons[0];
    for (const btn of gtButtons) {
        const shade = await btn.getAttribute("shade");
        if (shade?.toLowerCase() === "primary") {
            signInButton = btn;
            break;
        }
    }

    console.log("🖱️ Clicking sign-in button...");
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", signInButton);
    await driver.executeScript("arguments[0].click();", signInButton);
    
    console.log("⏳ Waiting for action to complete...");
    await driver.sleep(5000);
}

async function dailyLoginAutomation(): Promise<void> {
    console.log("🚀 Starting dailyLoginAutomation...");
    let driver: WebDriver;
    driver = await createDriver();
    try {
        // Initialize
     
        const credentials = await getCredentials();
        
        // Execute steps
        await login(driver, credentials);
        await clickSignIn(driver);
        
        console.log('✅ Successfully completed at', new Date().toISOString());
    } catch (error) {
        console.error(`❌ Automation failed: ${error instanceof Error ? error.message : String(error)}`);
        
        if (driver) {
            await takeScreenshot(driver, config.screenshotPath);
        }
        
        throw error;
    } finally {
        if (driver) {
            await driver.quit();
            console.log("🛑 WebDriver terminated");
        }
    }
}

// Main execution
(async () => {
    try {
        await dailyLoginAutomation();
        process.exit(0);
    } catch (error) {
        process.exit(1);
    }
})();