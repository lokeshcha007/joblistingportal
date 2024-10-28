import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Button from './ui/Button';
import Input from './ui/Input';
import Select from './ui/Select';

const CreateJobForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    description: '',
    requirements: '',
    salary: '',
    jobType: 'Full-time',
    experienceLevel: 'Entry-level',
    applicationDeadline: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/jobs', {
        ...formData,
        requirements: formData.requirements.split(',').map(req => req.trim()),
      });
      navigate('/jobs');
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Job Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
      />
      <Input
        label="Company"
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
      />
      <Input
        label="Location"
        name="location"
        value={formData.location}
        onChange={handleChange}
        required
      />
      <textarea
        className="w-full p-2 border border-gray-300 rounded"
        placeholder="Job Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
      />
      <Input
        label="Requirements (comma-separated)"
        name="requirements"
        value={formData.requirements}
        onChange={handleChange}
        required
      />
      <Input
        label="Salary"
        name="salary"
        value={formData.salary}
        onChange={handleChange}
        required
      />
      <Select
        label="Job Type"
        name="jobType"
        value={formData.jobType}
        onChange={handleChange}
        required
      >
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
        <option value="Internship">Internship</option>
      </Select>
      <Select
        label="Experience Level"
        name="experienceLevel"
        value={formData.experienceLevel}
        onChange={handleChange}
        required
      >
        <option value="Entry-level">Entry-level</option>
        <option value="Mid-level">Mid-level</option>
        <option value="Senior">Senior</option>
        <option value="Executive">Executive</option>
      </Select>
      <Input
        label="Application Deadline"
        name="applicationDeadline"
        type="date"
        value={formData.applicationDeadline}
        onChange={handleChange}
        required
      />
      <Button type="submit">Create Job</Button>
    </form>
  );
};

export default CreateJobForm;