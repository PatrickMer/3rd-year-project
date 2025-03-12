import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

interface LangflowResponse {
  session_id: string;
  outputs: {
    inputs: { input_value: string };
    outputs: {
      results: {
        message: {
          text: string;
          data: {
            timestamp: string;
            sender: string;
            sender_name: string;
            text: string;
          };
        };
      };
    }[];
  }[];
}

const LANGFLOW_URL = import.meta.env.VITE_LANGFLOW_URL || '';
const FLOW_ID = import.meta.env.VITE_FLOW_ID || '';

const StudentView: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [statusMessage, setStatusMessage] = useState<string>('');

  const handleAskQuestion = async () => {
    if (!question.trim()) {
      setStatusMessage('Please enter a question.');
      return;
    }

    setStatusMessage('Thinking...');

    try {
      const requestBody = {
        input_value: question,
        output_type: 'chat',
        input_type: 'chat'
      };
      
      const askResponse = await fetch(`${LANGFLOW_URL}/api/v1/run/${FLOW_ID}?stream=false`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
        signal: AbortSignal.timeout(120 * 1000),
      });

      if (!askResponse.ok) throw new Error('Failed to get chatbot response');

      const data: LangflowResponse = await askResponse.json();
      const message = data.outputs[0]?.outputs[0]?.results.message.text || 'No response.';
      setResponse(message);
      setStatusMessage('');
    } catch (error: any) {
      setStatusMessage(`Error: ${error.message}`);
    }
  };

  return (
    <Box className="page-container">
      <Typography variant="h4" className="title" gutterBottom>
        Student View
      </Typography>
      <Box className="box" sx={{ p: 2 }}>
        <TextField
          label="Your Question"
          placeholder="Ask your question..."
          multiline
          minRows={4}
          fullWidth
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleAskQuestion}>
          Ask
        </Button>
      </Box>
      {statusMessage && (
        <Typography color="info.main" sx={{ mt: 1 }}>
          {statusMessage}
        </Typography>
      )}
      {response && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="h6">Response:</Typography>
          <Typography>{response}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default StudentView;
