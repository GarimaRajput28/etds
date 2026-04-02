import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly header: Locator;
    readonly closeTourBtn: Locator;
    readonly aboutUsMenu: Locator;
    readonly deptOfficialsBtn: Locator;
    readonly empCornerMenu: Locator;
    taxLawsAndRules: Locator;

    constructor(page: Page) {
        this.page = page;
        this.header = page.getByRole('banner');
        this.closeTourBtn = page.getByRole('button', { name: 'Close Tour' });
        this.aboutUsMenu = page.getByRole('menuitem', { name: 'About Us' });
        this.deptOfficialsBtn = page.getByRole('button', { name: 'Department Officials' });
        this.empCornerMenu = page.getByRole('menuitem', { name: 'Employees Corner' });
        this.aboutUsMenu = page.getByRole('menuitem', { name: 'About Us' });
        this.taxLawsAndRules = page.getByRole('menuitem', { name: 'Tax Laws & Rules' });

    }

    async goto() {
        await this.page.goto('/web/guest/home', { waitUntil: 'networkidle' });
        await expect(this.aboutUsMenu).toBeVisible();
        await expect(this.taxLawsAndRules).toBeVisible();
    }

    async handleTour() {
        if (await this.closeTourBtn.isVisible()) {
            await this.closeTourBtn.click();
        }
    }

    async navigateToEmployeeCorner() {
        await this.deptOfficialsBtn.click();
        await this.empCornerMenu.waitFor({ state: 'visible' });
        await this.empCornerMenu.click();
    }
}