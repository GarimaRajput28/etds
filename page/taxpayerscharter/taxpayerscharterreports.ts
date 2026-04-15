import { Page,expect } from "@playwright/test";

export class TaxpayerCharterReports
{
      constructor(private page: Page) {}
      async taxpayercharterLinkRedirection()
      {
        await this.page.getByRole('menuitem',{name:'Taxpayers’ Charter Reports'}).click();
      }
      async selectFinancialYear()
      {
          await this.page.locator('.etds-select__input-container').click();
          await this.page.getByRole('option', { name: '-25' }).click();

      }
      async searchButtonClick()
      {
         await this.page.getByRole('region', { name: 'Search' }).locator('#searchButton').click();
      }
       async downloadPdf()
       {
          const downloadPromise = this.page.waitForEvent('download');
          await this.page.getByRole('button', { name: 'Download PDF March,' }).click();
          const download = await downloadPromise;
       }

}