import { Page, Locator, expect } from '@playwright/test';

export class ActPage {
    readonly page: Page;
    readonly incomeTaxHeading: Locator;
    readonly yearDropdown: Locator;
    readonly yearOption2025: Locator;
    readonly sections1Link: Locator;
    readonly compareSection1Bttn: Locator;
    readonly modalHeading: Locator;
    readonly selectSectionOption: Locator;
    readonly section5Option:     Locator;
    readonly viewbtn: Locator;
 
    


    constructor(page: Page) {
        this.page = page;
        this.incomeTaxHeading = page.getByRole('heading', { name: 'Income-tax Act, 1961' });
        this.yearDropdown = page.getByLabel('As amended by Finance Act');
        this.yearOption2025 = page.getByRole('option', { name: '2025', exact: true });
        this.sections1Link =  page.locator('span').filter({ hasText: 'Section - 1' }).first();
        this.compareSection1Bttn = page.locator("//button[@aria-label='Compare for Section - 1']//span[@class='text'][normalize-space()='Compare']");
        this.modalHeading    = page.getByRole('heading', {name: 'Section - 1 Short title, extent and commencement | Income-tax Act, 1961'});

        
        this.selectSectionOption   = page.locator("//div[@class='etds-select__value-container css-hlgwow']//div[@class='etds-select__input-container css-19bb58m']");
        this.section5Option       = page.getByRole('option', { name: 'Section - 5', exact: true });

        this.viewbtn = page.locator('div.d-flex.justify-content-center').locator('button').nth(1);
    }



    async goto() {
        await this.page.goto('/income-tax-act-1961', { waitUntil: 'domcontentloaded' });
        await this.incomeTaxHeading.waitFor({ state: 'visible', timeout: 15000 });

     }



    async selectYear(year: string) {
        
        /* Step 2: Click the year dropdown */
        await this.yearDropdown.click();
        await this.yearOption2025.waitFor({ state: 'visible' });        
        /* Step 3: Click the 2025 option */
        await this.yearOption2025.click();
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
        //await this.selectSectionOption.waitFor({ state: 'visible' });

        await this.page.waitForTimeout(1500); // Adding a short wait to ensure the dropdown options are fully loaded
        await this.selectSectionOption.click();


        await this.page.waitForTimeout(1500); // Adding a short wait to ensure the dropdown options are fully loaded


        /*await this.section5Option.waitFor({ state: 'visible' });*/

        /* Step 6: Select "Section - 5" from the dropdown */
        await this.section5Option.click();

        /* Step 7: Click the "View" button to see the comparison */
        await this.viewbtn.click();
    }
}
