# Import the maverick-coref library
from maverick import Maverick

def main():
    # Initialize the coreference resolution model
    # This step may vary depending on how maverick-coref is structured.
    # For example, it might require loading a pre-trained model or setting up configurations.
    # Replace 'CorefModel' and its parameters with the actual class and parameters if different.
    coref_model = Maverick(
	hf_name_or_path = "sapienzanlp/maverick-mes-ontonotes",
	device = "cuda",
	)

    # Sample text for coreference resolution
    text = "Barack Obama is traveling to Rome. The city is sunny and the president plans to visit its most important attractions"
    word_tokenized = ['Barack', 'Obama', 'is', 'traveling', 'to', 'Rome', '.',  'The', 'city', 'is', 'sunny', 'and', 'the', 'president', 'plans', 'to', 'visit', 'its', 'most', 'important', 'attractions']

    # Perform coreference resolution
    # The method 'resolve' is assumed; replace it with the actual method name if different.
    clusters = coref_model.predict(text)

    # Display the results
    print("Original Text:")
    print(text)
    print("\nCoreference Clusters:")
    for idx, cluster in enumerate(clusters, 1):
        print(f"Cluster {idx}:")
        for mention in cluster:
            # Each mention could be a tuple containing the start and end indices or the actual text
            # Adjust the unpacking based on the actual structure of mentions
            print(f"  - {mention}")

if __name__ == "__main__":
    main()
