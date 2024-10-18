const HighlightImage = require("../models/highlight");
const express = require("express");

exports.highlighter = async (req, res) => {
  try {
    const images = await HighlightImage.find();
    res.json(images);
    
  } catch (err) {
    res.status(500).json({ message: err.message });
    
  }

};

exports.highlighterPost = async (req, res) => {
  try {
    const newHighlightImage = new HighlightImage(req.body);
    await newHighlightImage.save();
    res.status(201).send(newHighlightImage);
    
  } catch (error) {
    res.status(400).send(error);
    
  }

};
