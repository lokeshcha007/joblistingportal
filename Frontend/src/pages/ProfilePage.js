import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import api from '../utils/api';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [resume, setResume] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await api.get('/users/profile');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };
    fetchUserProfile();
  }, []);

  const handleResumeUpload = async (e) => {
    e.preventDefault();
    if (!resume) {
      setUploadStatus('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resume);

    try {
      const response = await api.post('/users/upload-resume', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setUploadStatus(response.data.message);
      // Refresh user data to show updated resume status
      const userResponse = await api.get('/users/profile');
      setUser(userResponse.data);
    } catch (error) {
      console.error('Error uploading resume:', error);
      setUploadStatus(error.response?.data?.message || 'Error uploading resume. Please try again.');
    }
  };

  if (!user) {
    return <Layout><div>Loading...</div></Layout>;
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <Card.Header>
            <h1 className="text-3xl font-bold text-primary mb-2">Your Profile</h1>
          </Card.Header>
          <Card.Content>
            <p><strong>Name:</strong> {user.name}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
            {user.resume && <p><strong>Resume:</strong> Uploaded</p>}
          </Card.Content>
        </Card>

        <Card className="mb-8">
          <Card.Header>
            <h2 className="text-2xl font-semibold text-primary mb-2">Upload Resume</h2>
          </Card.Header>
          <Card.Content>
            <form onSubmit={handleResumeUpload}>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setResume(e.target.files[0])}
                className="mb-4"
              />
              <Button type="submit">Upload Resume</Button>
            </form>
            {uploadStatus && <p className="mt-4 text-green-600">{uploadStatus}</p>}
          </Card.Content>
        </Card>
      </div>
    </Layout>
  );
};

export default ProfilePage;