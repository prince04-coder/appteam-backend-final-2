const express = require("express")
const router = require("express").Router();

const highlightController = require("../controllers/highlightController");

router.get('/highlights' , highlightController.highlighter);

// Add POST route to add highlight image
router.post('/highlights-post', highlightController.highlighterPost);

module.exports = router;