import { test, expect } from '../fixtures/pageFixtures';
import { checkoutData } from '../test-data/checkoutData';

test('Should see a validation when placed order without name', async ({ pages }) => {
    const { category, product, customer } = checkoutData;
    await pages.homePage.openHomePage();
    await pages.homePage.chooseCategory(category);
    await pages.homePage.chooseProduct(product);
    await pages.productPage.checkProductPage(product);
    await pages.productPage.addToCart();
    await pages.navBar.navigateToCart();
    await pages.cartPage.checkCartItem(product);
    const dialogMessage = await pages.cartPage.placeOrder(
        '',
        customer.country,
        customer.city,
        customer.card,
        customer.month,
        customer.year
    );
    expect(dialogMessage).toBe(
        'Please fill out Name and Creditcard.'
    );
});

test('Should see a validation when placed order without card', async ({ pages }) => {
    const { category, product, customer } = checkoutData;
    await pages.homePage.openHomePage();
    await pages.homePage.chooseCategory(category);
    await pages.homePage.chooseProduct(product);
    await pages.productPage.checkProductPage(product);
    await pages.productPage.addToCart();
    await pages.navBar.navigateToCart();
    await pages.cartPage.checkCartItem(product);
    const dialogMessage = await pages.cartPage.placeOrder(
        customer.name,
        customer.country,
        customer.city,
        '',
        customer.month,
        customer.year
    );
    expect(dialogMessage).toBe(
        'Please fill out Name and Creditcard.'
    );
});