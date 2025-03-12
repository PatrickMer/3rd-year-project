import React, { useState, useEffect } from "react";
import "./CourseContent.css";
import { getFlowFiles, uploadAndProcessFile } from "../../api/langflow";
import { useCourseUnit } from "../../contexts/useCourseUnit";
import Banner from "../../components/Banner/Banner";
import Sidebar from "../../components/Sidebar/Sidebar";

const CourseContent: React.FC = () => {
  const { courseUnit } = useCourseUnit();
  const [files, setFiles] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [statusMessage, setStatusMessage] = useState("");

  const fetchFiles = async () => {
    try {
      const fetchedFiles = await getFlowFiles(courseUnit);
      setFiles(fetchedFiles);
    } catch (error) {
      console.error("Failed to fetch files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setStatusMessage("Please select at least one file to upload.");
      return;
    }

    setStatusMessage(`Uploading 0 of ${selectedFiles.length} files...`);

    try {
      for (let i = 0; i < selectedFiles.length; i++) {
        setStatusMessage(`Uploading file ${i + 1} of ${selectedFiles.length}...`);
        await uploadAndProcessFile(selectedFiles[i], courseUnit);
      }
      setStatusMessage("Files uploaded and processed successfully!");
      await fetchFiles();
    } catch (error: any) {
      setStatusMessage(`Error: ${error.message}`);
    }

    (document.getElementById("file-input") as HTMLInputElement).value = "";
    setSelectedFiles([]);
  };

  return (
    <div className="container">
      {/* Banner */}
      <Banner pageName="Course Content" />

      <div className="main">
        {/* Sidebar */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="content">
          <div className="thread-title">Course Content</div>

          {/* Status Message */}
          {statusMessage && <p className="status-message">{statusMessage}</p>}

          {/* File List */}
          <ul className="file-list">
            {files.map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>

          {/* File Upload */}
          <div className="upload-container">
            <input
              type="file"
              id="file-input"
              multiple
              onChange={handleFileChange}
              className="upload-input"
            />
            <button onClick={handleUpload} className="upload-button">Upload</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseContent;
