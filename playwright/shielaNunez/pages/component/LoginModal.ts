import { expect, Locator, Page } from '@playwright/test';
import { NavBar } from './Navbar';

export class LoginModal {
    private readonly page: Page;
    private readonly navbar: NavBar;
    private readonly loginModal: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginBtn: Locator;

    private loginDialogMessage?: string;

    constructor(page: Page) {
        this.page = page;
        this.navbar = new NavBar(page);

        this.loginModal = page
            .locator('#logInModal')
            .describe('Login modal');

        this.usernameInput = this.loginModal
            .locator('#loginusername')
            .describe('Username input field');

        this.passwordInput = this.loginModal
            .locator('#loginpassword')
            .describe('Password input field');

        this.loginBtn = this.loginModal
            .getByRole('button', { name: 'Log in' })
            .describe('Log in button');
    }

    async login(username: string, password: string) {
        await this.navbar.openLoginModal();

        await expect(this.loginModal).toBeVisible();

        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);

        const dialogPromise = new Promise<string>((resolve) => {
            this.page.once('dialog', async (dialog) => {
                expect(dialog.type()).toBe('alert');

                const message = dialog.message();

                await dialog.accept();

                resolve(message);
            });
        });

        await this.loginBtn.click({ force: true });

        this.loginDialogMessage = await dialogPromise;
    }

    async verifyInvalidLoginMsg(expectedMessage: string) {
        expect(this.loginDialogMessage).toBe(expectedMessage);
    }
}