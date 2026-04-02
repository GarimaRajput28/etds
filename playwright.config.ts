import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  timeout: 30000,
  retries: 1,
  use: {
    baseURL:
      "https://liferay-cluster-ip-service-liferay-uat.apps.nonprod.tdscpc.gov.in/web/guest/home", // sample app for practice
    headless: false,
    screenshot: "only-on-failure",
    video: "retain-on-failure",

    //ignore browser httpos error

    ignoreHTTPSErrors: true,
  },
  reporter: [["html", { open: "never" }]],
});
