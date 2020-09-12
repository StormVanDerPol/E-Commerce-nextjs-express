import requestErrorHandler from "../utils/requestErrorHandler.js";
import mongodb from "mongodb";
import mongoService from "../../utils/MongoService.js";

export default async (req, res) => {

    try {

        const { ObjectID } = mongodb;

        const userid = ObjectID(req.userid);

        const { client, db } = await mongoService.connect();
        const collection = db.collection('users');

        const cursor = collection
            .find({ _id: userid })
            .project({ password: 0 });;

        const result = await cursor.toArray();

        console.log(result);

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