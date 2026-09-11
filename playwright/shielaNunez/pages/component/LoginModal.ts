import {Page, Locator} from '@playwright/test'
import { NavBar } from './Navbar';

export class LoginModal {
    private readonly page: Page;
    private readonly loginModalTitle: Locator;
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginBtn: Locator;
    private readonly navbar: NavBar;


    constructor(page: Page){
        this.page = page;
        this.navbar = new NavBar(page);
        this.loginModalTitle = this.page.locator('#logInModalLabel').describe('Login Modal title');
        this.usernameInput = this.page.locator('#loginusername').describe('Username input field');
        this.passwordInput = this.page.locator('#loginpassword').describe('Password input field');
        this.loginBtn = this.page.getByRole('button', { name: 'Log in'}).describe('Log in button');

    }

    async login(username: string, password: string){
         await this.navbar.openLoginModal();
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
        await this.navbar.verifyNameOfUser(username);
    }

}