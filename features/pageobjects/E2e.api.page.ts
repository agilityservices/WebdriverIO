import { click, getAttribute, getText, selectByVisibleText, setText } from "../shared/utilityFunctions.js";
import Page from "./page.js";



class E2eApiPage extends Page {
    get endPointElement() { return $('#urlvalue') }
    get ajaxButtonElement() { return $('#submitajax') }
    get statusCodeElement() { return $('#statuspre') }
    get statusSuccessElement() { return $('.alert-success') }
    get outPutDataElement() { return $('#outputpre') }
    get addParameterButton() { return $('#addprambutton') }



    public async enterApiEndPoint(endPoint: string) {
        await setText(this.endPointElement, endPoint)
    }
    public async clickAjaxButton() {
        await browser.pause(2000)
        await click(this.ajaxButtonElement)
        await browser.pause(2000)
    }

    public async getStatusText() {
        (await this.statusSuccessElement).waitForDisplayed()
        return await getText(this.statusCodeElement)
    }
    public async getOutputText() {
        (await this.outPutDataElement).waitForDisplayed()
        return await getText(this.outPutDataElement)
    }
    public async selectMethodDropdownInHttpPage(dropDownName: string, valueToSelect: string) {
        let dropdownArrowElement = $("//label[text()='" + dropDownName + "']/parent::div//select[@id='httpmethod']");
        // await click(dropdownArrowElement)
        // let selectDropDownElement = $("//option[text()='" + valueToSelect + "']");
        // await click(selectDropDownElement)
        // await browser.pause(3000)
        // let selectedDropDownElement = $("//label[text()='" + dropDownName + "']/parent::div//select[@id='httpmethod']");
        // let getDropdownTextInHttpPage = await getAttribute(selectedDropDownElement)
        // // console.log("getDropdownTextInHttpPage", getDropdownTextInHttpPage)
        // // expect(getDropdownTextInHttpPage).toEqual(valueToSelect)
        await selectByVisibleText(dropdownArrowElement,valueToSelect)
         let selectedDropDownElement = $("//label[text()='" + dropDownName + "']/parent::div//select[@id='httpmethod']");
        let getDropdownTextInHttpPage = await getAttribute(selectedDropDownElement)
        // expect(getDropdownTextInHttpPage).toEqual(valueToSelect)
    }

    public async clickAddParameter() {
        await click(this.addParameterButton)
        await browser.pause(2000)

    }
    public async enterParameter1(name: string, value: string) {
        let parameterName1Element = $("(//div[@id='allparameters']//input[contains(@class,'fakeinputname') and @value])[1]");
        let parameterValue1Element = $("(//div[@id='allparameters']//input[contains(@class,'input-xlarge realinputvalue') and @value])[1]");        
        await setText(parameterName1Element, name)
        await setText(parameterValue1Element, value)
    }
    public async enterParameter2(name: string, value: string) {
        let parameterName2Element = $("(//div[@id='allparameters']//input[contains(@class,'fakeinputname') and @value])[2]");
        let parameterValue2Element = $("(//div[@id='allparameters']//input[contains(@class,'input-xlarge realinputvalue') and @value])[2]");        
        await setText(parameterName2Element, name)
        await setText(parameterValue2Element, value)
    }
    

}
export default new E2eApiPage();
