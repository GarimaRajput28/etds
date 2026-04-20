import { Page, Locator, expect } from '@playwright/test';

export class ActPage {
    readonly page: Page;
    readonly incomeTaxHeading: Locator;
    readonly yearDropdown: Locator;
    readonly sections1Link: Locator;
    readonly compareSection1Bttn: Locator;
    readonly modalHeading: Locator;
    readonly selectSectionOption: Locator;
    readonly section5Option: Locator;
    readonly viewbtn: Locator;
    readonly showchnagesbtn: Locator;




    constructor(page: Page) {
        this.page = page;
        this.incomeTaxHeading = page.getByRole('main').getByRole('heading', { name: 'Income-tax Act, 1961' });
        this.yearDropdown = page.getByLabel('As amended by Finance Act');
        this.sections1Link = page.locator('span').filter({ hasText: 'Section - 1' }).first();
        this.compareSection1Bttn = page.locator("//button[@aria-label='Compare for Section - 1']//span[@class='text'][normalize-space()='Compare']");
        this.modalHeading = page.getByRole('heading', { name: 'Section - 1 Short title, extent and commencement | Income-tax Act, 1961' });


        //this.selectSectionOption   = page.getByRole('dialog').locator("//div[@class='etds-select__value-container css-hlgwow']//div[@class='etds-select__input-container css-19bb58m']");
        this.selectSectionOption = page.getByLabel('Section *')

        this.section5Option = page.getByRole('option', { name: 'Section - 5', exact: true });

        this.viewbtn = page.getByRole('dialog').getByRole('button', { name: 'View' });
        this.showchnagesbtn = page.getByRole('dialog').getByRole('checkbox', { name: /Show Changes/ });


    }



    async goto() {
        await this.page.goto('/income-tax-act-1961', { waitUntil: 'domcontentloaded' });
        await this.incomeTaxHeading.waitFor({ state: 'visible', timeout: 15000 });


    }



    async selectYear(year: string) {

        await this.yearDropdown.click();

        const option = this.page.getByRole('listbox')
            .getByRole('option', { name: year, exact: true });
        await option.waitFor({ state: 'visible', timeout: 10000 });
        await option.click();

        await this.page.waitForLoadState('networkidle');

    }



    async clickSection1() {
        /*wait for the sections to be visible and click on Section - 1*/
        await this.sections1Link.waitFor({ state: 'visible' });

    }


    async selectSectionInModal(sectionName: string) {
        await this.compareSection1Bttn.click();

        /* Step 4: Wait for the modal to appear and verify its content */
        await this.modalHeading.waitFor({ state: 'visible' });

        /* Step 5: Click the "Select Section" dropdown in the modal */
        await this.selectSectionOption.click();

        /* Step 6: Select "Section - 5" from the dropdown */
        await this.section5Option.click();





    }


    async viewComparison() {

        await this.page.getByTitle('Section - 1 Short title, extent and commencement | Income-tax Act, 1961').waitFor({ state: 'visible', timeout: 15000 });
        await this.page.getByTitle('Section - 5 Short title, extent and commencement | Income-tax Act, 1961').waitFor({ state: 'visible', timeout: 15000 });
    }



}
