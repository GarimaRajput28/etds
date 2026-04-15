import { test, expect } from '../../Fixtures/commonsteps';
import { comicbooks } from '../../page/Media Gallery/comicbooks';
test("advertisement gallery selection1", async ({ defaultPage }) => {
  const comicbook = new comicbooks (defaultPage);
  comicbook.mediaGallerySelection();
  comicbook.clickComicBookTab();
  comicbook.verifyYearAndLanguageSelection();
  comicbook.openPdfWhenNewTabVisible();

});