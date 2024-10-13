# Work or Meditate

## Description
"Work or Meditate" is a browser extension that helps users maintain focus on work-related tasks by monitoring their browsing activity. It captures screenshots of the browser tab when the URL changes and uses AI to classify the content as either work-related or leisure. If leisure content is detected, the extension prompts the user to take a short meditation break.

## Features
- Automatically captures screenshots when the base URL changes
- Uses AI (llava-llama3 model) to classify web content as work or leisure
- Prompts users to meditate for 10 minutes when leisure content is detected
- Minimizes API calls by only classifying when the base URL changes

## Installation
1. Clone this repository or download the source code.
2. Open your browser's extension page (e.g., `chrome://extensions/` for Chrome or `about:addons` for Firefox).
3. Enable "Developer mode".
4. Click "Load unpacked" and select the directory containing the extension files.
5. You also need to install to install Ollama and run `OLLAMA_ORIGINS=moz-extension://* ollama serve`

## Usage
Once installed, the extension will run automatically in the background. It will:
1. Capture a screenshot when you navigate to a new website (change in base URL).
2. Send the screenshot to a local AI server for classification.
3. If the content is classified as leisure (not work), you'll receive an alert suggesting a 10-minute meditation break.

## Requirements
- A browser that supports WebExtensions (e.g., Firefox, Chrome)
- A local AI server running on `http://localhost:11434` with the llava-llama3 model

## Files
- `manifest.json`: Extension configuration
- `background.js`: Main logic for screenshot capture and classification
- `workormeditate.js`: Content script (currently minimal)
- `icons/border-48.png`: Extension icon

## Permissions
This extension requires the following permissions:
- `<all_urls>`: To run on all websites
- `tabs`: To access tab information and capture screenshots

## Privacy
Screenshots are processed locally and are not stored or sent to external servers. The extension does not collect or store any personal data.

## Development
To modify or extend this extension:
1. Edit the relevant JavaScript files (`background.js`, `workormeditate.js`).
2. Update `manifest.json` if you add new features requiring additional permissions.
3. Reload the extension in your browser to test changes.

## Contributing
Contributions to improve "Work or Meditate" are welcome. Please feel free to submit pull requests or create issues for bugs and feature requests.

## License
MIT

## Disclaimer
This extension is for personal productivity use. It is not intended to monitor or restrict users in any professional or educational setting. Use responsibly and in compliance with your local laws and regulations.

