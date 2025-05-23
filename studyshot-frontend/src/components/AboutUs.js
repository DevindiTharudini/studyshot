import React from 'react';
import { FaUsers, FaCogs, FaPhoneAlt, FaTrophy, FaEye } from 'react-icons/fa';
import './aboutUs.css'; // Import the CSS for About Us page

const AboutUs = () => {
  return (
    <div className="about-us-page">
      {/* Hero Section with Parallax Effect */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>
            <span className="human-image-container">
              <img 
                src={`${process.env.PUBLIC_URL}/images/human-waving.png`} 
                alt="Waving Human" 
                className="human-image" 
              />
            </span>
            Welcome to StudyShot
          </h1>
          <p>Empowering Learners, Shaping Futures</p>
        </div>
      </section>

      {/* About the Company Section */}
      <section className="about-company">
        <h2>About StudyShot</h2>
        <p>
          StudyShot is an innovative learning platform designed to empower learners through engaging, accessible, and personalized educational experiences. Whether you're looking to enhance your skills, get certified, or discover new learning paths, StudyShot has the tools you need to succeed.
        </p>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-section glass">
        <h2><FaTrophy /> Our Mission & Vision</h2>
        <p>
          Our mission is to provide quality education and learning resources that cater to individuals of all backgrounds and abilities. We aim to create a platform that offers interactive, self-paced learning experiences while ensuring students can track their progress and excel in their studies.
        </p>
      </section>

      {/* Vision Tile Section */}
      <section className="vision-section gradient">
        <h2><FaEye /> Our Vision</h2>
        <p>
          Our vision is to be the leading platform for accessible, high-quality education. We aspire to create a world where every learner has the opportunity to reach their full potential, regardless of location, background, or learning style.
        </p>
      </section>

      {/* Meet the Team Section */}
      <section className="team-section">
        <h2><FaUsers /> Meet Our Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src="/images/team1.jpg" alt="Team Member 1" className="team-img" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
            <p>John is the visionary behind StudyShot, with a passion for creating accessible learning opportunities.</p>
          </div>
          <div className="team-member">
            <img src="/images/team2.jpg" alt="Team Member 2" className="team-img" />
            <h3>Jane Smith</h3>
            <p>Lead Developer</p>
            <p>Jane leads the development team, ensuring the platform is always evolving with the latest technologies.</p>
          </div>
          <div className="team-member">
            <img src="/images/team3.jpg" alt="Team Member 3" className="team-img" />
            <h3>Michael Johnson</h3>
            <p>Community Manager</p>
            <p>Michael connects with users, gathers feedback, and builds a strong, vibrant community of learners.</p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <h2><FaPhoneAlt /> Contact Us</h2>
        <p>If you have any questions or would like to get in touch, feel free to contact us at:</p>
        <p>Email: <a href="mailto:support@studyshot.com">support@studyshot.com</a></p>
        <button className="contact-button">Get In Touch</button>
      </section>
    </div>
  );
};

export default AboutUs;
