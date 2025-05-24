const { Builder } = require('selenium-webdriver');
const { assert } = require('chai');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginSignUpPage');

describe('User Login Test Suite', function () {
    let driver, homePage, loginPage;

    before(async () => {
        //console.log('Test Suite Started');
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('https://automationexercise.com/');
        homePage = new HomePage(driver);
        loginPage = new LoginPage(driver);
    });

    it('Should login an existing user', async () => {
        console.log('Test Case Started');
        await homePage.clickLoginSignUpLink();
        await loginPage.login('namrata@email.com', 'Password123');

        // Example assertion: Check for some element visible after login
        const isLoggedIn = await homePage.isLogoutLinkPresent(); // You must define this in HomePage
        assert.isTrue(isLoggedIn, 'User should be logged in');
    });

    after(async function () {
        await driver.quit();
        console.log('Test Suite Completed');
    });
});
