const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  company: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  requirements: {
    type: [String],
    required: true
  },
  salary: {
    type: String,
    required: true
  },
  jobType: {
    type: String,
    required: true
  },
  experienceLevel: {
    type: String,
    required: true
  },
  applicationDeadline: {
    type: Date,
    required: true
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  applications: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Application' }],
    default: []  // Initialize as an empty array by default
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);