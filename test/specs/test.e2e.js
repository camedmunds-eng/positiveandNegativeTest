import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'

describe('Sauce Demo Login', () => {

    it('should login with valid credentials', async () => {

        await LoginPage.open()
        await LoginPage.login('standard_user', 'secret_sauce')

        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

    })

})

describe('SauceDemo User Login Tests', () => {

    const password = 'secret_sauce'

    const users = [
        { username: 'standard_user', valid: true },
        { username: 'locked_out_user', valid: false },
        { username: 'problem_user', valid: true },
        { username: 'performance_glitch_user', valid: true },
        { username: 'error_user', valid: true },
        { username: 'visual_user', valid: true }
    ]

    users.forEach(({ username, valid }) => {

        it(`POSITIVE TEST - ${username}`, async () => {

            await LoginPage.open()
            await LoginPage.login(username, password)

            if (valid) {
                await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
            } else {
                await expect($('.error-message-container')).toBeDisplayed()
            }

        })

        it(`NEGATIVE TEST - ${username} wrong password`, async () => {

            await LoginPage.open()
            await LoginPage.login(username, 'wrong_password')

            await expect($('.error-message-container')).toBeDisplayed()

        })

    })

})