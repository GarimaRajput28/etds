import { test, expect } from '../../Fixtures/commonsteps';
import { TaxpayerCharter} from "../../page/taxpayerscharter/taxpayerscharter"

test("taxpayer charter pdf redirection", async ({ defaultPage }) => {
  const charter = new TaxpayerCharter(defaultPage);
  await charter.AboutUsHover();
  await charter.taxpayerCharterRedirection();
  await charter.taxpayerCharterOptionSelection();
  await charter.downloadTaxpayerCharterPdf();
  

});