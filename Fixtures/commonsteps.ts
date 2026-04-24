import { test as baseTest, Page, expect } from '@playwright/test';
import { etdsconfig } from '../ETDS.config';

type MyFixtures = {
    defaultPage: Page;
};

export const test = baseTest.extend<MyFixtures>({

    defaultPage: async ({ page }, use) => {

        // Navigate using centralized URL from ETDS.config — no hardcoding needed
        await page.goto(etdsconfig.Environment.UAT_URL, { waitUntil: 'domcontentloaded' });

        // Handle guided tour if it appears — using waitFor instead of isVisible
        // so it properly waits rather than immediately returning false
        try {
            const closeTourBtn = page.getByRole('button', { name: 'Close Tour' });
            await closeTourBtn.waitFor({ state: 'visible', timeout: 8000 });
            await closeTourBtn.click();

            // Wait for the dialog to fully close before handing page to test
            await page.getByRole('dialog')
                .filter({ hasText: 'Tax Information and Services' })
                .waitFor({ state: 'hidden', timeout: 5000 });
        } catch {
            // Tour not present — continue silently
        }

        // Hand the page to the test
        await use(page);
    },
});

export { expect };