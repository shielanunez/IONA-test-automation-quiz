import { Page, Locator, expect } from '@playwright/test'

export class ProductPage {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async checkProductPage(product: string) {
        expect(this.page.getByRole('heading', { name: product }));
    }

    async addToCart() {
        const dialogPromise = this.page.waitForEvent('dialog');
        await this.page.getByRole('link', { name: 'Add to cart' }).click();
        const dialog = await dialogPromise;
        expect(dialog.type()).toBe('alert');
        expect(dialog.message()).toBe('Product added');
        await dialog.accept();
    }
}   