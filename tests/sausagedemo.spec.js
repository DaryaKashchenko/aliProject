// @ts-nocheck
const { test, expect } = require('@playwright/test');
let browser;

test.beforeEach (  async({page}) => {
  await page.goto('https://www.saucedemo.com/')
  await page.locator('[data-test="username"]').type('standard_user')
  await page.locator('[data-test="password"]').type('secret_sauce')
  await page.locator('#login-button').click()
  page.on('dialog', dialog => dialog.accept())
})

test ('add product - checkoutt - fill form - finish', async ({page}) => {
  
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  const textRemove = await page.locator('[data-test="remove-sauce-labs-backpack"]').textContent()
  expect(textRemove).toEqual('Remove')
  await page.locator('.shopping_cart_link').click()
  const itemInCart = await page.locator('.inventory_item_name').textContent()
  expect(itemInCart).toEqual('Sauce Labs Backpack')
  await page.locator('[data-test="checkout"]').click()
  await page.locator('[data-test="firstName"]').type('Darya')
  await page.locator('[data-test="lastName"]').type('Test')
  await page.locator('[data-test="postalCode"]').type('123456')
  await page.locator('[data-test="continue"]').click()
  await page.locator('[data-test="finish"]').click()
  const title = await page.locator('.title').textContent()
 
  expect(title).toEqual('Checkout: Complete!')
  const thankYouText = await page.locator('.complete-header').textContent()

  expect(thankYouText).toEqual('THANK YOU FOR YOUR ORDER') 
  const completeOrderText = await page.locator('.complete-text').textContent()
  
  expect(completeOrderText).toEqual('Your order has been dispatched, and will arrive just as fast as the pony can get there!')
  await page.locator('[data-test="back-to-products"]').click()

});

test ('add product - delete from the card', async ({page}) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
  const textRemove = await page.locator('#remove-sauce-labs-bike-light').textContent()
  expect(textRemove).toEqual('Remove')
  const cardBadge = await page.locator('.shopping_cart_badge').textContent()
  expect(cardBadge).toEqual('1')
  await page.locator('.shopping_cart_link').click()
  const productName = await page.locator('.inventory_item_name').textContent()
  expect(productName).toEqual('Sauce Labs Bike Light')
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click()
  await page.screenshot({path: 'screen/deletedItem.png'})

  
})

test ('check back to product from the card - check product still in the card', async ({page}) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
  const textRemove = await page.locator('#remove-sauce-labs-bike-light').textContent()
  expect(textRemove).toEqual('Remove')
  await page.locator('.shopping_cart_link').click()
  const productName = await page.locator('.inventory_item_name').textContent()
  expect(productName).toEqual('Sauce Labs Bike Light')
  await page.locator('.inventory_item_name').click()
  const productNameDetail = await page.locator('.inventory_details_name.large_size').textContent()
  expect(productNameDetail).toEqual('Sauce Labs Bike Light')
  await page.locator('[data-test="back-to-products"]').click()
  const cardBadge = await page.locator('.shopping_cart_badge').textContent()
  expect(cardBadge).toEqual('1')


})

test ('check remove from main page- check card', async ({page}) => {

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
  // const textRemove = await page.locator('[data-test="remove-sauce-labs-backpack"]').textContent()
  // expect(textRemove).toEqual('Remove')
  const cardBadge = await page.locator('.shopping_cart_badge').textContent()
  expect(cardBadge).toEqual('2')
  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click()
  const cardBadgeNew = await page.locator('.shopping_cart_badge').textContent()
  expect(cardBadgeNew).toEqual('1')


})

test ('chekout - cancel', async ({page}) => {
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  const textRemove = await page.locator('[data-test="remove-sauce-labs-backpack"]').textContent()
  expect(textRemove).toEqual('Remove')
  await page.locator('.shopping_cart_link').click()
  const itemInCart = await page.locator('.inventory_item_name').textContent()
  expect(itemInCart).toEqual('Sauce Labs Backpack')
  await page.locator('[data-test="checkout"]').click()
  await page.locator('[data-test="cancel"]').click()
  expect(itemInCart).toEqual('Sauce Labs Backpack')
  
})
