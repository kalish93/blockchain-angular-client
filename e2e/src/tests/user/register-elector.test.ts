
const { Builder, By, until } = require('selenium-webdriver');
// let randomWords: any; // Define the variable to hold the imported module
// import('random-words').then((module) => {
//     randomWords = module.default; // Assign the default export of the module to the variable
//     // Now you can use the randomWords variable to access the functionality of the module
// });

async function testRegisterFromLogin() {
  const driver = await new Builder().forBrowser('chrome').build();
  // const wordForEmail = randomWords();
  // const numberForEmail = Math.random().toString();
  // const emailToRegister = wordForEmail + numberForEmail + '@example.com';

  try {
    // Step 1: Navigate to the login page
    await driver.get('http://localhost:4200'); // Adjust the URL to match your development server
    console.log('Navigated to the login page.');

    // Step 2: Click on the "Sign Up" link to navigate to the registration page
    await driver.wait(until.elementLocated(By.linkText('Sign Up')), 10000);
    const signUpLink = await driver.findElement(By.linkText('Sign Up'));
    await signUpLink.click();
    console.log('Clicked the Sign Up link.');

    // Step 3: Wait for the registration page to load and fill out the form
    await driver.wait(until.elementLocated(By.css('form.login-form')), 10000);
    console.log('Navigated to the registration page.');

    const emailInput = await driver.findElement(By.id('email'));
    await emailInput.sendKeys('first_email@gmail.com');
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
    // Ensure the radio button can be found and selected correctly
    const userTypeRadioButton = await driver.findElement(
      By.css('mat-radio-button[ng-reflect-value="ELECTOR"]')
    );
    await userTypeRadioButton.click();
    console.log('Selected user type: Elector.');

    const signUpButton = await driver.findElement(By.css('button.login-btn'));
    await signUpButton.click();
    console.log('Clicked the Sign Up button.');

    // Step 4: Wait for the registration to complete and verify the navigation
    await driver.wait(until.urlIs('http://localhost:4200/verify-email'), 10000); // Adjust the URL to your application's home page
    console.log('Registration successful and navigated to otp page.');
  } catch (error) {
    console.error('Error during test execution:', error);

    // Capture a screenshot if there's an error
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
