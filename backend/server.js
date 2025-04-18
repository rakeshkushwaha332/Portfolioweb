require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const nodemailer = require('nodemailer');
const { check, validationResult } = require('express-validator');
const path = require('path');

// Initialize Express
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Contact Schema
const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  message: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Contact = mongoose.model('Contact', ContactSchema);

// Contact Form API Endpoint
app.post('/api/contact', [
  check('name', 'Name is required').not().isEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check('message', 'Message is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { name, email, message } = req.body;
  
  try {
    // Save to database
    const newContact = new Contact({
      name,
      email,
      message
    });
    
    await newContact.save();
    
    // Send email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      // Create transporter
      let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      
      // Email options
      let mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Contact Form Submission from ${name}`,
        text: `
          Name: ${name}
          Email: ${email}
          
          Message:
          ${message}
        `
      };
      
      // Send email
      await transporter.sendMail(mailOptions);
    }
    
    res.status(200).json({ msg: 'Message sent successfully' });
  } catch (err) {
    console.error('Error saving contact form:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../frontend/dist'));
  
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'frontend', 'dist', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 