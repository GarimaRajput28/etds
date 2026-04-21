// tests/fixtures.ts
import { test as base } from '@playwright/test';
import { GuideTourPage } from '../page/homepage/guidedTour';


type guidedTour = {
  guideTourPage: GuideTourPage;
};

export const test = base.extend<guidedTour>({
  guideTourPage: async ({ page }, use) => {

    const guideTourPage = new GuideTourPage(page);
        await use(guideTourPage);
  },
});
