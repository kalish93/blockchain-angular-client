const { Builder, By, until } = require('selenium-webdriver');

async function testRegisterFromLogin() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:4200');
    console.log('Navigated to the login page.');

    await driver.wait(until.elementLocated(By.linkText('Sign Up')), 10000);
    const signUpLink = await driver.findElement(By.linkText('Sign Up'));
    await signUpLink.click();
    console.log('Clicked the Sign Up link.');

    await driver.wait(until.elementLocated(By.css('form.login-form')), 10000);
    console.log('Navigated to the registration page.');

    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.sendKeys('elector@example.com');
    console.log('Entered email.');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('password123');
    console.log('Entered password.');

    const confirmPasswordInput = await driver.findElement(
      By.id('confirmPassword')
    );
    await confirmPasswordInput.sendKeys('password123');
    console.log('Entered confirm password.');
    await driver.sleep(5000);
    const userTypeRadioButton = await driver.findElement(
      By.css('mat-radio-button[ng-reflect-value="ELECTION_CREATOR"]')
    );
    await userTypeRadioButton.click();
    console.log('Selected user type: Elector.');

    const signUpButton = await driver.findElement(By.css('button.login-btn'));
    await signUpButton.click();
    console.log('Clicked the Sign Up button.');

    await driver.wait(until.urlIs('http://localhost:4200/home'), 10000);
    console.log('Registration successful and navigated to home page.');
  } catch (error) {
    console.error('Error during test execution:', error);

    try {
      await driver.takeScreenshot().then((image: any, err: any) => {
        require('fs').writeFileSync('screenshot.png', image, 'base64');
        console.log('Screenshot captured.');
      });
    } catch (screenshotError) {
      console.error('Error capturing screenshot:', screenshotError);
    }
  } finally {
    await driver.quit();
    console.log('Browser closed.');
  }
}

testRegisterFromLogin().catch(console.error);
