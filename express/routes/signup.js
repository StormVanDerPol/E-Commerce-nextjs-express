import requestErrorHandler from "../utils/requestErrorHandler.js"
import mongoService from "../../utils/MongoService.js";
import { cryptoHelper } from "../../utils/cryptoHelper.js";
import keys from "../../keys.js";

export default async (req, res, args) => {

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