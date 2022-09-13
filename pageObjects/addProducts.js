const { test, expect } = require('@playwright/test')

class addProducts {

    constructor (page) {
        this.page = page
        this.sauseLabsBike = page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]')
        this.removeBtnSauseLabs = page.locator('#remove-sauce-labs-bike-light')
        this.shoppingCardBadge = page.locator('.shopping_cart_badge')
        this.shoppingCardLink = page.locator('.shopping_cart_link')
        this.inventoryItemName = page.locator('.inventory_item_name')
        this.removeBtnInCard = page.locator('[data-test="remove-sauce-labs-bike-light"]')

        this.sauseBackpack = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')
        this.removeBackpackBtn = page.locator('[data-test="remove-sauce-labs-backpack"]')
        this.firstname = page.locator('[data-test="firstName"]')
        this.lastname = page.locator('[data-test="lastName"]')
        this.postalcode = page.locator('[data-test="postalCode"]')
        this.continueBtn = page.locator('[data-test="continue"]')
        this.title = page.locator('.title')
        this.completeOrder = page.locator('.complete-header')
        this.completeText = page.locator('.complete-text')
     }

    async addSauseLabsBackBike () {
        await this.sauseLabsBike.click()
    }

    async checkAddBtbIsChanged (removeBtnName) {
        const textRemove = await this.removeBtnSauseLabs.textContent()
        expect(textRemove).toEqual(removeBtnName)
    }

    async checkCardBadgeIsChanges (oneItenInCard) {
        const cardBadge = await this.shoppingCardBadge.textContent()
        expect(cardBadge).toEqual(oneItenInCard)
    }

    async clickShoppingCardLink () {
        await this.shoppingCardLink.click()
    }

    async checkInventoryItemName (productname) {
        const productName = await this.inventoryItemName.textContent()
        expect(productName).toEqual(productname)
    }

    async RemoveItemFromCard () {
        await this.removeBtnInCard.click()
    }

    async addSauseBackpack () {
        await this.sauseBackpack.click()
    }

    async checkRemoveBackpackBtn (removeBtnName) {
        const textRemove = await this.removeBackpackBtn.textContent()
        expect(textRemove).toEqual(removeBtnName)
    }

    async checkNameOfProductInTheCard (firstProductName) {
        const itemInCart = await this.inventoryItemName.textContent()
        expect(itemInCart).toEqual(firstProductName)
    }

    async checkoutBtnClick () {
        await this.page.locator('[data-test="checkout"]').click()
    }

    async addPersonalData (firstname, lastname, postalcode) {
        await this.firstname.type(firstname)
        await this.lastname.type(lastname)
        await this.postalcode.type(postalcode)
    }

    async clickContinueBtn () {
        await this.continueBtn.click()
    }

    async clickFinishBtn () {
        await this.page.locator('[data-test="finish"]').click()
    }

    async checkTitleAndHeader (checkoutText, thankYouForTheOrder, completeOrder) {
        const title = await this.title.textContent()
        expect(title).toEqual(checkoutText)
        const thankYouText = await this.completeOrder.textContent()
        expect(thankYouText).toEqual(thankYouForTheOrder) 
        const completeOrderText = await this.completeText.textContent()
        expect(completeOrderText).toEqual(completeOrder)
  
    }

    async goBackToProducts () {
        await this.page.locator('[data-test="back-to-products"]').click()
    }

    async inventoryNameClick() {
        await this.page.locator('.inventory_item_name').click()
    }

    async getProductNameDetail (productname) {
        const productNameDetail = await this.page.locator('.inventory_details_name.large_size').textContent()
        expect(productNameDetail).toEqual(productname)
    }

    async cancelBtn () {
        await this.page.locator('[data-test="cancel"]').click()
    }
}

module.exports = { addProducts}