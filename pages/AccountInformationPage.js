const { By, until } = require('selenium-webdriver');

class AccountInformationPage {
  constructor(driver) {
    this.driver = driver;

    this.enterAccInfoLabel = By.xpath("//b[normalize-space()='Enter Account Information']");
    this.accountCreatedLabel = By.xpath("//h2/b[text()='Account Created!']");
    this.continueButton = By.xpath("//a[text()='Continue']");
    // Title radio buttons
    this.titleMr = By.id('id_gender1');
    this.titleMrs = By.id('id_gender2');

    // Basic account info
    this.nameInput = By.css('[data-qa="name"]');
    this.emailInput = By.css('[data-qa="email"]'); // disabled field, use for validation only
    this.passwordInput = By.css('[data-qa="password"]');

    // DOB dropdowns
    this.dayDropdown = By.css('[data-qa="days"]');
    this.monthDropdown = By.css('[data-qa="months"]');
    this.yearDropdown = By.css('[data-qa="years"]');

    // Checkboxes
    this.newsletterCheckbox = By.id('newsletter');
    this.optinCheckbox = By.id('optin');

    // Address section
    this.firstName = By.css('[data-qa="first_name"]');
    this.lastName = By.css('[data-qa="last_name"]');
    this.company = By.css('[data-qa="company"]');
    this.address1 = By.css('[data-qa="address"]');
    this.address2 = By.css('[data-qa="address2"]');
    this.country = By.css('[data-qa="country"]');
    this.state = By.css('[data-qa="state"]');
    this.city = By.css('[data-qa="city"]');
    this.zipcode = By.css('[data-qa="zipcode"]');
    this.mobileNumber = By.css('[data-qa="mobile_number"]');

    // Submit button
    this.createAccountButton = By.css('[data-qa="create-account"]');
  }

  async clickContinueButton() {
    await this.driver.findElement(this.continueButton).click();
  }

  async isAccountInfoLabelPresent() {
    await this.driver.wait(until.elementLocated(this.enterAccInfoLabel), 10000);
    let elementCount = await this.driver.findElements(this.enterAccInfoLabel);
    if (elementCount.length > 0)
      return true;
    else
      return false;
  }

  async isAccountCreatedLabelPresent() {
    await this.driver.wait(until.elementLocated(this.accountCreatedLabel), 10000);
    let elementCount = await this.driver.findElements(this.accountCreatedLabel);
    if (elementCount.length > 0)
      return true;
    else
      return false;
  }

  // Title selection
  async selectTitle(title) {
    const radio = title === 'Mrs' ? this.titleMrs : this.titleMr;
    await this.driver.findElement(radio).click();
  }

  // Account info methods
  async enterName(name) {
    await this.driver.findElement(this.nameInput).clear();
    await this.driver.findElement(this.nameInput).sendKeys(name);
  }

  async enterPassword(password) {
    await this.driver.findElement(this.passwordInput).sendKeys(password);
  }

  async selectDOB(day, month, year) {
    await this.driver.findElement(this.dayDropdown).sendKeys(day.toString());
    await this.driver.findElement(this.monthDropdown).sendKeys(month.toString());
    await this.driver.findElement(this.yearDropdown).sendKeys(year.toString());
  }

  async toggleNewsletter() {
    //await this.driver.findElement(this.newsletterCheckbox).click();
    const checkbox = await this.driver.findElement(this.newsletterCheckbox);
    // Scroll into view to ensure it's not hidden
     await this.driver.executeScript("arguments[0].scrollIntoView(true);", checkbox);
     // Wait until the checkbox is visible and enabled
     const { until } = require('selenium-webdriver');
   await this.driver.wait(until.elementIsVisible(checkbox), 5000);
   await this.driver.wait(until.elementIsEnabled(checkbox), 5000);

// Now click safely
await checkbox.click();

  }

  async toggleOptin() {
    await this.driver.findElement(this.optinCheckbox).click();
  }

  // Address methods
  // async fillAddressDetails({ firstName, lastName, company, address1, address2, country, state, city, zipcode, mobile }) {
  //   await this.driver.findElement(this.firstName).sendKeys(firstName);
  //   await this.driver.findElement(this.lastName).sendKeys(lastName);
  //   if (company) await this.driver.findElement(this.company).sendKeys(company);
  //   await this.driver.findElement(this.address1).sendKeys(address1);
  //   if (address2) await this.driver.findElement(this.address2).sendKeys(address2);
  //   await this.driver.findElement(this.country).sendKeys(country);
  //   await this.driver.findElement(this.state).sendKeys(state);
  //   await this.driver.findElement(this.city).sendKeys(city);
  //   await this.driver.findElement(this.zipcode).sendKeys(zipcode);
  //   await this.driver.findElement(this.mobileNumber).sendKeys(mobile);
  //   await this.clickCreateAccountButton();
  // }

  async clickCreateAccountButton() {
    await this.driver.findElement(this.createAccountButton).click();
  }

  async createAccount(userDetails) {
    await this.selectTitle(userDetails.title);
    await this.enterName(userDetails.name);
    await this.enterPassword(userDetails.password);
    await this.selectDOB(userDetails.day, userDetails.month, userDetails.year);
    await this.toggleNewsletter();
    await this.toggleOptin();
//    await this.fillAddressDetails(address);
    await this.driver.findElement(this.firstName).sendKeys(userDetails.firstName);
    await this.driver.findElement(this.lastName).sendKeys(userDetails.lastName);
    if (userDetails.company) await this.driver.findElement(this.company).sendKeys(userDetails.company);
    await this.driver.findElement(this.address1).sendKeys(userDetails.address1);
    if (userDetails.address2) await this.driver.findElement(this.address2).sendKeys(userDetails.address2);
    await this.driver.findElement(this.country).sendKeys(userDetails.country);
    await this.driver.findElement(this.state).sendKeys(userDetails.state);
    await this.driver.findElement(this.city).sendKeys(userDetails.city);
    await this.driver.findElement(this.zipcode).sendKeys(userDetails.zipcode);
    await this.driver.findElement(this.mobileNumber).sendKeys(userDetails.mobile);
    await this.clickCreateAccountButton();
  }
}

module.exports = AccountInformationPage;
