import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText } from '@mui/material';

const LANGFLOW_URL = import.meta.env.VITE_LANGFLOW_URL || '';
const FLOW_ID = import.meta.env.VITE_FLOW_ID || '';

interface UploadedFile {
  name: string;
}

const TeacherView: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    fetchFileList();
  }, []);

  const fetchFileList = async () => {
    try {
      const response = await fetch(`${LANGFLOW_URL}/api/v1/files/list/${FLOW_ID}`);
      if (!response.ok) throw new Error('Failed to fetch file list');
      const data = await response.json();
      const sortedFiles = data.files
        .map((fileName: string) => ({ name: fileName }))
        .sort((a: UploadedFile, b: UploadedFile) => b.name.localeCompare(a.name));
      setUploadedFiles(sortedFiles);
    } catch (error: any) {
      setStatusMessage('Error fetching files');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    setStatusMessage('Uploading file...');
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const uploadResponse = await fetch(`${LANGFLOW_URL}/api/v1/files/upload/${FLOW_ID}`, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) throw new Error('File upload failed');
      setStatusMessage('File uploaded!');
      fetchFileList();
    } catch (error: any) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Box className="page-container">
      <Typography variant="h2" className="title">Teacher View</Typography>
      <Box className="box">
        <Button variant="contained" component="label">
          Upload File
          <input type="file" hidden onChange={handleFileChange} />
        </Button>
        <Button onClick={handleUpload}>Upload</Button>
        {statusMessage && <Typography>{statusMessage}</Typography>}
      </Box>
      <Typography variant="h3">Uploaded Files</Typography>
      <List dense>
        {uploadedFiles.map((file) => (
          <ListItem key={file.name}>
            <ListItemText
              primary={<Typography variant="body2">{file.name}</Typography>}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default TeacherView;
