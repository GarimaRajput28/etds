import {Page,expect} from "@playwright/test";
export class comicbooks
{
    constructor (private page:Page){}

     async mediaGallerySelection()
  {
    await this.page.getByRole('menuitem',{name:'Media Gallery '}).click();
  }

    async clickComicBookTab()
    {
        await this.page.locator('a:has-text("Comic books")').click();
    }    
    async verifyYearAndLanguageSelection() {
  const yearSelected = this.page.locator('.form-group-item:has(label[title="Year"]) .etds-select__single-value');
  await expect(yearSelected).toHaveText(/All/);

  const languageSelected = this.page.locator('.form-group-item:has(label[title="Language"]) .etds-select__single-value');
  await expect(languageSelected).toHaveText(/English/);
}
    async openPdfWhenNewTabVisible()
    {
        const newTag= await this.page.locator(".new-badge").getByText("New!");
        if(await newTag.isVisible())
        {
            const[newPage] = await Promise.all([
                this.page.waitForEvent('popup'),
                this.page.locator('.lexicon-icon lexicon-icon-etds-pdf').getByText("File").click()
            ])
             await newPage.waitForLoadState();

             console.log('PDF opened in new tab:', newPage.url());
        }

    }

}