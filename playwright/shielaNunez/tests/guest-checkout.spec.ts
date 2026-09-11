import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { NavBar } from '../pages/component/Navbar';
import { checkoutData } from '../test-data/checkoutData';

test('Should be able to checkout as guest', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const navBar = new NavBar(page);

    const product = 'Sony vaio i5';

    const customer = {
        name: 'John Doe',
        country: 'Philippines',
        city: 'Manila',
        card: '4012001037141112',
        month: '12',
        year: '2027'
    };

    await homePage.openHomePage();
    await homePage.chooseCategory(checkoutData.category);
    await homePage.chooseProduct(checkoutData.product);
    await productPage.checkProductPage(checkoutData.product);
    await productPage.addToCart();
    await navBar.navigateToCart();
    await cartPage.checkCartItem(checkoutData.product);
    await cartPage.placeOrder(
        checkoutData.customer.name,
        checkoutData.customer.country,
        checkoutData.customer.city,
        checkoutData.customer.card,
        checkoutData.customer.month,
        checkoutData.customer.year
    );
});