import{Page,expect} from "@playwright/test";
export class VideoGallery
{
    constructor(private page:Page){}
    async mediaGallerySelection()
  {
    await this.page.getByRole('menuitem',{name:'Media Gallery '}).click();
  }
    async clickVideoGalleryTab()
    {
        await this.page.locator('a:has-text("Video Gallery")').click();
    }
    async videoGalleryYearDropdown()
    {
        await this.page.locator(".etds-select__value-container").click();
    }
    async videoGalleryYearSelection()
    {
        await this.page.getByRole('option', { name: '2025' }).click();
    }
     
}                       