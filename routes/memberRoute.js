const express = require("express");
const memberController = require(".././controllers/member/memberController.js");
const router = express.Router();

router.post("/registerMember", memberController.registerMember);
router.get("/get-members/:clubName", memberController.getAllMembers);

module.exports = router;
