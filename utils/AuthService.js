import { dodoFlight, dodoRoutes, dodoTimeouts } from "./dodoAirlines"
import localStorageService from "./LocalStorageService";

//Due for refactoring

export const authService = {

    //calls /api/v1/login and sets a cookie if login successful.
    login: async ({ username, password }) => {

        try {
            const { data: { success: loginSuccess }, headers: { authorization: token } } = await dodoFlight({
                method: 'post',
                url: dodoRoutes.api.v1.login,
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
                        url: dodoRoutes.api.v1.user.me,
                        timeout: dodoTimeouts.short,
                        token,
                    });

                    if (meSuccess) {
                        localStorageService.set('username', user.username);
                    }

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
            url: dodoRoutes.api.v1.signup,
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