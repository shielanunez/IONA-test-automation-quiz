import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { NavBar } from '../pages/component/Navbar';
import { LoginModal } from '../pages/component/LoginModal';
import { loginData } from '../test-data/loginData';
import { checkoutData } from '../test-data/checkoutData';

test('Should be able to checkout as guest', async ({ page }) => {
    const homePage = new HomePage(page);
    const productPage = new ProductPage(page);
    const cartPage = new CartPage(page);
    const navBar = new NavBar(page);
    const loginModal = new LoginModal(page);

    await homePage.openHomePage();
    await loginModal.login(loginData.validUser.username, loginData.validUser.password);

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