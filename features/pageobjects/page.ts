/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    public open(path: string) {
        return browser.url(`https://the-internet.herokuapp.com/${path}`)
    }
    public async click(element: Promise<WebdriverIO.Element>) {
        return await (await element).click()
    }
    public async setText(element: Promise<WebdriverIO.Element>, value: string) {
        return await (await element).setValue(value)
    }
    public async openUrl(url: string) {
        return await browser.url(url)
    }
    public async getPageTitle(){
        return await browser.getTitle()
    }
    public async getText(element:any){
        return await (await element).getText();
    }
    public async getAttribute(element:Promise<WebdriverIO.Element>){
        return (await element).getAttribute('value')
    }
    public async isElementDisplay(element:Promise<WebdriverIO.Element>){
        return (await element).isDisplayed()
    }
}
