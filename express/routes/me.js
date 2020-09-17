const requestErrorHandler = require("../utils/requestErrorHandler.js");
const mongodb = require("mongodb");
const { mongoService } = require("../../utils/MongoService.js");

module.exports = async (req, res) => {

    try {

        const { ObjectID } = mongodb;

        const userid = ObjectID(req.userid);

        const { client, db } = await mongoService.connect();
        const collection = db.collection('users');

        const cursor = collection
            .find({ _id: userid })
            .project({ password: 0 });;

        const result = await cursor.toArray();

        client.close();

        res.status(200).send({
            success: true,
            message: 'AUTHORIZED',
            user: result[0],
        });
    } catch (error) {
        requestErrorHandler(error, res);
    }
}