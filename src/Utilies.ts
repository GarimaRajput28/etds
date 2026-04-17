import Exceljs from "exceljs"
import fs from "fs"

const filepath = '/home/me/Downloads/ObjectEntry.xlsx'
const sheetname = 'Template'

async function extractexceldata (filepath : string, sheetname: string){
try{
        const excel = new Exceljs.Workbook();
        await excel.xlsx.readFile(filepath)
        const excelsheet = excel.getWorksheet(sheetname)

        const Section_Title_EN_1961 : Exceljs.CellValue[]=[]
        const Section_Title_EN_2026 : Exceljs.CellValue[]=[]

        if (!excelsheet) throw new Error(`Worksheet ${sheetname} is not found`)


    excelsheet?.eachRow((row,rowNumber)=>{
        if(rowNumber===1)return;
        Section_Title_EN_1961.push(row.getCell(2).value)
        Section_Title_EN_2026.push(row.getCell(6).value)
    
})

fs.writeFileSync('./src/Section_Title_EN_1961.json',JSON.stringify(Section_Title_EN_1961,null,2));
fs.writeFileSync('./src/Section_Title_EN_2026.json',JSON.stringify(Section_Title_EN_2026,null,2))


}

catch(err){
 console.error(`Fetching the values from the ${sheetname} is failed !`,err)
 process.exit(1)
}
}


extractexceldata(filepath,sheetname);