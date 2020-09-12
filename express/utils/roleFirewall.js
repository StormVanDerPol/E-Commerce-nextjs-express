const mongodb = require("mongodb");
const { mongoService } = require("../../utils/MongoService.js");
const requestErrorHandler = require("./requestErrorHandler.js");

module.exports = async function (req, res, next) {

    try {

        const { ObjectID } = mongodb;

        //USERID was bound to the req object earlier, so we retrieve it.
        const userid = ObjectID(req.userid);

        //Connect to db and select collection
        const { client, db } = await mongoService.connect();
        const collection = db.collection('users');

        //Find user details
        const result = await collection.findOne({
            _id: userid,
        });

        //Close db connection
        client.close();

        //Fetch role and allowed roles
        const { role } = result;
        const { allowedRoles } = req;

        //Bind role to req
        req.role = role;

        //Determine if role is allowed to access resource
        if (allowedRoles.find(e => e === role)) {
            return next();
        } else {

            res.status(401).send({ success: false, message: 'PERMISSION DENIED' })
        }

    } catch (error) {
        requestErrorHandler(error, res);
    }
}