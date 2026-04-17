import { Page,expect } from "@playwright/test";
export class TaxeService {

  constructor(private page: Page) {}

  async taxeserviceLinkSelection() {
   await this.page.getByRole('menuitem',{name:'Tax e-Services '}).click();
  }

  async serviceCategoryDropdown(){
    await this.page.locator('.etds-select__input-container').first().click();
  }

  async serviceCategoryDropdownSelection(){
   // Pan option selection
   await this.page.getByRole('option', { name: 'PAN' }).click();
  }
  async relevantWebsite(){
   await this.page.locator('.etds-select__control.css-13cymwt-control > .etds-select__value-container > .etds-select__input-container').click();
  }
  async relevantWebsiteDropdownSelection(){
    await this.page.getByRole('option', { name: 'Protean (NSDL) portal' }).click();
  }

  async detailsView(){
   await this.page.getByRole('button', { name: 'PAN View Details collapsed' }).click();
    await this.page.getByRole('link', { name: 'Protean (NSDL) portal' }).nth(0).click();



    this.page.on('dialog', async (dialog) => {
      console.log("Dialog type is:", dialog.type());
      expect(dialog.type()).toContain('alert');

      console.log("Dialog Text:", dialog.message());
      await dialog.accept();
    });
    const [newPage] = await Promise.all([
        this.page.waitForEvent('popup'),
        this.page.getByRole('button', { name: 'Accept' }).click()
      ]);
      
      await newPage.waitForLoadState('domcontentloaded');
      
      await expect(newPage).toHaveURL('https://tinpan.proteantech.in/');
      


  }
}