// HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';  // Import Navbar here
import Footer from './footer';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();

  const handleAboutUsClick = () => {
    navigate('/about-us');
  };

  const homepageBg = process.env.PUBLIC_URL + '/images/homepage-bg.jpg';  
  const smartAssessmentImg = process.env.PUBLIC_URL + '/images/smart-assessment.jpg';
  const progressImg = process.env.PUBLIC_URL + '/images/progress-img.jpg';
  const adaptiveLearningImg = process.env.PUBLIC_URL + '/images/adaptive-learning.jpg';
  const progressTrackingImg = process.env.PUBLIC_URL + '/images/progress-tracking.jpg';
  const gamifiedExperienceImg = process.env.PUBLIC_URL + '/images/gamified-experience.jpg';

  return (
    <div className="homepage-container">
      <Navbar />  {/* Navbar added here */}

      <section className="hero-section" style={{ backgroundImage: `url(${homepageBg})` }}>
        <h1>AI - BASED LEARNING ADAPTIVE SYSTEM</h1>
        <p>Unlock personalized learning paths with StudyShot’s adaptive technology, ensuring every student reaches their full potential.</p>
        <button className="cta-button" onClick={handleAboutUsClick}>
          About Platform
        </button>
      </section>

      <section className="smart-assessments">
        <img src={smartAssessmentImg} alt="Smart Assessments" className="section-img"/>
        <div className="section-text">
          <h2>SMART ASSESSMENTS</h2>
          <p>Tailored quizzes that adjust difficulty based on student performance, enhancing understanding and retention.</p>
          <button className="cta-button">Try Now</button>
          <button className="cta-button">Learn more</button>
        </div>
      </section>

      {/* StudyShot Demo Video Section */}
      <section className="video-section">
        <div>
          <h2>See How StudyShot Works</h2>
        </div>
        <video className="promo-video" controls autoPlay muted loop>
          <source src={`${process.env.PUBLIC_URL}/videos/studyshot-demo.mp4`} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </section>

      <section className="progress-section">
        <div className="section-text">
          <h2>WATCH YOUR PROGRESS EVERYDAY</h2>
          <p>Real-time analytics provide insights into learning habits, helping educators and learners track improvements and areas for growth.</p>
        </div>
        <img src={progressImg} alt="Track your progress" className="section-img"/>
      </section>

      <section className="why-choose-studyshot">
        <h2>
          <span className="study">Why Choose</span> <span className="shot">StudyShot?</span>
        </h2>
        <p>Our AI-powered platform adapts to your learning style, providing personalized education that evolves with you.</p>
        
        <div className="why-choose-cards">
          <div 
            className="why-choose-card tile-bg"
            style={{ backgroundImage: `url(${adaptiveLearningImg})` }}
          >
            <h3>Adaptive Learning</h3>
            <p>Our platform adjusts to your performance, focusing on areas where you need the most improvement.</p>
          </div>

          <div 
            className="why-choose-card tile-bg"
            style={{ backgroundImage: `url(${progressTrackingImg})` }}
          >
            <h3>Progress Tracking</h3>
            <p>Visualize your learning journey with detailed analytics and performance insights.</p>
          </div>

          <div 
            className="why-choose-card tile-bg"
            style={{ backgroundImage: `url(${gamifiedExperienceImg})` }}
          >
            <h3>Gamified Experience</h3>
            <p>Stay motivated with leaderboards, achievements, and rewards as you progress.</p>
          </div>
        </div>
      </section>

      <section className="what-our-students-say">
        <h2>What Our Students Say</h2>
        <p>Join thousands of students who have transformed their learning experience with StudyShot.</p>

        <div className="testimonial-cards">
          <div className="testimonial-card">
            <div className="user-initials">MT</div>
            <div className="user-name">Michael Thompson</div>
            <div className="rating">★★★★★</div>
            <div className="quote">
              "The gamification elements make learning fun! Competing with friends on the leaderboard keeps me motivated to study more."
            </div>
          </div>

          <div className="testimonial-card">
            <div className="user-initials">SJ</div>
            <div className="user-name">Sarah Johnson</div>
            <div className="rating">★★★★★</div>
            <div className="quote">
              "As a teacher, the admin features allow me to track my students' progress and customize content to meet their specific needs."
            </div>
          </div>

          <div className="testimonial-card">
            <div className="user-initials">JD</div>
            <div className="user-name">John Doe</div>
            <div className="rating">★★★★★</div>
            <div className="quote">
              "StudyShot helped me improve my grades significantly. The personalized quizzes identified my weak areas and helped me focus my studies."
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
