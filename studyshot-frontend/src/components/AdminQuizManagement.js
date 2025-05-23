import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminQuizManagement.css';

const initialModules = ['React', 'JavaScript', 'Node.js', 'CSS'];

const QuizManagement = () => {
  const navigate = useNavigate();

  // Load quizzes from localStorage or empty array initially
  const [quizzes, setQuizzes] = useState(() => {
    const saved = localStorage.getItem('quizzes');
    return saved ? JSON.parse(saved) : [];
  });

  const [modules] = useState(initialModules);

  const [form, setForm] = useState({
    module: initialModules[0],
    question: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correctAnswer: '',   // no default selected, must choose
  });

  const [editId, setEditId] = useState(null);
  const [filterModule, setFilterModule] = useState('All');

  // Save quizzes to localStorage whenever quizzes state changes
  useEffect(() => {
    localStorage.setItem('quizzes', JSON.stringify(quizzes));
  }, [quizzes]);

  const handleInputChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetForm = () => {
    setForm({
      module: initialModules[0],
      question: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctAnswer: '',
    });
    setEditId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.question.trim()) {
      alert('Question is required');
      return;
    }
    if (![form.option1, form.option2, form.option3, form.option4].every(opt => opt.trim() !== '')) {
      alert('All 4 options are required');
      return;
    }
    if (!form.correctAnswer) {
      alert('Please select the correct answer');
      return;
    }

    if (editId) {
      // Update existing quiz
      setQuizzes(prev =>
        prev.map(q => (q.id === editId ? { id: editId, ...form } : q))
      );
    } else {
      // Add new quiz
      setQuizzes(prev => [...prev, { id: Date.now(), ...form }]);
    }

    resetForm();
  };

  const handleEdit = (quiz) => {
    setForm({
      module: quiz.module,
      question: quiz.question,
      option1: quiz.option1,
      option2: quiz.option2,
      option3: quiz.option3,
      option4: quiz.option4,
      correctAnswer: quiz.correctAnswer,
    });
    setEditId(quiz.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      setQuizzes(prev => prev.filter(q => q.id !== id));
      if (editId === id) resetForm();
    }
  };

  // Filter quizzes by module or show all
  const displayedQuizzes = filterModule === 'All'
    ? quizzes
    : quizzes.filter(q => q.module === filterModule);

  return (
    <div className="quiz-management">
      <header className="quiz-header">
        <h1>Quiz Management</h1>
        <button className="btn-back" onClick={() => navigate('/admin-dashboard')}>
          ← Back to Dashboard
        </button>
      </header>

      <form className="quiz-form" onSubmit={handleSubmit}>
        <label>
          Module
          <select name="module" value={form.module} onChange={handleInputChange}>
            {modules.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </label>

        <label>
          Question
          <textarea
            name="question"
            value={form.question}
            onChange={handleInputChange}
            rows="3"
            placeholder="Enter the question"
            required
          />
        </label>

        <label>
          Option 1
          <input
            type="text"
            name="option1"
            value={form.option1}
            onChange={handleInputChange}
            placeholder="Option 1"
            required
          />
        </label>

        <label>
          Option 2
          <input
            type="text"
            name="option2"
            value={form.option2}
            onChange={handleInputChange}
            placeholder="Option 2"
            required
          />
        </label>

        <label>
          Option 3
          <input
            type="text"
            name="option3"
            value={form.option3}
            onChange={handleInputChange}
            placeholder="Option 3"
            required
          />
        </label>

        <label>
          Option 4
          <input
            type="text"
            name="option4"
            value={form.option4}
            onChange={handleInputChange}
            placeholder="Option 4"
            required
          />
        </label>

        <label>
          Correct Answer
          <select
            name="correctAnswer"
            value={form.correctAnswer}
            onChange={handleInputChange}
            required
          >
            <option value="" disabled>
              Select correct answer
            </option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
            <option value="option4">Option 4</option>
          </select>
        </label>

        <button type="submit" className="btn-submit">
          {editId ? 'Update Quiz' : 'Add Quiz'}
        </button>
      </form>

      <div className="filter-section">
        <label>
          Show module:
          <select
            value={filterModule}
            onChange={e => setFilterModule(e.target.value)}
          >
            <option value="All">All</option>
            {modules.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="quizzes-list">
        {displayedQuizzes.length === 0 ? (
          <p className="no-quizzes">No quizzes to display.</p>
        ) : (
          displayedQuizzes.map(q => (
            <div key={q.id} className="quiz-card">
              <div className="quiz-module">{q.module}</div>
              <div className="quiz-question">{q.question}</div>
              <ul className="quiz-options">
                {[1, 2, 3, 4].map(i => (
                  <li
                    key={i}
                    className={q.correctAnswer === `option${i}` ? 'correct' : ''}
                  >
                    {q[`option${i}`]}
                  </li>
                ))}
              </ul>
              <div className="quiz-actions">
                <button className="btn-edit" onClick={() => handleEdit(q)}>Edit</button>
                <button className="btn-delete" onClick={() => handleDelete(q.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuizManagement;
