#!/bin/bash

# Ensure that the script exits on any errors
set -e

# Path to your virtual environment
VENV_PATH="/home/patrick/3rd-year-project/maverick-coref/venv"

# Path to your coref_replace.py script
SCRIPT_PATH="/home/patrick/3rd-year-project/maverick-coref/coref_replace.py"

# Activate the virtual environment
source "$VENV_PATH/bin/activate"

# Run the coref_replace.py script with all passed arguments
OUTPUT=$(python "$SCRIPT_PATH" "$@" 2>/dev/null)

# Only echo the last line of that output
echo "$OUTPUT"

