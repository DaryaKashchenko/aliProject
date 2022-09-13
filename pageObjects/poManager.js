const {loginPage} = require('./loginPage')
const {addProducts} = require('./addProducts')

class poManager {

    constructor (page) {
        this.page = page
        this.LoginPage = new loginPage(page)
        this.AddProsucts = new addProducts(page)

    }

    getLoginPage () {
        return this.LoginPage
    }

    getAddProductPage () {
        return this.AddProsucts
    }
}

module.exports = { poManager }