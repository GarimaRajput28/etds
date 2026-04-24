import { test, expect } from '../../Fixtures/popuphandling.fixtures';
import { gloablSearch } from '../../page/homepage/globalSearch';

test.describe('@Sanity Global Search', () => {

    test('Redirection to Global Search page from Homepage', async ({ gloablSearchPage, page }) => {


       //validate if search input is visible on homepage
        await expect(gloablSearchPage.searchInput).toBeVisible();

        // Click on the search input to focus it
        await gloablSearchPage.searchInput.click();

        // Type a keyword into the search input
        const keyword = 'TDS';
        await gloablSearchPage.searchInput.fill(keyword);

        // Press Enter to submit the search
        await gloablSearchPage.searchInput.press('Enter');


        // Validate that the search results page is displayed with the correct heading
        await expect(gloablSearchPage.searchResults).toBeVisible();
        await expect(gloablSearchPage.searchResults).toHaveText('Search');
        // Validate that the filter button is visible on the search results page
        await expect(gloablSearchPage.filterButton).toBeVisible();

        // Click on the feature filter and validate that the filter options are displayed
        await gloablSearchPage.featureFilter.isVisible();



 
    });


    

});