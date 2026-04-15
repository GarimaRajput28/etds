import { test, expect } from '../../Fixtures/commonsteps';
import { AdvertisementGallery } from '../../page/Media Gallery/advertisementgallery';
test("advertisement gallery selection", async ({ defaultPage }) => {
  const agallery = new AdvertisementGallery(defaultPage);
  await agallery.mediaGallerySelection1();
  await agallery.typeSearchKeyword();
  await agallery.searchButtonSelection();
  await agallery.shareButton();
  await agallery.copyLInk();

});