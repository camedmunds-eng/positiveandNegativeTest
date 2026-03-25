import LoginPage from '../pageobjects/login.page.js'

describe('SauceDemo Login Tests', () => {

const users = [
'standard_user',
'problem_user',
'performance_glitch_user',
'error_user',
'visual_user'
]

// POSITIVE TESTS
for (let i = 0; i < users.length; i++) {

it('should login successfully with ' + users[i], async () => {

    await LoginPage.open()
    await LoginPage.login(users[i], 'secret_sauce')

    await expect(browser).toHaveUrl('https://www.saucedemo.com/inventory.html')

})

}

// NEGATIVE TESTS
for (let i = 0; i < users.length; i++) {

it('should not login with wrong password for ' + users[i], async () => {

    await LoginPage.open()
    await LoginPage.login(users[i], 'wrong_password')

    await expect(browser).not.toHaveUrl('https://www.saucedemo.com/inventory.html')

})

}

})