const mongodb = require("mongodb");

const initMongoService = (url, database) => {

    const { MongoClient } = mongodb;

    class MongoService {

        constructor(url, database) {
            this.url = url;
            this.database = database;
        }

        connect = async () => {
            try {
                const client = await MongoClient.connect(this.url);
                const db = client.db(this.database);
                return { client, db };

            } catch (error) {
                console.warn(error);
                return null;
            }
        }
    }

    return new MongoService(url, database);
}

const mongoService = initMongoService("mongodb+srv://user:5A8hIquBWLmwvXm7@clusterfuck.l55h1.mongodb.net?retryWrites=true&w=majority", "ecommerce");

module.exports = {
    initMongoService,
    mongoService,
};