import { Page,test } from "@playwright/test";
import { Bulkupload } from "../../page/usermanagement/Bulkupload";

test("@Sanity sending the bulk emails",async({page})=>{
    const bulkemail = new Bulkupload (page);
    await  page.goto('/user-management');
    await bulkemail.gotosendbulkemail("Analytics Administrator","sendbulkemail");


});