import { Before, BeforeAll } from "@wdio/cucumber-framework";


BeforeAll({ timeout: 10 * 1000 }, async () => {
})

Before(async () => {
    await browser.maximizeWindow()
})