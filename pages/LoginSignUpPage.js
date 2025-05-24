const { By, until } = require('selenium-webdriver');

class LoginSignUpPage {
  constructor(driver) {
    this.driver = driver;

    // Login form elements
    this.loginEmail = By.css('[data-qa="login-email"]');
    this.loginPassword = By.css('[data-qa="login-password"]');
    this.loginButton = By.css('[data-qa="login-button"]');

    // Signup form elements
    this.newUserSignupLabel = By.xpath("//h2[text()='New User Signup!']");
    this.signupName = By.css('[data-qa="signup-name"]');
    this.signupEmail = By.css('[data-qa="signup-email"]');
    this.signupButton = By.css('[data-qa="signup-button"]');
  }

  async isNewUserSignUpLabelPresent(){
    await this.driver.wait(until.elementLocated(this.newUserSignupLabel), 10000);
    let elementCount = await this.driver.findElements(this.newUserSignupLabel);
    if(elementCount.length > 0)
        return true;
    else
        return false;
  }

  // Login actions
  async enterLoginEmail(email) {
    await this.driver.findElement(this.loginEmail).sendKeys(email);
  }

  async enterLoginPassword(password) {
    await this.driver.findElement(this.loginPassword).sendKeys(password);
  }

  async clickLoginButton() {
    await this.driver.findElement(this.loginButton).click();
  }

  async login(email, password) {
    await this.enterLoginEmail(email);
    await this.enterLoginPassword(password);
    await this.clickLoginButton();
  }

  // Signup actions
  async enterSignupName(name) {
    await this.driver.findElement(this.signupName).sendKeys(name);
  }

  async enterSignupEmail(email) {
    await this.driver.findElement(this.signupEmail).sendKeys(email);
  }

  async clickSignupButton() {
    await this.driver.findElement(this.signupButton).click();
  }

  async signup(name, email) {
    await this.enterSignupName(name);
    await this.enterSignupEmail(email);
    await this.clickSignupButton();
  }
}

module.exports = LoginSignUpPage;
