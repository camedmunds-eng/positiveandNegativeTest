import { expect } from '@wdio/globals'


describe('Sauce Demo Login', () => {

    it('should login with valid credentials', async () => {

        await LoginPage.open()

        await LoginPage.login('standard_user', 'secret_sauce')

        await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

    })

})

import LoginPage from '../pageobjects/login.page.js'

describe('SauceDemo User Login Tests', () => {

    const password = 'secret_sauce'

    const users = [
        'standard_user',
        'locked_out_user',
        'problem_user',
        'performance_glitch_user',
        'error_user',
        'visual_user'
    ]

    users.forEach((user) => {

        it(`POSITIVE TEST - ${user} attempts login`, async () => {

            await LoginPage.open()

            await LoginPage.login(user, password)

            if (user === 'locked_out_user') {
                await expect($('.error-message-container')).toBeDisplayed()
            } else {
                await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')
            }

        })


        it(`NEGATIVE TEST - ${user} with incorrect password`, async () => {

            await LoginPage.open()

            await LoginPage.login(user, 'wrong_password')

            await expect($('.error-message-container')).toBeDisplayed()

        })

    })

})