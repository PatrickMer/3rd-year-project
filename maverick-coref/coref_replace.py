#!/venv/bin/python

"""
A script that takes a chat text message as input, uses the "sapienzanlp/maverick-mes-ontonotes"
model to predict coreference clusters, and outputs the text with the references replaced
with the actual entities.

Usage:
    ./coref_replace.py "Your chat message here" --device [cpu|cuda]

By default, the script uses 'cuda' if available.
"""

import sys
import argparse
from maverick import Maverick


def parse_arguments():
    """Parse command-line arguments to get the input text and device preference."""
    parser = argparse.ArgumentParser(description="Coreference Resolution Script")
    parser.add_argument('text', nargs='+', help='Input text for coreference resolution')
    parser.add_argument( '-d', '--device', choices=['cpu', 'cuda'], default='cuda',
                        help="Device to run the model on ('cpu' or 'cuda'). Defaults to 'cuda'.")
    args = parser.parse_args()
    # Join text arguments to handle spaces in the input text
    text = ' '.join(args.text)
    return text, args.device

def load_model(device):
    """Load the Maverick coreference resolution model on the specified device."""
    if device == 'cuda':
        # Check if CUDA is available
        from torch import cuda
        if not cuda.is_available():
            print("CUDA is not available. Falling back to CPU.", file=sys.stderr)
            device = 'cpu'
    model = Maverick(hf_name_or_path="sapienzanlp/maverick-mes-ontonotes", device=device)
    return model

def predict_clusters(model, text):
    """Use the model to predict coreference clusters."""
    result = model.predict(text)
    return result

def replace_references(text, clusters_char_offsets):
    """
    Replace references in the text with their representative entities.

    Args:
        text (str): The original input text.
        clusters_char_offsets (list): Coreference clusters with character offsets.

    Returns:
        str: The text with references replaced by their representative entities.
    """
    # Create a mapping from mention spans to their representative text
    mention_replacements = {}
    for cluster in clusters_char_offsets:
        # Select the representative mention based on the longest span
        representative = ''
        max_length = 0
        for mention_start, mention_end in cluster:
            mention_text = text[mention_start:mention_end+1]
            length = mention_end - mention_start + 1
            if length > max_length:
                max_length = length
                representative = mention_text
        # Map all other mentions to the selected representative
        for mention_start, mention_end in cluster:
            mention_text = text[mention_start:mention_end+1]
            if mention_text != representative:
                mention_replacements[(mention_start, mention_end)] = representative

    # Sort mentions by their start index in reverse order to avoid offset issues
    sorted_mentions = sorted(mention_replacements.items(), key=lambda x: x[0][0], reverse=True)

    # Replace mentions in the text with their representatives
    modified_text = text
    for (start, end), representative in sorted_mentions:
        modified_text = modified_text[:start] + representative + modified_text[end+1:]

    return modified_text

def main(text=None, device='cuda'):
    if text is None:
        text, device = parse_arguments()
    model = load_model(device)
    result = predict_clusters(model, text)

    if not result.get('clusters_char_offsets'):
        # No coreference clusters found.
        return text

    clusters_char_offsets = result['clusters_char_offsets']
    modified_text = replace_references(text, clusters_char_offsets)
    return modified_text

if __name__ == "__main__":
    output_text = main()
    print(output_text, flush=True)
    sys.exit(0)
