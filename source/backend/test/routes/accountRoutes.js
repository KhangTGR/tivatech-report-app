const express = require("express");
const router = express.Router();
const accountController = require("../controller/accountController.js");

router.post("/login", accountController.loginAccount);
router.post("/create", accountController.createAccount);

module.exports = router;
