import { expect, Locator, Page } from '@playwright/test';
import { handleDialog } from '../utils/dialog';

export class CartPage {
    private readonly page: Page;
    private readonly placeOrderBtn: Locator;
    private readonly orderModal: Locator;
    private readonly nameInput: Locator;
    private readonly countryInput: Locator;
    private readonly cityInput: Locator;
    private readonly cardInput: Locator;
    private readonly monthInput: Locator;
    private readonly yearInput: Locator;
    private readonly purchaseBtn: Locator;

    constructor(page: Page) {
        this.page = page;

        this.placeOrderBtn = page
            .getByRole('button', { name: 'Place Order' })
            .describe('Place Order button');

        this.orderModal = page
            .locator('#orderModal')
            .describe('Place Order modal');

        this.nameInput = this.orderModal.locator('#name');
        this.countryInput = this.orderModal.locator('#country');
        this.cityInput = this.orderModal.locator('#city');
        this.cardInput = this.orderModal.locator('#card');
        this.monthInput = this.orderModal.locator('#month');
        this.yearInput = this.orderModal.locator('#year');

        this.purchaseBtn = this.orderModal
            .getByRole('button', { name: 'Purchase' })
            .describe('Purchase button');
    }

    async checkCartPage() {
        await expect(this.page).toHaveURL(/\/cart\.html$/);
    }

    async checkCartItem(product: string) {
        const productRow = this.page
            .locator('#tbodyid tr')
            .filter({ hasText: product })
            .first();

        await expect(productRow).toBeVisible();
        await expect(productRow).toContainText(product);
    }

    async placeOrder(
        name: string,
        country: string,
        city: string,
        card: string,
        month: string,
        year: string
    ): Promise<string | undefined> {
        await this.openOrderModal();

        await this.nameInput.fill(name);
        await this.countryInput.fill(country);
        await this.cityInput.fill(city);
        await this.cardInput.fill(card);
        await this.monthInput.fill(month);
        await this.yearInput.fill(year);

        return await handleDialog(
            this.page,
            () => this.purchaseBtn.click({ force: true })
        );
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

        await confirmation
            .getByRole('button', { name: 'OK' })
            .click();
    }

    private async openOrderModal() {
        await this.placeOrderBtn.click();
        await expect(this.orderModal).toBeVisible();
    }
}