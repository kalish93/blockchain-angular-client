const { Builder, By, until } = require('selenium-webdriver');

async function testElectionVoting() {
  const driver = await new Builder().forBrowser('chrome').build();

  try {
    // Step 1: Navigate to the main page
    await driver.get('http://localhost:4200'); // Adjust the URL to match your development server
    console.log('Navigated to the main page.');

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
