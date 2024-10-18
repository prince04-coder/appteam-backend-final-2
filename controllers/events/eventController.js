const  Event= require("../../models/Event");
const express = require("express");

exports.Event = async (req, res) => {
  try {
    const Events = await Event.find();
    res.json(Events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.EventPost = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
  
    res.status(201).send(newEvent);
  } catch (error) {
    res.status(400).send(error);
    
  }
  
};
