import { chromium, expect, Page } from "@playwright/test";
import { etdsconfig } from "../ETDS.config.ts";
import { Registration } from "../pages/login/login.js";  // ✅ use import, not require

async function globalSetup() {
  const browser = await chromium.launch({headless:true});
 
const page = await browser.newPage({ignoreHTTPSErrors:true});

  await page.goto(`${etdsconfig.Environment.UAT_URL}/login`,{ waitUntil: 'domcontentloaded'});

  const authentication = new Registration(page);
  await authentication.loginaction(
    etdsconfig.userscredential.username,
    etdsconfig.userscredential.Password
  );

  // await page.waitForSelector(".page-title h3");
  // const print = await page.locator(".page-title h3").getAttribute("title");
  // console.log(print);

 await page.waitForSelector("//h1[text()=\"Employee's Corner\"]", { timeout: 60000 });
  await page.waitForLoadState('networkidle');
  await page.context().storageState({ path: "auth.json" });
  await browser.close();


}

export default globalSetup;
  