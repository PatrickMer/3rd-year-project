import axios from 'axios';
import { LangflowResponse } from '../types/langflow';

// Load environment variables
const API_URL = 'http://pc-server:7860';
const FLOW_ID = '508e7caa-4840-4788-8c6c-679fce3396d1';
const FILE_COMPONENT_ID = 'File-1GPXN';
// const CHROMADB_COMPONENT_IDS = ['Chroma-cyzG8', 'Chroma-9CODZ', 'Chroma-XxpMN'];

// Create an Axios instance
const api = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
  timeout: 300_000, // 120 seconds timeout
});

// Function to ask a question
export const askLangflowQuestion = async (inputValue: string, courseUnitCode?: string): Promise<string> => {
  try {
    const requestBody = {
      input_value: inputValue,
      output_type: 'chat',
      input_type: 'chat',
      tweaks: {
        "Chroma-cyzG8": { collection_name: courseUnitCode || "master-flow", },
        "Chroma-9CODZ": { collection_name: courseUnitCode || "master-flow", },
        "Chroma-XxpMN": { collection_name: courseUnitCode || "master-flow", }
      }
    };
    const response = await api.post<LangflowResponse>(`/run/${FLOW_ID}?stream=false`, requestBody);

    // Extract chatbot response
    return response.data.outputs[0]?.outputs[0]?.results.message.text || 'No response.';
  } catch (error: any) {
    console.error('Langflow API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get chatbot response');
  }
};

// Function to get all files uploaded under a flow
export const getFlowFiles = async (filterString?: string): Promise<string[]> => {
  try {
    const response = await api.get(`/files/list/${FLOW_ID}`);
    let files: string[] = response.data.files || [];

    // Filter files if a filter string is provided
    if (filterString) {
      files = files.filter(file => file.includes(filterString));
    }

    // Sort alphabetically in reverse order (latest first)
    files.sort().reverse();
    return files;
  } catch (error: any) {
    console.error('Langflow API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to get flow files');
  }
};

// Function to upload a file with an optional prefix
const uploadFile = async (file: File, prefix?: string): Promise<string> => {
  try {
    let newFileName = file.name;

    // Use the provided prefix if available
    if (prefix) {
      newFileName = `${prefix}_${file.name}`;
    }

    const renamedFile = new File([file], newFileName, { type: file.type });

    const formData = new FormData();
    formData.append("file", renamedFile);

    const response = await api.post(`/files/upload/${FLOW_ID}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return response.data.file_path; // Return uploaded file path
  } catch (error: any) {
    console.error("Langflow API Error:", error);
    throw new Error(error.response?.data?.message || "Failed to upload file");
  }
};


// Function to process a file
const processFile = async (filePath: string, courseUnitCode?: string): Promise<string> => {
  try {
    const requestBody = {
      input_value: "[FILE UPLOAD]",
      output_type: "chat",
      input_type: "chat",
      tweaks: {
        [FILE_COMPONENT_ID]: { path: filePath, },
        "Chroma-cyzG8": { collection_name: courseUnitCode || "master-flow", },
        "Chroma-9CODZ": { collection_name: courseUnitCode || "master-flow", },
        "Chroma-XxpMN": { collection_name: courseUnitCode || "master-flow", }
      }
    };
    const response = await api.post(`/run/${FLOW_ID}?stream=false`, requestBody);
    return response.data.outputs[0]?.outputs[0]?.results?.message?.text || 'Processing complete, no response.';
  } catch (error: any) {
    console.error('Langflow API Error:', error);
    throw new Error(error.response?.data?.message || 'Failed to process file');
  }
};

// Function to upload and process a file
export const uploadAndProcessFile = async (file: File, courseUnitCode?: string): Promise<string> => {
  try {
    const filePath = await uploadFile(file, courseUnitCode);
    return await processFile(filePath, courseUnitCode);
  } catch (error: any) {
    throw error;
  }
};


export default api;
