const { Builder, until, By } = require('selenium-webdriver');
const { assert } = require('chai');
const HomePage = require('../pages/HomePage');
const LoginSignUpPage = require('../pages/LoginSignUpPage');
const AccountInformationPage = require('../pages/AccountInformationPage');

describe('User Tegistration Test Suite', function () {
    let driver, homePage, loginSignupPage, accountInformationPage;
    console.log('Test Suite Started');
    it('Should register a new user', async () => {
        console.log('Test Case Started');
        driver = await new Builder().forBrowser('chrome').build();
        await driver.manage().window().maximize();
        await driver.get('https://automationexercise.com/');
        
        homePage = new HomePage(driver);
        loginSignupPage = new LoginSignUpPage(driver);
        accountInformationPage = new AccountInformationPage(driver);
        
        await homePage.clickLoginSignUpLink();
        let newUserSignUpPresent = await loginSignupPage.isNewUserSignUpLabelPresent();
        assert.isTrue(newUserSignUpPresent);
        await loginSignupPage.signup('Namrata', 'namrata@email.com');
        let accountInfoLabelPresent =await accountInformationPage.isAccountInfoLabelPresent();
        assert.isTrue(accountInfoLabelPresent);

        let userDetails = {
            title: 'Mrs.', 
            name: 'Namrata Sakpal', 
            password: 'Password123', 
            day: 1, 
            month: 'January', 
            year: 1995,
            firstName: 'Namrata', 
            lastName: 'Sakpal', 
            company: 'IWAY', 
            address1: 'Prestige Shantiniketan', 
            address2: 'Whitefield', 
            country: 'India', 
            state: 'Karnataka', 
            city: 'Bangalore', 
            zipcode: '560068', 
            mobile: '8956231245'
        };

        await accountInformationPage.createAccount(userDetails);
        //await accountInformationPage.fillAddressDetails('Namrata', 'Sakpal', 'IWAY', 'Kadugodi', 'Whitefield', 'India', 'Karnataka', '560067', '9876543210');
        let accountCreatedLabelPresent = await accountInformationPage.isAccountCreatedLabelPresent();
        assert.isTrue(accountCreatedLabelPresent);

        await accountInformationPage.clickContinueButton();
        await homePage.clickDeleteAccountLink();

        driver.quit()
    })

})