import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './moduleSelection.css';

const localModules = [
  { id: 1, name: 'Module 1', description: 'Introduction to React', quizKey: 'module1' },
  { id: 2, name: 'Module 2', description: 'Advanced JavaScript Concepts', quizKey: 'module2' },
  { id: 3, name: 'Module 3', description: 'Data Structures & Algorithms', quizKey: 'module3' },
];

const ModuleSelection = () => {
  const navigate = useNavigate();
  const [modules] = useState(localModules);

  const handleModuleClick = (module) => {
    if (module.quizKey) {
      navigate(`/quiz/${module.quizKey}`);
    } else {
      alert('Quiz key not defined for this module.');
    }
  };

  return (
    <div className="module-selection-page">
      <div className="module-banner">
        <div className="banner-content">
          <img
            src={`${process.env.PUBLIC_URL}/images/module-side-img.png`}
            alt="Modules"
            className="banner-image"
          />
          <div className="banner-content-text">
            <h1>Available Modules</h1>
            <p>Master your skills by selecting one of the top modules curated by StudyShot.</p>
          </div>
        </div>
      </div>

      <div className="module-list">
        {modules.map(module => (
          <div
            key={module.id}
            className="module-card"
            onClick={() => handleModuleClick(module)}
            tabIndex="0"
            onKeyDown={e => { if (e.key === 'Enter') handleModuleClick(module); }}
          >
            <div className="module-card-inner">
              <h3>{module.name}</h3>
              <p>{module.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModuleSelection;
