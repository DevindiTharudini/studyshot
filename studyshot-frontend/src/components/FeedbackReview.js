import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import './FeedbackReview.css';

const initialFeedback = [
  {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    message: 'Loved the new quiz feature!',
    timestamp: new Date('2025-05-10T14:35'),
    addressed: false,
    rating: 5,
    starred: false
  },
  {
    id: 2,
    name: 'Bob',
    email: 'bob@example.com',
    message: 'Please add more practice modules.',
    timestamp: new Date('2025-05-11T09:12'),
    addressed: false,
    rating: 4,
    starred: false
  },
  {
    id: 3,
    name: 'Carol',
    email: 'carol@example.com',
    message: 'Having trouble loading videos.',
    timestamp: new Date('2025-05-12T17:05'),
    addressed: true,
    rating: 2,
    starred: false
  },
];

export default function FeedbackReview() {
  const navigate = useNavigate();

  const [feedbacks, setFeedbacks] = useState(initialFeedback);
  const [searchTerm, setSearchTerm] = useState('');
  const [respondModal, setRespondModal] = useState({ open: false, feedbackId: null });
  const [deleteModal, setDeleteModal]   = useState({ open: false, feedbackId: null });
  const [replyText, setReplyText]       = useState('');

  // filter
  const filtered = useMemo(() => {
    return feedbacks.filter(f =>
      f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.message.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, feedbacks]);

  // date formatting helpers
  const formatDate = dt => dt.toLocaleDateString();
  const formatTime = dt => dt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // toggle starred
  const toggleStar = id => {
    setFeedbacks(fb =>
      fb.map(f => f.id === id ? { ...f, starred: !f.starred } : f)
    );
  };

  // respond flow
  const handleRespond = (id) => {
    setReplyText('');
    setRespondModal({ open: true, feedbackId: id });
  };
  const sendReply = () => {
    setFeedbacks(fs =>
      fs.map(f => f.id === respondModal.feedbackId ? { ...f, addressed: true } : f)
    );
    setRespondModal({ open: false, feedbackId: null });
  };

  // delete flow
  const requestDelete = (id) => setDeleteModal({ open: true, feedbackId: id });
  const confirmDelete = () => {
    setFeedbacks(fs => fs.filter(f => f.id !== deleteModal.feedbackId));
    setDeleteModal({ open: false, feedbackId: null });
  };

  // modal blur flag
  const anyModalOpen = respondModal.open || deleteModal.open;

  return (
    <>
      <div className={`feedback-page ${anyModalOpen ? 'blurred' : ''}`}>
        <header className="feedback-header">
          <h1>Feedback Review</h1>
          <button
            className="btn-back"
            onClick={() => navigate('/admin-dashboard')}
          >
            ← Back to Dashboard
          </button>
        </header>

        <div className="feedback-overview">
          <div className="card total">
            <h2>{feedbacks.length}</h2>
            <p>Total Feedback</p>
          </div>
          <div className="card addressed">
            <h2>{feedbacks.filter(f => f.addressed).length}</h2>
            <p>Addressed</p>
          </div>
          <div className="card pending">
            <h2>{feedbacks.filter(f => !f.addressed).length}</h2>
            <p>Pending</p>
          </div>
        </div>

        <div className="feedback-search">
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="feedback-grid">
          {filtered.map(f => (
            <div key={f.id} className={`feedback-card ${f.addressed ? 'done' : 'new'}`}>
              <div className="card-header">
                <div className="meta">
                  <strong>{f.name}</strong>
                  <span className="email">&lt;{f.email}&gt;</span>
                  <div className="rating">
                    {[1,2,3,4,5].map(i => (
                      <span
                        key={i}
                        className={`star ${i <= f.rating ? 'filled' : ''}`}
                      >★</span>
                    ))}
                  </div>
                </div>
                <button
                  className="star-btn"
                  onClick={() => toggleStar(f.id)}
                  aria-label="Flag feedback"
                >
                  {f.starred ? '★' : '☆'}
                </button>
              </div>

              <p className="message">{f.message}</p>

              <div className="card-footer">
                <div className="datetime">
                  {formatDate(f.timestamp)} @ {formatTime(f.timestamp)}
                </div>
                <div className="actions">
                  <button
                    className="btn-respond"
                    onClick={() => handleRespond(f.id)}
                    disabled={f.addressed}
                  >
                    {f.addressed ? 'Re-Respond' : 'Respond'}
                  </button>
                  <button
                    className="btn-delete"
                    onClick={() => requestDelete(f.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Respond Modal */}
      {respondModal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Reply to Feedback</h3>
            <textarea
              rows="5"
              placeholder="Type your response here..."
              value={replyText}
              onChange={e => setReplyText(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="btn-confirm" onClick={sendReply}>Send</button>
              <button className="btn-cancel" onClick={() => setRespondModal({ open: false, feedbackId: null })}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal.open && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Are you sure you want to delete this feedback?</h3>
            <div className="modal-buttons">
              <button className="btn-delete-confirm" onClick={confirmDelete}>Yes, Delete</button>
              <button className="btn-cancel" onClick={() => setDeleteModal({ open: false, feedbackId: null })}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
