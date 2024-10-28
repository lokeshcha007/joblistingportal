const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Job = require('./models/Job');
const Application = require('./models/Application');

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const importData = async () => {
  try {
    await User.deleteMany();
    await Job.deleteMany();
    await Application.deleteMany();

    const createdUsers = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123',
        role: 'job_seeker',
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        password: 'password123',
        role: 'employer',
      },
      {
        name: 'Bob Johnson',
        email: 'bob@example.com',
        password: 'password123',
        role: 'employer',
      },
    ]);

    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);

    const sampleJobs = [
      {
        title: 'Software Engineer',
        company: 'Tech Co',
        location: 'San Francisco, CA',
        description: 'We are looking for a talented software engineer...',
        requirements: ['3+ years of experience', 'JavaScript', 'React'],
        salary: '$100,000 - $150,000',
        jobType: 'Full-time',
        experienceLevel: 'Mid-level',
        applicationDeadline: oneMonthFromNow,
        postedBy: createdUsers[1]._id,
      },
      {
        title: 'Data Analyst',
        company: 'Data Corp',
        location: 'New York, NY',
        description: 'Seeking a data analyst to join our team...',
        requirements: ['SQL', 'Python', 'Data visualization'],
        salary: '$80,000 - $120,000',
        jobType: 'Full-time',
        experienceLevel: 'Entry-level',
        applicationDeadline: oneMonthFromNow,
        postedBy: createdUsers[1]._id,
      },
      {
        title: 'UX Designer',
        company: 'Design Studio',
        location: 'Los Angeles, CA',
        description: 'Join our creative team as a UX designer...',
        requirements: ['3+ years of experience', 'Figma', 'User research'],
        salary: '$90,000 - $130,000',
        jobType: 'Full-time',
        experienceLevel: 'Mid-level',
        applicationDeadline: oneMonthFromNow,
        postedBy: createdUsers[2]._id,
      },
      {
        title: 'Marketing Intern',
        company: 'StartUp Inc',
        location: 'Remote',
        description: 'Exciting opportunity for a marketing intern...',
        requirements: ['Current student', 'Social media savvy', 'Creative writing'],
        salary: '$20 - $25 per hour',
        jobType: 'Internship',
        experienceLevel: 'Entry-level',
        applicationDeadline: oneMonthFromNow,
        postedBy: createdUsers[2]._id,
      },
      {
        title: 'Senior Project Manager',
        company: 'Big Corp',
        location: 'Chicago, IL',
        description: 'Experienced project manager needed for large-scale projects...',
        requirements: ['7+ years of experience', 'PMP certification', 'Agile methodologies'],
        salary: '$120,000 - $180,000',
        jobType: 'Full-time',
        experienceLevel: 'Senior',
        applicationDeadline: oneMonthFromNow,
        postedBy: createdUsers[1]._id,
      },
      {
        title: 'Part-time Web Developer',
        company: 'Freelance Co',
        location: 'Remote',
        description: 'Seeking a part-time web developer for ongoing projects...',
        requirements: ['HTML/CSS', 'JavaScript', 'Responsive design'],
        salary: '$40 - $60 per hour',
        jobType: 'Part-time',
        experienceLevel: 'Mid-level',
        applicationDeadline: oneMonthFromNow,
        postedBy: createdUsers[2]._id,
      },
      {
        title: 'DevOps Engineer',
        company: 'Cloud Solutions',
        location: 'Seattle, WA',
        description: 'Join our DevOps team to streamline our infrastructure...',
        requirements: ['AWS', 'Docker', 'CI/CD pipelines'],
        salary: '$110,000 - $160,000',
        jobType: 'Full-time',
        experienceLevel: 'Senior',
        applicationDeadline: oneMonthFromNow,
        postedBy: createdUsers[1]._id,
      },
      {
        title: 'Content Writer',
        company: 'Media House',
        location: 'New York, NY',
        description: 'Create engaging content for our digital platforms...',
        requirements: ['Excellent writing skills', 'SEO knowledge', 'Social media experience'],
        salary: '$50,000 - $70,000',
        jobType: 'Full-time',
        experienceLevel: 'Entry-level',
        applicationDeadline: oneMonthFromNow,
        postedBy: createdUsers[2]._id,
      },
      {
        title: 'AI Research Scientist',
        company: 'Tech Innovations',
        location: 'Boston, MA',
        description: 'Push the boundaries of AI in our research lab...',
        requirements: ['PhD in Computer Science or related field', 'Machine Learning expertise', 'Published research'],
        salary: '$150,000 - $200,000',
        jobType: 'Full-time',
        experienceLevel: 'Senior',
        applicationDeadline: oneMonthFromNow,
        postedBy: createdUsers[1]._id,
      },
      {
        title: 'Sales Representative',
        company: 'Global Sales Inc',
        location: 'Miami, FL',
        description: 'Drive sales for our expanding product line...',
        requirements: ['2+ years sales experience', 'Excellent communication skills', 'Self-motivated'],
        salary: '$50,000 base + commission',
        jobType: 'Full-time',
        experienceLevel: 'Mid-level',
        applicationDeadline: oneMonthFromNow,
        postedBy: createdUsers[2]._id,
      },
    ];

    const createdJobs = await Job.insertMany(sampleJobs);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Job.deleteMany();
    await Application.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}