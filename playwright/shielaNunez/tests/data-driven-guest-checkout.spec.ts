import { test, expect } from '../fixtures/pageFixtures';
import { checkoutDataScenarios } from '../test-data/checkoutDataScenarios';

for (const data of checkoutDataScenarios) {
    test(`Should be able to checkout as guest - ${data.product}`, async ({ pages }) => {
        const { category, product, customer } = data;

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
            'And the total cart amount is calculated',
            async () => {
                const total = await pages.cartPage.getTotalAmount();
                console.log(`Total amount: ${total}`);
                return total;
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

        await test.step('Then the order confirmation should contain the correct details', async () => {
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
        });
    });
}