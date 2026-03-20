const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const apiController = require('../controllers/apiController');

// Multer setup for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Define API routes here
router.get('/health', apiController.getHealthStatus);

// Contact routes
router.post('/contact', apiController.submitContactForm);
router.get('/contacts', apiController.getContacts);

// Project routes
router.get('/projects', apiController.getProjects);
router.post('/projects', upload.single('image'), apiController.createProject);
router.put('/projects/:id', upload.single('image'), apiController.updateProject);
router.delete('/projects/:id', apiController.deleteProject);

// Service routes
router.get('/services', apiController.getServices);
router.post('/services', upload.single('image'), apiController.createService);
router.put('/services/:id', upload.single('image'), apiController.updateService);
router.delete('/services/:id', apiController.deleteService);

// Review routes
router.get('/reviews', apiController.getReviews); // for Admin
router.get('/reviews/approved', apiController.getApprovedReviews); // for Public
router.post('/reviews', apiController.createReview); // for Public
router.patch('/reviews/:id', apiController.updateReviewStatus); // approve/reject
router.delete('/reviews/:id', apiController.deleteReview);

// Upload generic image
router.post('/upload', upload.single('image'), (req, res) => {
  if (req.file) {
    res.json({ imageUrl: `/uploads/${req.file.filename}` });
  } else {
    res.status(400).json({ error: 'No image provided' });
  }
});

module.exports = router;
