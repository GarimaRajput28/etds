import { Page, Locator, expect } from '@playwright/test';

export class ActPage {
    readonly page: Page;
    readonly incomeTaxHeading: Locator;
    readonly yearDropdown: Locator;
    readonly viewbtn: Locator;
    readonly showchnagesbtn: Locator;
    readonly showchangespanel: Locator;

    constructor(page: Page) {
        this.page = page;

        this.incomeTaxHeading = page.getByRole('main')
            .getByRole('heading', { name: 'Income-tax Act, 1961' });

        this.yearDropdown = page.getByLabel('As amended by Finance Act');

        this.viewbtn = page.getByRole('dialog')
            .getByRole('button', { name: 'View' });

        this.showchnagesbtn = page.getByRole('dialog')
            .getByRole('checkbox', { name: /Show Changes/ });

        this.showchangespanel = page.getByText('Show Changes', { exact: true });
    }

    async goto() {
        await this.page.goto('/income-tax-act-1961', { waitUntil: 'domcontentloaded' });
        await this.incomeTaxHeading.waitFor({ state: 'visible' });
    }

    // ── Dynamic year selection ────────────────────────────────────────
    // Tries each year in order — returns the first one that loads sections
    async selectFirstAvailableYear(years: string[]): Promise<string> {
        for (const year of years) {
            await this.yearDropdown.click();

            const option = this.page.getByRole('listbox')
                .getByRole('option', { name: year, exact: true });

            // Check if this year option exists
            const exists = await option.isVisible().catch(() => false);
            if (!exists) {
                await this.page.keyboard.press('Escape');
                console.log(`Year ${year} not available — trying next`);
                continue;
            }

            await option.click();
            await this.page.waitForLoadState('networkidle');

            // Check if sections loaded for this year
            const hasSections = await this.page
                .getByRole('list')
                .getByRole('listitem')
                .first()
                .isVisible()
                .catch(() => false);

            if (hasSections) {
                console.log(`Year ${year} selected — sections loaded`);
                return year;
            }

            console.log(`Year ${year} has no sections — trying next`);
        }

        throw new Error(`No sections found for any of the years: ${years.join(', ')}`);
    }

    // ── Dynamic section link ──────────────────────────────────────────
    // Returns locator for a section link by name
    getSectionLink(sectionName: string): Locator {
        return this.page.getByRole('link', { name: sectionName, exact: true });
    }

    // Returns Compare button for a section by name
    getCompareBtnForSection(sectionName: string): Locator {
        return this.page.getByRole('button', {
            name: `Compare for ${sectionName}`,
            exact: true,
        });
    }

    // Returns modal heading locator for a section
    getModalHeading(sectionName: string): Locator {
        return this.page.getByRole('heading', {
            name: new RegExp(`${sectionName}.*Income-tax Act`),
        });
    }

    // ── Dynamic compare section selection ─────────────────────────────
    // Tries each section pair — uses first one where base section exists
    async selectFirstAvailableSectionPair(
        pairs: { base: string; compare: string }[]
    ): Promise<{ base: string; compare: string }> {

        for (const pair of pairs) {
            const baseLink = this.getSectionLink(pair.base);
            const exists = await baseLink.isVisible().catch(() => false);

            if (exists) {
                console.log(`Using section pair: ${pair.base} vs ${pair.compare}`);
                return pair;
            }
            console.log(`${pair.base} not found — trying next pair`);
        }

        throw new Error('No valid section pairs found on this page');
    }

    async openCompareModal(sectionName: string) {
        const compareBtn = this.getCompareBtnForSection(sectionName);
        await compareBtn.waitFor({ state: 'visible' });
        await compareBtn.click();

        const modalHeading = this.getModalHeading(sectionName);
        await modalHeading.waitFor({ state: 'visible' });
    }

    async selectCompareSection(sectionName: string) {
        // Open the section dropdown inside modal
        const sectionDropdown = this.page.getByLabel('Section *');
        await sectionDropdown.click();

        const option = this.page.getByRole('option', { name: sectionName, exact: true });
        await option.waitFor({ state: 'visible' });
        await option.click();
    }

    async viewComparison(baseSection: string, compareSection: string) {
        await this.page.getByRole('dialog')
        .getByRole('heading', { name: new RegExp(baseSection) })
        .waitFor({ state: 'visible' });

        await this.page.getByRole('dialog')
        .getByRole('heading', { name: new RegExp(compareSection) })
        .waitFor({ state: 'visible' });
    }
}