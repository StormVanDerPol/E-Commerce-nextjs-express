const express = require("express");
const tokenFirewall = require("./utils/tokenFirewall.js");
const roleFirewall = require("./utils/roleFirewall.js");
const me = require("./routes/me.js");

const router = express.Router();

//Middleware to check if token is okay
router.use(tokenFirewall);

//Middleware to bind allowed roles
router.use((req, res, next) => {
    req.allowedRoles = [
        'admin',
    ];
    return next();
});

//Middleware to check if role is allowed to access this.
router.use(roleFirewall);

router.get("/me", async (req, res) => {
    await me(req, res);
})

module.exports = router;