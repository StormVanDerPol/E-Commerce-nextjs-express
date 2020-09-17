const express = require("express");
const tokenFirewall = require("./utils/tokenFirewall.js");
const roleFirewall = require("./utils/roleFirewall.js");
const allowRoles = require("./utils/allowRoles.js");

const me = require("./routes/me.js");
const login = require("./routes/login.js");
const signup = require("./routes/signup.js");
const products = require("./routes/products.js");

const router = express.Router();

//UNPROTECTED ROUTES
router.post("/login", async (req, res) => {

    const { username, password } = req.body;

    await login(req, res, {
        username,
        password,
    });
});

router.post("/signup", async (req, res) => {

    const { username, password } = req.body;

    await signup(req, res, {
        username,
        password,
    });
});

router.get("/products", async (req, res) => {

    await products(req, res);
});

//ROUTES PROTECTED BY TOKEN

router.get("/me", tokenFirewall, async (req, res) => {
    await me(req, res)
});

//ROUTES PROTECTED BY ROLE:ADMIN

router.get("/admin", tokenFirewall, allowRoles.admin, roleFirewall, async (req, res) => {
    await me(req, res);
});




module.exports = router;