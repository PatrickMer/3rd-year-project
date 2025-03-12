import { Routes, Route } from 'react-router-dom';
import './App.css';
import DiscussionBoard from './pages/DiscussionBoard/DiscussionBoard';
import ThreadView from './pages/ThreadView/ThreadView';
import { CourseUnitProvider } from './contexts/CourseUnitContext';
import Home from './pages/Home/Home';
import CourseContent from './pages/CourseContent/CourseContent';

function App() {
  return (
    <CourseUnitProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/course-content" element={<CourseContent />} />
        <Route path="/discussion-board" element={<DiscussionBoard />} />
        <Route path="/discussion-thread" element={<ThreadView />} />
        <Route path="/discussion-thread/:threadId" element={<ThreadView />} />
      </Routes>
    </CourseUnitProvider>
  );
}

export default App;
