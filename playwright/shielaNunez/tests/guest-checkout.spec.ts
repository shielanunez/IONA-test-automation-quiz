import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';
import { NavBar } from '../pages/component/Navbar';

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
    await homePage.chooseCategory('Laptops');
    await homePage.chooseProduct(product);
    await productPage.checkProductPage(product);
    await productPage.addToCart();
    await navBar.navigateToCart();
    await cartPage.checkCartItem(product);
    await cartPage.placeOrder(
        customer.name,
        customer.country,
        customer.city,
        customer.card,
        customer.month,
        customer.year
    );
});