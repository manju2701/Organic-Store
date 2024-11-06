import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      // Send request to backend to generate reset code
      const response = await axios.post('http://localhost:5000/api/auth/forgotPassword', { email });

      // Handle success response
      setMessage(response.data.message);

      // After successful request, navigate to the Reset Password page
      setTimeout(() => navigate('/resetpassword', { state: { email } }), 2000); // Passing email to state for ResetPassword page
    } catch (err) {
      // Handle error response
      setError(err.response?.data?.message || 'Error occurred');
    }
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center">Forgot Password</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              {message && <div className="alert alert-success">{message}</div>}
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Button className="w-100 btn-primary" type="submit">
                  Send Reset Code
                </Button>
              </Form>
              <p className="text-center mt-3">
                Remembered your password? 
                <Button variant="link" onClick={() => navigate('/login')}>Login</Button>
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ForgotPassword;
