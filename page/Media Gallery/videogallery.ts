import{Page,expect} from "@playwright/test";
export class VideoGallery
{
    constructor(private page:Page){}
    /*async mediaGallerySelection()
  {
      await this.page.getByRole('menuitem', { name: 'Media Gallery' }).click();
      await this.page.getByRole('link', { name: 'Video Gallery' }).waitFor({ state: 'visible' });
  }
    async clickVideoGalleryTab()
    {
       const videotab = this.page.getByRole('link', { name: 'Video Gallery', exact: true });
  await videotab.click();
  await this.page.locator('text=Video Gallery').waitFor();

  // OR even better: wait for dropdown INSIDE this tab
  await this.page.locator('.lexicon-icon-etds-down-arrow').first().waitFor();
    }
    async videoGalleryYearDropdown()
    {
         const videoSection = this.page.locator('div:has-text("Video Gallery")');
         const dropdown = videoSection.locator('.lexicon-icon-etds-down-arrow');
         await dropdown.waitFor({ state: 'visible' });
         await dropdown.click();
    }
    async videoGalleryYearSelection()
    {
        const yearOption = this.page.getByRole('option', { name: '2025' });
        await yearOption.waitFor({ state: 'visible' });
        await yearOption.click();
    }*/
   async mediaGallerySelection() 
   {
    await this.page.getByRole('menuitem', { name: 'Media Gallery' }).click();
    await this.page.getByRole('link', { name: 'Video Gallery' }).waitFor({ state: 'visible' });
}

async clickVideoGalleryTab() 
{
       const videoTab = this.page.locator('a[href="/video-gallery"]');
    await videoTab.waitFor({ state: 'visible' });

    // Click first
    await videoTab.click();

    // Race between: real navigation OR Senna cache swap
    await Promise.race([
        // Real navigation (first run)
        this.page.waitForURL('**/video-gallery**', { timeout: 5000 }).catch(() => {}),
        
        // Senna cache swap (subsequent runs) — URL updates via history API
        this.page.waitForFunction(
            () => window.location.href.includes('/video-gallery'),
            { timeout: 5000 }
        ).catch(() => {})
    ]);
}

async videoGalleryYearDropdown() 
{
    // Page is fresh after navigation, no scoping needed
    const dropdown = this.page.locator('.lexicon-icon-etds-down-arrow').first();
    await dropdown.waitFor({ state: 'visible' });
    await dropdown.click();
}

async videoGalleryYearSelection() 
{
    const yearOption = this.page.getByRole('option', { name: 'All' });
    await yearOption.waitFor({ state: 'visible' });
    await yearOption.click();
}
    async videoSelection()
    {
          await this.page.locator('div.video-gallery-wrap').waitFor({ state: 'visible' });

    // Click the first video button
    const firstVideo = this.page.locator('button.video-gallery-item').first();
    await firstVideo.waitFor({ state: 'visible' });
    await firstVideo.click();
                
    }
    async clickVideoPlayButton() {
    // Wait for the iframe to appear
    const iframeElement = this.page.frameLocator('iframe[src*="youtube.com/embed"]');
    
    // Click the play button inside the iframe
    const playButton = iframeElement.locator('button[aria-label="Play video"], button.ytp-large-play-button');
    await playButton.waitFor({ state: 'visible', timeout: 10000 });
    await playButton.click();
}
     
}                       