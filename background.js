try {
  console.log("Background script loaded");

  // Function to capture tab and make API call
  let lastBaseUrl = '';

  async function captureTabAndClassify(tabId) {
    try {
      // Get the tab information
      const tab = await browser.tabs.get(tabId);
      const currentUrl = new URL(tab.url);
      const currentBaseUrl = currentUrl.origin;

      // Only proceed if the base URL has changed
      if (currentBaseUrl !== lastBaseUrl) {
        lastBaseUrl = currentBaseUrl;
        console.log("Base URL changed, capturing and classifying");

        const image = await browser.tabs.captureVisibleTab(null, {});
        console.log("Captured tab");
        console.log(image.substring(0, 100) + "..."); // Log only the first 100 characters of the base64 string

        // Remove the data URL prefix if present
        const base64Image = image.startsWith('data:image') ? image.split(',')[1] : image;

        console.log(tab.url);
        const response = await fetch('http://localhost:11434/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'llava-llama3',
            prompt: `Classify this image as either work or pleasure.`,
            images: [base64Image],
            stream: false
          }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}, response: ${await response.text()}`);
        }

        const result = await response.json();
        console.log(result.response);
        
        // Check if the response is "work" and redirect to vg.no
        if (!result.response.toLowerCase().includes("work")) {
          console.log("Classified as not work, showing alert");
          browser.tabs.executeScript(tabId, {
            code: 'alert("Meditate for 10 minutes");'
          });
        }
      } else {
        console.log("Base URL unchanged, skipping classification");
      }
    } catch (error) {
      console.error("Error in captureTabAndClassify:", error);
    }
  }

  // Listen for tab URL changes
  browser.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete') {
      console.log("Tab updated, checking if base URL changed");
      captureTabAndClassify(tabId);
    }
  });

  // Listen for tab switches
 /*  browser.tabs.onActivated.addListener((activeInfo) => {
    console.log("Tab switched, attempting to capture screenshot and classify");
    captureTabAndClassify(activeInfo.tabId);
  }); */

  console.log("Background script setup complete");
} catch (error) {
  console.error("Error in background script:", error);
}
