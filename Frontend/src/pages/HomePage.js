import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Card from '../components/ui/Card';
import api from '../utils/api';

export default function HomePage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      let response;
      if (isLogin) {
        response = await api.post('/auth/login', { email, password });
      } else {
        response = await api.post('/auth/register', { name, email, password });
      }
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError(error.response?.data?.message || `An error occurred during ${isLogin ? 'login' : 'signup'}`);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row items-center justify-between min-h-screen bg-gray-100">
        <div className="w-full md:w-1/2 p-8">
          <h1 className="text-4xl font-bold text-primary mb-4">Welcome to JobConnect</h1>
          <p className="text-xl text-gray-600 mb-6">
            Find your dream job or hire the perfect candidate. Our platform connects talented professionals with exciting opportunities.
          </p>
          <ul className="list-disc list-inside text-gray-700 mb-6">
            <li>Browse thousands of job listings</li>
            <li>Create and manage your professional profile</li>
            <li>Apply to jobs with just one click</li>
            <li>For employers: Post jobs and manage applications</li>
          </ul>
          <Button onClick={() => navigate('/jobs')} className="text-lg">
            Browse Jobs
          </Button>
        </div>
        <div className="w-full md:w-1/2 p-8">
          <Card className="w-full max-w-md mx-auto">
            <Card.Header>
              <h2 className="text-2xl font-semibold text-center">
                {isLogin ? 'Login to Your Account' : 'Create an Account'}
              </h2>
            </Card.Header>
            <Card.Content>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <Input
                    label="Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                )}
                <Input
                  label="Email"
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Input
                  label="Password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <Button type="submit" className="w-full">
                  {isLogin ? 'Login' : 'Sign Up'}
                </Button>
              </form>
              <p className="mt-4 text-center text-sm text-gray-600">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline"
                >
                  {isLogin ? 'Sign up' : 'Log in'}
                </Button>
              </p>
            </Card.Content>
          </Card>
        </div>
      </div>
    </Layout>
  );
}