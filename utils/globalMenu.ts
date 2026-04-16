import { Page,Locator,expect } from "@playwright/test";

export async function globalMenu({
    page,
    applicationMenu,
    applicationMenutabSelection,
    selectOptions,


}:{
    page: Page,
    applicationMenu : Locator,
    applicationMenutabSelection : Locator,
    selectOptions : Locator
}){
 
    await expect (applicationMenu).toBeVisible();
    await applicationMenu.click();

    await expect(applicationMenutabSelection).toBeVisible();
    await applicationMenutabSelection.click();

    // await Promise.all([
    //     page.waitForLoadState('networkidle'),
    //     selectOptions.
    //     selectOptions.click()
    // ]); 

    await expect (selectOptions).toBeVisible();
    await selectOptions.click();



}