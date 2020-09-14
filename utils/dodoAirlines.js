const Axios = require("axios");
const localStorageService = require("./LocalStorageService");

// const host = `https://storm-nextjs-express-test.herokuapp.com`;
const host = ``;

const dodoTimeouts = {
    short: 10000,
    medium: 50000,
    long: 120000,
}

const dodoFlight = async ({
    method,
    url,
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
    dodoTimeouts,
}