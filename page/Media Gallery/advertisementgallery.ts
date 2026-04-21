
import { Page,expect,Locator } from "@playwright/test";

export class AdvertisementGallery {

    readonly menu : Locator

  constructor(private page: Page) {
    this.menu= page.getByRole('menuitem',{name:'Media Gallery '})
  }
  async mediaGallerySelection1()
  {
    await this.menu.click();
  }
  async typeSearchKeyword()
  {
    await this.page.getByPlaceholder('Type to Search').click();
    await this.page.getByPlaceholder('Type to Search').fill('Advance Tax');
  }
  async searchButtonSelection()
  {
    await this.page.locator("//button[contains(text(),'Search')]").click();
  }
  async shareButton()
  {
    await this.page.getByRole('button', { name: 'Share' }).click();
  }
  async copyLInk()
  {
    const copybtn = await this.page.getByRole('button', { name: 'etds-copy-link' });
    await copybtn.click();
    await expect(copybtn).toHaveText('Copied');
  }
}