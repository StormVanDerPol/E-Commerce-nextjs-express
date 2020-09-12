import express from "express";
import tokenFirewall from "./utils/tokenFirewall.js";
import me from "./routes/me.js";

const router = express.Router();

//Middleware that checks for a valid token
router.use(tokenFirewall);

router.get("/me", async (req, res) => {
    await me(req, res);
})

export default router;