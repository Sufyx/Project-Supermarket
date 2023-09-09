/**
 * 
 */


import { test, expect } from '@playwright/test';
import {
    getRandomBirthDate, getRandomPhoneNumber
} from '../test-utils/utils';


test('successful sign-in', async ({ page }) => {
    await page.goto('/');
    await page.click('button >> text=Sign In');

    await page.getByLabel('Email').fill('testest404@tmail.tom');
    await page.getByLabel('Password').fill('topsecret404');

    // await page.fill('input[name="email-input"]', 'testest404@tmail.tom');
    // await page.fill('input[name="password"]', 'topsecret404');

    await page.click('button >> text=Submit');
    await expect(page.locator('.userGreet')).toContainText('Testus Testerson');
});

test('successful sign-up', async ({ page }) => {
    const identifier = Date.now().toString(); // change to uuid?

    await page.goto('/');
    await page.click('button >> text=Sign Up');

    await page.getByLabel('Email').fill(`${identifier}@signup-test.com`);
    await page.getByLabel('Password').fill(`${identifier}`);
    await page.getByLabel('Confirm').fill(`${identifier}`);
    await page.getByLabel('Name').fill(`PW-test ${identifier.slice(-5)}`);
    await page.getByLabel('Date of Birth').click();
    await page.getByLabel('Date of Birth').fill(getRandomBirthDate());
    await page.getByLabel('Phone Number').fill(getRandomPhoneNumber());

    await page.click('button >> text=Submit');
    await expect(page.locator('.userGreet')).toContainText(identifier.slice(-5));
});

test('sign-up -> sign-out -> sign-in', async ({ page }) => {
    const identifier = Date.now().toString();

    await page.goto('/');
    await page.click('button >> text=Sign Up');
    await page.getByLabel('Email').fill(`${identifier}@signup-test.com`);
    await page.getByLabel('Password').fill(`${identifier}`);
    await page.getByLabel('Confirm').fill(`${identifier}`);
    await page.getByLabel('Name').fill(`PW-test ${identifier.slice(-5)}`);
    await page.getByLabel('Date of Birth').click();
    await page.getByLabel('Date of Birth').fill(getRandomBirthDate());
    await page.getByLabel('Phone Number').fill(getRandomPhoneNumber());
    await page.click('button >> text=Submit');
    await expect(page.locator('.userGreet')).toContainText(identifier.slice(-5));

    await page.click('button >> text=Sign Out');
    await expect(page.locator('.userGreet')).toContainText("Please sign in / sign up");

    await page.click('button >> text=Sign In');
    await page.getByLabel('Email').fill(`${identifier}@signup-test.com`);
    await page.getByLabel('Password').fill(`${identifier}`);
    await page.click('button >> text=Submit');
    await expect(page.locator('.userGreet')).toContainText(identifier.slice(-5));
});


test('failed sign-in (wrong email)', async ({ page }) => {
    await page.goto('/');
    await page.click('button >> text=Sign In');
    await page.getByLabel('Email').fill('zestest404@tmail.tom');
    await page.getByLabel('Password').fill('topsecret404');
    await page.click('button >> text=Submit');
    await expect(page.getByText('No user found with this email')).toBeVisible();
});


test('failed sign-in (wrong password)', async ({ page }) => {
    await page.goto('/');
    await page.click('button >> text=Sign In');
    await page.getByLabel('Email').fill('testest404@tmail.tom');
    await page.getByLabel('Password').fill('topsecret303');
    await page.click('button >> text=Submit');
    await expect(page.getByText('Incorrect Password')).toBeVisible();
});


test('failed sign-up (invalid email format/length)', async ({ page }) => {
    const identifier = Date.now().toString();
    await page.goto('/');
    await page.click('button >> text=Sign Up');
    await page.getByLabel('Email').fill("");
    await page.click('button >> text=Submit');
    await expect(page.getByText('Please enter an Email')).toBeVisible();
    await page.getByLabel('Email').fill("012345678901234567890@zmail.com");
    await expect(page.getByText('Email must be 30 characters at most')).toBeVisible();
    await page.getByLabel('Email').fill(`${identifier}signup-test.com`);
    await expect(page.getByText('Please enter a valid Email')).toBeVisible();
});


test('failed sign-up (wrong confirmation password)', async ({ page }) => {
    const identifier = Date.now().toString();
    await page.goto('/');
    await page.click('button >> text=Sign Up');
    await page.getByLabel('Password').fill(`${identifier}0`);
    await page.getByLabel('Confirm').fill(`${identifier}`);
    await expect(page.getByText('The passwords do not match')).toBeVisible();
    await page.getByLabel('Password').fill(`${identifier}`);
    await page.getByLabel('Confirm').fill(`${identifier}0`);
    await expect(page.getByText('The passwords do not match')).toBeVisible();
});


test('failed sign-up (invalid password length)', async ({ page }) => {
    const identifier = Date.now().toString();
    await page.goto('/');
    await page.click('button >> text=Sign Up');
    await page.getByLabel('Password').fill("");
    await page.click('button >> text=Submit');
    await expect(page.getByText('Please enter a password')).toBeVisible();
    await page.getByLabel('Password').fill(`${identifier.slice(0, 3)}`);
    await expect(page.getByText('Password must be at least 4 characters')).toBeVisible();
    await page.getByLabel('Password').fill("0123456789012345678901234567890");
    await expect(page.getByText('Password must be 30 characters at most')).toBeVisible();
});

