import { test, expect } from '@playwright/test';
import { etdsconfig } from '../../ETDS.config';
import { Registration } from '../../pages/login/login';

test.skip('login', async ({ page }) => {
 const authentication = new Registration(page);

 test.step ("navigate to login page", async()=>{
 await page.goto(`/login`,{ waitUntil: 'domcontentloaded'})
 })
 
  test.step("Entering credentials", async()=>{
    
  })
  await authentication.loginaction(
    etdsconfig.userscredential.username,
    etdsconfig.userscredential.Password
  )

 
});
