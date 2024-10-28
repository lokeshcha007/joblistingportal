import React from 'react';
import { Link } from 'react-router-dom';
import Card from './ui/Card';
import Button from './ui/Button';

const JobCard = ({ job }) => {
  return (
    <Card className="mb-4">
      <Card.Header>
        <h2 className="text-xl font-semibold text-primary">{job.title}</h2>
        <p className="text-gray-600">{job.company}</p>
      </Card.Header>
      <Card.Content>
        <p className="text-gray-700 mb-2">{job.location}</p>
        <p className="text-gray-700 mb-2">Salary: {job.salary}</p>
        <p className="text-gray-700 mb-2">Job Type: {job.jobType}</p>
        <p className="text-gray-700 mb-2">Experience Level: {job.experienceLevel}</p>
        <p className="text-gray-700 mb-4">
          Application Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
        </p>
        <Link to={`/job/${job._id}`}>
          <Button>View Details</Button>
        </Link>
      </Card.Content>
    </Card>
  );
};

export default JobCard;