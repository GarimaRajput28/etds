import { expect, Page,Locator } from "@playwright/test";


class Registration {
    readonly page : Page;
    readonly Emailfield : Locator;
    readonly verifybutton : Locator;
    readonly password : Locator;
    readonly otpfield : Locator;
    readonly submitbutton : Locator;
    readonly pagetitle :Locator;

     constructor (page: Page){
        this.page = page;
        this.Emailfield = page.locator("//input[@class='form-control']");
        this.verifybutton= page.locator ("//button[@id='verifyEmail']");
        this.password = page.locator ("//input[@id='_com_liferay_login_web_portlet_LoginPortlet_password']");
        this.otpfield=page.locator ("//input[@name='_com_liferay_login_web_portlet_LoginPortlet_otp']");
        this.submitbutton = page.locator("//button[@class='btn btn-primary signin-btn']");
        this.pagetitle = page.getByRole('heading', { name: 'Employee\'s Corner', exact: true });

     }
     async enteremail(username:string){
        await this.Emailfield.clear();
        await expect(this.Emailfield).toBeVisible({timeout: 30000});
        await this.Emailfield.fill(username);
        }

     async verify() {

        await expect(this.verifybutton).toBeEnabled();
        await this.verifybutton.click();
     }

     async enterpassword (Password:string){
        await expect(this.password).toBeVisible({timeout:30000})
        await this.password.fill (Password);
     }

    async otp (){
       await expect(this.otpfield).toBeVisible({timeout:10000});
       await this.otpfield.fill('12312312');
    }

     async submit (){
      await expect(this.submitbutton).toBeEnabled({timeout:10000})
       await this.submitbutton.click();
       
     }

     
    async headingcheck() {
    // Wait for the heading to be visible
    expect (await this.pagetitle.waitFor({ state: "visible", timeout: 100000 }));
    }
      
    
    
    //grouping all the login process into this below loginaction helper method 

      async loginaction (username:string,Password:string){
        await this.enteremail(username);
        await this.verify();
       await this.enterpassword(Password);
        await this.otp();
        await this.submit();  
       await this.headingcheck();
        
     }
    
};
export {Registration};