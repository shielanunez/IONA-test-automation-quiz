import { test } from '../fixtures/pageFixtures';
import { checkoutData } from '../test-data/checkoutData';

test('Should be able to checkout as guest', async ({ pages }) => {
    const { category, product, customer } = checkoutData;
    await pages.homePage.openHomePage();
    await pages.homePage.chooseCategory(category);
    await pages.homePage.chooseProduct(product);
    await pages.productPage.checkProductPage(product);
    await pages.productPage.addToCart();
    await pages.navBar.navigateToCart();
    await pages.cartPage.checkCartItem(product);
    await pages.cartPage.placeOrder(
        customer.name,
        customer.country,
        customer.city,
        customer.card,
        customer.month,
        customer.year
    );
});