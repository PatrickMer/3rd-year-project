import React from 'react';
import './Banner.css';
import { useCourseUnit } from '../../contexts/useCourseUnit';

interface BannerProps {
  pageName: string;
  subPath?: string;
}

const Banner: React.FC<BannerProps> = ({ pageName, subPath }) => {
  const { courseTitle } = useCourseUnit();
  const courseName = `${courseTitle || 'courseTitle'}`;
  
  return (
    <div className="banner">
      <span>{courseName}</span>
      <span>{pageName}{subPath ? ` > ${subPath}` : ''}</span>
    </div>
  );
};

export default Banner;
