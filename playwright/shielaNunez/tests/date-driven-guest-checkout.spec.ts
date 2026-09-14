import { test } from '../fixtures/pageFixtures';
import { checkoutData } from '../test-data/checkoutData';
import { checkoutDataScenarios } from '../test-data/checkoutDataScenarios';

for (const data of checkoutDataScenarios) {
    test(`Should be able to checkout as guest - ${data.product}`, async ({ pages }) => {
        const { category, product, customer } = data;

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
}