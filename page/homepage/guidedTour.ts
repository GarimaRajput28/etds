// pages/GuideTourPage.ts

import { Page } from '@playwright/test';

export class GuideTourPage {

    private continueButton = this.page.getByRole('button', { name: 'Continue' });
    private nextButton = this.page.locator('button:has-text("Next")');
    private doneButton = this.page.getByRole('button', { name: 'Done' });

    private taxInfoSpan = this.page.locator('span:has-text("Tax Information & Services")');
    private taxInfoPopup = this.page.locator(':text-is("Tax Information and Services")');

    private exploreHeading = this.page.getByRole('heading', { name: 'Explore' });
    private dialogTitle = this.page.locator('#tg-dialog-title');

    private searchInput = this.page.locator(
        'input.form-control.input-group-inset.input-group-inset-after.search-bar-keywords-input:visible'
    );
    private globalSearchText = this.page.getByText('Global Search', { exact: true });

    constructor(private page: Page) {}

    async incometaxdepartmentpopup() {
        await this.continueButton.waitFor({ state: 'visible' });
        await this.continueButton.click();
        await this.continueButton.waitFor({ state: 'hidden' });
    }

    async guideTourstep1() {
        const Title_step1 = await this.taxInfoSpan.textContent();
        const Popup_title = await this.taxInfoPopup.textContent();

        if (Title_step1?.includes('Tax Information') && Popup_title?.includes('Tax Information')) {
            await this.nextButton.click();
        }
    }

    async guideTourstep2() {
        const Title_step2 = await this.exploreHeading.textContent();
        const Popup_title2 = await this.dialogTitle.textContent();

        if (Title_step2 === Popup_title2) {
            await this.nextButton.click();
        }
    }

    async guideTourstep3() {
        const Title_step3 = await this.searchInput.getAttribute('placeholder');
        const Popup_title3 = await this.globalSearchText.textContent();

        if (Title_step3?.includes('Search') && Popup_title3?.includes('Global Search')) {
            await this.doneButton.waitFor();
            await this.doneButton.click();
        }
    }

    async completeGuideTour() {
        await this.incometaxdepartmentpopup();
        await this.guideTourstep1();
        await this.guideTourstep2();
        await this.guideTourstep3();
    }
}