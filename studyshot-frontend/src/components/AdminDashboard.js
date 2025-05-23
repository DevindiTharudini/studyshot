import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';
import './UserManagement.css';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
  const [greeting, setGreeting] = useState('');
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);

    const hours = new Date().getHours();
    if (hours < 12) setGreeting('Good Morning Admin ☀️');
    else if (hours < 18) setGreeting('Good Afternoon Admin ☀️');
    else setGreeting('Good Evening Admin 🌙');

    return () => clearInterval(interval);
  }, []);

  const handleLogoutClick = () => setShowLogoutConfirm(true);
  const confirmLogout = () => navigate('/login');
  const cancelLogout = () => setShowLogoutConfirm(false);

  const users = [
    { name: 'Alice', module: 'React', score: 85, level: 'Advanced' },
    { name: 'Bob', module: 'JavaScript', score: 60, level: 'Intermediate' },
    { name: 'Charlie', module: 'Node.js', score: 35, level: 'Beginner' },
  ];

  const scoreChartData = {
    labels: users.map(u => u.name),
    datasets: [
      {
        label: 'Score',
        data: users.map(u => u.score),
        backgroundColor: ['#ff6a88', '#ff8a65', '#fdd835'],
        borderRadius: 5
      }
    ]
  };

  const scoreChartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      y: { beginAtZero: true }
    }
  };

  const moduleCounts = users.reduce((acc, user) => {
    acc[user.module] = (acc[user.module] || 0) + 1;
    return acc;
  }, {});

  const moduleChartData = {
    labels: Object.keys(moduleCounts),
    datasets: [
      {
        label: 'Module Usage',
        data: Object.values(moduleCounts),
        backgroundColor: ['#ffb6b9', '#fcd5ce', '#cdb4db']
      }
    ]
  };

  return (
    <div className="admin-dashboard">
      <nav className="sidebar">
        <div className="sidebar-header">
          <img src="/images/studyshot-logo.png" alt="StudyShot Logo" className="logo" />
          <h2>StudyShot Admin</h2>
        </div>
        <ul>
          <li><button onClick={() => navigate('/admin-dashboard')}>Dashboard</button></li>
          <li><button onClick={() => navigate('/user-management')}>User Management</button></li>
          <li><button onClick={() => navigate('/module-management')}>Module Management</button></li>
          <li><button onClick={() => navigate('/quiz-management')}>Quiz Management</button></li>
          <li><button onClick={() => navigate('/feedback-review')}>Feedback Review</button></li>
          <li><button onClick={() => navigate('/certificate-management')}>Certificate Management</button></li>

          <li><button onClick={handleLogoutClick} className="logout-btn">Logout</button></li>
        </ul>
      </nav>

      <div className="dashboard-content">
        <section className="dashboard-overview">
          <h2>{greeting} <span className="time">| {currentTime}</span></h2>
          <p className="subtext">
            ✨ Here’s your StudyShot activity snapshot for today, Admin! Let’s keep growing smarter 📈
          </p>
        </section>

        <section className="quick-stats">
          <div className="stat-card">👨‍🎓 Students: <strong>120</strong></div>
          <div className="stat-card">📘 Modules: <strong>5</strong></div>
          <div className="stat-card">🏆 Certificates: <strong>32</strong></div>
        </section>

        <section className="charts-section">
          <div className="chart-box">
            <h3>📊 Score Distribution</h3>
            <Bar data={scoreChartData} options={scoreChartOptions} />
          </div>
          <div className="chart-box">
            <h3>📈 Module Usage</h3>
            <Pie data={moduleChartData} />
          </div>
        </section>

        <section className="summary-table">
          <h3>User Performance</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Module</th>
                <th>Score</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={i}>
                  <td>{u.name}</td>
                  <td>{u.module}</td>
                  <td>{u.score}</td>
                  <td>{u.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className="recent-activity">
          <h3>Recent Activity</h3>
          <ul>
            <li>🕒 Alice completed "Module 1 - React" quiz.</li>
            <li>🕒 Bob logged in 10 minutes ago.</li>
            <li>🕒 Charlie unlocked a certificate for "JavaScript Basics".</li>
            <li>🕒 New user "Diana" signed up.</li>
          </ul>
        </section>

        <section className="admin-actions">
          <h3>Manage System</h3>
          <button className="admin-btn">Add New Quiz</button>
          <button className="admin-btn">Update Quiz</button>
          <button className="admin-btn">Issue Certificate</button>
        </section>

        {showLogoutConfirm && (
          <div className="logout-confirmation-overlay">
            <div className="logout-confirmation-popup">
              <h3>Are you sure you want to logout?</h3>
              <div className="popup-buttons">
                <button onClick={confirmLogout}>Yes</button>
                <button onClick={cancelLogout}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
