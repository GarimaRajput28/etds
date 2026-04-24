import { Page, Locator } from '@playwright/test';

export class gloablSearch {
    readonly page: Page;

    // Search button in the header nav (the magnifier icon)
    readonly searchInput: Locator;
    readonly searchResults: Locator;
    readonly filterButton: Locator;
    readonly featureFilter: Locator;

    

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByRole('main').getByRole('textbox', { name: 'Search' });
        this.searchResults = page.getByRole('heading', { name: 'Search' });
        this.filterButton = page.locator('input.form-control.input-group-inset.input-group-inset-after.search-bar-keywords-input:visible');
        this.featureFilter = page.locator('span.panel-title').getByText('Feature');

        
    }

    
}