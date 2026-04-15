import { test, expect } from '../../Fixtures/commonsteps';
import { AdvertisementGallery } from '../../page/Media Gallery/advertisementgallery';
import { VideoGallery } from '../../page/Media Gallery/videogallery';
test("advertisement gallery selection2", async ({ defaultPage }) => {
  const agallery = new AdvertisementGallery(defaultPage);
  const vgallery = new VideoGallery(defaultPage);
  await agallery.mediaGallerySelection1();
  await vgallery.clickVideoGalleryTab();
  await vgallery.videoGalleryYearDropdown();
  await vgallery.videoGalleryYearSelection();
  await agallery.searchButtonSelection();
});
