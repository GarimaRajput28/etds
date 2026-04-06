import{test,Page} from "@playwright/test";
test("this is random check",async ({ page }) => {
    await page.goto("https://www.incometaxindia.gov.in/home");
    await page.locator('span').filter({ hasText: 'Tax Information & Services' }).first().waitFor({state:"visible"});
    await page.locator('span').filter({ hasText: 'Tax Information & Services' }).first().click();
    await page.waitForTimeout(4000);
    await page.getByRole('link',{name:'Tax Tools'}).click();
})