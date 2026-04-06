import { test, expect } from '../fixtures/popuphandling.fixtures';
import { HomePage } from '../pages/homePage';

test.describe('Home Page - Top Menu Validations', () => {

    test('validate top menu', async ({ homePage }) => {


        // Assertions
        await expect(homePage.aboutUsMenu).toBeVisible({ timeout: 15000 });
    });


    

});