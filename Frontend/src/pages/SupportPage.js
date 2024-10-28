import React, { useState } from 'react';
import Layout from '../components/Layout';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const SupportPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitStatus, setSubmitStatus] = useState('');

  const faqs = [
    {
      question: 'How do I create an account?',
      answer: 'To create an account, click on the "Sign Up" button in the top right corner and follow the prompts.',
    },
    {
      question: 'How can I search for jobs?',
      answer: 'Use the search bar on the homepage or navigate to the Jobs page to browse available positions.',
    },
    {
      question: 'How do I apply for a job?',
      answer: 'Click on the job listing you\'re interested in and then click the "Apply Now" button. Follow the instructions to submit your application.',
    },
    {
      question: 'Can I edit my profile after creating it?',
      answer: 'Yes, you can edit your profile at any time. Go to your dashboard and click on the "Edit Profile" button.',
    },
    {
      question: 'How do I contact support?',
      answer: 'You can reach our support team at support@jobportal.com or by using the contact form below.',
    },
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    setSubmitStatus('Message sent successfully!');
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    // Reset the success message after 5 seconds
    setTimeout(() => setSubmitStatus(''), 5000);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-6">Support</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <Card>
              <Card.Header>
                <h2 className="text-2xl font-semibold text-primary">Frequently Asked Questions</h2>
              </Card.Header>
              <Card.Content>
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-medium text-text">{faq.question}</h3>
                      <p className="text-gray-600 mt-1">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </Card.Content>
            </Card>
          </div>
          <div>
            <Card>
              <Card.Header>
                <h2 className="text-2xl font-semibold text-primary">Contact Us</h2>
              </Card.Header>
              <Card.Content>
                {submitStatus ? (
                  <p className="text-green-600 text-lg font-semibold">{submitStatus}</p>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                      label="Name"
                      id="name"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Email"
                      id="email"
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <Input
                      label="Subject"
                      id="subject"
                      placeholder="Subject of your inquiry"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
                        placeholder="How can we help you?"
                        value={formData.message}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
                    <Button type="submit">Send Message</Button>
                  </form>
                )}
              </Card.Content>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SupportPage;