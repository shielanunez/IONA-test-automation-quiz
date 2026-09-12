import { test, expect } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { LoginModal } from '../pages/component/LoginModal';
import { loginData } from '../test-data/loginData';

test('Should be able to validation when entered invalid login credentials', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginModal = new LoginModal(page);

    await homePage.openHomePage();
    await loginModal.login(loginData.invalidUser.username, loginData.invalidUser.password);
    await loginModal.verifyInvalidLoginMsg('Wrong password.');
});

test('Should be able to validation when logged in without username', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginModal = new LoginModal(page);

    await homePage.openHomePage();
    await loginModal.login('', loginData.validUser.password);
    await loginModal.verifyInvalidLoginMsg('Please fill out Username and Password.');
});

test('Should be able to validat ion when logged in without password', async ({ page }) => {
    const homePage = new HomePage(page);
    const loginModal = new LoginModal(page);

    await homePage.openHomePage();
    await loginModal.login(loginData.validUser.username, '');
    await loginModal.verifyInvalidLoginMsg('Please fill out Username and Password.');
});