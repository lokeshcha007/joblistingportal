const User = require('../models/User');
const Job = require('../models/Job');
const Application = require('../models/Application');

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'Please upload a file' });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.resume = req.file.path;
    await user.save();

    res.json({ message: 'Resume uploaded successfully', resumePath: user.resume });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getDashboardData = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let dashboardData = {
      user: user
    };

    if (user.role === 'job_seeker') {
      const applications = await Application.find({ applicant: user._id })
        .populate('job', 'title company')
        .sort('-createdAt')
        .limit(5);
      
      const recommendedJobs = await Job.find({})
        .sort('-createdAt')
        .limit(3);

      dashboardData.applications = applications;
      dashboardData.recommendedJobs = recommendedJobs;
    } else if (user.role === 'employer') {
      const postedJobs = await Job.find({ postedBy: user._id })
        .sort('-createdAt')
        .limit(5);
      
      const recentApplications = await Application.find({ job: { $in: postedJobs.map(job => job._id) } })
        .populate('applicant', 'name')
        .populate('job', 'title')
        .sort('-createdAt')
        .limit(5);

      dashboardData.postedJobs = postedJobs;
      dashboardData.recentApplications = recentApplications;
    }

    res.json(dashboardData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};