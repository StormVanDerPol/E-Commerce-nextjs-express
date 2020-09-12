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
const mongoService = initMongoService("mongodb://superuser:user@localhost:27017", "nextjs");

module.exports = {
    initMongoService,
    mongoService,
};