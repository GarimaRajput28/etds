import { Page, Locator } from '@playwright/test';

export class HomePage {
    getNavMenuItems(): Locator {
        return this.navBar.getByRole('menuitem');
    }


    readonly page: Page;
    readonly tourDialog: Locator;
    readonly closeTourBtn: Locator;
    readonly popupContinueBtn: Locator;
    // banner 
    readonly banner: Locator;
    //Announcement popup
    readonly announcemnt: Locator;


    //── Header nav items ──────────────────────────────────────────────
    readonly navBar: Locator;

    //header locators
    readonly homeMenu: Locator;
    readonly aboutUsMenu: Locator;
    readonly taxlawsMenu: Locator;
    readonly taxInformationMenu: Locator;
    readonly taxeservicesMenu: Locator;
    readonly mediaGalleryMenu: Locator;



    //Explore Menu locators
    readonly infographicalBttn: Locator;
    readonly importantlinksBttn: Locator;


    //Face card locators


    constructor(page: Page) {
        this.page = page;

        //banner locator
        this.banner = page.getByRole('region', { name: 'Banner' });

        // guided tour locator
        this.closeTourBtn = page.getByRole('button', { name: 'Close Tour' });
        this.tourDialog = page.locator('div.tg-dialog.animate-position');




        //Announcemnt popup locator
        this.announcemnt = page.locator("//etds-prompters[@announcementspages='/home:home-page-announcements,/employees-corner:kms-home-page-announcements']//div[@class='etds-prompters-icon-wrapper']//*[name()='svg']")

        // Header nav bar
        this.navBar = page.getByRole('navigation', { name: 'Main' });

        // Home — selected/highlighted when on home page
        this.homeMenu = page.getByRole('menuitem', { name: 'Home' });

        // Dropdowns
        this.aboutUsMenu = page.getByRole('menuitem', { name: 'About Us' });
        this.taxlawsMenu = page.getByRole('menuitem', { name: 'Tax Laws & Rules' });

        // Direct links
        this.taxInformationMenu = page.getByRole('menuitem', { name: 'Tax Information & Services' });
        this.taxeservicesMenu = page.getByRole('menuitem', { name: 'Tax e-Services' });
        this.mediaGalleryMenu = page.getByRole('menuitem', { name: 'Media Gallery' });


        //Explore Menu locators
        this.infographicalBttn = page.locator('span').filter({ hasText: 'Infographical Video' }).first();
        this.importantlinksBttn = page.getByRole('navigation', { name: 'Explore' }).getByRole('button', { name: 'Important Links', exact: true });
        this.popupContinueBtn = page.getByRole('button', { name: 'Continue' });

    }

    // Returns a locator for a specific face card by its heading name
    getFaceCard(headingName: string): Locator {
        return this.page
            .getByRole('region', { name: 'flip card' })
            .filter({ has: this.page.getByRole('heading', { name: headingName, exact: true }) });
    }

    // Discovers all flip cards dynamically and returns them as an array of locators
    async getAllFaceCards(): Promise<Locator[]> {
        const allCards = this.page.getByRole('region', { name: 'flip card' });
        const count = await allCards.count();
        const cards: Locator[] = [];
        for (let i = 0; i < count; i++) {
            cards.push(allCards.nth(i));
        }
        return cards;
    }

    async goto() {
        await this.page.goto('/web/guest/home', { waitUntil: 'domcontentloaded' });
        await this.homeMenu.waitFor({ state: 'visible' });


    }



    async handleTour() {
        try {
            //  Wait for Close Tour button to appear
            await this.closeTourBtn.waitFor({ state: 'visible', timeout: 8000 });
            await this.closeTourBtn.click();

            // Wait for the actual tour dialog to close (not tg-dialog)
            await this.page.getByRole('dialog')
                .filter({ hasText: 'Tax Information and Services' })
                .waitFor({ state: 'hidden', timeout: 5000 });
        } catch {
            // Tour not present — continue silently
        }
    }


    // Checks whether a menu item has a dropdown (aria-haspopup or aria-expanded)
    async isDropdown(menuItem: Locator): Promise < boolean > {
    const hasPopup = await menuItem.getAttribute('aria-haspopup');
    const expanded = await menuItem.getAttribute('aria-expanded');
    return hasPopup !== null || expanded !== null;
}


    async hoverFaceCard(card: Locator) {
    const isFlipped = await card.evaluate(
        (el: HTMLElement) => el.classList.contains('is-flipped')
    );
    if (isFlipped) {
        await card.click();
        await card.waitFor({ state: 'visible' });
    }
    await card.hover();
}


    async clickOnInfographicalVideo() {
    await this.infographicalBttn.waitFor({ state: 'visible', timeout: 10000 });
    await this.infographicalBttn.click();

}

}