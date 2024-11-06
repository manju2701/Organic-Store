import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/VerifyEmail.css'; 

const VerifyEmail = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // For redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message
    setSuccess(''); // Reset success message

    try {
      // Send OTP code to your backend for verification
      const response = await axios.post('http://localhost:5000/api/auth/verifyEmail', { code: otp });

      // If OTP is verified successfully
      setSuccess('Email verified successfully! You can now log in.');
      setTimeout(() => {
        navigate('/login'); // Redirect to login after a short delay
      }, 2000);
    } catch (err) {
      setError('Invalid or expired OTP. Please try again.');
    }
  };

  return (
    <div className="verify-email-container">
      <h2>Verify Your Email</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formOtp">
          <Form.Label>Enter OTP</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter OTP sent to your email"
            value={otp}
            onChange={(e) => setOtp(e.target.value)} // Update OTP state
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Verify Email
        </Button>
      </Form>
    </div>
  );
};

export default VerifyEmail;
