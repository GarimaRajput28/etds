import { test, expect } from '../../Fixtures/popuphandling.fixtures';
import { InfographicalVideoPage } from '../../page/infographicalVideo/infographicalVideo';



test('Redirection to infographical page from Homepage', async ({ homePage, page }) => {

    // Navigate from homepage via Explore menu
    await homePage.clickOnInfographicalVideo();

    const videoPage = new InfographicalVideoPage(page);

    // 1. Verify page loaded
    await videoPage.verifyPageLoaded();

    // 2. Select "All" years — works across all environments regardless of data
    await videoPage.selectAllYears();

    // 3. Play the first available video
    await videoPage.playFirstVideo();

    // 4. Verify player opened
    await videoPage.verifyVideoIsPlaying();

    await expect(videoPage.videoPlayer).toBeVisible();

    await expect(videoPage.VideoPageHeading).toBeVisible();

    await expect(videoPage.playButton).toBeVisible();

  //click on play button to check if video is playing
    await videoPage.playButton.click();
    

    
    await videoPage.closeButton.click();


});