import { Page,expect } from "@playwright/test";

export class TaxpayerCharter
{
      constructor(private page: Page) {}
       async AboutUsHover() 
       {
          await this.page.getByRole('menuitem',{name:'About Us'}).click();
       }
      async taxpayerCharterRedirection()
      {
        await this.page.getByRole('menuitem',{name:'Taxpayers’ Charter'}).click();
      }
      async taxpayerCharterOptionSelection()
      {
       const [newPage] = await Promise.all([
        this.page.waitForEvent('popup'),
        await this.page.getByRole('menuitem', { name: 'Taxpayers’ Charter LANG#en_US' }).click()
      ]);
      
        await newPage.waitForLoadState();

        // now you can work on new tab
        await expect(newPage).toHaveURL('https://www.incometaxindia.gov.in/documents/d/guest/taxpayer-charter');
      }
     async downloadTaxpayerCharterPdf()
     {
        /*const [download] = await Promise.all([
        this.page.waitForEvent('download'),
        this.page.locator('iframe[name="024998EF738074F3AB60B9DBCDA560EE"]').contentFrame().getByRole('button', { name: 'Download' }).waitFor({state:"visible",timeout:40000}),
        this.page.locator('iframe[name="024998EF738074F3AB60B9DBCDA560EE"]').contentFrame().getByRole('button', { name: 'Download' }).click
        ]);

         // Save file to your system
         await download.saveAs('downloads/taxpayer-charter.pdf');*/
       //await this.page.locator('iframe[name="DC8DA4330BB04DF98F22AC2468B0FC69"]').contentFrame().getByRole('button', { name: 'Download' }).click();
     }


}
