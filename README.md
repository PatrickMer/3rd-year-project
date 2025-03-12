# AI Study Companion - 3rd Year Project

## Project Overview

This project implements an AI-powered study companion system integrated into a learning management system interface. It consists of several independent components that work together to provide intelligent assistance for students.

## Components

### 1. demo-blackboard
A mock Blackboard interface integrating the AI Study Companion into a discussion board environment. This React-based frontend demonstrates how AI assistance can be incorporated into educational platforms.

**Dependencies:**
- Node.js and npm
- Requires Langflow server to be running

**How to run:**
```bash
cd demo-blackboard
npm install
npm run dev
```

### 2. demo-frontend
A preliminary website created solely for testing API functionality during early development. This component is not used in the final product but is kept for reference.

**Dependencies:**
- Node.js and npm

**How to run:**
```bash
cd demo-frontend
npm install
npm run dev
```

### 3. langflow
The backend server that handles AI model execution, workflow management, and API endpoints for the frontend components.

**Dependencies:**
- Python 3.12.3
- Python virtual environment
- Ollama (must be installed and running)

**How to run:**
```bash
cd langflow
source venv/bin/activate
langflow run --host 0.0.0.0 --port 7860
```

### 4. open-webui
A web-based user interface for interacting with AI models. Provides visualization and interaction capabilities.

**Dependencies:**
- Python 3.11.10
- Virtual environment with open-webui package
- Ollama (must be installed and running)

**How to run:**
```bash
cd open-webui
source venv/bin/activate
open-webui serve
# Or use the provided script:
./run.sh
```

### 5. maverick-coref
A utility for coreference resolution in text. Improves text understanding by replacing pronouns with their referents.

**Dependencies:**
- Python 3.11
- Virtual environment with maverick-coref and torch packages

**How to run:**
```bash
cd maverick-coref
./run_coref.sh "Your input text here" --device cpu
```

## System Interaction

The components interact in the following manner:

1. **User Interface Layer**: The `demo-blackboard` provides the main user interface that students interact with. It displays course content and hosts discussion boards.

2. **Backend Processing**: When a user asks a question or interacts with the AI features, the frontend sends requests to the `langflow` server.

3. **Natural Language Processing**: The `maverick-coref` component may be used as part of the processing pipeline to improve text understanding by resolving pronouns to their entities.

4. **AI Model Execution**: The `langflow` server processes requests, executes appropriate AI models or workflows, and returns responses to the frontend.

5. **Additional Interfaces**: The `open-webui` component provides supplementary visualization and interaction capabilities for the AI models.

## Important Notes

- Each component has **separate dependencies** and should be run independently
- Multiple Python versions are required: 3.11 for maverick-coref, 3.11.10 for open-webui, and 3.12.3 for langflow
- **Ollama must be installed on the system and running on port 11434**
  - This is required for both the langflow and open-webui components
  - The system uses Ollama to access and run local AI models
- The system requires all components to be running concurrently for full functionality
- Make sure the `langflow` server is running before using the `demo-blackboard` interface
- Each component has its own detailed README with specific setup instructions
