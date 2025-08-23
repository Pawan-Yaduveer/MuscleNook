import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa'; 
import './Footer.css';

const Footer = () => {
  return (
    <footer className="professional-footer">
      <div className="footer-main">
        <Container>
          <Row className="footer-content">
            {/* Company Info */}
            <Col lg={4} md={6} className="footer-section">
              <div className="footer-brand">
                <h4 className="footer-title">MuscleNook</h4>
                <p className="footer-description">
                  Transform your fitness journey with AI-powered workouts, personalized nutrition plans, and comprehensive progress tracking.
                </p>
                <div className="footer-social">
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaFacebook />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaTwitter />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaInstagram />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
                    <FaLinkedin />
                  </a>
                </div>
              </div>
            </Col>

            {/* Quick Links */}
            <Col lg={2} md={6} className="footer-section">
              <h5 className="footer-heading">Quick Links</h5>
              <ul className="footer-links">
                <li><a href="/" className="footer-link">Home</a></li>
                <li><a href="/pages/features" className="footer-link">Features</a></li>
                <li><a href="/pages/workouts" className="footer-link">Workouts</a></li>
                <li><a href="/pages/nutrition-checker" className="footer-link">Nutrition</a></li>
                <li><a href="/pages/about" className="footer-link">About</a></li>
              </ul>
            </Col>

            {/* Features */}
            <Col lg={2} md={6} className="footer-section">
              <h5 className="footer-heading">Features</h5>
              <ul className="footer-links">
                <li><a href="/pages/bmr-calculator" className="footer-link">BMR Calculator</a></li>
                <li><a href="/pages/workouts" className="footer-link">Exercise Database</a></li>
                <li><a href="/pages/nutrition-checker" className="footer-link">Meal Planning</a></li>
                <li><a href="/pages/profile" className="footer-link">Progress Tracking</a></li>
                <li><a href="/pages/register" className="footer-link">Get Started</a></li>
              </ul>
            </Col>

            {/* Contact Info */}
            <Col lg={4} md={6} className="footer-section">
              <h5 className="footer-heading">Contact Us</h5>
              <div className="contact-info">
                <div className="contact-item">
                  <FaEnvelope className="contact-icon" />
                  <span>support@musclenook.com</span>
                </div>
                <div className="contact-item">
                  <FaPhone className="contact-icon" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <FaMapMarkerAlt className="contact-icon" />
                  <span>123 Fitness Street, Health City, HC 12345</span>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      
      <div className="footer-bottom">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start">
              <p className="copyright">© 2024 MuscleNook. All rights reserved.</p>
            </Col>
            <Col md={6} className="text-center text-md-end">
              <div className="footer-bottom-links">
                <a href="/privacy" className="footer-bottom-link">Privacy Policy</a>
                <a href="/terms" className="footer-bottom-link">Terms of Service</a>
                <a href="/cookies" className="footer-bottom-link">Cookie Policy</a>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
