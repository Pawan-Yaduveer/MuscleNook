import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import { BsLock, BsEnvelope, BsShieldLock } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import fitnessBg from "../assets/images/fitnessbg.jpg";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Login Successfully!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div 
      className="login-page-background"
      style={{
        backgroundImage: `linear-gradient(135deg, rgba(30, 60, 114, 0.95) 0%, rgba(42, 82, 152, 0.95) 100%), url(${fitnessBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        minHeight: "100vh",
        paddingTop: "100px",
      }}
    >
      <Container className="login-container">
        <div className="login-header">
          <h1 className="login-main-title">Welcome Back</h1>
          <p className="login-subtitle">
            Sign in to your account to continue your fitness journey
          </p>
        </div>

        <div className="login-form-wrapper">
          <FormContainer className="login-form-container">
            <div className="login-form-header">
              <BsShieldLock className="login-icon" />
              <h2 className="login-form-title">Sign In</h2>
            </div>

            <Form onSubmit={submitHandler} className="login-form">
              <Form.Group controlId="formEmail" className="form-group">
                <Form.Label className="form-label">
                  <BsEnvelope className="input-icon" />
                  Email Address
                </Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="professional-input"
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="form-group">
                <Form.Label className="form-label">
                  <BsLock className="input-icon" />
                  Password
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="professional-input"
                  required
                />
              </Form.Group>

              {isLoading && <Loader />}

              <Button 
                type="submit" 
                className="professional-login-button"
                disabled={isLoading}
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>

              <Row className="login-footer">
                <Col className="text-center">
                  <span className="login-footer-text">
                    New to MuscleNook?{" "}
                    <Link to="/pages/register" className="login-link">
                      Create Account
                    </Link>
                  </span>
                </Col>
              </Row>
            </Form>
          </FormContainer>
        </div>
      </Container>
    </div>
  );
};

export default Login;
