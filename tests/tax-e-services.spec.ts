import { test } from "../Fixtures/commonSteps"; // your extended test
import { TaxeService } from "../pages/tax-e-services";

test("external site redirection", async ({ defaultPage }) => {
  const externalredirectioncheck = new TaxeService(defaultPage);
  await externalredirectioncheck.externallink();
});