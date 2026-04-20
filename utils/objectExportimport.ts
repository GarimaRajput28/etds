import { Locator, Page,expect } from "@playwright/test";

export async function objectExportimport ({
    page,
    ObjectTypeDropdown,
    EntityTypeDropdown,
    ObjectTypeValue,
    EntityTypeValue,
    actionbutton,
    Targetbutton


}:{
    page : Page,
    ObjectTypeDropdown : Locator,
    EntityTypeDropdown : Locator,
    ObjectTypeValue : string
    EntityTypeValue? : string | undefined, 
    actionbutton? : string
    Targetbutton : Locator 
}

 
){
try{

    await expect (ObjectTypeDropdown).toBeVisible();
    await ObjectTypeDropdown.selectOption(ObjectTypeValue);

    const EntityDropdown = await EntityTypeDropdown.isVisible();
    if(EntityDropdown && EntityTypeValue)  await EntityTypeDropdown.selectOption(EntityTypeValue);
    
    



 let filename : string | undefined  
    if (actionbutton ==='Generate Object Template' || actionbutton ==='Export Object Entry'){
        const downloadPromise = page.waitForEvent('download')
        await expect(Targetbutton).toBeVisible();
       await (Targetbutton).click();
       const downloadffile = await downloadPromise;
       filename = downloadffile.suggestedFilename();
       const filepath = `./Downloads/${filename}`
       await downloadffile.saveAs(filepath)
       return filepath

    
        
    }
    } 
catch(err){
console.error(`Failed to select dropdown values:`, err)
throw err;
}
    

}
