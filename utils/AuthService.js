const { dodoFlight, dodoTimeouts } = require("./dodoAirlines")
const localStorageService = require("./LocalStorageService.js");

//Due for refactoring

const authService = {

    //calls /api/v1/login and sets a cookie if login successful.
    login: async ({ username, password }) => {

        try {
            const { data: { success: loginSuccess }, headers: { authorization: token } } = await dodoFlight({
                method: 'post',
                url: `${location.origin}/api/v1/login`,
                data: {
                    username,
                    password,
                },
                timeout: dodoTimeouts.short,
            });

            if (loginSuccess) {

                if (token) {

                    localStorageService.set('token', token);

                    const { data: { user, success: meSuccess } } = await dodoFlight({
                        method: 'get',
                        url: `${location.origin}/api/v1/me`,
                        timeout: dodoTimeouts.short,
                        token,
                    });

                    if (meSuccess) {
                        localStorageService.set('username', user.username);
                    }

                    console.log('login works')
                    return 'LOGIN_OK';
                }
            }
        }
        catch (error) {
            return 'LOGIN_FAIL';
        }


    },

    logout: () => {
        localStorageService.remove('token');

        if (window)
            window.location.reload();

        return 'LOGOUT_OK';
    },

    signup: async ({ username, password }) => {
        const res = await dodoFlight({
            method: 'post',
            url: `${location.origin}/api/v1/signup`,
            data: {
                username,
                password,
            }
        });

        if (res.data.success) {
            return 'SIGNUP_OK';
        }
        return 'SIGNUP_FAIL';
    },
}

module.exports = authService;