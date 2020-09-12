const jwt = require('jsonwebtoken');
const keys = require('../keys.js');

//Due for refactoring

class TokenService {

    create = (payload, options = {}) => {
        const tokenSigned = jwt.sign(
            payload,
            keys.jwtsecret,
            options,
        );
        return `bearer ${tokenSigned}`;
    };

    verify = (tokenSigned) => {
        try {
            if (!tokenSigned) {
                return null;
            }
            tokenSigned = tokenSigned.split(' ')[1];
            return jwt.verify(tokenSigned, keys.jwtsecret);

        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

const tokenService = new TokenService();

module.exports = tokenService;