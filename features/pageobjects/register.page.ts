import Page from './page.js';


class RegisterPage extends Page {
    get fullNameFirstNameTextBox() { return $("//input[@placeholder='First Name']") }
    get fullNameLastNameITextBox() { return $("//input[@placeholder='Last Name']") }
    get submitButtonElement() { return $("[type='submit']") }
    get headerOfRegisterPageElement() { return $("//*[@id='header']//h1") }
    get emailAddressTextBox() { return $("//label[text()='E-Mail']/parent::div//input") }
    get address() { return $("//label[text()='Current Address']/parent::div/following::div/textarea") }
    get phoneTextBox() { return $("//label[text()='Contact No.']/parent::div//input") }
    // get femaleRadioButtonElement() { return $("//input/following-sibling::label[text()='Female']") }
    get maleRadioButtonElement() { return $("//input/following-sibling::label[text()='Male']") }
    // readonly radioButtonElement: string = "//input/following-sibling::label[text()='replace']"
    get successMessageElement() { return $('#success_message') }


    public async enterFirstName(fname: string) {
        await this.click(this.fullNameFirstNameTextBox)
        await this.setText(this.fullNameFirstNameTextBox, fname)

    }
    public async enterLastName(lname: string) {
        await this.click(this.fullNameLastNameITextBox)
        await this.setText(this.fullNameLastNameITextBox, lname)
    }
    public async register(username: string, password: string) {
        await this.enterFirstName(username)
        await this.enterLastName(password)
        await this.click(this.submitButtonElement)
    }
    public async enterEmail(address: string) {
        await this.click(this.emailAddressTextBox)
        await this.setText(this.emailAddressTextBox, address)
    }
    public async enterAddress(email: string) {
        await this.click(this.address)
        await this.setText(this.address, email)
    } public async enterPhone(phone: string) {
        await this.click(this.phoneTextBox)
        await this.setText(this.phoneTextBox, phone)
    }
    public async clickRadioButton(radioOption: string) {

        if (radioOption == 'Female') {
            let femaleRadioButtonElement = $("//input/following-sibling::label[text()='Female']");
            await browser.pause(2000)
            await this.click(femaleRadioButtonElement)
            //ask goutam
            console.log("radio button selected ", (await femaleRadioButtonElement).isSelected())
            // expect((await femaleRadioButtonElement).isSelected()).toBe(true)

        } else if (radioOption == 'Male') {
            await this.click(this.maleRadioButtonElement)
            expect((await this.maleRadioButtonElement).isSelected()).toBe(true)
        }
        else {
            console.log("Field name did not match")
            expect(true).toBe(false)
        }
    }

    public async selectDropdownInRegisterPage(dropDownName: string, valueToSelect: string) {
        let dropdownArrowElement = $("//label[text()='" + dropDownName + "']/parent::div//select[@name='department']");
        await this.click(dropdownArrowElement)
        let selectDropDownElement = $("//option[text()='" + valueToSelect + "']");
        await this.click(selectDropDownElement)
        await browser.pause(3000)
        let selectedDropDownElement = $("//label[text()='" + dropDownName + "']/parent::div//select[@name='department']");
        console.log("selectDropdownInRegisterPage", await this.getAttribute(selectedDropDownElement))

        // expect(await this.getAttribute(selectedDropDownElement)).toEqual(valueToSelect)
    }
    public async clickSubmitButton() {
        await this.click(this.submitButtonElement)
    }
    public async successMessage(message: string) {
        let successMessageText = await this.getText(this.successMessageElement)
        console.log("successMessage,", successMessageText)
        expect(successMessageText).toBe(message)
    }

    

}
export default new RegisterPage();