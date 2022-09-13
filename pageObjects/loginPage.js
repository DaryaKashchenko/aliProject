const { test, expect } = require("@playwright/test")

class loginPage {

    constructor (page) {

        this.page = page
        this.username = page.locator('[data-test="username"]')
        this.password = page.locator('[data-test="password"]')
        this.lodinBtn = page.locator('#login-button')

    }
    
 async goTo () {
    await this.page.goto('https://www.saucedemo.com/')
 }

 async validLogin (username, password) {

    await this.username.type(username)
    await this.password.type(password)
    await this.lodinBtn.click()
 }

}

module.exports = { loginPage }