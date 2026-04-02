import { test, expect } from '@playwright/test';
import { ActPage } from '../pages/actPage';


test('actPage', async ({ page }) => {

        const actPage = new ActPage(page);

        // 1. Navigation & Setup
        await actPage.goto();
        await expect(actPage.incomeTaxHeading).toBeVisible();


        await actPage.selectYear('2025');
        


        await actPage.clickSection1();  
        // 2. Assertions
        await actPage.selectSectionInModal('Section - 5');      

        // 3. Click the "View" button to see the comparison
        await actPage.viewbtn.waitFor({ state: 'visible' });
        await actPage.viewbtn.click();

        // Additional assertions can be added here to verify the content of the comparison page
        await expect(page.locator("div[class='sectionContentViewer sectionContentViewer-right-section'] div[class='section-data text-truncate text-primary sub-heading-2-medium']")).toBeVisible();
        await expect(page.locator("div[class='sectionContentViewer sectionContentViewer-left-section'] div[class='section-data text-truncate text-primary sub-heading-2-medium']").filter({ hasText: 'Section - 1 Short title, extent and commencement' }).first()).toBeVisible();







});

