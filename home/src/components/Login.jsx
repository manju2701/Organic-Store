import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Custom hook to use auth context
import '../styles/Login.css';

const Login = () => {
  const { user, login } = useAuth(); // Access user state and login function from context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = { email, password };

    try {
      // Make POST request to backend login endpoint
      const response = await axios.post('http://localhost:5000/user/login', formData);

      if (response.data && response.data.token) {
        // Save token and user email in localStorage
        localStorage.setItem('authToken', response.data.token);
        localStorage.setItem('userEmail', response.data.email);  // Store user email in localStorage

        // Store user email in context
        login({ email: response.data.email });

        // Redirect to home page after login
        navigate('/');
      } else {
        setError('Invalid login response. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('Login failed, please try again.');
    }
  };

  // Extract email prefix (before the '@') for username display
  const getEmailPrefix = (email) => {
    const atIndex = email.indexOf('@');
    return atIndex !== -1 ? email.slice(0, atIndex) : email;
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card>
            <Card.Body>
              <h2 className="text-center">Login</h2>

              {/* Show error message if there's an error */}
              {error && <div className="alert alert-danger">{error}</div>}

              {/* If user is logged in, show their username */}
              {user ? (
                <div className="text-center">
                  <h3>Hi, {getEmailPrefix(user.email)}!</h3> {/* Show the email prefix */}
                  {/* Logout button */}
                  <Button
                    onClick={() => {
                      // Remove from localStorage and reset user state
                      localStorage.removeItem('authToken');
                      localStorage.removeItem('userEmail');
                      login(null); // Log out user by clearing the context state
                      navigate('/login'); // Redirect to login page
                    }}
                    className="btn-green btn-small mt-3"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
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

                  <Form.Group controlId="formPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </Form.Group>

                  <Button className="w-100 btn-green btn-small" type="submit">
                    Login
                  </Button>
                </Form>
              )}

              {/* Forgot password link */}
              {!user && (
                <p className="text-center mt-3">
                  <Link to="/forgotpassword" className="toggle-link">
                    <Button className="btn-green btn-small ms-2">Forgot Password?</Button>
                  </Link>
                </p>
              )}

              {/* Signup link for new users */}
              {!user && (
                <p className="text-center mt-3">
                  Don't have an account?{' '}
                  <Link to="/signup" className="toggle-link">
                    <Button className="btn-green btn-small ms-2">Sign Up</Button>
                  </Link>
                </p>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
