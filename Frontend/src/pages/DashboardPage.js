import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import api from '../utils/api';

const DashboardPage = () => {
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await api.get('/users/dashboard');
        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  if (!dashboardData) {
    return <Layout><div>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Welcome, {dashboardData.user.name}!</h1>
        
        {dashboardData.user.role === 'job_seeker' ? (
          <>
            <Card className="mb-8">
              <Card.Header>
                <h2 className="text-2xl font-semibold">Your Recent Applications</h2>
              </Card.Header>
              <Card.Content>
                {dashboardData.applications.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {dashboardData.applications.map((app) => (
                      <li key={app._id} className="py-4">
                        <p className="font-medium">{app.job.title}</p>
                        <p className="text-sm text-gray-500">{app.job.company}</p>
                        <p className="text-sm text-gray-500">Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>You haven't applied to any jobs yet.</p>
                )}
              </Card.Content>
            </Card>

            <Card className="mb-8">
              <Card.Header>
                <h2 className="text-2xl font-semibold">Recommended Jobs</h2>
              </Card.Header>
              <Card.Content>
                <ul className="divide-y divide-gray-200">
                  {dashboardData.recommendedJobs.map((job) => (
                    <li key={job._id} className="py-4">
                      <Link to={`/jobs/${job._id}`} className="block hover:bg-gray-50">
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-gray-500">{job.company}</p>
                        <p className="text-sm text-gray-500">{job.location}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Card.Content>
            </Card>
          </>
        ) : (
          <>
            <Card className="mb-8">
              <Card.Header>
                <h2 className="text-2xl font-semibold">Your Posted Jobs</h2>
              </Card.Header>
              <Card.Content>
                {dashboardData.postedJobs.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {dashboardData.postedJobs.map((job) => (
                      <li key={job._id} className="py-4">
                        <p className="font-medium">{job.title}</p>
                        <p className="text-sm text-gray-500">Posted on: {new Date(job.createdAt).toLocaleDateString()}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>You haven't posted any jobs yet.</p>
                )}
              </Card.Content>
            </Card>

            <Card className="mb-8">
              <Card.Header>
                <h2 className="text-2xl font-semibold">Recent Applications</h2>
              </Card.Header>
              <Card.Content>
                {dashboardData.recentApplications.length > 0 ? (
                  <ul className="divide-y divide-gray-200">
                    {dashboardData.recentApplications.map((app) => (
                      <li key={app._id} className="py-4">
                        <p className="font-medium">{app.applicant.name} applied for {app.job.title}</p>
                        <p className="text-sm text-gray-500">Applied on: {new Date(app.createdAt).toLocaleDateString()}</p>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No recent applications.</p>
                )}
              </Card.Content>
            </Card>
          </>
        )}

        <div className="mt-8">
          <Link to="/jobs">
            <Button>Browse All Jobs</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;