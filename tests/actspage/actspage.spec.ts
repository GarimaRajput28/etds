import { test, expect } from '@playwright/test';
import { ActPage } from '../../page/actpage/actPage';
import { actsPageData } from '../../testdata/actsPage.testdata';

test('actPage — compare sections with dynamic test data', async ({ page }) => {

    const actPage = new ActPage(page);

    // ── Step 1: Navigate ──────────────────────────────────────────────
    await actPage.goto();
    await expect(actPage.incomeTaxHeading).toBeVisible();

    // ── Step 2: Select first available year from test data ────────────
    // Tries years in order — picks first one that has sections loaded
    const selectedYear = await actPage.selectFirstAvailableYear(
        actsPageData.financeActYears
    );
    console.log(`Running test with year: ${selectedYear}`);

    // ── Step 3: Validate section count for selected year ──────────────
    const countPattern = actsPageData.sectionCountPatterns[selectedYear];
    if (!countPattern) {
        throw new Error(`No section count pattern found for year: ${selectedYear}`);
    }
    await expect(page.getByText(countPattern)).toBeVisible({ timeout: 15000 });

    // ── Step 4: Pick first available section pair from test data ──────
    const sectionPair = await actPage.selectFirstAvailableSectionPair(
        actsPageData.compareSections
    );
    console.log(`Comparing: ${sectionPair.base} vs ${sectionPair.compare}`);

    // ── Step 5: Open Compare modal for base section ───────────────────
    await actPage.openCompareModal(sectionPair.base);

    // ── Step 6: Select the compare section inside modal ───────────────
    await actPage.selectCompareSection(sectionPair.compare);

    // ── Step 7: Click View ────────────────────────────────────────────
    await actPage.viewbtn.waitFor({ state: 'visible' });
    await actPage.viewbtn.click();

    // ── Step 8: Verify Show Changes checkbox and panel ────────────────
    await actPage.showchnagesbtn.waitFor({ state: 'visible' });
    await actPage.showchnagesbtn.check();
    await expect(actPage.showchangespanel).toBeVisible();

    // ── Step 9: Verify both sections visible in comparison view ───────
    await actPage.viewComparison(sectionPair.base, sectionPair.compare);

    console.log(`Test passed — ${sectionPair.base} vs ${sectionPair.compare} for year ${selectedYear}`);
});