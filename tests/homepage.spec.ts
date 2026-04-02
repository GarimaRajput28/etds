import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/homePage';



// Tip: Use environment variables for credentials in a real CI/CD pipeline

test('Homepage', async ({ page }) => {
    const homePage = new HomePage(page);


    // 1. Navigation & Setup
    await homePage.goto();
    await homePage.handleTour();

    // 2. Assertions
    await expect(homePage.header.getByText('Income Tax Department')).toBeVisible();
    await expect(homePage.aboutUsMenu).toBeVisible();

    // 3. Navigation to Login
    await homePage.navigateToEmployeeCorner();

    
});


/*
test.describe('Footer Validations', () => {
    test('validate footer links and content', async ({ page }) => {
        const footer = new Footer(page);
        await footer.page.goto('https://liferay-cluster-ip-service-liferay-uat.apps.nonprod.tdscpc.gov.in/web/guest/home', { waitUntil: 'networkidle' });
        await footer.botomLinks();
    });*/
