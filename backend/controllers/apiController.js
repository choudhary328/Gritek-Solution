const Project = require('../models/Project');
const Service = require('../models/Service');
const Contact = require('../models/Contact');
const Review = require('../models/Review');
const nodemailer = require('nodemailer');

// API Controller Methods

// Basic health check responder
exports.getHealthStatus = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'API is running normally',
    timestamp: new Date().toISOString()
  });
};

/* --- PROJECTS --- */
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

exports.createProject = async (req, res) => {
  try {
    const { title, category, technologies, demoLink } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image || '';
    
    // Convert comma-separated strings to arrays if necessary
    const techArray = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;
    
    const newProject = new Project({
      title,
      category,
      technologies: techArray || [],
      demoLink: demoLink || '',
      image: imagePath,
    });
    
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create project' });
  }
};

exports.updateProject = async (req, res) => {
  try {
    const { title, category, technologies, demoLink, image } = req.body;
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ error: 'Project not found' });

    if (title) project.title = title;
    if (category) project.category = category;
    if (demoLink !== undefined) project.demoLink = demoLink;
    
    if (technologies) {
      project.technologies = typeof technologies === 'string' ? JSON.parse(technologies) : technologies;
    }
    
    if (req.file) {
      project.image = `/uploads/${req.file.filename}`;
    } else if (image) {
      project.image = image;
    }

    await project.save();
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update project' });
  }
};

exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ message: 'Project deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};

/* --- SERVICES --- */
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
};

exports.createService = async (req, res) => {
  try {
    const { title, description, icon, accent, pricing, features, process, technologies } = req.body;
    const imagePath = req.file ? `/uploads/${req.file.filename}` : req.body.image || '';

    // Convert strings to arrays for JSON arrays sent via form-data
    const parseIfJSON = (val) => {
      try { return typeof val === 'string' ? JSON.parse(val) : val; } 
      catch { return val ? [val] : []; }
    };

    const newService = new Service({
      title,
      description,
      icon,
      accent,
      pricing,
      image: imagePath,
      features: parseIfJSON(features),
      process: parseIfJSON(process),
      technologies: parseIfJSON(technologies),
    });
    
    await newService.save();
    res.status(201).json(newService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create service' });
  }
};

exports.updateService = async (req, res) => {
  try {
    const { title, description, icon, accent, pricing, features, process, technologies, image } = req.body;
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });

    const parseIfJSON = (val) => {
      try { return typeof val === 'string' ? JSON.parse(val) : val; } 
      catch { return val ? [val] : []; }
    };

    if (title) service.title = title;
    if (description) service.description = description;
    if (icon) service.icon = icon;
    if (accent) service.accent = accent;
    if (pricing) service.pricing = pricing;
    if (features) service.features = parseIfJSON(features);
    if (process) service.process = parseIfJSON(process);
    if (technologies) service.technologies = parseIfJSON(technologies);

    if (req.file) {
      service.image = `/uploads/${req.file.filename}`;
    } else if (image) {
      service.image = image;
    }

    await service.save();
    res.json(service);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update service' });
  }
};

exports.deleteService = async (req, res) => {
  try {
    await Service.findByIdAndDelete(req.params.id);
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
};

/* --- CONTACTS --- */
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch contacts' });
  }
};

// Handle contact form submissions
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, services, message } = req.body;

    const newContact = new Contact({ name, email, phone, services, message });
    await newContact.save();

    // Send email via Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this based on the SMTP server
      auth: {
        user: 'griteksolution.offical@gmail.com',
        pass: process.env.EMAIL_PASSWORD || 'your_app_password', // Should be placed in .env
      },
    });

    const mailOptions = {
      from: 'griteksolution.offical@gmail.com',
      to: 'griteksolution.offical@gmail.com',
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Phone: ${phone || 'N/A'}
        Interested Services: ${services ? services.join(', ') : 'None'}
        Message: ${message}
      `,
    };

    // Attempt to send email, but don't fail the request if auth is not set yet
    if (process.env.EMAIL_PASSWORD) {
       transporter.sendMail(mailOptions, (error, info) => {
         if (error) console.error('Error sending email:', error);
         else console.log('Email sent:', info.response);
       });
    } else {
       console.log('Skipping email send. No EMAIL_PASSWORD set in .env.');
    }

    res.status(200).json({
      status: 'success',
      message: 'Thank you for your message. We will be in touch shortly.'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to submit contact form' });
  }
};

/* --- REVIEWS --- */
exports.getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
};

exports.getApprovedReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ status: 'approved' }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch approved reviews' });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { name, role, company, comment, rating } = req.body;
    const newReview = new Review({ name, role, company, comment, rating });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create review' });
  }
};

exports.updateReviewStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const review = await Review.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!review) return res.status(404).json({ error: 'Review not found' });
    res.json(review);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update review status' });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);
    res.json({ message: 'Review deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete review' });
  }
};
