import tokenService from "../../utils/TokenService.js";
import requestErrorHandler from "./requestErrorHandler.js";

export default function (req, res, next) {

    try {

        //Grab token from header
        const signedToken = req.headers.authorization;

        if (signedToken) {
            //Case token was sent, verify
            const token = tokenService.verify(signedToken);

            if (token) {
                //Case verified, fetch userid from the token
                //then, generate new token.
                const userid = token.userid;
                const newToken = tokenService.create({
                    userid: userid,
                }, {
                    expiresIn: '10m',
                })

                //Bind userid to request.
                req.userid = userid;

                //Set header and continue to next middleware.
                res.setHeader('authorization', newToken);
                return next();
            } else {
                //Token expired, abort and return 401
                res.status(401).send({
                    success: false, message: 'TOKEN EXPIRED'
                });
            }
        } else {
            //No token was sent, abort and return 401
            res.status(401).send({ success: false, message: 'NO TOKEN' });
        }
    } catch (error) {
        requestErrorHandler(error, res);
    }
}