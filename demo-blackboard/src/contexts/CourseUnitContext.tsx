import { createContext, useState, ReactNode } from "react";

// Dictionary mapping course unit codes to titles
const COURSE_TITLES: { [key: string]: string } = {
  "COMP12111": "COMP12111 Fundamentals of Computer Engineering 2022-23 1st Semester",
  "COMP34812": "COMP34812 Natural Language Understanding 2024-25 2nd Semester",
};

interface CourseUnitContextType {
  courseUnit: string;
  courseTitle: string;
  setCourseUnit: (unit: string) => void;
}

const CourseUnitContext = createContext<CourseUnitContextType | undefined>(undefined);

export const CourseUnitProvider = ({ children }: { children: ReactNode }) => {
  const [courseUnit, setCourseUnitState] = useState<string>(() => {
    return localStorage.getItem("courseUnit") || "";
  });
  
  const [courseTitle, setCourseTitle] = useState<string>(() => {
    const storedUnit = localStorage.getItem("courseUnit") || "";
    return COURSE_TITLES[storedUnit] || "";
  });

  const setCourseUnit = (unit: string) => {
    setCourseUnitState(unit);
    setCourseTitle(COURSE_TITLES[unit] || "");
    localStorage.setItem("courseUnit", unit);
  };

  return (
    <CourseUnitContext.Provider value={{ courseUnit, courseTitle, setCourseUnit }}>
      {children}
    </CourseUnitContext.Provider>
  );
};

export default CourseUnitContext; // Default export
