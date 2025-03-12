# Open WebUI

## Overview
Open WebUI is a web-based user interface for interacting with AI models. This module is used within the 3rd-year project to provide a graphical interface for working with the underlying AI functionality.

## Requirements

### Python Version
- Python 3.11.10

### Dependencies
- Virtual environment (venv)
- open-webui package

## Installation

1. Create a virtual environment:
```bash
python -m venv venv
```

2. Activate the virtual environment:
```bash
source venv/bin/activate  # Linux/macOS
# or
.\venv\Scripts\activate   # Windows
```

3. Install the package:
```bash
pip install open-webui
```

4. Additional dependencies can be installed with:
```bash
pip install -r requirements.txt  # If a requirements file exists
```

## Running the Application

You can run the application using the provided script:

```bash
./run.sh
```

Or manually:

1. Activate the virtual environment:
```bash
source venv/bin/activate  # Linux/macOS
# or
.\venv\Scripts\activate   # Windows
```

2. Start the server:
```bash
open-webui serve
```

## Configuration

The default configuration settings should work for most use cases. If you need to modify configuration parameters:

1. Check the documentation for available settings
2. Create a configuration file if needed
3. Pass custom parameters when starting the server

## Integration

Open WebUI integrates with the main project to provide visualization and interaction capabilities for the AI models and data processing pipelines.
