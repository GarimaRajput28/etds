import { test as baseTest, Page, expect} from '@playwright/test';
import { data } from "../variables";

type MyFixtures = {
  defaultPage: Page; //  we are adding a fixture called defaultPage of type Page
};

export const test = baseTest.extend<MyFixtures>({
  defaultPage: async ({ page }, use) => {    //This is the function that runs to create the fixture:
   
    //server url
    await page.goto(data.prod_serv_url);

    // wait for correct screen
    await expect(page.getByText('Tax Information')).toBeVisible();
   // click next
   await page.getByRole('button', { name: 'Next' }).click();

    //  Handle guide tour if it appears
    const closeTourBtn = page.locator('#tg-dialog-close-btn'); 
    if (await closeTourBtn.isVisible()) {
      await closeTourBtn.click();
    }
    // Make this page available to your tests
    await use(page);
  },
});

