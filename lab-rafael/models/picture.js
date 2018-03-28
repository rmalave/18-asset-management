'use strict';

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

const pictureSchema = new mongoose.Schema({
  url: { type: String, required: true }
}, { timestamps: { createdAt: 'created_at' }});

module.exports = mongoose.model('Picture', pictureSchema);
