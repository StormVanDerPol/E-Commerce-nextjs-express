const { mongoService } = require("../../utils/MongoService.js");
const cryptoHelper = require("../../utils/cryptoHelper.js");
const tokenService = require("../../utils/TokenService.js");
const requestErrorHandler = require("../utils/requestErrorHandler.js");

module.exports = async (req, res, args) => {

    try {

        const { username, password } = args;

        const { client, db } = await mongoService.connect();
        const collection = db.collection('users');

        const result = await collection.findOne({
            username,
        });

        client.close();

        if (result) {

            const decryptedPassword = cryptoHelper.decrypt(result.password);

            const token = tokenService.create({
                userid: result._id,
            }, {
                expiresIn: '10m',
            });

            if (decryptedPassword == password) {
                res.setHeader('authorization', token);
                res.status(200).send({ success: true, message: 'LOGGED IN' });
            } else {
                res.status(200).send({ success: false, message: 'PASSWORD MISMATCH' });
            }
        } else {
            res.status(200).send({ success: false, message: 'NON EXISTING USER' });
        }

    } catch (error) {
        requestErrorHandler(error, res);
    }
}