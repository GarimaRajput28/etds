import { test as base, expect } from '@playwright/test';
import { HomePage } from '../page/homepage/homePage';




//  Define the type for your fixtures
type Fixtures = {
    homePage: HomePage;
};




//  Extend base test with your fixture
export const test = base.extend<Fixtures>({

    homePage: async ({ page }, use) => {

        const homePage = new HomePage(page);

        // Step 1: Navigate to the page
        await homePage.goto();

        //  Step 2: Handle guided tour automatically for EVERY test
        await homePage.handleTour();


        // Step 3: Hand the homePage instance to the test
        await use(homePage);
    },
});

//  Re-export expect so tests only import from fixture
export { expect } from '@playwright/test';