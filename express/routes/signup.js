const requestErrorHandler = require("../utils/requestErrorHandler.js");
const { mongoService } = require("../../utils/MongoService.js");
const cryptoHelper = require("../../utils/cryptoHelper.js");
const keys = require("../../keys.js");

module.exports = async (req, res, args) => {

    try {

        const { username, password } = args;

        const { client, db } = await mongoService.connect();
        const collection = db.collection('users');

        const encryptedPassword = cryptoHelper.encrypt(password, keys.password);

        const isDuplicate = await collection.findOne({ username });

        if (!isDuplicate) {
            await collection.insertOne({
                username,
                password: encryptedPassword,
                role: 'user',
            });
            client.close();
            res.status(200).send({ success: true, message: 'SIGNUP_OK' });
        } else {
            client.close();
            res.send({ success: false, message: 'USER_EXISTS' });
        }
    } catch (error) {
        requestErrorHandler(error, res);
    }
}