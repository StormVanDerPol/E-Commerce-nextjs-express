import mongoService from "../../utils/MongoService.js"
import requestErrorHandler from "../utils/requestErrorHandler.js";

export default async (req, res) => {

    try {

        const { client, db } = await mongoService.connect();

        const collection = db.collection('products');
        const cursor = collection.find({});
        const results = await cursor.toArray();

        client.close();
        res.status(200).json({ success: true, message: 'PRODUCTS GET', products: results });

    } catch (error) {
        requestErrorHandler(error, res);
    }
}