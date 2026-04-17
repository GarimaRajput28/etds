import { expect,Page,Locator } from "@playwright/test";
import { objectExportimport } from "../../utils/objectExportimport";
import { globalMenu } from "../../utils/globalMenu";
import { SrvRecord } from "node:dns";


class exportObjectEntry {

readonly page : Page
readonly ObjectTypeDropdown : Locator
readonly EntityTypeDropdown : Locator
readonly DownloadGenerateObjectTemplate : Locator
readonly DownloadExportObjectTemplate : Locator
readonly applicationMenu : Locator


constructor (page : Page){
    this.page = page
    this.ObjectTypeDropdown = page.locator('select.form-control.w-50').nth(0)
    this.EntityTypeDropdown = page.locator('select.form-control.w-50').nth(1)
    this.DownloadGenerateObjectTemplate = page.locator(':text-is("Generate Object Template")')
    this.DownloadExportObjectTemplate = page.locator(':text-is("Export Object Entry")')

    this.applicationMenu = page.getByRole('button', { name: 'Open Applications Menu Ctrl' })
    
   
}

async globalMenuaction(
    tabName : string,
    targetlink : string
  

){
    const applicationMenutabSelection = this.page.locator(`:text-is("${tabName}")`)
    const selectOptions = this.page.getByRole('menuitem', { name: targetlink })
    await globalMenu({
    page: this.page,
    applicationMenu : this.applicationMenu,
    applicationMenutabSelection :applicationMenutabSelection,
    selectOptions : selectOptions




  })

}
async generateObjecttemplate (
    ObjectTypeValue : string,
    actionbutton: string,
    EntityTypeValue? : string,
){
    //download the Template
await objectExportimport({
       page: this.page,
        ObjectTypeDropdown: this.ObjectTypeDropdown,
        EntityTypeDropdown: this.EntityTypeDropdown,
        ObjectTypeValue: ObjectTypeValue,
        actionbutton: actionbutton,
        Targetbutton: this.DownloadGenerateObjectTemplate,
        EntityTypeValue: EntityTypeValue,
        
    })   
}
//Download the Ojbect Entry
async exportObjectEntry(
    ObjectTypeValue : string,
    actionbutton : string,
    EntityTypeValue? : string,){
    const filename = await objectExportimport({
       page: this.page,
        ObjectTypeDropdown: this.ObjectTypeDropdown,
        EntityTypeDropdown: this.EntityTypeDropdown,
        ObjectTypeValue: ObjectTypeValue,
        EntityTypeValue: EntityTypeValue,
        actionbutton: actionbutton,
        Targetbutton: this.DownloadExportObjectTemplate
    })
    console.log(filename);
}





    


}
export {exportObjectEntry}




