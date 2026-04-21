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
          const videoTab = this.page.locator('a[href="/comic-books"]');
    await videoTab.waitFor({ state: 'visible' });

    // Click first
    await videoTab.click();

    // Race between: real navigation OR Senna cache swap
    await Promise.race([
        // Real navigation (first run)
        this.page.waitForURL('**/comic-books**', { timeout: 5000 }).catch(() => {}),
        
        // Senna cache swap (subsequent runs) — URL updates via history API
        this.page.waitForFunction(
            () => window.location.href.includes('/comic-books'),
            { timeout: 5000 }
        ).catch(() => {})
    ]);
    }    

   async clickFirstComicBook() {
    await this.page.locator('div.comic-content.list-view').waitFor({ state: 'visible' });
    
    const firstComic = this.page.locator('a.comic-item').first();
    await firstComic.waitFor({ state: 'visible' });

    // target="_blank" opens new tab — capture it
    const [newPage] = await Promise.all([
        this.page.context().waitForEvent('page'),
        firstComic.click()
    ]);

    // Wait for new tab to load
    await newPage.waitForLoadState('domcontentloaded');
    console.log('Opened URL:', newPage.url());
}
}
   