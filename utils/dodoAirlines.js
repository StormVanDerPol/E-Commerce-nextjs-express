const Axios = require("axios");
const localStorageService = require("./LocalStorageService");

const port = process.env.PORT || 3000;
const host = `http://localhost:${port}`;

const dodoTimeouts = {
    short: 10000,
    medium: 50000,
    long: 120000,
}

const dodoRoutes = ({

    api: {
        v1: {
            products: host + '/api/v1/products',
            login: host + '/api/v1/login',
            signup: host + '/api/v1/signup',
            me: host + '/api/v1/me',

            admin: {
                me: host + '/api/v1/admin/me',
            },
            user: {
                me: host + '/api/v1/user/me',
            },
        },
    },
})

const dodoFlight = async ({
    method = 'get',
    url = dodoRoutes.api.v1.get.products,
    timeout = dodoTimeouts.short,
    data = null,
    headers = null,
    config = null,
    token = null,
}) => {

    //Setting params
    const axiosParams = {
        method: method,
        url: url,
        data: data,
        timeout: timeout,
        headers: (token) ? {
            authorization: token,
            ...headers,
        } : {
                ...headers,
            },
        ...config,
    };

    try {

        //HTTP Request
        console.log('DoDo Lift off!', axiosParams);
        const response = await Axios(axiosParams);
        //Logging
        console.log('Landed!', response);

        //Getting token  = require(header
        const token = response.headers.authorization;

        //Setting new token (Only request where document has already been defined will update the token)
        if (token) {
            console.log('token updated!')
            localStorageService.set('token', token);
        }

        return response;

    } catch (err) {

        //Logging
        console.log('Extinction...');
        console.log({ err });
        console.log(err.stack);

        //If error includes a response
        if (err.response) {
            console.log(err.response.data);

            const status = err.response.status;

            if (status >= 400 && status < 500) {
                localStorageService.remove('token');
            }

            return err.response;
        }

        return { data: { success: false, message: 'NO RESPONSE' } };
    }
}

module.exports = {
    dodoFlight,
    dodoRoutes,
    dodoTimeouts,
}