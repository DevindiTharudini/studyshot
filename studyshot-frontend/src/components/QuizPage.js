import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './quizPage.css';

const quizzes = {
  "1": Array.from({ length: 20 }, (_, index) => ({
    question: `Question ${index + 1}: This is a sample question for Module 1`,
    options: ['Option 1', 'Option 2', 'Option 3', 'Option 4'],
    answer: 0,
  })),
  "2": Array.from({ length: 20 }, (_, index) => ({
    question: `Question ${index + 1}: This is a sample question for Module 2`,
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    answer: 1,
  })),
  "3": Array.from({ length: 20 }, (_, index) => ({
    question: `Question ${index + 1}: This is a sample question for Module 3`,
    options: ['Option X', 'Option Y', 'Option Z', 'Option W'],
    answer: 2,
  })),
};

const QuizPage = () => {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(60);
  const [selectedOption, setSelectedOption] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [startMessageVisible, setStartMessageVisible] = useState(true);
  const [isQuizStarted, setIsQuizStarted] = useState(false);

  useEffect(() => {
    if (!quizzes[moduleId]) {
      navigate('/module-selection');
    } else {
      setQuizData(quizzes[moduleId]);
    }
  }, [moduleId, navigate]);

  const goToNextQuestion = useCallback(() => {
    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setTimer(60);
      setShowPopup(false);
      setSelectedOption('');
    } else {
      navigate('/quiz-completion');
    }
  }, [currentQuestion, quizData.length, navigate]);

  useEffect(() => {
    if (isQuizStarted) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setShowPopup(true);
            setTimeout(() => {
              setShowPopup(false);
              goToNextQuestion();
            }, 3000);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isQuizStarted, goToNextQuestion]);

  const handleAnswerChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleNext = () => {
    goToNextQuestion();
  };

  const handleStartQuiz = () => {
    setStartMessageVisible(false);
    setIsQuizStarted(true);
  };

  if (!quizData.length) return <div>Loading quiz...</div>;

  return (
    <div className="quiz-page">
      {startMessageVisible && (
        <div className="start-message">
          <p>Let’s Start!</p>
          <button className="start-btn" onClick={handleStartQuiz}>Start Quiz</button>
        </div>
      )}

      <div className={`quiz-container ${startMessageVisible ? 'blurred' : ''}`}>
        {isQuizStarted && (
          <>
            <div className="quiz-header">
              <h1><span>KNOWLEDGE IS POWER</span><br /> LET’S TEST YOURS!</h1>
            </div>

            <p className="question-count">QUESTION: {currentQuestion + 1}/{quizData.length}</p>

            <div className="question-section bordered">
              <p className="quiz-question">{quizData[currentQuestion].question}</p>
              <div className="options-section">
                {quizData[currentQuestion].options.map((option, index) => (
                  <label key={index} className="option-label bordered-option">
                    <input
                      type="radio"
                      name="quiz-option"
                      value={option}
                      checked={selectedOption === option}
                      onChange={handleAnswerChange}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>

            {showPopup && (
              <div className="popup modern-popup">
                <div className="popup-content">
                  <p>⏰ Time’s up! Moving to the next question...</p>
                </div>
              </div>
            )}

            <div className="timer-and-footer">
              <div className="timer">{String(timer).padStart(2, '0')}s</div>
              <div className="quiz-footer">
                <button className="next-btn" onClick={handleNext}>
                  {currentQuestion === quizData.length - 1 ? 'Finish' : 'Next'}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
