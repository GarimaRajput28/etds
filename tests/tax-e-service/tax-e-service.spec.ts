import { test, expect } from '../../Fixtures/commonsteps';
import { TaxeService} from "../../page/tax-e-service/tax-e-service"

test("external site redirection", async ({ defaultPage }) => {
  const externalredirectioncheck = new TaxeService(defaultPage);
  await externalredirectioncheck.taxeserviceLinkSelection();
  await externalredirectioncheck.serviceCategoryDropdown();
  await externalredirectioncheck.serviceCategoryDropdownSelection();
  await externalredirectioncheck.relevantWebsite();
  await externalredirectioncheck.relevantWebsiteDropdownSelection();
  await externalredirectioncheck.detailsView();

});