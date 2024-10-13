const fs = require('fs');
const path = require('path');

const base64Image = fs.readFileSync(path.join(__dirname, 'encoded_test.txt'), 'utf-8');
console.log(base64Image.substring(0, 100) + "..."); // Log only the first 100 characters of the base64 string

async function classifyImage() {
    try {
        const response = await fetch('http://localhost:11434/api/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'llava:13b',
                prompt: 'Classify this image as either "work" or "not_work". All social media and entertainment sites are "not_work":',
                images: [base64Image1],
                stream: false
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result.response);
    } catch (error) {
        console.error("Error in API call:", error);
    }
}

classifyImage();