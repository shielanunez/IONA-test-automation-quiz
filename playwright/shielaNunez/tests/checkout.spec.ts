import { test, expect } from '../fixtures/pageFixtures';
import { checkoutData } from '../test-data/checkoutData';
import { loginData } from '../test-data/loginData';

const { category, product, customer } = checkoutData;

test.describe('Checkout', () => {
    test('Should be able to checkout as guest', async ({ pages }) => {
        await test.step('Given the user is on the home page', async () => {
            await pages.homePage.openHomePage();
        });

        await test.step(`When the user selects the ${category} category`, async () => {
            await pages.homePage.chooseCategory(category);
        });

        await test.step(`And the user selects the ${product} product`, async () => {
            await pages.homePage.chooseProduct(product);
        });

        await test.step(`Then the ${product} product page should be displayed`, async () => {
            await pages.productPage.checkProductPage(product);
        });

        await test.step(`When the user adds ${product} to the cart`, async () => {
            await pages.productPage.addToCart();
        });

        await test.step('And the user navigates to the cart', async () => {
            await pages.navBar.navigateToCart();
        });

        await test.step(`Then ${product} should be displayed in the cart`, async () => {
            await pages.cartPage.checkCartItem(product);
        });

        const totalAmount = await test.step(
            'And the cart total amount is calculated',
            async () => {
                return await pages.cartPage.getTotalAmount();
            }
        );

        const confirmationMessage = await test.step(
            'When the user places the order',
            async () => {
                return await pages.cartPage.placeOrder(
                    customer.name,
                    customer.country,
                    customer.city,
                    customer.card,
                    customer.month,
                    customer.year
                );
            }
        );

        await test.step(
            'Then the purchase confirmation should contain the correct details',
            async () => {
                expect(confirmationMessage).toContain(
                    `Amount: ${totalAmount} USD`
                );
                expect(confirmationMessage).toContain(
                    `Card Number: ${customer.card}`
                );
                expect(confirmationMessage).toContain(
                    `Name: ${customer.name}`
                );
                expect(confirmationMessage).toContain('Id:');
                expect(confirmationMessage).toContain('Date:');
            }
        );
    });

    test('Should be able to checkout as an authenticated user', async ({ pages }) => {
        await test.step('Given the user is on the home page', async () => {
            await pages.homePage.openHomePage();
        });

        await test.step('And the user logs in with valid credentials', async () => {
            await pages.loginModal.login(
                loginData.validUser.username,
                loginData.validUser.password
            );
        });

        await test.step('Then the logged in username should be displayed', async () => {
            await pages.navBar.verifyNameOfUser(
                loginData.validUser.username
            );
        });

        await test.step(`When the user selects the ${category} category`, async () => {
            await pages.homePage.chooseCategory(category);
        });

        await test.step(`And the user selects the ${product} product`, async () => {
            await pages.homePage.chooseProduct(product);
        });

        await test.step(`Then the ${product} product page should be displayed`, async () => {
            await pages.productPage.checkProductPage(product);
        });

        await test.step(`When the user adds ${product} to the cart`, async () => {
            await pages.productPage.addToCart();
        });

        await test.step('And the user navigates to the cart', async () => {
            await pages.navBar.navigateToCart();
        });

        await test.step(`Then ${product} should be displayed in the cart`, async () => {
            await pages.cartPage.checkCartItem(product);
        });

        const totalAmount = await test.step(
            'And the cart total amount is calculated',
            async () => {
                return await pages.cartPage.getTotalAmount();
            }
        );

        const confirmationMessage = await test.step(
            'When the user places the order',
            async () => {
                return await pages.cartPage.placeOrder(
                    customer.name,
                    customer.country,
                    customer.city,
                    customer.card,
                    customer.month,
                    customer.year
                );
            }
        );

        await test.step(
            'Then the purchase confirmation should contain the correct details',
            async () => {
                expect(confirmationMessage).toContain(
                    `Amount: ${totalAmount} USD`
                );
                expect(confirmationMessage).toContain(
                    `Card Number: ${customer.card}`
                );
                expect(confirmationMessage).toContain(
                    `Name: ${customer.name}`
                );
                expect(confirmationMessage).toContain('Id:');
                expect(confirmationMessage).toContain('Date:');
            }
        );
    });

    test('Should see a validation when placed order without name', async ({ pages }) => {
        await test.step('Given the user is on the home page', async () => {
            await pages.homePage.openHomePage();
        });

        await test.step(`When the user selects the ${category} category`, async () => {
            await pages.homePage.chooseCategory(category);
        });

        await test.step(`And the user selects the ${product} product`, async () => {
            await pages.homePage.chooseProduct(product);
        });

        await test.step(`Then the ${product} product page should be displayed`, async () => {
            await pages.productPage.checkProductPage(product);
        });

        await test.step(`When the user adds ${product} to the cart`, async () => {
            await pages.productPage.addToCart();
        });

        await test.step('And the user navigates to the cart', async () => {
            await pages.navBar.navigateToCart();
        });

        await test.step(`Then ${product} should be displayed in the cart`, async () => {
            await pages.cartPage.checkCartItem(product);
        });

        const dialogMessage = await test.step(
            'When the user places the order without a name',
            async () => {
                return await pages.cartPage.placeOrder(
                    '',
                    customer.country,
                    customer.city,
                    customer.card,
                    customer.month,
                    customer.year
                );
            }
        );

        await test.step('Then a name and credit card validation should be displayed', async () => {
            expect(dialogMessage).toBe(
                'Please fill out Name and Creditcard.'
            );
        });
    });

    test('Should see a validation when placed order without card', async ({ pages }) => {
        await test.step('Given the user is on the home page', async () => {
            await pages.homePage.openHomePage();
        });

        await test.step(`When the user selects the ${category} category`, async () => {
            await pages.homePage.chooseCategory(category);
        });

        await test.step(`And the user selects the ${product} product`, async () => {
            await pages.homePage.chooseProduct(product);
        });

        await test.step(`Then the ${product} product page should be displayed`, async () => {
            await pages.productPage.checkProductPage(product);
        });

        await test.step(`When the user adds ${product} to the cart`, async () => {
            await pages.productPage.addToCart();
        });

        await test.step('And the user navigates to the cart', async () => {
            await pages.navBar.navigateToCart();
        });

        await test.step(`Then ${product} should be displayed in the cart`, async () => {
            await pages.cartPage.checkCartItem(product);
        });

        const dialogMessage = await test.step(
            'When the user places the order without a credit card',
            async () => {
                return await pages.cartPage.placeOrder(
                    customer.name,
                    customer.country,
                    customer.city,
                    '',
                    customer.month,
                    customer.year
                );
            }
        );

        await test.step('Then a name and credit card validation should be displayed', async () => {
            expect(dialogMessage).toBe(
                'Please fill out Name and Creditcard.'
            );
        });
    });

    test('Should not be able to place an order when the cart is empty', async ({ pages }) => {
        await test.step('Given the user is on the home page', async () => {
            await pages.homePage.openHomePage();
        });

        await test.step('When the user navigates to the cart without adding any item', async () => {
            await pages.navBar.navigateToCart();
        });

        await test.step('Then the cart should be empty', async () => {
            await pages.cartPage.verifyCartIsEmpty();
        });

        await test.step('And the Place Order button should not be available', async () => {
            await pages.cartPage.verifyPlaceOrderIsNotAvailable();
        });
    });
    test('Should not be able to checkout with an invalid card format', async ({ pages }) => {
        await test.step('Given the user is on the home page', async () => {
            await pages.homePage.openHomePage();
        });

        await test.step(`When the user selects the ${category} category`, async () => {
            await pages.homePage.chooseCategory(category);
        });

        await test.step(`And the user selects the ${product} product`, async () => {
            await pages.homePage.chooseProduct(product);
        });

        await test.step(`Then the ${product} product page should be displayed`, async () => {
            await pages.productPage.checkProductPage(product);
        });

        await test.step(`When the user adds ${product} to the cart`, async () => {
            await pages.productPage.addToCart();
        });

        await test.step('And the user navigates to the cart', async () => {
            await pages.navBar.navigateToCart();
        });

        await test.step(`Then ${product} should be displayed in the cart`, async () => {
            await pages.cartPage.checkCartItem(product);
        });

        const dialogMessage = await test.step(
            'When the user places the order with an invalid card format',
            async () => {
                return await pages.cartPage.placeOrder(
                    customer.name,
                    customer.country,
                    customer.city,
                    'ABC123',
                    customer.month,
                    customer.year
                );
            }
        );

        await test.step(
            'Then a validation message for the invalid card should be displayed',
            async () => {
                expect(dialogMessage).toBe(
                    'Please enter a valid credit card number.'
                );
            }
        );
    });
});