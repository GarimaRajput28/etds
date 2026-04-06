import { test as baseTest, Page } from '@playwright/test';
import { data } from "../variables";

type MyFixtures = {
  defaultPage: Page; //  we are adding a fixture called defaultPage of type Page
};

export const test = baseTest.extend<MyFixtures>({
  defaultPage: async ({ page }, use) => {    //This is the function that runs to create the fixture:
    
    await page.goto(data.prod_serv_url);
    //  Handle guide tour if it appears
    const closeTourBtn = page.locator('#tg-dialog-close-btn'); 
    if (await closeTourBtn.isVisible()) {
      await closeTourBtn.click();
    }
    // Make this page available to your tests
    await use(page);
  },
});

