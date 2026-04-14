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

    });


    //face card assertions
    test('@Sanity validate all face cards visibility and flip', async ({ homePage }) => {

        const cards = await homePage.getAllFaceCards();

        // Fail fast if no cards are found at all
        expect(cards.length).toBeGreaterThan(0);

        for (const card of cards) {

            // Each card should be visible before interacting
            await expect(card).toBeVisible({ timeout: 15000 });

            // Hover the card and verify it flips
            await homePage.hoverFaceCard(card);
            await expect(card).toHaveClass(/is-flipped/, { timeout: 5000 });
        }
    });

    test('Validate Explore menu options', async ({ homePage }) => {

        await expect(homePage.infographicalBttn).toBeVisible({ timeout: 15000 });
        await expect(homePage.importantlinksBttn).toBeVisible({ timeout: 15000 });
    });

    test('@fullTesting link redirection', async ({ homePage, page }) => {

        await homePage.aboutUsMenu.click();
        await homePage.taxlawsMenu.click();
    });

});
