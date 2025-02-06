const express = require("express");
const cors = require("cors");
const {signin}  = require("../controllers/signin");


const router = express.Router();

router.use(cors());

router.post("/login",signin);

module.exports = router;