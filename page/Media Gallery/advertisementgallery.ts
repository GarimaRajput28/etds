
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
    await this.page.getByPlaceholder('Type to Search').fill('Last date of Filing of TDS statement');
  }
  async searchButtonSelection()
  {
    await this.page.locator('#portlet_com_liferay_client_extension_web_internal_portlet_ClientExtensionEntryPortlet_75024455507050_LXC_etds_publicity_campaigns_INSTANCE_dpkf').getByRole('button', { name: 'Search' }).click();
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