import { test, expect } from '../../Fixtures/commonsteps';
import { TaxpayerCharter} from "../../page/taxpayerscharter/taxpayerscharter"
import { TaxpayerCharterReports } from '../../page/taxpayerscharter/taxpayerscharterreports';

test("taxpayer charter reports redirection", async ({ defaultPage }) => {
  const charter = new TaxpayerCharter(defaultPage);
  const charterReports = new TaxpayerCharterReports(defaultPage);
 // await charter.AboutUsHover();
  //await charter.taxpayerCharterRedirection();
 // await charterReports.taxpayercharterLinkRedirection();
 await charterReports.goToTaxpayerCharterReports();
  await charterReports.selectFinancialYear();
  await charterReports.searchButtonClick();
  await charterReports.downloadPdf();

});