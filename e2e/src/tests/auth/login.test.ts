const { Builder, By, until } = require('selenium-webdriver');

async function testLogin() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    await driver.get('http://localhost:4200');
    console.log('Navigated to the login page.');

    await driver.wait(until.elementLocated(By.css('form.login-form')), 20000);
    console.log('Login form is visible.');

    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.sendKeys('fikremariam.fikadu@a2sv.org');
    console.log('Entered email.');

    const passwordInput = await driver.findElement(By.id('password'));
    await passwordInput.sendKeys('12345673');
    console.log('Entered password.');

    const loginButton = await driver.findElement(By.css('button.login-btn'));
    await loginButton.click();
    console.log('Clicked the login button.');

    // await driver.wait(until.urlIs('http://localhost:4200'), 20000); 
    console.log('Login successful and navigated to home page.');
    try {
      await driver.takeScreenshot().then((image: any, err: any) => {
        require('fs').writeFileSync('screenshot.png', image, 'base64');
        console.log('Screenshot captured.', err);
      });
    } catch (screenshotError) {
      console.error('Error capturing screenshot:', screenshotError);
    }
  } catch (error) {
    console.error('Error during test execution:', error);
  } finally {
    await driver.quit();
    console.log('Browser closed.');
  }
}

testLogin().catch(console.error);
