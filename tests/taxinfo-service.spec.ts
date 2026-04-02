import { test } from "../Fixtures/commonSteps"; // your extended test
import { TaxInfoService } from "../pages/taxinfo-services";
test('@Sanity taxinfo overview redirection check',async({defaultPage})=>{
    const overviewRedirection = new TaxInfoService(defaultPage);
    overviewRedirection.taxinfoHeaderRedirection();
    overviewRedirection.overviewTaxtoolRedirection();

});