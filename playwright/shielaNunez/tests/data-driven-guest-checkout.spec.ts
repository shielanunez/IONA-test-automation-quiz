import { test, expect } from '../fixtures/pageFixtures';
import {
    checkoutCustomer,
    checkoutDataScenarios
} from '../test-data/checkoutData';

test.describe('Guest Checkout', () => {
    // Clean up the cart after each test to prevent cart data
    // from affecting subsequent tests.
    test.afterEach(async ({ pages }) => {
        await pages.homePage.openHomePage();
        await pages.navBar.navigateToCart();
        await pages.cartPage.clearCart();
        await pages.cartPage.verifyCartIsEmpty();
    });

    // Individual product checkout
    for (const data of checkoutDataScenarios) {
        test(
            `Should be able to checkout as guest - ${data.product}`,
            async ({ pages }) => {
                const { category, product } = data;

                await test.step(
                    'Given the user is on the home page',
                    async () => {
                        await pages.homePage.openHomePage();
                    }
                );

                await test.step(
                    `When the user selects the ${category} category`,
                    async () => {
                        await pages.homePage.chooseCategory(category);
                    }
                );

                await test.step(
                    `And the user selects the ${product} product`,
                    async () => {
                        await pages.homePage.chooseProduct(product);
                    }
                );

                await test.step(
                    `Then the ${product} product page should be displayed`,
                    async () => {
                        await pages.productPage.checkProductPage(product);
                    }
                );

                await test.step(
                    `When the user adds ${product} to the cart`,
                    async () => {
                        await pages.productPage.addToCart();
                    }
                );

                await test.step(
                    'And the user navigates to the cart',
                    async () => {
                        await pages.navBar.navigateToCart();
                    }
                );

                await test.step(
                    `Then ${product} should be displayed in the cart`,
                    async () => {
                        await pages.cartPage.checkCartItem(product);
                    }
                );

                // Calculate the cart total before placing the order
                // so it can be validated against the confirmation message.
                const totalAmount = await test.step(
                    'And the total cart amount is calculated',
                    async () => {
                        const total = await pages.cartPage.getTotalAmount();

                        console.log(`Total amount: ${total}`);

                        return total;
                    }
                );

                // Place the order using the shared customer data.
                const confirmationMessage = await test.step(
                    'When the user places the order',
                    async () => {
                        return await pages.cartPage.placeOrder(
                            checkoutCustomer.name,
                            checkoutCustomer.country,
                            checkoutCustomer.city,
                            checkoutCustomer.card,
                            checkoutCustomer.month,
                            checkoutCustomer.year
                        );
                    }
                );

                await test.step(
                    'Then the order confirmation should contain the correct details',
                    async () => {
                        expect(confirmationMessage).toContain(
                            `Amount: ${totalAmount} USD`
                        );

                        expect(confirmationMessage).toContain(
                            `Card Number: ${checkoutCustomer.card}`
                        );

                        expect(confirmationMessage).toContain(
                            `Name: ${checkoutCustomer.name}`
                        );

                        expect(confirmationMessage).toContain('Id:');
                        expect(confirmationMessage).toContain('Date:');
                    }
                );
            }
        );
    }

    // All products checkout
    test(
        'Should be able to checkout with all products',
        async ({ pages }) => {

            await test.step(
                'Given the user is on the home page',
                async () => {
                    await pages.homePage.openHomePage();
                }
            );

            await test.step(
                'When the user adds all products to the cart',
                async () => {
                    for (const data of checkoutDataScenarios) {
                        await pages.homePage.chooseCategory(
                            data.category
                        );

                        await pages.homePage.chooseProduct(
                            data.product
                        );

                        await pages.productPage.checkProductPage(
                            data.product
                        );

                        await pages.productPage.addToCart();

                        // Return to the home page before selecting
                        // the next product.
                        await pages.homePage.openHomePage();
                    }
                }
            );

            await test.step(
                'And the user navigates to the cart',
                async () => {
                    await pages.navBar.navigateToCart();
                }
            );

            await test.step(
                'Then all products should be displayed in the cart',
                async () => {
                    // Extract only the product names from the test data
                    // and pass them to the Page Object for verification.
                    const products = checkoutDataScenarios.map(
                        data => data.product
                    );

                    await pages.cartPage.checkCartItems(products);
                }
            );

            // Calculate the total of all products in the cart.
            const totalAmount = await test.step(
                'And the total cart amount is calculated',
                async () => {
                    const total = await pages.cartPage.getTotalAmount();

                    console.log(`Total amount: ${total}`);

                    return total;
                }
            );

            // Place ONE order containing all products.
            const confirmationMessage = await test.step(
                'When the user places the order',
                async () => {
                    return await pages.cartPage.placeOrder(
                        checkoutCustomer.name,
                        checkoutCustomer.country,
                        checkoutCustomer.city,
                        checkoutCustomer.card,
                        checkoutCustomer.month,
                        checkoutCustomer.year
                    );
                }
            );

            await test.step(
                'Then the order confirmation should contain the correct details',
                async () => {
                    expect(confirmationMessage).toContain(
                        `Amount: ${totalAmount} USD`
                    );

                    expect(confirmationMessage).toContain(
                        `Card Number: ${checkoutCustomer.card}`
                    );

                    expect(confirmationMessage).toContain(
                        `Name: ${checkoutCustomer.name}`
                    );

                    expect(confirmationMessage).toContain('Id:');
                    expect(confirmationMessage).toContain('Date:');
                }
            );
        }
    );
});