import { Page, Locator, expect } from '@playwright/test';
import { ActPage } from '../actpage/actPage';

export class InfographicalVideoPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly yearDropdown: Locator;
    readonly firstVideo: Locator;
    readonly videoPlayer: Locator;
    readonly VideoPageHeading: Locator;
    readonly playButton: Locator;
    readonly closeButton: Locator;



    constructor(page: Page) {
        this.page = page;

        this.heading = page.getByRole('main').getByRole('heading', { name: 'Infographical Video' });

        this.yearDropdown = page.getByLabel('Year');

        // Matches any video button regardless of label — env-safe
        this.firstVideo = page.getByRole('region', { name: 'etds-infographical-videos' })
            .getByRole('button', { name: /^Video:/ }).first();

        // Player that appears after clicking a video
        this.videoPlayer = page.getByRole('dialog')
            .locator('video, iframe[src*="youtube"], iframe[src*="vimeo"]').first();


        //heading on Video player dialog

        this.VideoPageHeading = page.getByRole('dialog').getByRole('heading', { name: 'Video Player' });

        this.playButton = page.locator('#senna_surface1');
        this.closeButton = page.locator("//button[@id='btn-video-modal-close']//*[name()='svg']");

    }



    async verifyPageLoaded() {
        await this.heading.waitFor({ state: 'visible' });

    }

    // Selects "All" from year dropdown to show videos across all years
    async selectAllYears() {


        // Click the visible dropdown trigger — the generic "Year" div, not the hidden input
        const yearTrigger = this.page
            .getByRole('region', { name: 'Search' }).locator('[class*="etds-select__control"]')
            .first();


        await yearTrigger.waitFor({ state: 'visible', timeout: 10000 });
        await yearTrigger.click();


        // Click the "All" option to show videos from all years 
        const allOption = this.page.locator('[class*="etds-select__option"]').filter({ hasText: /^All$/ }).first();
        await allOption.click();

        // Wait for the video list to refresh
        await this.page.waitForLoadState('networkidle');
    }

    async playFirstVideo() {
        await this.firstVideo.waitFor({ state: 'visible' });
        await this.firstVideo.click();
    }

    async verifyVideoIsPlaying() {
        await this.videoPlayer.waitFor({ state: 'visible' });




    }
}