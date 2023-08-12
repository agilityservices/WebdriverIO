import { Given, When, Then } from '@wdio/cucumber-framework';

import LoginPage from '../pageobjects/login.page.js';
import SecurePage from '../pageobjects/secure.page.js';
import HomePage from '../pageobjects/home.page.js';
import RegisterPage from '../pageobjects/register.page.js';

const pages = { login: LoginPage }

Given(/^I am on the login page$/, async () => {
    // await HomePage.openUrl("https://the-internet.herokuapp.com/login")
    await browser.url("https://the-internet.herokuapp.com/login")
});

When(/^I login with (\w+) and (.+)$/, async (username, password) => {
    // await LoginPage.login(username, password)
    await RegisterPage.register(username, password)
});

Then(/^I should see a flash message saying (.*)$/, async (message) => {
    await expect(SecurePage.flashAlert).toBeExisting();
    await expect(SecurePage.flashAlert).toHaveTextContaining(message);
});
// 
Given(/^I am on the register page$/, async () => {
    await browser.url("https://mytestingthoughts.com/Sample/home.html")
    await browser.maximizeWindow()
});
When(/^user enter fullname (\w+) lastname (.+)$/, async (fname, lname) => {
    // await LoginPage.login(username, password)
    await RegisterPage.enterFirstName(fname)
    await RegisterPage.enterLastName(lname)
});
When(/^user enter below personal details$/, async (data) => {
    var arrayOFObjectsToConvert = data.hashes();
    var fieldNames: string = arrayOFObjectsToConvert.map(function (obj: { fieldName: any; }) {
        return obj.fieldName;
    });
    var valueToEnter: string = arrayOFObjectsToConvert.map(function (obj: { dataToEnter: any; }) {
        return obj.dataToEnter;
    });


    for (let i = 0; i < fieldNames.length; i++) {
        const element = fieldNames[i];
        console.log(element)
        if (fieldNames[i] == "Address") {
            await RegisterPage.enterAddress(valueToEnter[i])
        } else if (fieldNames[i] == "E-Mail") {
            await RegisterPage.enterEmail(valueToEnter[i])

        } else if (fieldNames[i] == "Contact No.") {
            await RegisterPage.enterPhone(valueToEnter[i])

        } else if (fieldNames[i] == "Department / Office") {
            await RegisterPage.selectDropdownInRegisterPage("Department / Office", valueToEnter[i])
        }
        else {
            console.log("Field name did not match")
            expect(true).toBe(false)
        }
    }
});
When(/^click below radio button in register page$/, async (data) => {
    var arrayOFObjectsToConvert = data.hashes();
    var fieldNames: string = arrayOFObjectsToConvert.map(function (obj: { fieldName: any; }) {
        return obj.fieldName;
    });

    for (let i = 0; i < fieldNames.length; i++) {
        await RegisterPage.clickRadioButton(fieldNames[i])
    }
});

When(/^user clicks submit button in register page$/, async () => {
    await RegisterPage.clickSubmitButton()
});
When(/^user should get success message as (.*)$/, async (message) => {
    await RegisterPage.successMessage(message)
});

When(/^verify the registered users in register page$/, async (data) => {
    var arrayOFObjectsToConvert = data.hashes();
    var firstNames: string = arrayOFObjectsToConvert.map(function (obj: { FirstName: any; }) {
        return obj.FirstName;
    });
    var lastNames: string = arrayOFObjectsToConvert.map(function (obj: { LastName: any; }) {
        return obj.LastName;
    });
    var deparments: string = arrayOFObjectsToConvert.map(function (obj: { Department: any; }) {
        return obj.Department;
    });
    var emails: string = arrayOFObjectsToConvert.map(function (obj: { Email: any; }) {
        return obj.Email;
    });
    var contactNos: string = arrayOFObjectsToConvert.map(function (obj: { ContactNo: any; }) {
        return obj.ContactNo;
    });


    for (let i = 1; i <= firstNames.length; i++) {
        let row = $("//td[text()='" + firstNames[i-1] + "']/ancestor::tbody//tr")
        console.log("firstnamesare:" + i + firstNames[i-1])
        let isfnameRowPresent: boolean = await RegisterPage.isElementDisplay(row)

        if (isfnameRowPresent == true) {
            let noOfColumnsInTable = $$("//td[text()='" + firstNames[i-1] + "']/ancestor::tr/td")
            console.log("await noOfColumnsInTable.length" + await noOfColumnsInTable.length)
            expect(await noOfColumnsInTable.length).toEqual(5)
            for (let column = 1; column <= await noOfColumnsInTable.length; column++) {
                let currentColumnElement = noOfColumnsInTable[column - 1];
                let currentColumnText = await RegisterPage.getText(currentColumnElement)
                if (column == 1) {
                    console.log("column==" + column + " currentColumnText:" + currentColumnText + " found" + firstNames[i-1])
                    expect(currentColumnText).toBe(firstNames[i-1])
                } else if (column == 2) {
                    console.log("column==" + column + " currentColumnText:" + currentColumnText + " found" + lastNames[i-1])

                    expect(currentColumnText).toBe(lastNames[i-1])

                } else if (column == 3) {
                    console.log("column==" + column + " currentColumnText:" + currentColumnText + " found" + deparments[i-1])

                    expect(currentColumnText).toBe(deparments[i-1])

                } else if (column == 4) {
                    console.log("column==" + column + " currentColumnText:" + currentColumnText + " found" + emails[i-1])

                    expect(currentColumnText).toBe(emails[i-1])

                } else if (column == 5) {
                    console.log("column==" + column + " currentColumnText:" + currentColumnText + " found" + contactNos[i-1])

                    expect(currentColumnText).toBe(contactNos[i-1])

                } else {
                    console.log("More than required columns displayed")
                    expect(true).toEqual(false)
                }


            }

        }
        else {
            console.log("Field name did not match")
            expect(true).toBe(false)
        }
    }
});


