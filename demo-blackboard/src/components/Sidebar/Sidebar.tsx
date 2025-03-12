import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import { useCourseUnit } from '../../contexts/useCourseUnit';

const Sidebar: React.FC = () => {
  const { courseTitle } = useCourseUnit();
  const courseName = `${courseTitle || 'courseTitle'}`;

  return (
    <div className="sidebar">
      <h2>{courseName}</h2>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/course-content">Course Content</Link></li>
        <li><Link to="#">Assessment & Feedback</Link></li>
        <li><Link to="/discussion-board">Discussion Boards</Link></li>
        <li><Link to="#">My Grades</Link></li>
        <li><Link to="#">Unit Evaluation Survey</Link></li>
        <div className="sidebar-divider"></div>
        <li><Link to="#">Learning Resources</Link></li>
        <li><Link to="#">eLearning Support</Link></li>
        <li><Link to="#">Reading Lists Online</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
