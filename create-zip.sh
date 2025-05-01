#!/bin/bash

# Create dist directory if it doesn't exist
mkdir -p dist

# Define the output zip file
OUTPUT_FILE="dist/architex-website.zip"

# Remove the zip file if it already exists
if [ -f "$OUTPUT_FILE" ]; then
    rm "$OUTPUT_FILE"
fi

# Create a list of files to exclude
EXCLUDE=(
    "node_modules/*"
    ".git/*"
    "dist/*"
    ".env"
    "create-zip.js"
    "create-zip.sh"
)

# Build the exclude arguments for zip command
EXCLUDE_ARGS=""
for item in "${EXCLUDE[@]}"; do
    EXCLUDE_ARGS="$EXCLUDE_ARGS --exclude=$item"
done

# Create the zip file
zip -r $EXCLUDE_ARGS "$OUTPUT_FILE" .

echo "Archive created at $OUTPUT_FILE"
