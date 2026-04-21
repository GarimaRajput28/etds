import { test, expect } from '@playwright/test';
import { ActPage } from '../../page/actpage/actPage';


test('actPage', async ({ page }) => {

        const actPage = new ActPage(page);

        // 1. Navigation & Setup
        await actPage.goto();
        await expect(actPage.incomeTaxHeading).toBeVisible();


        
        await actPage.selectYear('2025');
        await expect(actPage.page.getByText(/939 Section/)).toBeVisible();

        




        await actPage.clickSection1();
        // 2. Assertions
        await actPage.selectSectionInModal('Section - 5');

        // 3. Click the "View" button to see the comparison

        await actPage.viewbtn.waitFor({ state: 'visible' });
        await actPage.viewbtn.click();

        await actPage.showchnagesbtn.waitFor({ state: 'visible' });
        await actPage.showchnagesbtn.check();

        await expect(actPage.showchangespanel).toBeVisible();



});

