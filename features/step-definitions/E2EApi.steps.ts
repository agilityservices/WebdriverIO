import { Given, Then, When } from "@wdio/cucumber-framework";
import E2eApiPage from "../pageobjects/E2e.api.page.js";
import { BASE_URI, BASE_URI1 } from "../config/APIconfig.js";
import supertest from 'supertest'

let request = supertest(BASE_URI1)

let TOKEN = "01bd866b482f7803d5d7e3c89edd27a224a9fbe0beb3e14b95ce76b8fc2265f0"
let userId: any
let response: supertest.Response

Given(/^I am on page (.+)$/, async (Pageurl: string) => {
    await E2eApiPage.openUrl(Pageurl)
});
When(/^I perforn (.+) user search$/, async (endPoint: string) => {
    await E2eApiPage.enterApiEndPoint(BASE_URI + endPoint)
    await E2eApiPage.clickAjaxButton()
});

When(/^I make GET (.+) api call$/, async (endPoint: string) => {

    response = await request.get(endPoint)
    console.log("GET Api response call:", response.body)

});
Then(/^I validate the search results$/, async () => {
    let ui_statusCode = await E2eApiPage.getStatusText()
    console.log("STATUS FROM UI:", ui_statusCode)

    let ui_responseOutput = JSON.parse(await E2eApiPage.getOutputText())
    console.log("Response FROM UI:", ui_responseOutput)

    // expect(ui_statusCode).toContain(response.statusCode.toString())
    // expect(ui_responseOutput).toEqual(response.body)
    // expect(ui_responseOutput.data.email).toEqual(response.body.data.email)

});
// 
When(/^I perforn create user using post api (.+)$/, async (endPoint: string) => {
    await E2eApiPage.selectMethodDropdownInHttpPage("Method", "POST")
    await E2eApiPage.enterApiEndPoint(BASE_URI + endPoint)
    await E2eApiPage.clickAddParameter()
    await E2eApiPage.enterParameter1("name", "Geetha1")
    await E2eApiPage.clickAddParameter()
    await E2eApiPage.enterParameter2("job", "Techie1")
    await E2eApiPage.clickAjaxButton()
});
When(/^I make POST (.+) api call$/, async (endPoint: string) => {
    // let res = await request.post('/token').set("Content-Type","application/json")
    // let tok = await res.body.access_token
    // console.log("token",tok)  
    // 

    let payload = {

        "id": `ID-${Math.floor(Math.random() * 9999)}`,
        "name": `geetha-${Math.floor(Math.random() * 9999)}`,
        "email": `Geetha-${Math.floor(Math.random() * 9999)}@gmail.com`,
        "gender": "female",
        "status": "inactive"

    }
    response = await request.post(endPoint).set("Authorization", `Bearer ${TOKEN}`).send(payload);
    console.log("API Resonse Body", response.body.id)
    expect(payload.name).toEqual(response.body.name)
    userId = response.body.id

});
Then(/^I validate the created user search results$/, async () => {
    let ui_statusCode = await E2eApiPage.getStatusText()
    console.log("STATUS FROM UI:", ui_statusCode)

    let ui_responseOutput = JSON.parse(await E2eApiPage.getOutputText())
    console.log("Response FROM UI:", ui_responseOutput)
    console.log("Status Code FROM api:", response)

    expect(ui_statusCode).toContain(response.statusCode.toString())
    expect(ui_responseOutput).toEqual(response.body)
    expect(ui_responseOutput.data.email).toEqual(response.body.data.email)

});
Then(/^UPDATE the user (.+)$/, async (endPoint) => {
    console.log("Update user", userId)
    let header = { "Authorization":`Bearer ${TOKEN}`}
    let payload = {

        "id": userId,
        "name": "Geetha Maddirala",
        "email": `Geetha Maddirala-${Math.floor(Math.random() * 9999)}@gmail.com`,
        "gender": "female",
        "status": "inactive"

    }
    response = await request.put(endPoint).set(header).send(payload)
    expect(response.statusCode).toEqual(204)
});

Then(/^DELETE the user (.+)$/, async (endPoint) => {
    console.log("DELETE user", userId)
    let header = { 'Authorization': 'Bearer ' + TOKEN + '', 'Content-Type': 'application/json' }

    response = await request.delete(endPoint + '/' + userId).set(header)
    expect(response.statusCode).toEqual(204)

});
