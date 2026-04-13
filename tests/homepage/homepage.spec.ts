import { test, expect } from '../../Fixtures/popuphandling.fixtures';

test.describe('Home Page - Top Menu Validations', () => {

    test('@Sanity validate top menu', async ({ homePage }) => {


        // Assertions Header Menu
        await expect(homePage.announcemnt).toBeVisible();
        await expect(homePage.aboutUsMenu).toBeVisible({ timeout: 15000 });
        await expect(homePage.taxlawsMenu).toBeVisible({ timeout: 15000 });
        await expect(homePage.taxibformationMenu).toBeVisible({ timeout: 15000 });


        //banner is visible
        await expect(homePage.banner).toBeVisible({ timeout: 15000 });


        //face card assertions
        await expect(homePage.faceCard1).toBeVisible({ timeout: 15000 });
        await homePage.hoverFaceCard(homePage.faceCard1);

        await expect(homePage.faceCard2).toBeVisible({ timeout: 15000 });
        await homePage.hoverFaceCard(homePage.faceCard2);


        await expect(homePage.faceCard5).toBeVisible({ timeout: 15000 });







    });


    test('Validate Explore menu option', async ({ homePage, page }) => {



        //Explore menu assertions
        await expect(homePage.infographicalBttn).toBeVisible({ timeout: 15000 });
        await expect(homePage.importantlinksBttn).toBeVisible({ timeout: 15000 });






    });

    test('@full testing link redirection testing', async ({ homePage, page }) => {

        await homePage.aboutUsMenu.click();

        await homePage.taxlawsMenu.click();




    });
});