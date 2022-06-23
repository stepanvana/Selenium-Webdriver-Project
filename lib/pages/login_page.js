const locators = require("../../utils/locators");
let BasePage = require("../../lib/pages/base_page");

const email = locators.email,
    password = locators.password,
    signIn = locators.signIn,
    emailTxt = locators.emailTxt,
    okButton = locators.okButton,
    passwordTxt = locators.passwordTxt,
    timeout = locators.timeout;

function LoginPage(webdriver) {
    BasePage.call(this, webdriver);
}

LoginPage.prototype = Object.create(BasePage.prototype);
LoginPage.prototype.constructor = LoginPage;

LoginPage.prototype.getTitle = async function () {
    const title = await this.driver.getTitle();
    return title;
};

LoginPage.prototype.userEmail = async function () {
    const clickUserEmail = await this.findByXpath(email);
    await this.write(clickUserEmail, emailTxt);
    let isEnabled = await clickUserEmail.isEnabled();

    return await this.driver.wait(async function () {
        return isEnabled;
    }, timeout);
};

LoginPage.prototype.userPassword = async function () {
    const clickUserPassword = await this.findByXpath(password);
    await this.write(clickUserPassword, passwordTxt);
    let isEnabled = await clickUserPassword.isEnabled();

    return await this.driver.wait(async function () {
        return isEnabled;
    }, timeout);
};

LoginPage.prototype.signInButton = async function () {
    let signInButton = await this.findByclassName(signIn);

    await this.elementIsEnabled(signInButton);

    const enabledState = await signInButton.isEnabled();
    const btnType = await signInButton.getAttribute("type");

    const btnResult = await this.driver.wait(async function () {
        return {
            type: btnType,
            state: enabledState,
        };
    }, timeout);
    return btnResult;
};

LoginPage.prototype.clicksignInButton = async function () {
    let signInButton = await this.findByclassName(signIn);
    await this.click(signInButton);
    return await this.driver.getCurrentUrl();
};

LoginPage.prototype.takeScreenShot = async function () {
    return await this.driver.takeScreenshot();
};

module.exports = LoginPage;