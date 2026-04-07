import { expect, Page, Locator } from "@playwright/test";

class Bulkupload {

    readonly page : Page
    readonly selecttab : Locator
    readonly clickselectrole : Locator
    readonly clicksendbutton : Locator
    readonly confirmpopup : Locator
    readonly successmessage : Locator
    

    


    constructor (page : Page){
        this.page = page
        this.selecttab = page.locator ("#tab-send-bulk-email")
        this.clickselectrole = page.locator(".etds-select__control")
        this.clicksendbutton = page.getByRole('button',{name:'Send'})
        this.confirmpopup = page.getByRole('button',{name:'Yes'})
        this.successmessage = page.getByText('SuccessBulk email send is')
    }



    async gotosendbulkemail (role:string,networkname:string){
      await this.selecttab.waitFor ({timeout:10000});
      await this.selecttab.click();
      await this.clickselectrole.waitFor({timeout:10000})
      await this.clickselectrole.click();
      await this.page.getByRole('option',{name:role}).click();

      //waiting for the API call 
     const sendmessageresponse = this.page.waitForResponse(response => response.url().includes(networkname) && response.status() ===200)

      await this.clicksendbutton.click();
      await expect(this.confirmpopup).toBeVisible();
      await this.confirmpopup.click();
      const bulkemail = await sendmessageresponse;
      await expect(bulkemail.status()).toBe(200)
      //success message
      await expect(this.successmessage).toBeVisible();




        
    }


}
export{Bulkupload};   