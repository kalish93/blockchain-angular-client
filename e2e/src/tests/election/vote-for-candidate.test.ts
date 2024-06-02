const { Builder, By, until } = require('selenium-webdriver');

async function testElectionVoting() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Step 1: Navigate to the main page
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
    await driver.get('http://localhost:4200');
    await driver.wait(
      until.elementLocated(By.css('.election-card mat-card')),
      10000
    );
    const electionCards = await driver.findElements(
      By.css('.election-card mat-card')
    );
    if (electionCards.length > 0) {
      await electionCards[0].click(); 
      console.log('Selected an election.');
    } else {
      console.log('No elections available.');
      return;
    }

    await driver.wait(until.elementLocated(By.css('.candidate-card')), 10000);
    const candidateCards = await driver.findElements(
      By.css('.candidate-card .vote-btn')
    );
    if (candidateCards.length > 0) {
      await candidateCards[0].click();
      console.log('Selected a candidate.');
    } else {
      console.log('No candidates available.');
      return;
    }

    await driver.wait(
      until.elementLocated(By.css('.mat-dialog-container')),
      10000
    );
    const confirmButton = await driver.findElement(
      By.css('button.mat-button:contains("Confirm")')
    );
    await confirmButton.click();
    console.log('Vote successfully recorded.');
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

testElectionVoting().catch(console.error);
