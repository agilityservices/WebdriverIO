export let openUrl = async (url: string) => {
    await browser.url(url)
}
export let click = async (element: Promise<WebdriverIO.Element>) => {
    await (await element).click()
}
export let setText = async (element: Promise<WebdriverIO.Element>, text: string) => {
    await (await element).setValue(text)
}
export let getText = async (element: Promise<WebdriverIO.Element>) => {
    return await (await element).getText()
}


export let getAttribute = async (element:Promise<WebdriverIO.Element>)=>{
    return (await element).getAttribute('value')
}
export let selectByVisibleText = async (element:Promise<WebdriverIO.Element>,text:string)=>{
    return (await element).selectByVisibleText(text)
}