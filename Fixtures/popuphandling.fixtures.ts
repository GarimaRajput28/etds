import { test as base, expect } from '@playwright/test';
import { HomePage } from '../page/homepage/homePage';
import { gloablSearch } from '../page/homepage/globalSearch';

// Define the type for your fixtures
type Fixtures = {
    homePage: HomePage;
    gloablSearchPage: gloablSearch;
};

// Extend base test with your fixtures
export const test = base.extend<Fixtures>({

    // homePage fixture — navigates to home and handles tour
    homePage: async ({ page }, use) => {
        const homePage = new HomePage(page);

        await homePage.goto();
        await homePage.handleTour();

        await use(homePage);
    },

    // gloablSearchPage fixture — navigates to home, handles tour, hands search POM
    // Previously this was MISSING from base.extend — that caused the error
    gloablSearchPage: async ({ page }, use) => {
        const homePage = new HomePage(page);
        const searchPage = new gloablSearch(page);

        // Navigate and dismiss tour before handing page to test
        await homePage.goto();
        await homePage.handleTour();

        await use(searchPage);
    },
});

export { expect } from '@playwright/test';