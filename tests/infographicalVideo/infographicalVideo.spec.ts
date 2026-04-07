import { test, expect } from '../../fixtures/popuphandling.fixtures';
import { InfographicalVideoPage } from '../../page/infographicalVideo/infographicalVideo';

test('Redirection to infographical page from Homepage', async ({ homePage, page }) => {

    // Step 1: Verify button exists on homepage
    await homePage.clickOnInfographicalVideo();
    await expect(homePage.infographicalBttn).toBeVisible({ timeout: 15000 });
    // Step 2: Click the button to navigate to infographical video page
    
    // page.waitForTimeout(1500);

    await homePage.infographicalBttn.click();

    

    // Step 3: Verify destination page heading
    const infographicalPage = new InfographicalVideoPage(page);
    await infographicalPage.verifyPageloaded();
    await expect(infographicalPage.heading).toBeVisible();
})