import express from "express";
import tokenFirewall from "./utils/tokenFirewall.js";
import roleFirewall from "./utils/roleFirewall.js";
import me from "./routes/me.js";

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

export default router;