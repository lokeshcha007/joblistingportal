import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import api from '../utils/api';

const JobDetailsPage = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [applicationStatus, setApplicationStatus] = useState('');

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const response = await api.get(`/jobs/${id}`);
        setJob(response.data);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };
    fetchJob();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post(`/jobs/${id}/apply`, { coverLetter });
      setApplicationStatus(response.data.message);
      setCoverLetter('');
    } catch (error) {
      console.error('Error applying for job:', error);
      setApplicationStatus(error.response?.data?.message || 'Error submitting application. Please try again.');
    }
  };

  if (!job) {
    return <Layout><div>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <Card.Header>
            <h1 className="text-3xl font-bold text-primary mb-2">{job.title}</h1>
            <p className="text-xl text-gray-600 mb-2">{job.company}</p>
            <p className="text-lg text-gray-500 mb-4">{job.location}</p>
          </Card.Header>
          <Card.Content>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-primary mb-2">Job Description</h2>
              <p className="text-gray-700">{job.description}</p>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-semibold text-primary mb-2">Requirements</h2>
              <ul className="list-disc list-inside text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="mb-4">
              <p className="text-gray-600">Salary: {job.salary}</p>
              <p className="text-gray-600">Job Type: {job.jobType}</p>
              <p className="text-gray-600">Experience Level: {job.experienceLevel}</p>
            </div>
            <h2 className="text-2xl font-semibold text-primary mb-2">Apply for this job</h2>
            <form onSubmit={handleApply}>
              <textarea
                className="w-full p-2 border border-gray-300 rounded mb-4"
                placeholder="Cover Letter"
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                required
              />
              <Button type="submit" className="w-full md:w-auto">Apply Now</Button>
            </form>
            {applicationStatus && <p className="mt-4 text-green-600">{applicationStatus}</p>}
          </Card.Content>
        </Card>
      </div>
    </Layout>
  );
};

export default JobDetailsPage;