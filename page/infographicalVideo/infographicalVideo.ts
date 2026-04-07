import { Page, Locator } from '@playwright/test';

export class InfographicalVideoPage {
    readonly page: Page;
    readonly heading: Locator;



    constructor(page: Page) {
        this.page = page;
        this.heading = page.locator('span').filter({ hasText: 'Infographical Video' }).first();



    }

    /*Naviagte to infographical video page*/


    async verifyPageloaded() {
        await this.heading.waitFor({ state: 'visible', timeout: 15000 });

    }




}


