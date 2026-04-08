import { Page, Locator } from '@playwright/test';

export class HomePage {
    clickInfographicalVideo() {
        throw new Error('Method not implemented.');
    }


    readonly page: Page;
    readonly header: Locator;
    readonly closeTourBtn: Locator;
    readonly popupContinueBtn: Locator;

    //header locators
    readonly aboutUsMenu: Locator;
    readonly taxlawsMenu: Locator;
    readonly taxibformationMenu: Locator;
    readonly taxeservicesMenu: Locator;


    //Explore Menu locators
    readonly infographicalBttn: Locator;
    readonly importantlinksBttn: Locator;




    constructor(page: Page) {
        this.page = page;
        this.header = page.getByRole('banner');
        this.closeTourBtn = page.getByRole('button', { name: 'Close Tour' });
        this.aboutUsMenu = page.getByRole('menuitem', { name: 'About Us' });
        this.taxlawsMenu = page.getByRole('menuitem', { name: 'Tax Laws & Rules' });
        this.taxibformationMenu = page.getByRole('menuitem', { name: 'Tax Information & Services' });
        this.taxeservicesMenu = page.getByRole('menuitem', { name: 'Tax Services' });

        this.infographicalBttn = page.locator('span').filter({ hasText: 'Infographical Video' }).first();
        this.importantlinksBttn = page.getByText('Important Links', { exact: true });
        this.popupContinueBtn = page.getByRole('button', { name: 'Continue' });



    }

    async goto() {
        await this.page.goto('/web/guest/home', { waitUntil: 'domcontentloaded' });
        await this.aboutUsMenu.waitFor({ state: 'visible' });


    }


    async handleTour() {
        // Wait for the "Close Tour" button to appear and click it if it does
        if (await this.closeTourBtn.isVisible({ timeout: 5000 })) {
            await this.closeTourBtn.click();
        }
    }


    async clickOnInfographicalVideo() {
        await this.infographicalBttn.waitFor({ state: 'visible', timeout: 10000 });
        await this.infographicalBttn.click();


    }
}



