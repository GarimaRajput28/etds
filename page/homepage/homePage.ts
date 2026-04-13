import { Page, Locator } from '@playwright/test';

export class HomePage {
    clickInfographicalVideo() {
        throw new Error('Method not implemented.');
    }


    readonly page: Page;
    //readonly header: Locator;


    readonly tourDialog: Locator;
    readonly closeTourBtn: Locator;
    readonly popupContinueBtn: Locator;


    // banner 
    readonly banner: Locator;

    readonly announcemnt: Locator;



    //header locators
    readonly aboutUsMenu: Locator;
    readonly taxlawsMenu: Locator;
    readonly taxibformationMenu: Locator;
    readonly taxeservicesMenu: Locator;


    //Explore Menu locators
    readonly infographicalBttn: Locator;
    readonly importantlinksBttn: Locator;


    //Face card locators
    readonly faceCard1: Locator;


    constructor(page: Page) {
        this.page = page;

        //banner locator
        this.banner = page.getByRole('region', { name: 'Banner' });

        // guided tour locator
        this.closeTourBtn = page.getByRole('button', { name: 'Close Tour' });
        
        
        this.tourDialog = page.locator('div.tg-dialog.animate-position');

        444


        //Announcemnt popup locator
        this.announcemnt = page.locator("//etds-prompters[@announcementspages='/home:home-page-announcements,/employees-corner:kms-home-page-announcements']//div[@class='etds-prompters-icon-wrapper']//*[name()='svg']")

        //header menu locators
        this.aboutUsMenu = page.getByRole('menuitem', { name: 'About Us' });
        this.taxlawsMenu = page.getByRole('menuitem', { name: 'Tax Laws & Rules' });
        this.taxibformationMenu = page.getByRole('menuitem', { name: 'Tax Information & Services' });
        this.taxeservicesMenu = page.getByRole('menuitem', { name: 'Tax Services' });


        //Explore Menu locators
        this.infographicalBttn = page.locator('span').filter({ hasText: 'Infographical Video' }).first();
        this.importantlinksBttn = page.getByRole('button', { name: 'Important Links' });
        this.popupContinueBtn = page.getByRole('button', { name: 'Continue' });



        //Face card 
        //this.faceCard1 = page.locator('div.card__face.card__face--front').getByTitle('Income-tax Provisions');
        this.faceCard1 = page.locator('div.card__face.card__face--front').getByRole('heading', { name: 'Income-tax Provisions', exact: true });









    }

    async goto() {
        await this.page.goto('/web/guest/home', { waitUntil: 'domcontentloaded' });
        await this.aboutUsMenu.waitFor({ state: 'visible' });


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



    async clickOnInfographicalVideo() {
        await this.infographicalBttn.waitFor({ state: 'visible', timeout: 10000 });
        await this.infographicalBttn.click();


    }




}



