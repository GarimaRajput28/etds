import { test, expect } from '@playwright/test';
import { ActPage } from '../../page/actpage/actPage';


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

        await actPage.viewbtn.waitFor({ state: 'visible', timeout: 15000 });
        await actPage.viewbtn.click();


});

