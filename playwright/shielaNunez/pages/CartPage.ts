import { Page, Locator, expect } from '@playwright/test'

export class CartPage {
    private readonly page: Page;
    private readonly placeOrderBtn: Locator;
    private readonly nameInput: Locator;
    private readonly countryInput: Locator;
    private readonly cityInput: Locator;
    private readonly cardInput: Locator;
    private readonly monthInput: Locator;
    private readonly yearInput: Locator;
    private readonly purchaseBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.placeOrderBtn = this.page.getByRole('button', { name: 'Place Order' })
            .describe('Place Order button')
        this.nameInput = page.locator('#name');
        this.countryInput = page.locator('#country');
        this.cityInput = page.locator('#city');
        this.cardInput = page.locator('#card');
        this.monthInput = page.locator('#month');
        this.yearInput = page.locator('#year');
        this.purchaseBtn = page.getByRole('button', { name: 'Purchase' });
    }

    async checkCartPage() {
        expect(this.page).toHaveURL(/\/cart\.html$/);
    }

    async checkCartItem(product: string) {
        expect(this.page.locator('#tbodyid')).toContainText(product);
    }

    async placeOrder(
        name: string,
        country: string,
        city: string,
        card: string,
        month: string,
        year: string
    ) {
        await this.placeOrderBtn.click();
        await expect(this.page.locator('[data-target="#orderModal"]'))
            .toBeVisible();
        await this.nameInput.fill(name);
        await this.countryInput.fill(country);
        await this.cityInput.fill(city);
        await this.cardInput.fill(card);
        await this.monthInput.fill(month);
        await this.yearInput.fill(year);
        await this.purchaseBtn.click();


    }

    async verifyAndCloseOrderConfirmation(
        name: string,
        card: string,
        amount: number
    ) {
        const confirmation = this.page.getByRole('dialog');

        await expect(confirmation).toContainText(`Amount: ${amount} USD`);
        await expect(confirmation).toContainText(`Card Number: ${card}`);
        await expect(confirmation).toContainText(`Name: ${name}`);
        await expect(confirmation).toContainText('Id:');
        await expect(confirmation).toContainText('Date:');
        await this.page.getByRole('button', { name: 'OK' }).click();
    }

}