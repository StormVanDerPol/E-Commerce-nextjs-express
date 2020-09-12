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
//5A8hIquBWLmwvXm7
//<username>:<password>@clusterfuck.l55h1.mongodb.net/<dbname>?retryWrites=true&w=majority
///ecommerce?retryWrites=true&w=majority
const mongoService = initMongoService("mongodb://user:5A8hIquBWLmwvXm7clusterfuck.l55h1.mongodb.net", "ecommerce");
// const mongoService = initMongoService("mongodb://superuser:user@localhost:27017", "nextjs");

module.exports = {
    initMongoService,
    mongoService,
};