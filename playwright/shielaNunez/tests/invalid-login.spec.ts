import { test } from '../fixtures/pageFixtures';
import { loginData } from '../test-data/loginData';

test('Should be able to validate when entered invalid login credentials', async ({ pages }) => {
    await pages.homePage.openHomePage();
    await pages.loginModal.loginExpectingValidationError(loginData.invalidUser.username, loginData.invalidUser.password);
    await pages.loginModal.verifyInvalidLoginMsg('Wrong password.');
});

test('Should be able to validate when logged in without username', async ({ pages }) => {
    await pages.homePage.openHomePage();
    await pages.loginModal.loginExpectingValidationError('', loginData.validUser.password);
    await pages.loginModal.verifyInvalidLoginMsg('Please fill out Username and Password.');
});

test('Should be able to validate when logged in without password', async ({ pages }) => {
    await pages.homePage.openHomePage();
    await pages.loginModal.loginExpectingValidationError(loginData.validUser.username, '');
    await pages.loginModal.verifyInvalidLoginMsg('Please fill out Username and Password.');
});