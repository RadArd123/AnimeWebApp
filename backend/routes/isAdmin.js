const express = require("express");
const { authenticateToken } = require("../utils/authMiddleware");
const { isAdmin } = require("../utils/isAdmin");
const router = express.Router();

router.get("/dashboard", authenticateToken, isAdmin, (req, res) => {
    res.json({ message: "Welcome to the admin dashboard!" });
});
module.exports = router;