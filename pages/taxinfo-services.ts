import { Page,expect } from "@playwright/test";
import {data} from "../variables";

export class TaxInfoService{
    constructor (private page:Page){}
    async taxinfoHeaderRedirection()
    {
       //await this.page.getByRole('menuitem',{name:'Tax Information & Services link'}).nth(0).click();
       await this.page.goto("https://www.incometaxindia.gov.in/tax-information-services");
    }
    async overviewTaxtoolRedirection()
    {
        await this.page.getByRole('link',{name:'Tax Tools'}).click();
        await expect(this.page.getByRole('heading', { name: 'Tax Tools'})).toBeVisible();
    }

}