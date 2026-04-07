import { expect, Locator, Page, Selectors, selectors} from "@playwright/test";


class usermanagement {
    readonly page : Page
    readonly clickadminoption : Locator
    readonly clickusermanagementlink :Locator
    readonly clickdownloadtemplate : Locator
    readonly clickDownloadexistinguser : Locator
    readonly clickpopup : Locator
    readonly clickDownloadkmsusers : Locator
    readonly successmessage : Locator
    readonly Errormessage : Locator



    constructor (page : Page){
        this.page = page;
        this.clickadminoption = page.locator ('//span[@class="text-truncate" and normalize-space(.)="Admin"]');
        this.clickusermanagementlink = page.getByLabel('User Management link', { exact: true }).nth(0);
        this.clickdownloadtemplate = page.locator ("//button[normalize-space()='Download Template']");
        this.clickDownloadexistinguser = page.locator('//button[text()="Download existing users"]');
        this.clickpopup = page.locator ('//button[text()="Yes"]');
        this.clickDownloadkmsusers =page.locator('//button[text()="Download KMS Users"]');
        this.successmessage = page.locator(".autofit-section").filter({hasText:"Users excel export initiated, it will take a while to generate the excel. Please check Document and Media - User Management folder after sometimes."});
        this.Errormessage = page.locator (".autofit-section").filter({hasText:"!!! User export already initiated please check Document and Media - User Management folder."});

    }

    async clickadmin (){
        await expect(this.clickadminoption).toBeVisible ({timeout : 10000});
        await this.clickadminoption.hover();
    }

    async clickusermanagement (){
        await expect(this.clickusermanagementlink).toBeVisible ({timeout: 10000});
        await this.clickusermanagementlink.click();

    }

    async downloadtemplate (){
        await expect(this.clickdownloadtemplate).toBeVisible({timeout:10000});
        const downloadpromis = this.page.waitForEvent("download");
        await this.clickdownloadtemplate.click();
        const download = await downloadpromis;
       await expect (download.suggestedFilename()).toBe('User_Bulk_Upload_Template.xlsx');



    }

    //Downloadusers :- both Existing and KMS user

    async Downloadusers (message:Locator, button:Locator){
        await expect(button).toBeVisible({timeout: 10000});
        await button.click();
        

        //handling popup 

        const dialogbox = await (this.clickpopup).waitFor({state:"visible", timeout:3000}).then(()=>true).catch(()=>false)
        if (dialogbox) await this.clickpopup.click();
        await expect(message).toBeVisible({timeout: 10000});
    }

    

//grouping 
async adminpageDownloadingexistinguser (){
    await this.clickadmin();
    await this.clickusermanagement();
    await this.downloadtemplate();
    await this.Downloadusers(this.successmessage, this.clickDownloadexistinguser);
    await this.Downloadusers(this.Errormessage, this.clickDownloadkmsusers);

}

async admindownlaodingKMSuser(){
   await this.clickadmin();
    await this.clickusermanagement();
    await this.downloadtemplate();
    await this.Downloadusers(this.successmessage,this.clickDownloadkmsusers);
    await this.Downloadusers(this.Errormessage,this.clickDownloadexistinguser);

}

};
export {usermanagement};

