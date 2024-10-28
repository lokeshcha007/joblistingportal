import React from 'react';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';

const AboutPage = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">About JobConnect</h1>
        <Card className="mb-8">
          <Card.Content>
            <p className="mb-4">
              JobConnect is a leading online platform that connects job seekers with employers across various industries. Our mission is to simplify the job search process and help companies find the best talent for their open positions.
            </p>
            <p className="mb-4">
              Founded in 2023, JobConnect has quickly grown to become a trusted resource for both job seekers and employers. We leverage cutting-edge technology and a user-friendly interface to create a seamless experience for all our users.
            </p>
            <p>
              Whether you're looking for your dream job or searching for the perfect candidate, JobConnect is here to help you succeed in your career goals.
            </p>
          </Card.Content>
        </Card>
        <h2 className="text-2xl font-semibold text-primary mb-4">Our Team</h2>
        <Card>
          <Card.Content>
            <p className="mb-4">
              Our dedicated team of professionals works tirelessly to improve the JobConnect platform and provide the best possible service to our users. With backgrounds in technology, recruitment, and customer service, we bring a wealth of experience to the table.
            </p>
            <p>
              We're committed to innovation, user satisfaction, and creating meaningful connections in the job market. Together, we're shaping the future of online job searching and recruitment.
            </p>
          </Card.Content>
        </Card>
      </div>
    </Layout>
  );
};

export default AboutPage;