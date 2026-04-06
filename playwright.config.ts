import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 60000,
  retries: 1,
  use: {
    baseURL:
      "https://liferay-cluster-ip-service-liferay-uat.apps.nonprod.tdscpc.gov.in/web/guest/home", // sample app for practice
    headless: true,
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    //ignore browser httpos error

    ignoreHTTPSErrors: true,
    navigationTimeout: 60000,

  },
  reporter: [["html", { open: "never" }]],
});
