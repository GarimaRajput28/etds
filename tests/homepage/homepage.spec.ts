import { test, expect } from '../../fixtures/popuphandling.fixtures';

test.describe('Home Page - Top Menu Validations', () => {

    test('@Sanity validate top menu', async ({ homePage }) => {


        // Assertions Header Menu
        await expect(homePage.aboutUsMenu).toBeVisible({ timeout: 15000 });
        await expect(homePage.taxlawsMenu).toBeVisible({ timeout: 15000 });
        await expect(homePage.taxibformationMenu).toBeVisible({ timeout: 15000 });

        //Explore menu assertions
        await expect(homePage.infographicalBttn).toBeVisible({ timeout: 15000 });
        await expect(homePage.importantlinksBttn).toBeVisible({ timeout: 15000 });
    });


    test('@fulltetsing Validate all the redirections from homepage', async ({ homePage, page }) => {


        //click on links

        await homePage.aboutUsMenu.click();
        

        await homePage.taxlawsMenu.click();
  

        await homePage.taxibformationMenu.click();
       
        await homePage.infographicalBttn.click();
             

    });


    

});