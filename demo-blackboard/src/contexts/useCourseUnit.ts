import { useContext } from "react";
import CourseUnitContext from "./CourseUnitContext";

export const useCourseUnit = () => {
  const context = useContext(CourseUnitContext);
  if (!context) {
    throw new Error("useCourseUnit must be used within a CourseUnitProvider");
  }
  return context;
};