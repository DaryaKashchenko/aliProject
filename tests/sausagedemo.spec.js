// @ts-nocheck
const { test, expect } = require('@playwright/test');
const { loginPage } = require('../pageObjects/loginPage') 
const {poManager } =  require('../pageObjects/poManager')
const { addProducts } = require('../pageObjects/addProducts')
const dataSet = JSON.parse(JSON.stringify(require('../utils/testData.json')))
let browser;

for (const data of dataSet ) {

test.beforeEach (  async({page}) => {

  const PoManager = new poManager(page)
  const LoginPage = PoManager.getLoginPage()
  await LoginPage.goTo()
  await LoginPage.validLogin(data.username, data.password)
  page.on('dialog', dialog => dialog.accept())
})

test ('add product - checkout - fill form - finish', async ({page}) => {

  const PoManager = new poManager(page)
  const AddProsucts = PoManager.getAddProductPage()
  await AddProsucts.addSauseBackpack ()
  await AddProsucts.checkRemoveBackpackBtn(data.removeBtnName)
  await AddProsucts.clickShoppingCardLink ()
  await AddProsucts.checkNameOfProductInTheCard (data.firstProductName)
  await AddProsucts.checkoutBtnClick ()
  await AddProsucts.addPersonalData (data.firstname, data.lastname, data.postalcode)
  await AddProsucts.clickContinueBtn ()
  await AddProsucts.clickFinishBtn ()
  await AddProsucts.checkTitleAndHeader (data.checkoutText, data.thankYouForTheOrder, data.completeOrder)
  await AddProsucts.goBackToProducts ()

});

test  ('add product - delete from the card', async ({page}) => {

  const PoManager = new poManager(page)
  const AddProsucts = PoManager.getAddProductPage()
  await AddProsucts.addSauseLabsBackBike()
  await AddProsucts.checkAddBtbIsChanged(data.removeBtnName)
  await AddProsucts.checkCardBadgeIsChanges(data.oneItenInCard)
  await AddProsucts.clickShoppingCardLink ()
  await AddProsucts.checkInventoryItemName (data.productname)
  await AddProsucts.RemoveItemFromCard ()
  await page.screenshot({path: 'screen/deletedItem.png'})

  
})

test ('check back to product from the card - check product still in the card', async ({page}) => {
  
  const PoManager = new poManager(page)
  const AddProsucts = PoManager.getAddProductPage()
  await AddProsucts.addSauseLabsBackBike()
  await AddProsucts.checkAddBtbIsChanged(data.removeBtnName)
  await AddProsucts.clickShoppingCardLink ()
  await AddProsucts.checkInventoryItemName (data.productname)
  await AddProsucts.inventoryNameClick()
  await AddProsucts.getProductNameDetail (data.productname)
  await AddProsucts.goBackToProducts ()
  await AddProsucts.checkCardBadgeIsChanges (data.oneItenInCard)


})

test ('check remove from main page- check card', async ({page}) => {

  const PoManager = new poManager(page)
  const AddProsucts = PoManager.getAddProductPage()
  await AddProsucts.addSauseBackpack ()
  await AddProsucts.addSauseLabsBackBike ()
  await AddProsucts.checkCardBadgeIsChanges (data.twoItemsInCard)
  await AddProsucts.RemoveItemFromCard ()
  await AddProsucts.checkCardBadgeIsChanges (data.oneItenInCard)


})

test.only ('chekout - cancel', async ({page}) => {

  const PoManager = new poManager(page)
  const AddProsucts = PoManager.getAddProductPage()
  await AddProsucts.addSauseBackpack ()
  await AddProsucts.checkRemoveBackpackBtn(data.removeBtnName)
  await AddProsucts.clickShoppingCardLink ()
  await AddProsucts.checkNameOfProductInTheCard (data.firstProductName)
  await AddProsucts.checkoutBtnClick ()
  await AddProsucts.cancelBtn ()
  await AddProsucts.checkNameOfProductInTheCard (data.firstProductName)
  
})
}