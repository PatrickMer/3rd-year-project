# Coreference Resolution Script

**Note: This script requires Python **3.11**.**

This repository contains:

- `coref_replace.py`: A Python script that performs coreference resolution on input text using the Maverick Coref model and replaces references with their actual entities.
- `run_coref.sh`: A bash script that activates the virtual environment and runs `coref_replace.py`, allowing you to use the script from outside the virtual environment.

## Quick Guide

### Setup

1. **Ensure Python 3.11 is Installed**

   Make sure you have Python 3.11 installed on your system.

2. **Create a Virtual Environment**

   ```bash
   python3.11 -m venv /path/to/your/venv
   ```

3. **Activate the Virtual Environment**

   ```bash
   source /path/to/your/venv/bin/activate
   ```

4. **Install Required Packages**

   ```bash
   pip install maverick-coref torch argparse
   ```

5. **Update `run_coref.sh`**

   Edit `run_coref.sh` and update the following paths:

   ```bash
   #!/bin/bash

   # Path to your virtual environment
   VENV_PATH="/path/to/your/venv"

   # Path to your coref_replace.py script
   SCRIPT_PATH="/path/to/your/coref_replace.py"

   # Activate the virtual environment
   source "$VENV_PATH/bin/activate"

   # Run the coref_replace.py script with all passed arguments
   python "$SCRIPT_PATH" "$@"

   # Deactivate the virtual environment
   deactivate
   ```

6. **Make `run_coref.sh` Executable**

   ```bash
   chmod +x run_coref.sh
   ```

### Usage

Run the script using the bash wrapper:

```bash
./run_coref.sh "Your input text here" --device [cpu|cuda]
```

- **Input Text**: Replace `"Your input text here"` with the text you want to process.
- **Device** (`--device`): Optional. Specify `cpu` or `cuda`. Defaults to `cuda`.

### Examples

**Example 1:**

```bash
./run_coref.sh "Barack Obama went to the White House. He gave a speech there."
```

**Output:**

```
Barack Obama went to the White House. Barack Obama gave a speech there.
```

**Example 2:**

```bash
./run_coref.sh "The cat sat on the mat because it was tired." --device cpu
```

**Output:**

```
The cat sat on the mat because The cat was tired.
```

## Scripts

- **`coref_replace.py`**: Python script that performs coreference resolution and replaces references with actual entities.
- **`run_coref.sh`**: Bash script that activates the virtual environment and runs `coref_replace.py`.

## Notes

- **Python Version**: The scripts require **Python 3.11**.
- **Virtual Environment**: Ensure the virtual environment paths in `run_coref.sh` are correctly set.
- **Dependencies**: Required Python packages are installed in the virtual environment.
- **Device Option**: Use `--device cpu` if CUDA is not available or you prefer to run on CPU.
