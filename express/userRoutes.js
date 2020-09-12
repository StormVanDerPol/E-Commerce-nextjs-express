const express = require("express");
const tokenFirewall = require("./utils/tokenFirewall.js");
const me = require("./routes/me.js");

const router = express.Router();

//Middleware that checks for a valid token
router.use(tokenFirewall);

router.get("/me", async (req, res) => {
    await me(req, res);
})

module.exports = router; 
