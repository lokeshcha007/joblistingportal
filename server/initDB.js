require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Job = require('./models/Job');
const Application = require('./models/Application');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const initDB = async () => {
  try {
    await User.deleteMany();
    await Job.deleteMany();
    await Application.deleteMany();

    const user = await User.create({
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password123',
      role: 'job_seeker',
      location: 'New York, NY',
      skills: ['JavaScript', 'React', 'Node.js'],
      bio: 'Passionate developer with 5 years of experience',
    });

    const employer = await User.create({
      name: 'Tech Corp',
      email: 'hr@techcorp.com',
      password: 'employer123',
      role: 'employer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
    });

    // Create a sample job
    const job = await Job.create({
      title: 'Senior React Developer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      description: 'We are looking for an experienced React developer to join our team.',
      requirements: ['5+ years of React experience', 'Strong JavaScript skills', 'Experience with Redux'],
      responsibilities: ['Develop new features', 'Optimize application performance', 'Collaborate with the design team'],
      salary: '$120,000 - $150,000',
      jobType: 'Full-time',
      experienceLevel: 'Senior',
      skills: ['React', 'JavaScript', 'Redux', 'Node.js'],
      benefits: ['Health insurance', '401(k) matching', 'Flexible work hours'],
      applicationDeadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      postedBy: employer._id,
    });

    // Create a sample application
    await Application.create({
      job: job._id,
      applicant: user._id,
      coverLetter: 'I am excited to apply for this position...',
      resume: 'path/to/resume.pdf',
    });

    console.log('Database initialized with sample data');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    mongoose.connection.close();
  }
};

initDB();