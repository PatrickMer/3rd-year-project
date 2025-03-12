import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCourseUnit } from '../../contexts/useCourseUnit';

const Home: React.FC = () => {
    const { courseUnit, setCourseUnit } = useCourseUnit();
    const [newCourseUnit, setNewCourseUnit] = useState(courseUnit);

    return (
        <div>
            <h1>Home</h1>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/course-content">Course Content</Link></li>
                    <li><Link to="/discussion-board">Discussion Board</Link></li>
                    <li><Link to="/discussion-thread">Discussion Thread</Link></li>
                </ul>
            </nav>
            
            {/* Text input and update button */}
            <div>
                <input
                    type="text"
                    value={newCourseUnit}
                    onChange={(e) => setNewCourseUnit(e.target.value)}
                />
                <button onClick={() => setCourseUnit(newCourseUnit)}>Update Course Unit</button>
            </div>
        </div>
    );
};

export default Home;