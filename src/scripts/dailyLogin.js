"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var selenium_webdriver_1 = require("selenium-webdriver");
var chrome = require("selenium-webdriver/chrome"); // Correct import without .js
var dotenv_1 = require("dotenv");
var fs_1 = require("fs");
// Load environment variables
dotenv_1.default.config();
console.log("🚀 Starting dailyLoginAutomation...");
console.log("Username from .env:", process.env.VITE_GREYTHR_USERNAME);
function dailyLoginAutomation() {
    return __awaiter(this, void 0, void 0, function () {
        var chromeOptions, driver, loginurl, username, password, usernameInput, passwordInput, loginButton, _a, _b, _c, _d, btnContainer, gtButtons, dailyButton, _i, gtButtons_1, btn, shade, error_1, message, screenshot, screenshotError_1;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    chromeOptions = new chrome.Options().addArguments('--start-maximized');
                    console.log("🛠️ Building WebDriver...");
                    return [4 /*yield*/, new selenium_webdriver_1.Builder()
                            .forBrowser('chrome')
                            .setChromeOptions(chromeOptions) // Pass chromeOptions here
                            .build()];
                case 1:
                    driver = _e.sent();
                    console.log("✅ WebDriver created.");
                    _e.label = 2;
                case 2:
                    _e.trys.push([2, 25, 30, 32]);
                    loginurl = process.env.VITE_GREYTHR_URL;
                    username = process.env.VITE_GREYTHR_USERNAME;
                    password = process.env.VITE_GREYTHR_PASSWORD;
                    if (!loginurl || !username || !password) {
                        throw new Error('Missing credentials in .env file');
                    }
                    // Navigate to login page
                    return [4 /*yield*/, driver.get(loginurl)];
                case 3:
                    // Navigate to login page
                    _e.sent();
                    return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.id('username')), 10000)];
                case 4:
                    usernameInput = _e.sent();
                    return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementIsVisible(usernameInput), 10000)];
                case 5:
                    _e.sent();
                    return [4 /*yield*/, usernameInput.sendKeys(username)];
                case 6:
                    _e.sent();
                    return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.id('password')), 10000)];
                case 7:
                    passwordInput = _e.sent();
                    return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementIsVisible(passwordInput), 10000)];
                case 8:
                    _e.sent();
                    return [4 /*yield*/, passwordInput.sendKeys(password)];
                case 9:
                    _e.sent();
                    return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.xpath("//button[@type='submit' and contains(text(), 'Log in')]")), 10000)];
                case 10:
                    loginButton = _e.sent();
                    return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementIsVisible(loginButton), 10000)];
                case 11:
                    _e.sent();
                    return [4 /*yield*/, loginButton.click()];
                case 12:
                    _e.sent();
                    // Wait for .btn-container after login
                    return [4 /*yield*/, driver.wait(selenium_webdriver_1.until.elementLocated(selenium_webdriver_1.By.css('.btn-container')), 10000)];
                case 13:
                    // Wait for .btn-container after login
                    _e.sent();
                    _b = (_a = driver).wait;
                    _d = (_c = selenium_webdriver_1.until).elementIsVisible;
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.css('.btn-container'))];
                case 14: return [4 /*yield*/, _b.apply(_a, [_d.apply(_c, [_e.sent()]), 10000])];
                case 15:
                    _e.sent();
                    return [4 /*yield*/, driver.findElement(selenium_webdriver_1.By.css('.btn-container'))];
                case 16:
                    btnContainer = _e.sent();
                    return [4 /*yield*/, btnContainer.findElements(selenium_webdriver_1.By.css('gt-button'))];
                case 17:
                    gtButtons = _e.sent();
                    if (gtButtons.length === 0) {
                        console.error("⚠️ Login Error: No gt-button found");
                        return [2 /*return*/];
                    }
                    dailyButton = void 0;
                    _i = 0, gtButtons_1 = gtButtons;
                    _e.label = 18;
                case 18:
                    if (!(_i < gtButtons_1.length)) return [3 /*break*/, 21];
                    btn = gtButtons_1[_i];
                    return [4 /*yield*/, btn.getAttribute("shade")];
                case 19:
                    shade = _e.sent();
                    if (shade && shade.toLowerCase() === "primary") {
                        dailyButton = btn;
                        return [3 /*break*/, 21];
                    }
                    _e.label = 20;
                case 20:
                    _i++;
                    return [3 /*break*/, 18];
                case 21:
                    // Fallback: use first button if primary not found
                    if (!dailyButton) {
                        dailyButton = gtButtons[0];
                    }
                    // Scroll into view and click using JS
                    return [4 /*yield*/, driver.executeScript("arguments[0].scrollIntoView(true);", dailyButton)];
                case 22:
                    // Scroll into view and click using JS
                    _e.sent();
                    return [4 /*yield*/, driver.executeScript("arguments[0].click();", dailyButton)];
                case 23:
                    _e.sent();
                    console.log("✅ Sign In clicked successfully");
                    // Wait after clicking Sign In (adjust as needed)
                    return [4 /*yield*/, driver.sleep(5000)];
                case 24:
                    // Wait after clicking Sign In (adjust as needed)
                    _e.sent();
                    console.log('✅ Successfully logged in and clicked Sign In at', new Date().toISOString());
                    return [3 /*break*/, 32];
                case 25:
                    error_1 = _e.sent();
                    message = error_1 instanceof Error ? error_1.message : String(error_1);
                    console.error("\u274C Automation failed: ".concat(message));
                    _e.label = 26;
                case 26:
                    _e.trys.push([26, 28, , 29]);
                    return [4 /*yield*/, driver.takeScreenshot()];
                case 27:
                    screenshot = _e.sent();
                    fs_1.default.writeFileSync('error_screenshot.png', screenshot, 'base64');
                    return [3 /*break*/, 29];
                case 28:
                    screenshotError_1 = _e.sent();
                    console.error('Could not take screenshot:', screenshotError_1);
                    return [3 /*break*/, 29];
                case 29: throw error_1;
                case 30: return [4 /*yield*/, driver.quit()];
                case 31:
                    _e.sent();
                    return [7 /*endfinally*/];
                case 32: return [2 /*return*/];
            }
        });
    });
}
// Execute the automation and handle errors gracefully
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, dailyLoginAutomation()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.error('Fatal error during automation:', e_1);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
