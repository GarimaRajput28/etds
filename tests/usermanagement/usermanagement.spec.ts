import { test,expect } from "@playwright/test";
import { usermanagement } from "../../page/usermanagement/usermanagement";
import { etdsconfig } from "../../ETDS.config";

test('@Sanity Downloading the existing user',async ({page}) => {
    await page.goto(`/employees-corner`) 

    const userandmanagement = new usermanagement (page);
    
    await userandmanagement.adminpageDownloadingexistinguser();

}),

test ("@Sanity Downloading the KMS user", async ({page})=>{
    await page.goto (`/employees-corner`)
    const kmsuser = new usermanagement (page);
    await kmsuser.admindownlaodingKMSuser();


});