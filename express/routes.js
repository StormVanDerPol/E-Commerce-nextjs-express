const express = require("express");
const me = require("./routes/me.js");
const login = require("./routes/login.js");
const signup = require("./routes/signup.js");
const products = require("./routes/products.js");

const router = express.Router();

router.get("/me", async (req, res) => {
    await me(req, res)
})

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

module.exports = router;