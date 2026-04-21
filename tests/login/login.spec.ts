import { test, expect } from '@playwright/test';
import { etdsconfig } from '../../ETDS.config';
import { Registration } from '../../page/login/login';
import { GuideTourPage } from '../../page/homepage/guidedTour';

test('login', async ({ page }) => {
 const authentication = new Registration(page);

 test.step("navigate to login page", async()=>{
 await page.goto(`/login`,{ waitUntil: 'domcontentloaded'})
 })
 
  test.step("Entering credentials", async()=>{
    
  })
  await authentication.loginaction(
    etdsconfig.userscredential.username,
    etdsconfig.userscredential.Password
  )

 
});
