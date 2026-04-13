import { Page, Locator } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly tourDialog: Locator;
    readonly closeTourBtn: Locator;
    readonly popupContinueBtn: Locator;
    // banner 
    readonly banner: Locator;
    //Announcement popup
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
    readonly faceCard2: Locator;
    readonly faceCard5: Locator;


    constructor(page: Page) {
        this.page = page;

        //banner locator
        this.banner = page.getByRole('region', { name: 'Banner' });

        // guided tour locator
        this.closeTourBtn = page.getByRole('button', { name: 'Close Tour' });
        this.tourDialog = page.locator('div.tg-dialog.animate-position');




        //Announcemnt popup locator
        this.announcemnt = page.locator("//etds-prompters[@announcementspages='/home:home-page-announcements,/employees-corner:kms-home-page-announcements']//div[@class='etds-prompters-icon-wrapper']//*[name()='svg']")

        //header menu locators
        this.aboutUsMenu = page.getByRole('menuitem', { name: 'About Us' });
        this.taxlawsMenu = page.getByRole('menuitem', { name: 'Tax Laws & Rules' });
        this.taxibformationMenu = page.getByRole('menuitem', { name: 'Tax Information & Services' });
        this.taxeservicesMenu = page.getByRole('menuitem', { name: 'Tax Services' });


        //Explore Menu locators
        this.infographicalBttn = page.locator('span').filter({ hasText: 'Infographical Video' }).first();
        this.importantlinksBttn = page.getByRole('navigation', { name: 'Explore' }).getByRole('button', { name: 'Important Links', exact: true });
        this.popupContinueBtn = page.getByRole('button', { name: 'Continue' });



        //Face card 
        this.faceCard1 = page.getByRole('region', { name: 'flip card' })
            .filter({ has: page.getByRole('heading', { name: 'Income-tax Provisions', exact: true }) });

        this.faceCard2 = page.getByRole('region', { name: 'flip card' })
            .filter({ has: page.getByRole('heading', { name: 'Circular/Notifications', exact: true }) });

        this.faceCard5 = page.locator('div.card__face.card__face--front').getByRole('heading', { name: 'International Taxation', exact: true });


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

    async hoverFaceCard(card: Locator) {
        const isFlipped = await card.evaluate(
            (el: HTMLElement) => el.classList.contains('is-flipped')
        );
        if (isFlipped) {
            await card.click();
            await this.page.waitForTimeout(500);
        }
        await card.hover();
    }




    async clickOnInfographicalVideo() {
        await this.infographicalBttn.waitFor({ state: 'visible', timeout: 10000 });
        await this.infographicalBttn.click();


    }

}