import { test, expect } from '../../Fixtures/popuphandling.fixtures';

test.describe('Home Page - Top Menu Validations', () => {

    test('@Sanity validate top menu', async ({ homePage }) => {

        await expect(homePage.announcemnt).toBeVisible();
        //banner is visible
        await expect(homePage.banner).toBeVisible({ timeout: 15000 });

    });
});

// ──  All header items visible ────────────────────────────────────────
test('@Sanity validate all header menu items are visible', async ({ homePage }) => {

    await expect(homePage.homeMenu).toBeVisible({ timeout: 15000 });
    await expect(homePage.aboutUsMenu).toBeVisible({ timeout: 15000 });
    await expect(homePage.taxlawsMenu).toBeVisible({ timeout: 15000 });
    await expect(homePage.taxInformationMenu).toBeVisible({ timeout: 15000 });
    await expect(homePage.taxeservicesMenu).toBeVisible({ timeout: 15000 });
    await expect(homePage.mediaGalleryMenu).toBeVisible({ timeout: 15000 });
});

// ──  About Us and Tax Laws & Rules are dropdowns ─────────────────────
test('@Sanity validate About Us and Tax Laws are dropdown menus', async ({ homePage }) => {

    const aboutUsIsDropdown = await homePage.isDropdown(homePage.aboutUsMenu);
    const taxLawsIsDropdown = await homePage.isDropdown(homePage.taxlawsMenu);
    expect(aboutUsIsDropdown).toBe(true);
    expect(taxLawsIsDropdown).toBe(true);
});


// ── 5. Tax Info, Tax e-Services, Media Gallery are plain links ─────────
test('@Sanity validate Tax Information, Tax e-Services and Media Gallery are links', async ({ homePage }) => {

    const taxInfoIsDropdown = await homePage.isDropdown(homePage.taxInformationMenu);
    const taxEservIsDropdown = await homePage.isDropdown(homePage.taxeservicesMenu);
    const mediaGalleryIsDropdown = await homePage.isDropdown(homePage.mediaGalleryMenu);

    expect(taxInfoIsDropdown).toBe(false);
    expect(taxEservIsDropdown).toBe(false);
    expect(mediaGalleryIsDropdown).toBe(false);
});


// ── 6. About Us dropdown opens on click ────────────────────────────────
test('@Sanity validate About Us dropdown opens on click', async ({ homePage }) => {

    await homePage.aboutUsMenu.click();

    // Dropdown panel should become visible
    const dropdown = homePage.page
        .getByRole('menu')
        .filter({ hasText: 'About Us' });

    await expect(dropdown).toBeVisible({ timeout: 10000 });
});


// ── 7. Tax Laws & Rules dropdown opens on click ────────────────────────
test('@Sanity validate Tax Laws dropdown opens on click', async ({ homePage }) => {

    await homePage.taxlawsMenu.click();

    const dropdown = homePage.page
        .getByRole('menu')
        .filter({ hasText: 'Tax Laws & Rules' });

    await expect(dropdown).toBeVisible({ timeout: 10000 });
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


