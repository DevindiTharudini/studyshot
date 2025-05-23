import React, { useState } from 'react';
import './UserFeedbackPage.css';  // Import CSS for styling

const UserFeedbackPage = () => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5); // Default rating to 5
  const [feedback, setFeedback] = useState('');

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Feedback Submitted by: ${name}\nRating: ${rating}\nFeedback: ${feedback}`);
    // Here you can handle sending data to a backend or saving it in state
    setName('');
    setRating(5);
    setFeedback('');
  };

  return (
    <div className="feedback-container">
      <h2>Leave Your Feedback</h2>
      <form onSubmit={handleSubmit} className="feedback-form">
        <div className="form-group">
          <label htmlFor="name">Your Name:</label>
          <input 
            type="text" 
            id="name" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Enter your name" 
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select 
            id="rating" 
            value={rating} 
            onChange={(e) => setRating(e.target.value)} 
            required
          >
            {[1, 2, 3, 4, 5].map(num => (
              <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="feedback">Your Feedback:</label>
          <textarea 
            id="feedback" 
            value={feedback} 
            onChange={(e) => setFeedback(e.target.value)} 
            placeholder="Leave your feedback here" 
            rows="5" 
            required
          ></textarea>
        </div>
        
        <button type="submit" className="cta-button">Submit Feedback</button>
      </form>
    </div>
  );
};

export default UserFeedbackPage;
