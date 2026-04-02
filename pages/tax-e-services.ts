import { Page,expect } from "@playwright/test";
import {data} from "../variables";

export class TaxeService {

  constructor(private page: Page) {}

  async externallink() {
   await this.page.getByRole('menuitem',{name:'Tax e-Services '}).click();
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
