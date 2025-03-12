#!/bin/bash
# Activate the Python virtual environment
source venv/bin/activate

# Run Langflow on the specified host and port
langflow run --host 0.0.0.0 --port 7860
