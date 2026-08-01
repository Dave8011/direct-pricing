#!/bin/bash

# Navigate to the folder where this script is located
cd "$(dirname "$0")"

echo "====================================="
echo "   PDF Pricelist Generator"
echo "====================================="
echo ""

# Check if node is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed."
    echo "Node.js is required to run this generator."
    echo "Opening the download page in your browser..."
    sleep 2
    open "https://nodejs.org/"
    echo "Please download, install it, and then double-click this file again."
    exit 1
fi

echo "Checking dependencies..."
# Suppress output unless there's an error to keep it clean for the user
npm install --no-audit --no-fund --silent

echo ""
echo "What month and year should be on the PDF? (e.g., AUGUST 2026)"
echo "Just press Enter to use the default."
read -p "> " MONTH_INPUT

echo ""
echo "Generating PDF... Please wait."

if [ -z "$MONTH_INPUT" ]; then
    node generate.js
else
    node generate.js "$MONTH_INPUT"
fi

echo ""
echo "✅ Finished! The PDF should now be updated."
echo "You can safely close this window."
