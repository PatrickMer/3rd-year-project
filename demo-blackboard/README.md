# Demo Blackboard

## Overview
This project provides a mock Blackboard interface that integrates an AI Study Companion into a discussion board environment. It serves as a demonstration of how AI assistance can be incorporated into educational platforms.

## Features
- Interactive mock Blackboard user interface
- Course content browsing
- Discussion board with AI-assisted interactions
- Discussion threads with AI-powered responses
- Changeable course unit context for targeted assistance

## Prerequisites
- Node.js and npm installed
- **Langflow server** must be running locally to handle API requests
  - The backend sends requests to the Langflow server
  - Without Langflow running, the AI features will not function

## Usage
1. Start the application with `npm run dev`
2. Navigate to the Home page (/)
3. You can change the course unit code in the text input on the Home page
   - This will update the context for all AI interactions
   - Questions and content management will be tailored to the selected course unit
4. Use the navigation to access:
   - Course Content: Browse materials for the selected course
   - Discussion Board: View and participate in discussions
   - Discussion Thread: Engage in specific conversation threads with AI assistance

## Project Structure
- `/src/pages` - Main application pages
- `/src/contexts` - React context providers including course unit context
- `/src/components` - Reusable UI components
- `/src/api` - API services for Langflow communication

## Development
To run the project in development mode:
```
npm install
npm run dev
```

Make sure the Langflow server is running before attempting to use any AI features in the application.
