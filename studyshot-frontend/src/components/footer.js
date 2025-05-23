import React from 'react';
import './footer.css';

const Footer = () => {
  const logoImg = process.env.PUBLIC_URL + '/images/studyshot-logo.png';

  return (
    <>
      <footer className="custom-footer">
        <div className="footer-columns">
          <div className="footer-section">
            <img src={logoImg} alt="StudyShot Logo" className="footer-logo-img" />
            <p>Empowering learners through accessible and engaging education.</p>
          </div>

          <div className="footer-section">
            <h3>Account</h3>
            <ul>
              <li>Log In</li>
              <li>Sign Up</li>
              <li>Profile</li>
              <li>Dashboard</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Get Help</h3>
            <ul>
              <li>FAQs</li>
              <li>Troubleshooting</li>
              <li>Student Guide</li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <ul>
              <li>Email: studyshot@webkuli.in</li>
              <li>Phone: +94 112131345</li>
              <li>Address: Pittpana, Homagama</li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} StudyShot. All rights reserved.</p>
          <div className="footer-socials">
            <a href="#"><img src="/images/linkedin-icon.png" alt="LinkedIn" /></a>
            <a href="#"><img src="/images/youtube-icon.png" alt="YouTube" /></a>
            <a href="#"><img src="/images/instagram-icon.png" alt="Instagram" /></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
