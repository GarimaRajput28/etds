import { test, expect } from '../../Fixtures/commonsteps';
import { comicbooks } from '../../page/Media Gallery/comicbooks';
test("comic book selection", async ({ defaultPage }) => {
  const comicbook = new comicbooks (defaultPage);
  comicbook.mediaGallerySelection();
  comicbook.clickComicBookTab();
  comicbook.clickFirstComicBook;
 // comicbook.openPdfWhenNewTabVisible();

});