import { test } from '../fixtures/pageFixtures';
import { loginData } from '../test-data/loginData';
import { checkoutData } from '../test-data/checkoutData';

test('Should be able to checkout as a logged in user', async ({ pages }) => {
    await pages.homePage.openHomePage();
    await pages.loginModal.login(loginData.validUser.username, loginData.validUser.password);
    await pages.navBar.verifyNameOfUser(loginData.validUser.username);

    await pages.homePage.chooseCategory(checkoutData.category);
    await pages.homePage.chooseProduct(checkoutData.product);
    await pages.productPage.checkProductPage(checkoutData.product);
    await pages.productPage.addToCart();
    await pages.navBar.navigateToCart();
    await pages.cartPage.checkCartItem(checkoutData.product);
    await pages.cartPage.placeOrder(
        checkoutData.customer.name,
        checkoutData.customer.country,
        checkoutData.customer.city,
        checkoutData.customer.card,
        checkoutData.customer.month,
        checkoutData.customer.year
    );
});