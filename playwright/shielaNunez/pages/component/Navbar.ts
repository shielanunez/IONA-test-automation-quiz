import { Page, Locator } from '@playwright/test'

export class NavBar {
    private readonly page: Page;
    private readonly cartLink: Locator

    constructor(page: Page) {
        this.page = page;
        this.cartLink = this.page.getByRole('link', { name: 'Cart', exact: true });
    }

    async navigateToCart() {
        await this.cartLink.click();
    }
}