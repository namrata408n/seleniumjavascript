const { driver, By, until } = require('selenium-webdriver');

class HomePage {
    constructor(driver) {
        this.driver = driver;
        // this.loginSignUpLink = By.xpath("//a[normalize-space()='Signup / Login']");
        // this.contactUsLink = By.xpath("//a[normalize-space()='Contact us']");
        this.deleteAccountLink = By.xpath("//a[normalize-space()='Delete Account']");

        this.homeLink = By.css('ul.nav > li > a[href="/"]');
        this.productsLink = By.css('ul.nav > li > a[href="/products"]');
        this.cartLink = By.css('ul.nav > li > a[href="/view_cart"]');
        this.loginSignUpLink = By.css('ul.nav > li > a[href="/login"]');
        this.testCasesLink = By.css('ul.nav > li > a[href="/test_cases"]');
        this.apiTestingLink = By.css('ul.nav > li > a[href="/api_list"]');
        this.videoTutorialsLink = By.css('ul.nav > li > a[href^="https://www.youtube.com"]');
        this.contactUsLink = By.css('ul.nav > li > a[href="/contact_us"]');
        this.continueButton = By.xpath("//a[@data-qa = 'continue-button']");
    }

    async clickLoginSignUpLink() {
        await this.driver.wait(until.elementLocated(this.loginSignUpLink), 10000);
        await this.driver.findElement(this.loginSignUpLink).click();
    }

    async clickContactUsLink() {
        await this.driver.findElement(this.contactUsLink).click();
    }

    async clickDeleteAccountLink() {
        await this.driver.wait(until.elementLocated(this.deleteAccountLink), 10000);
        await this.driver.findElement(this.deleteAccountLink).click();
    }

    async clickContinueButton(){
        await this.driver.wait(until.elementLocated(this.continueButton), 10000);
        await this.driver.findElement(this.continueButton).click();
    }
}

module.exports = HomePage;